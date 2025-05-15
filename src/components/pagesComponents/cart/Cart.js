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

  let subTotal = 0;
  const gstPercentage = 0.18;
  const getTotal = (st = 0) => st + st * gstPercentage;

  const handlePayment = async () => {
    try {
      // Step 1: Calculate subtotal from BOTH cart and startup items
      const serviceSubtotal = cartItems.reduce((total, item) => total + item.price, 0);
      const startupSubtotal = startupcartItems.reduce((total, item) => total + (item.priceWithGst || 0), 0);
      const subtotal = serviceSubtotal + startupSubtotal;
  
      // Step 2: Add GST (18%) - but only for service items since startup items already include GST
      const gstRate = 0.18; // 18%
      const gstAmount = serviceSubtotal * gstRate;
  
      // Step 3: Calculate final amount (service subtotal + service GST + startup total with GST)
      const totalAmount = Math.round(serviceSubtotal + gstAmount + startupSubtotal); // Rounded to nearest rupee
  
      // Step 4: Create Razorpay order
      const orderData = await createOrder(totalAmount);
  
      // Step 5: Initiate payment
      await makePayment(totalAmount, orderData);
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Payment failed. Please try again.');
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
            subTotal += isStartup ? (item.priceWithGst || 0) : item.price;

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
                    Price{isStartup ? ' (With GST)' : ''}:
                  </p>
                  <p className="font-semibold text-black text-sm md:text-base md:mt-1">
                    {formatINRCurrency(isStartup ? item.priceWithGst : item.price)}
                  </p>
                </div>
              </div>
            );
          })}

          {/* ========== Total & Checkout Section ========== */}
          <div className="flex flex-col items-end p-4 bg-white rounded-lg shadow-lg mt-6 md:mt-8 gap-2 md:gap-3">
            <div className="w-full md:w-auto flex justify-between md:justify-end gap-4">
              <span className="text-base md:text-xl font-semibold text-gray-700">Subtotal:</span>
              <span className="text-base md:text-xl text-black">{formatINRCurrency(subTotal)}</span>
            </div>
            
            <div className="w-full md:w-auto flex justify-between md:justify-end gap-4">
              <span className="text-sm md:text-lg text-gray-600">GST (18%):</span>
              <span className="text-sm md:text-lg text-black">{formatINRCurrency(subTotal * gstPercentage)}</span>
            </div>
            
            <div className="w-full md:w-auto flex justify-between md:justify-end gap-4 border-t border-gray-300 pt-2 mt-1">
              <span className="text-lg md:text-2xl font-bold text-green-700">Total Payable:</span>
              <span className="text-lg md:text-2xl font-bold text-green-700">{formatINRCurrency(getTotal(subTotal))}</span>
            </div>
            
            <button 
              onClick={handlePayment}
              className="w-full md:w-auto mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md transition text-center"
            >
              Proceed to Payment
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