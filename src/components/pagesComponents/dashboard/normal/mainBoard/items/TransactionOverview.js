'use client';

import { Icon } from '@iconify/react';
import GridItem from '@/components/pagesComponents/grid/GridItem';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Loader from '@/components/partials/loading/Loader';
import DashSection from '@/components/pagesComponents/pageLayout/DashSection';
import Button, { BTN_SIZES } from '@/components/ui/Button';
import axios from 'axios';
import { Invoice } from '../../../order-history-component/OrderHistory.Component';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function TransactionOverview({ invoices = [], onSelectInvoice, className }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);
  const [allOrders, setAllOrders] = useState([]);
  const [responseData, setResponseData] = useState(null);

  const total = invoices.length;
  const sales = invoices.filter((inv) => inv.type === 'sales').length;
  const purchases = invoices.filter((inv) => inv.type === 'purchase').length;

  const getAuthToken = async () => {
    return document.cookie
      .split('; ')
      .find((row) => row.startsWith('token='))
      ?.split('=')[1];
  };

  const fetchOrderData = async () => {
    try {
      setIsLoading(true);
      setIsError(false);

      const token = await getAuthToken();
      if (!token) throw new Error('Authentication token not found');

      const response = await axios.get(
        `${BASE_URL}/apis/subscription-user/?limit=3`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const { data } = response;
      setResponseData(data);

      if (data && Array.isArray(data.data)) {
        const formattedOrders = data.data.map((order) => {
          const createdDate = new Date(order.createdAt);
          const formattedDate = createdDate
            .toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: '2-digit',
            })
            .toUpperCase(); // "JUN 24, 2025"

          const serviceTitles =
            order.services?.map((service) => service.title) || [];

          const basePrice =
            order.services?.reduce(
              (sum, service) => sum + (service.price || 0),
              0,
            ) || 0;


          return {
            id: order.id,
            orderDate: formattedDate,
            titles: serviceTitles,
            totalPrice: basePrice.toFixed(2), // Ensure total price is a string with two decimal places
            fullData: order, // save full order data for Invoice view
          };
        });

        const sortedOrders = formattedOrders.sort(
          (a, b) => new Date(b.orderDate) - new Date(a.orderDate),
        );

        setAllOrders(sortedOrders);
      } else {
        setAllOrders([]);
        console.error('Unexpected API response structure:', data);
      }

      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching order data:', error);
      setIsLoading(false);
      setIsError(true);
      setError(error);
    }
  };

  useEffect(() => {
    fetchOrderData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = (order) => {
    if (onSelectInvoice) {
      onSelectInvoice(order.id, responseData);
    }
  };


  return (
    <DashSection
    className="mt-4"
    title="Recent Transactions"
    titleRight={
      <Button
        size="sm"
        className="m-2"
        onClick={() => router.push('/dashboard/order-history')}
      >
        View More
      </Button>
    }
  >
    {isLoading ? (
      <Loader />
    ) : isError ? (
      <div className="text-red-500">Failed to load transactions.</div>
    ) : (
      <ul className="space-y-4">
        {allOrders.map((order) => (
          <li
            key={order.id}
            onClick={() => handleClick(order)}
            className="cursor-pointer"
          >
            <GridItem href="#">
              <div className="mr-4">
                <Icon
                  icon="material-symbols:account-circle-outline"
                  className="rounded-xl sm:h-16 sm:w-16 sm:p-3 h-14 w-14 p-3 text-blue-500 bg-blue-100 dark:text-blue-100 dark:bg-blue-500"
                />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <span className="text-sm font-medium text-txt">
                    {order.orderDate}
                  </span>
                  <span className="text-base font-semibold text-green-600">
                    ₹{order.totalPrice}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-txt/70 leading-snug">
                    {order.titles.join(', ')}
                  </p>
                </div>
              </div>
            </GridItem>
          </li>
        ))}
      </ul>
    )}
  </DashSection>
  );
}
