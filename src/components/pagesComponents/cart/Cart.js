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
      // Step 1: Calculate subtotal (cart total before GST)
      const subtotal = cartItems.reduce((total, item) => total + item.price, 0);
  
      // Step 2: Add GST (18% here)
      const gstRate = 0.18; // 18%
      const gstAmount = subtotal * gstRate;
  
      // Step 3: Calculate final amount (subtotal + gst)
      const totalAmount = Math.round(subtotal + gstAmount); // Rounded to nearest rupee
  
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
        <div className="min-h-screen text-slate-800 flex flex-col gap-5 my-10 w-11/12 m-auto bg-gradient-to-br from-blue-50 to-blue-200 p-8 rounded-lg shadow-md">

          {/* Combined Cart Items */}
          {[...(cartItems || []).map(item => ({ ...item, type: 'service' })), ...(startupcartItems || []).map(item => ({ ...item, type: 'startup' }))].map((item) => {
            const isStartup = item.type === 'startup';
            subTotal += isStartup ? (item.priceWithGst || 0) : item.price;

            return (
              <div
                key={item.id}
                className="flex p-5 items-center gap-5 bg-white rounded-lg shadow-md mb-4"
              >
                <div className="w-1/5 flex items-center justify-center">
                  {isStartup ? (
                    <Image
                      src={item.image || '/default-startup.svg'}
                      width={150}
                      height={100}
                      alt="Startup service logo"
                    />
                  ) : (
                    iconList[item.title]?.icon ? (
                      <span className="object-contain h-11 w-11 fill-zinc-600">
                        {iconList[item.title]?.icon}
                      </span>
                    ) : (
                      <Image
                        src={iconList[item.title]?.src || '/default-service.svg'}
                        width={150}
                        height={100}
                        alt="API service logo"
                      />
                    )
                  )}
                </div>

                <div className="w-4/5">
                  <h3 className="text-2xl font-medium">
                    {item.title} : <span className="text-black text-sm">{item.category}</span>
                  </h3>

                  {isStartup && (
                    <p className="text-sm text-gray-600 mt-2">
                      {item.aboutService?.slice(0, 150)}...
                    </p>
                  )}

                  <div className="mt-2 flex flex-col sm:flex-row gap-2 sm:gap-4">
                    <ButtonLink
                      title="View"
                      size="md-1"
                      linkTo={
                        isStartup
                          ? `/register-startup/registration/${item.id}`
                          : item?.link || `/apis/all_apis/${item.id}`
                      }
                    />
                    <RemoveFromCart refresh={refreshCart} item={item} type={item.type} />
                  </div>

                  <p className="text-sm mt-2 text-orange-600 font-semibold">
                    Category: <span className="text-black">{isStartup ? 'Startup' : 'Service'}</span>
                  </p>
                </div>

                <div className="w-full sm:w-auto ml-0 sm:ml-5 mt-4 sm:mt-0 bg-gray-100 rounded-lg px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
                  <p className="text-gray-700 text-sm sm:text-base">
                    Price{isStartup ? ' (With GST)' : ''}:
                  </p>
                  <p className="text-right font-semibold text-black text-sm sm:text-base">
                    {formatINRCurrency(isStartup ? item.priceWithGst : item.price)}
                  </p>
                </div>


              </div>
            );
          })}

          {/* ========== Total & Checkout Section ========== */}
          <div className="flex flex-col items-end p-4 bg-white rounded-lg shadow-lg mt-8 gap-3">
            <div className="text-xl font-semibold text-gray-700">
              Subtotal: <span className="text-black">{formatINRCurrency(subTotal)}</span>
            </div>
            <div className="text-lg text-gray-600">
              GST (18%): <span className="text-black">{formatINRCurrency(subTotal * gstPercentage)}</span>
            </div>
            <div className="text-2xl font-bold text-green-700 border-t border-gray-300 pt-2">
              Total Payable: <span>{formatINRCurrency(getTotal(subTotal))}</span>
            </div>
            {/* <Link href="/payment"> */}
              <button 
                onClick={handlePayment}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow-md transition"
              >
                Proceed to Payment
              </button>
            {/* </Link> */}
          </div>
        </div>
      )}



      {/* Empty Cart Message */}
      {(!cartItems.length && !startupcartItems.length) && (
        <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-50 to-blue-200">
          <div className="flex flex-col items-center gap-4 mt-[100px]">
            <Image
              width={300}
              height={300}
              src="/cart.svg"
              alt="Empty cart"
              className="xl:w-[300px] md:w-[200px]"
            />
            <span className="text-2xl">Your Cart is Empty...</span>
            <ButtonLink title="Add Some Services" linkTo="/apis/all_apis" />
          </div>
        </div>
      )}
    </>
  );
}