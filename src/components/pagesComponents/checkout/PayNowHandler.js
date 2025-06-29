'use client';

import React, { useState } from 'react';
import Button from '@/components/ui/Button';
import { toast } from 'react-toastify';
import Image from 'next/image';
import { v4 } from 'uuid';
import useAuth from '@/hooks/useAuth';
import userAxios from '@/lib/userAxios';
import { useRouter } from 'next/navigation';
import { generateQueryFromObject } from '@/utils/utilityFunctions';
import userAxiosNext from '@/lib/userbackAxios';

const getAuthToken = async () => {
  // In client-side component, we can't use the server-side cookies() function
  // So we simulate getting the token from cookies or local storage
  return document.cookie
    .split('; ')
    .find((row) => row.startsWith('token='))
    ?.split('=')[1];
};

const PayNowHandler = ({
  totalAmount,
  services,
  registrationStartup,
  registrationServices,
}) => {
  const router = useRouter();
  const { currentUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const navigateToUrl = (url) => router.push(url);

  const surl = `${process.env.NEXT_PUBLIC_PAY_URL}/checkout/payment-success`;
  const furl = `${process.env.NEXT_PUBLIC_PAY_URL}/checkout/payment-failure`;

  const paymentDetails = (txnid) => {
    return {
      unique_id: null,
      split_payments: null,
      sub_merchant_id: null,
      customer_authentication_id: null,
      name: `${currentUser.firstName} ${currentUser.lastName}`,
      amount: totalAmount,
      txnid,
      email: currentUser.email,
      phone: currentUser.phone,
      productinfo: 'Services',
      surl,
      furl,
    };
  };

  const createSubs = async () => {
    try {
      // const { status, data } = await axios.post(
      //   `${process.env.NEXT_PUBLIC_URL}/api/subscriptions`,
      //   {
      //     serviceIds: services.map((service) => service.id),
      //     registerStartupIds: registrationStartup.map((service) => service.id),
      //     registerServiceIds: registrationServices.map((service) => service.id),
      //   },
      //   {
      //     headers: { Authorization: `Bearer ${token}` },
      //   },
      // );

      // if (status === 201) {
      //   return data.data;
      // }
      setIsLoading(true);

    const token = await getAuthToken(); // Get token from cookie

    if (!token) {
      toast.error('User not authenticated.');
      return;
    }

    const payload = {
      serviceIds: services.map((service) => service.id),
      registerStartupIds: registrationStartup.map((service) => service.id),
      registerServiceIds: registrationServices.map((service) => service.id),
    };

    const { data } = await userAxiosNext.post(
      `/apis/create-subscription`,  // assuming your Express backend routes start from /api/subscriptions
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log('Subscription created:', data);
    return data.data; // Assuming the response structure contains the subscription data in data.data
    } catch (error) {
      return toast.error('Error creating subscription!');
    }
  };

  const payHandler = async (txnid) => {
    console.log('Paying for txnid:', txnid);
    try {
      const token = await getAuthToken();
      const { data, status } = await userAxios.post(
        `/payment/initiate_payment`,
        paymentDetails(txnid),
      );

      console.log(surl, furl);
      console.log('Payment initiation response:', data);

      if (status === 200) {
        const key = data?.key;
        const access_key = data?.access_key?.data;

        var easebuzzCheckout = new EasebuzzCheckout(key, 'test');
        var options = {
          access_key: access_key,
          onResponse: async (response) => {
            const txnid = response.txnid;
            const pid = response.easepayid;
            const status = response.status;

            const query = generateQueryFromObject({
              txnid,
              pid,
              status,
            });

            console.log('Payment response:', response);
            if (status === 'success') {
              const updated = await userAxiosNext.put(
                `/apis/update-subscription`,  // 👈 Your Express route
                { status, txnid, pid },
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );

              if (updated) {
                toast.success('Payment Successfull!', {
                  autoClose: 1000,
                });
                toast.onChange((p) => {
                  if (p.status === 'removed') {
                    navigateToUrl(`${surl}?${query}`);
                  }
                });
              }
            }

            if (status === 'failure') {
              toast.error('Payment Failed!', {
                autoClose: 1000,
              });
              toast.onChange((p) => {
                if (p.status === 'removed') {
                  navigateToUrl(`${furl}?${query}`);
                }
              });
            }
          },
          theme: '#4f46e5',
        };

        easebuzzCheckout.initiatePayment(options);
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to pay!');
    }
  };

  const subsHandler = async () => {
    try {
      setIsLoading(true);
      const sub = await createSubs();

      if (sub) {
        return await payHandler(sub.txnid);
      }
      throw new Error('Error creating subscription.');
    } catch (error) {
      toast.error('Error creating subscription.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button size={'lg'} disabled={isLoading} onClick={subsHandler}>
      {isLoading ? (
        <div className="flex gap-1">
          <Image
            src={'/whiteLoader.svg'}
            alt="Loading..."
            width={25}
            height={25}
          />
          <p>Checking..</p>
        </div>
      ) : (
        'Pay Now'
      )}
    </Button>
  );
};

export default PayNowHandler;
