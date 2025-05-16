'use client';

import Link from 'next/link';
import Image from 'next/image.js';
import Button from '@/components/ui/Button';
import RemoveFromCart from './RemoveFromCart';
import ButtonLink from '../dashboard/GSTR/Button';
import { iconList } from '../apiService/staticData';
import { formatINRCurrency } from '@/utils/utilityFunctions';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import UseAuth from '../../../hooks/useAuth';
import axios from 'axios';
import { H1 } from '../pageLayout/Headings';
import { makePayment, createOrder } from '../../../utils/razorpay';

export default function Cart() {
  const { token } = UseAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [startupcartItems, setStartUpCartItems] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0); // Add this state to force refresh
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);
  const [paymentError, setPaymentError] = useState(null);

  // Function to refresh both carts
  const refreshCart = useCallback(() => {
    // Force a re-fetch by incrementing the refresh key
    setRefreshKey(prevKey => prevKey + 1);
  }, []);

  const fetchServiceCart = useCallback(async () => {
    if (!token) return;

    try {
      setIsLoading(true);
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACK_URL}/cart/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200 && response.data) {
        setCartItems(response.data.services || []);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  const fetchStartupCart = useCallback(async () => {
    if (!token) return;

    try {
      setIsLoading(true);
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACK_URL}/cartStartup/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200 && response.data) {
        setStartUpCartItems(response.data.startupItems || []);
      }
    } catch (error) {
      console.error("Error fetching startup cart:", error);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      fetchServiceCart();
      fetchStartupCart();
    }
  }, [token, refreshKey]); // Add refreshKey to dependencies to trigger re-fetch

  // Calculate totals
  const serviceSubtotal = cartItems.reduce((total, item) => total + (item.price || 0), 0);
  // For startup items, use the base price (not priceWithGst) for calculation to avoid double-counting GST
  const startupSubtotal = startupcartItems.reduce((total, item) => total + (item.price?item.price:item.priceWithGst || 0), 0);
  const gstRate = 0.18; // 18% GST
  const gstAmount =serviceSubtotal*gstRate
  const serviceTotalWithGST = serviceSubtotal + gstAmount;
  const subtotal = serviceSubtotal + startupSubtotal;
  const totalWithGst = serviceTotalWithGST + startupSubtotal;

  const handlePayment = async () => {

    if (!token) {
      toast.error('Please login to continue with payment');
      return;
    }

    if (cartItems.length === 0 && startupcartItems.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    try {
      setIsPaymentLoading(true);
      setPaymentError(null);

      // Step 1: Calculate amounts
      // For regular services, we'll add GST
      const serviceSubtotal = cartItems.reduce((total, item) => total + (item.price || 0), 0);
      const serviceGST = serviceSubtotal * 0.18; // 18% GST
      const serviceTotalWithGST = serviceSubtotal + serviceGST;

      // For startup items, use priceWithGst as it already includes GST
      const startupTotal = startupcartItems.reduce((total, item) => total + (item.priceWithGst || 0), 0);
      
      // Calculate final total
      const totalAmount = Math.round(serviceTotalWithGST + startupTotal);

      if (totalAmount <= 0) {
        throw new Error('Invalid order amount');
      }

      console.log({
        serviceSubtotal,
        serviceGST,
        serviceTotalWithGST,
        startupTotal,
        totalAmount
      });

      // Step 2: Create Razorpay order with retry mechanism
      let orderData;
      let retryCount = 0;
      const maxRetries = 3;

      while (retryCount < maxRetries) {
        try {
          orderData = await createOrder(totalAmount);
          if (orderData && orderData.id) break;
          retryCount++;
        } catch (err) {
          if (retryCount === maxRetries - 1) throw err;
          await new Promise(resolve => setTimeout(resolve, 1000 * retryCount));
        }
      }

      if (!orderData || !orderData.id) {
        throw new Error('Failed to create order');
      }

      // Step 3: Initiate payment
      await makePayment(totalAmount, {
        ...orderData,
        prefill: {
          name: token?.name || '',
          email: token?.email || '',
          contact: token?.phone || ''
        },
        handler: async function (response) {
          try {
            // Handle successful payment
            const paymentData = {
              orderId: orderData.id,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature,
              amount: totalAmount,
              services: cartItems.map(item => ({
                ...item,
                gstAmount: (item.price || 0) * 0.18,
                totalWithGst: (item.price || 0) * 1.18
              })),
              startupServices: startupcartItems.map(item => ({
                ...item,
                // For startup services, priceWithGst already includes GST
                gstAmount: item.priceWithGst - item.price,
                totalWithGst: item.priceWithGst
              }))
            };

            // Update order status
            await axios.post(`${process.env.NEXT_PUBLIC_BACK_URL}/payment/verify`, paymentData, {
              headers: { Authorization: `Bearer ${token}` }
            });

            toast.success('Payment successful!');
            refreshCart(); // Refresh cart after successful payment
            
          } catch (error) {
            console.error('Payment verification error:', error);
            toast.error('Payment verification failed. Please contact support.');
          }
        }
      });


    } catch (error) {
      console.error('Payment error:', error);
      setPaymentError(error.message);
      toast.error(error.message || 'Payment failed. Please try again.');
    } finally {
      setIsPaymentLoading(false);
    }
  };
  
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <Image src={'/loading.svg'} width={50} height={50} alt="Loading.." />
      </div>
    );
  }

  return (
    <>
      {/* ========== Combined Cart Items Section ========== */}
      {(Array.isArray(cartItems) && cartItems.length > 0 || Array.isArray(startupcartItems) && startupcartItems.length > 0) && (
        <div className="min-h-screen text-slate-800 flex flex-col gap-5 my-6 md:my-10 w-full md:w-11/12 max-w-6xl mx-auto px-4 md:px-8 py-6 md:py-8 bg-gradient-to-br from-blue-50 to-blue-200 rounded-lg shadow-md">

          {/* Combined Cart Items */}
          {[...(cartItems || []).map(item => ({ ...item, type: 'service' })), ...(startupcartItems || []).map(item => ({ ...item, type: 'startup' }))].map((item) => {
            const isStartup = item.type === 'startup';
            // For display purposes only, use priceWithGst for startup items if available
            const displayPrice = isStartup && item.priceWithGst ? item.priceWithGst : item.price;
            
            return (
              <div
                key={item.id}
                className="flex flex-col md:flex-row p-4 md:p-5 items-start md:items-center gap-4 bg-white rounded-lg shadow-md mb-4"
              >
                {/* Item Image/Icon */}
                <div className="w-full md:w-1/6 flex items-center justify-center mb-3 md:mb-0">
                  {isStartup ? (
                    <Image
                      src={item.image || '/default-startup.svg'}
                      width={100}
                      height={80}
                      alt="Startup service logo"
                      className="object-contain"
                    />
                  ) : (
                    iconList[item.title]?.icon ? (
                      <span className="object-contain h-10 w-10 fill-zinc-600">
                        {iconList[item.title]?.icon}
                      </span>
                    ) : (
                      <Image
                        src={iconList[item.title]?.src || '/default-service.svg'}
                        width={100}
                        height={80}
                        alt="API service logo"
                        className="object-contain"
                      />
                    )
                  )}
                </div>

                {/* Item Details */}
                <div className="w-full md:w-3/5 flex-grow">
                  <h3 className="text-lg md:text-2xl font-medium">
                    {item.title} 
                    <span className="text-black text-xs md:text-sm ml-1">{item.category}</span>
                  </h3>

                  {isStartup && (
                    <p className="text-xs md:text-sm text-gray-600 mt-2">
                      {item.aboutService?.slice(0, 120)}...
                    </p>
                  )}

                  <div className="mt-2 flex flex-wrap gap-2">
                    <ButtonLink
                      title="View"
                      size="sm"
                      linkTo={
                        isStartup
                          ? `/register-startup/registration/${item.id}`
                          : item?.link || `/apis/all_apis/${item.id}`
                      }
                    />
                    <RemoveFromCart refresh={refreshCart} item={item} type={item.type} />
                  </div>

                  <p className="text-xs md:text-sm mt-2 text-orange-600 font-semibold">
                    Category: <span className="text-black">{isStartup ? 'Startup' : 'Service'}</span>
                  </p>
                </div>

                {/* Price Information */}
                <div className="w-full md:w-auto mt-3 md:mt-0 bg-gray-100 rounded-lg px-3 py-2 md:py-3 md:px-4 flex flex-row md:flex-col justify-between items-center md:items-end">
                  <p className="text-gray-700 text-sm">
                    Price{isStartup && item.priceWithGst !== item.price ? ' (With GST)' : ''}:
                  </p>
                  <p className="font-semibold text-black text-sm md:text-base md:mt-1">
                    {formatINRCurrency(displayPrice)}
                  </p>
                </div>
              </div>
            );
          })}

          {/* ========== Total & Checkout Section ========== */}
          <div className="flex flex-col items-end p-4 bg-white rounded-lg shadow-lg mt-6 md:mt-8 gap-2 md:gap-3">
            <div className="w-full md:w-auto flex justify-between md:justify-end gap-4">
              <span className="text-base md:text-xl font-semibold text-gray-700">Subtotal:</span>
              <span className="text-base md:text-xl text-black">{formatINRCurrency(subtotal)}</span>
            </div>
            
            <div className="w-full md:w-auto flex justify-between md:justify-end gap-4">
              <span className="text-sm md:text-lg text-gray-600">GST (18%):</span>
              <span className="text-sm md:text-lg text-black">{formatINRCurrency(gstAmount)}</span>
            </div>
            
            <div className="w-full md:w-auto flex justify-between md:justify-end gap-4 border-t border-gray-300 pt-2 mt-1">
              <span className="text-lg md:text-2xl font-bold text-green-700">Total Payable:</span>
              <span className="text-lg md:text-2xl font-bold text-green-700">{formatINRCurrency(totalWithGst)}</span>
            </div>
            
            <button 
              onClick={handlePayment}
              disabled={isPaymentLoading}
              className="w-full md:w-auto mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md transition text-center disabled:bg-blue-400 disabled:cursor-not-allowed"
            >
              {isPaymentLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <span>Processing...</span>
                  <Image src="/loading.svg" width={20} height={20} alt="Loading" />
                </div>
              ) : (
                'Proceed to Payment'
              )}
            </button>
          </div>
        </div>
      )}

      {/* Empty Cart Message */}
      {(!cartItems.length && !startupcartItems.length) && (
        <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-50 to-blue-200 px-4">
          <div className="flex flex-col items-center gap-4 mt-[100px] text-center">
            <Image
              width={200}
              height={200}
              src="/cart.svg"
              alt="Empty cart"
              className="w-[150px] md:w-[200px] xl:w-[300px]"
            />
            <span className="text-xl md:text-2xl">Your Cart is Empty...</span>
            <ButtonLink title="Add Some Services" linkTo="/apis/all_apis" />
          </div>
        </div>
      )}
    </>
  );
}