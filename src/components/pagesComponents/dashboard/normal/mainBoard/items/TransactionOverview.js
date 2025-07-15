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
        `${BASE_URL}/apis/subscription-user/?limit=2`,
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
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-blue-200/50 dark:border-blue-700/50"
      title="Recent Transactions"
      titleRight={null}
    >
      <div className="p-6">
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
            <div className="inline-flex flex-col items-center px-6 py-8 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200/50 dark:border-blue-700/50">
              <Icon icon="lucide:inbox" className="w-12 h-12 text-blue-400 dark:text-blue-500 mb-3" />
              <span className="text-blue-600 dark:text-blue-400 font-medium">No transactions available</span>
              <span className="text-sm text-blue-500 dark:text-blue-500 mt-1">Your recent transactions will appear here</span>
            </div>
          </div>
        ) : (
          <>
            <div className="space-y-3">
              {allOrders.map((order, index) => (
                <div
                  key={order.id}
                  onClick={() => handleClick(order)}
                  className="group cursor-pointer transform transition-all duration-200 hover:scale-[1.01]"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-white dark:from-blue-900/10 dark:to-gray-800 rounded-lg border border-blue-200/50 dark:border-blue-700/50 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-md transition-all duration-300">
                    <div className="flex items-center">
                      <div className="relative mr-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-sm">
                          <Icon
                            icon="lucide:receipt"
                            className="w-6 h-6 text-white"
                          />
                        </div>
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                          <Icon icon="lucide:check" className="w-2.5 h-2.5 text-white" />
                        </div>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/40 px-2 py-1 rounded-md">
                              {order.orderDate}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                              ₹{order.totalPrice}
                            </span>
                            <Icon icon="lucide:chevron-right" className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                              {order.titles.join(', ')}
                            </p>
                          </div>
                          <div className="flex items-center ml-2">
                            <span className="text-xs bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 px-2 py-1 rounded-full">
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
            
            {/* Simple View All Link */}
            <div className="flex justify-center mt-6 pt-4 border-t border-blue-200/30 dark:border-blue-700/30">
              <div 
                className="group cursor-pointer flex items-center space-x-1"
                onClick={() => router.push('/dashboard/order-history')}
              >
                <span className="text-sm font-medium text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-200">
                  View All
                </span>
                
                <Icon 
                  icon="lucide:chevron-right" 
                  className="w-4 h-4 text-blue-500 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-200" 
                />
              </div>
            </div>
          </>
        )}
      </div>
    </DashSection>
  );
}