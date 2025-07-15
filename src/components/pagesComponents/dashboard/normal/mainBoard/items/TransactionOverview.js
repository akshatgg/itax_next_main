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

export default function TransactionOverview({
  invoices = [],
  onSelectInvoice,
  className,
}) {
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

      console.log('Fetched order data:', data);

      if (
        data.success &&
        data.message === 'No subscriptions found for the user.'
      ) {
        setAllOrders([]);
        setIsLoading(false);
        return;
      }

      if (!data.success) {
        throw new Error(data.message || 'Unknown error occurred.');
      }

      if (Array.isArray(data.data)) {
        const formattedOrders = data.data.map((order) => {
          const createdDate = new Date(order.createdAt);
          const formattedDate = createdDate
            .toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: '2-digit',
            })
            .toUpperCase();

          const services = order.services || [];
          const registrationServices = order.registrationServices || [];
          const registrationStartup = order.registrationStartup || [];

          const allServices = [
            ...services,
            ...registrationServices,
            ...registrationStartup,
          ];

          const serviceTitles = allServices.map((service) => service.title);
          const basePrice = allServices.reduce(
            (sum, service) =>
              sum + (service.price || service.priceWithGst || 0),
            0,
          );

          return {
            id: order.id,
            orderDate: formattedDate,
            titles: serviceTitles,
            totalPrice: basePrice.toFixed(2),
            fullData: order,
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
          className="m-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-none shadow-lg transition-all duration-300"
          onClick={() => router.push('/dashboard/order-history')}
        >
          <Icon icon="lucide:arrow-right" className="w-4 h-4 ml-1" />
          View More
        </Button>
      }
    >
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <Loader />
        </div>
      ) : isError ? (
        <div className="text-center py-12">
          <div className="inline-flex items-center px-4 py-2 bg-red-50 border border-red-200 rounded-lg">
            <Icon icon="lucide:alert-circle" className="w-5 h-5 text-red-500 mr-2" />
            <span className="text-red-700">Failed to load transactions</span>
          </div>
        </div>
      ) : allOrders.length === 0 ? (
        <div className="text-center py-12">
          <div className="inline-flex flex-col items-center px-6 py-8 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
            <Icon icon="lucide:inbox" className="w-12 h-12 text-gray-400 dark:text-gray-500 mb-3" />
            <span className="text-gray-600 dark:text-gray-400 font-medium">No transactions available</span>
            <span className="text-sm text-gray-500 dark:text-gray-500 mt-1">Your recent transactions will appear here</span>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {allOrders.map((order, index) => (
            <div
              key={order.id}
              onClick={() => handleClick(order)}
              className="group cursor-pointer transform transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300">
                <div className="flex items-center">
                  <div className="relative mr-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                      <Icon
                        icon="lucide:receipt"
                        className="w-7 h-7 text-white"
                      />
                    </div>
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <Icon icon="lucide:check" className="w-3 h-3 text-white" />
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-semibold text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-md">
                          {order.orderDate}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-green-600 dark:text-green-400">
                          ₹{order.totalPrice}
                        </span>
                        <Icon icon="lucide:chevron-right" className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                          {order.titles.join(', ')}
                        </p>
                      </div>
                      <div className="flex items-center ml-2">
                        <span className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-2 py-1 rounded-full">
                          {order.titles.length} item{order.titles.length > 1 ? 's' : ''}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </DashSection>
  );
}