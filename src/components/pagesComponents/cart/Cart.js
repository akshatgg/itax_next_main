'use client';

import Link from 'next/link';
import Image from 'next/image.js';
import Button from '@/components/ui/Button';
import RemoveFromCart from './RemoveFromCart';
import ButtonLink from '../dashboard/GSTR/Button';
import { iconList } from '../apiService/staticData';
import { formatINRCurrency } from '@/utils/utilityFunctions';
import { useCallback, useEffect, useState } from 'react';

import UseAuth from '../../../hooks/useAuth';
import axios from 'axios';

export default function Cart() {
  const { token } = UseAuth();      
  const [isLoading, setIsLoading] = useState(false);
  const [cartItems, setCartItems] = useState();

  const init = useCallback(async () => {
    if (!token) return; // ⛔️ Prevent API call if token isn't available yet

    try {
      setIsLoading(true);
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACK_URL}/cart/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data);

      if (response.status === 200 && response.data) {
        setCartItems(response.data.services || []);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      init();
    }
  }, [init, token]); // 🔁 retry once token is ready

  let subTotal = 0;
  const gstPercentage = 0.18;
  const getTotal = (st = 0) => st + st * gstPercentage;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <Image src={'/loading.svg'} width={50} height={50} alt="Loading.." />
      </div>
    );
  }

  return (
    <>
      {Array.isArray(cartItems) && cartItems.length > 0 ? (
        <div className="min-h-screen text-slate-800 flex flex-col gap-5 my-10 w-11/12 m-auto bg-gradient-to-br from-blue-50 to-blue-200 p-8 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-4xl font-semibold">Cart</h1>
          </div>
          {cartItems.map((item) => {
            subTotal += item.price;
            return (
              <div
                key={item.id}
                className="flex p-5 items-center gap-5 bg-white rounded-lg shadow-md mb-4"
              >
                <div className="w-1/5 flex items-center justify-center">
                  {iconList[item.title]?.icon ? (
                    <span className="object-contain h-11 w-11 fill-zinc-600">
                      {iconList[item.title]?.icon}
                    </span>
                  ) : (
                    <Image
                      src={iconList[item.title]?.src || '/default-service.svg'}
                      width={150}
                      height={100}
                      alt="Api service logo"
                    />
                  )}
                </div>
                <div className="w-4/5">
                  <h3 className="text-2xl font-medium">{item.title}</h3>
                  <div className="mt-2 flex">
                    <ButtonLink
                      title="View"
                      size="md-1"
                      linkTo={item?.link ? item.link : `/apis/all_apis/${item.id}`}
                    />
                    <RemoveFromCart refresh={init} item={item} />
                  </div>
                </div>
                <div className="max-w-[250px] w-full rounded ml-5 grid grid-cols-2 h-fit px-4 py-2 bg-gray-100">
                  <span className="text-left py-2">Price: </span>
                  <span className="font-semibold text-right py-2">
                    {formatINRCurrency(item.price)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
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
