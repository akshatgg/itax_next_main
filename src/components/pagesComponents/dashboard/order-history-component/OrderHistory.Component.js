'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import useAuth from '@/hooks/useAuth';
import { iconList } from "../../apiService/staticData";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const sharedButtonClasses = 'text-white px-4 py-2 rounded transition-all duration-200 font-medium';
const sharedTextClasses = 'text-sm text-zinc-500';

const OrderHistory = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);
  const [allOrders, setAllOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedHistory, setSelectedHistory] = useState('Past 3 Months');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [responseData, setResponseData] = useState(null);

  const getAuthToken = async () => {
    // In client-side component, we can't use the server-side cookies() function
    // So we simulate getting the token from cookies or local storage
    return document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1]
  }

 const fetchOrderData = async () => {
  try {
    setIsLoading(true);
    setIsError(false);

    const token = await getAuthToken();
    if (!token) throw new Error("Authentication token not found");

    const response = await axios.get(`${BASE_URL}/apis/subscription-user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { data } = response;

    if (data && Array.isArray(data.data)) {
      const sortedOrders = [...data.data].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      setAllOrders(sortedOrders);
      filterOrders(sortedOrders, selectedHistory);
    } else {
      setAllOrders([]);
      console.error('Unexpected API response structure:', data);
    }

    setResponseData(response.data);
    setIsLoading(false);
  } catch (error) {
    console.error('Error fetching order data:', error);
    setIsLoading(false);
    setIsError(true);
    setError(error);
  }
};
  

  const filterOrders = (orders, duration) => {
    const now = new Date();
    const filtered = orders.filter((order) => {
      const orderDate = new Date(order.createdAt);
      switch (duration) {
        case 'Past 3 Months':
          return now - orderDate <= 3 * 30 * 24 * 60 * 60 * 1000; // 3 months
        case 'Past 6 Months':
          return now - orderDate <= 6 * 30 * 24 * 60 * 60 * 1000; // 6 months
        case 'Past Year':
          return now - orderDate <= 12 * 30 * 24 * 60 * 60 * 1000; // 1 year
        default:
          return true;
      }
    });
    setFilteredOrders(filtered);
  };

  useEffect(() => {
    fetchOrderData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    filterOrders(allOrders, selectedHistory);
  }, [selectedHistory, allOrders]);

  const handleHistoryChange = (e) => {
    setSelectedHistory(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const searchOrders = (orders, query) => {
    if (!query) return orders;
    return orders.filter((order) =>
      order.id.toLowerCase().includes(query.toLowerCase()),
    );
  };

  const filteredAndSearchedOrders = searchOrders(filteredOrders, searchQuery);

  const handleInvoiceClick = (orderId) => {
    setSelectedOrderId(orderId);
  };

  const handleBackToOrders = () => {
    setSelectedOrderId(null);
  };

  if (selectedOrderId) {
    return <Invoice orderId={selectedOrderId} onBack={handleBackToOrders} responseData={responseData} />;
  }

  const OrderCard = ({ order }) => {
    console.log('OrderCard order:', order);
    return (
      <div className="order-card bg-white border border-zinc-200 rounded-xl p-6 mb-6 text-black shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="border-b border-zinc-100 pb-4 mb-4">
          <div className="flex justify-between items-start mb-3">
            <div>
              <span className="text-xs text-zinc-400 uppercase tracking-wide font-medium">Order ID</span>
              <p className="text-sm font-semibold text-zinc-700 mt-1">{order.id}</p>
            </div>
            <div className="flex items-center gap-3">
              {order.status === 'success' && (
                <button
                  className={`bg-blue-500 hover:bg-blue-600 shadow-md hover:shadow-lg ${sharedButtonClasses}`}
                  onClick={() => handleInvoiceClick(order.id)}
                >
                  📄 Invoice
                </button>
              )}
              {order.status === 'pending' && (
                <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium">
                  ⏳ Pending
                </span>
              )}
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <span className="text-xs text-zinc-400 uppercase tracking-wide font-medium">Order Date</span>
              <p className="text-sm font-semibold text-zinc-700 mt-1">
                {new Date(order.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs text-zinc-400 uppercase tracking-wide font-medium">Total Amount</span>
              <p className="text-xl font-bold text-blue-600 mt-1">
                ₹{order.amountForServices.toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-zinc-700 mb-3">Order Items</h4>
          
          {order.registrationStartup.length > 0 && (
            <div className="space-y-3">
              {order.registrationStartup.map((startup, index) => (
                <div key={index} className="flex items-center p-3 bg-blue-50 rounded-lg">
                  <div className="flex-shrink-0 mr-4">
                    <Image
                      src={startup.image}
                      alt={startup.title}
                      className="rounded-lg object-cover"
                      width="60"
                      height="60"
                    />
                  </div>
                  <div className="flex-grow">
                    <h5 className="font-medium text-zinc-800 mb-1">{startup.title}</h5>
                    <span className="text-sm text-zinc-500">Startup Registration</span>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold text-blue-600">
                      ₹{startup.priceWithGst.toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {order.registrationServices.length > 0 && (
            <div className="space-y-3">
              {order.registrationServices.map((service, index) => (
                <div key={index} className="flex items-center p-3 bg-green-50 rounded-lg">
                  <div className="flex-shrink-0 mr-4">
                    <Image
                      src={service.image}
                      alt={service.title}
                      className="rounded-lg object-cover"
                      width="60"
                      height="60"
                    />
                  </div>
                  <div className="flex-grow">
                    <h5 className="font-medium text-zinc-800 mb-1">{service.title}</h5>
                    <span className="text-sm text-zinc-500">Registration Service</span>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold text-green-600">
                      ₹{service.price.toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {order.services.length > 0 && (
            <div className="space-y-3">
              {order.services.map((service, index) => (
                <div key={index} className="flex items-center p-3 bg-purple-50 rounded-lg">
                  <div className="flex-shrink-0 mr-4 flex items-center justify-center w-[60px] h-[60px] bg-white rounded-lg">
                    {iconList[service.title]?.icon ? (
                      <span className="h-8 w-8 text-purple-600">{iconList[service.title]?.icon}</span>
                    ) : (
                      <Image
                        src={iconList[service.title]?.src || "/default-service.svg"}
                        width={40}
                        height={40}
                        alt={service.title}
                        className="object-contain"
                      />
                    )}
                  </div>
                  <div className="flex-grow">
                    <h5 className="font-medium text-zinc-800 mb-1">{service.title}</h5>
                    <span className="text-sm text-zinc-500">Service</span>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold text-purple-600">
                      ₹{service.price.toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto p-6 bg-gradient-to-br from-blue-50 to-blue-300 py-10 text-black min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-zinc-800">
          Your Orders
        </h1>
        <p className="text-zinc-600">
          {filteredAndSearchedOrders.length} {filteredAndSearchedOrders.length === 1 ? 'order' : 'orders'} found
        </p>
      </div>

      <div className="bg-white rounded-xl p-6 mb-6 shadow-lg">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <label htmlFor="order-history" className="block text-sm font-medium text-zinc-700 mb-2">
              Filter by Time Period
            </label>
            <select
              id="order-history"
              className="bg-white text-black border border-zinc-300 rounded-lg p-3 min-w-48 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              value={selectedHistory}
              onChange={handleHistoryChange}
            >
              <option>Past 3 Months</option>
              <option>Past 6 Months</option>
              <option>Past Year</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-zinc-700 mb-2">
              Search Orders
            </label>
            <div className="relative">
              <input
                type="text"
                id="search"
                placeholder="Search by Order ID..."
                className="bg-white text-black border border-zinc-300 rounded-lg p-3 pl-10 min-w-64 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-zinc-600 text-center">Loading your orders...</p>
          </div>
        </div>
      ) : isError ? (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading Orders</h3>
          <p className="text-red-600">{error.message}</p>
        </div>
      ) : filteredAndSearchedOrders.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center shadow-lg">
          <div className="text-zinc-400 text-6xl mb-4">📦</div>
          <h3 className="text-xl font-semibold text-zinc-700 mb-2">No Orders Found</h3>
          <p className="text-zinc-500">
            {searchQuery ? 'No orders match your search criteria.' : 'You haven\'t placed any orders in the selected time period.'}
          </p>
        </div>
      ) : (
        <div className="space-y-0">
          {filteredAndSearchedOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
};

const Invoice = ({ orderId, onBack , responseData}) => {
  const [orderDetails, setOrderDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);

  // const getAuthToken = async () => {
  //   // In client-side component, we can't use the server-side cookies() function
  //   // So we simulate getting the token from cookies or local storage
  //   return document.cookie
  //     .split("; ")
  //     .find((row) => row.startsWith("token="))
  //     ?.split("=")[1]
  // }

  useEffect(() => {
    const fetchOrderDetails = () => {
      try {
        // const response = await axios.get('/api/subscriptions');
        // const orders = response.data.data;
        // const token = await getAuthToken();
        // const response = await axios.get(`${BASE_URL}/apis/subscription-user`, {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        // });
        const orders = responseData.data;
        const order = orders.find((order) => order.id === orderId);
        if (order) {
          setOrderDetails(order);
        } else {
          throw new Error('Order not found');
        }
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsError(true);
        setIsLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  const handlePrint = () => {
    const printContent = document.getElementById('tobeprint').innerHTML;
    const originalContent = document.body.innerHTML;

    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload(); // To ensure that event listeners are restored
  };

  // const handlePrint = () => {
  //   const printContent = document.getElementById('tobeprint').innerHTML;
  //   const originalContent = document.body.innerHTML;

  //   document.body.innerHTML = printContent;
  //   window.print();
  //   document.body.innerHTML = originalContent;
  //   // No need to reload the page
  // };

  const handleDownload = () => {
    const printContent = document.getElementById('tobeprint').outerHTML;
    const originalHTML = document.documentElement.outerHTML;

    const fullDocument = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Invoice ${orderId}</title>
        <style>
          ${Array.from(document.styleSheets)
            .map((styleSheet) => {
              try {
                return Array.from(styleSheet.cssRules)
                  .map((rule) => rule.cssText)
                  .join('\n');
              } catch (e) {
                console.log('Error loading stylesheet:', e);
                return '';
              }
            })
            .join('\n')}
        </style>
      </head>
      <body>
        ${printContent}
      </body>
      </html>
    `;

    const file = new Blob([fullDocument], { type: 'text/html' });
    const element = document.createElement('a');
    element.href = URL.createObjectURL(file);
    element.download = `invoice-${orderId}.html`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element); // Clean up the DOM
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-6 bg-gradient-to-br from-blue-50 to-blue-300 min-h-screen flex justify-center items-center">
        <div className="bg-white rounded-xl p-8 shadow-lg">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-zinc-600 text-center">Loading invoice...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto p-6 bg-gradient-to-br from-blue-50 to-blue-300 min-h-screen">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading Invoice</h3>
          <p className="text-red-600 mb-4">{error.message}</p>
          <button
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
            onClick={onBack}
          >
            Back to Orders
          </button>
        </div>
      </div>
    );
  }

  const {
    createdAt,
    status,
    amountForServices,
    registrationStartup,
    registrationServices,
    services,
  } = orderDetails;

  return (
    <div className="container mx-auto p-6 bg-gradient-to-br from-blue-50 to-blue-300 text-black min-h-screen">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-blue-500 text-white p-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold mb-2">Invoice #{orderId}</h1>
              <p className="text-blue-100">Generated on {new Date(createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</p>
            </div>
            <div className="text-right">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                status === 'success' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {status === 'success' ? '✅ Completed' : '⏳ Pending'}
              </span>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="flex flex-wrap gap-4 mb-6">
            <button
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg transition-colors font-medium flex items-center gap-2"
              onClick={onBack}
            >
              ← Back to Orders
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors font-medium flex items-center gap-2"
              onClick={handlePrint}
            >
              🖨️ Print
            </button>
            <button
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition-colors font-medium flex items-center gap-2"
              onClick={handleDownload}
            >
              📥 Download
            </button>
          </div>

          <div className="border border-zinc-200 rounded-lg p-6" id="tobeprint">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-zinc-800 mb-2">INVOICE</h2>
              <div className="w-24 h-1 bg-blue-500 mx-auto"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-lg font-semibold text-zinc-700 mb-3">Order Information</h3>
                <div className="space-y-2">
                  <p><span className="font-medium">Order ID:</span> {orderId}</p>
                  <p><span className="font-medium">Order Date:</span> {new Date(createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</p>
                  <p><span className="font-medium">Status:</span> 
                    <span className={`ml-2 px-2 py-1 rounded text-sm ${
                      status === 'success' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {status === 'success' ? 'Completed' : 'Pending'}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <h3 className="text-xl font-bold text-zinc-800 mb-6">Order Items</h3>
            <div className="overflow-x-auto mb-8">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-zinc-50 border-b-2 border-zinc-200">
                    <th className="text-left p-4 font-semibold text-zinc-700">Description</th>
                    <th className="text-center p-4 font-semibold text-zinc-700">Quantity</th>
                    <th className="text-right p-4 font-semibold text-zinc-700">Unit Price</th>
                    <th className="text-right p-4 font-semibold text-zinc-700">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {registrationStartup.map((item, index) => (
                    <tr key={index} className="border-b border-zinc-100 hover:bg-zinc-50">
                      <td className="p-4">
                        <div>
                          <div className="font-medium text-zinc-800">{item.title}</div>
                          <div className="text-sm text-zinc-500">Startup Registration</div>
                        </div>
                      </td>
                      <td className="p-4 text-center">1</td>
                      <td className="p-4 text-right font-mono">₹{item.priceWithGst.toFixed(2)}</td>
                      <td className="p-4 text-right font-mono font-semibold">₹{item.priceWithGst.toFixed(2)}</td>
                    </tr>
                  ))}
                  {registrationServices.map((item, index) => (
                    <tr key={index} className="border-b border-zinc-100 hover:bg-zinc-50">
                      <td className="p-4">
                        <div>
                          <div className="font-medium text-zinc-800">{item.title}</div>
                          <div className="text-sm text-zinc-500">Registration Service</div>
                        </div>
                      </td>
                      <td className="p-4 text-center">1</td>
                      <td className="p-4 text-right font-mono">₹{item.price.toFixed(2)}</td>
                      <td className="p-4 text-right font-mono font-semibold">₹{item.price.toFixed(2)}</td>
                    </tr>
                  ))}
                  {services.map((item, index) => (
                    <tr key={index} className="border-b border-zinc-100 hover:bg-zinc-50">
                      <td className="p-4">
                        <div>
                          <div className="font-medium text-zinc-800">{item.title}</div>
                          <div className="text-sm text-zinc-500">Service</div>
                        </div>
                      </td>
                      <td className="p-4 text-center">1</td>
                      <td className="p-4 text-right font-mono">₹{item.price.toFixed(2)}</td>
                      <td className="p-4 text-right font-mono font-semibold">₹{item.price.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="border-t-2 border-zinc-200 pt-6">
              <div className="flex justify-end">
                <div className="w-full max-w-md">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2">
                      <span className="text-zinc-600">Subtotal (excl. GST):</span>
                      <span className="font-mono">₹{((amountForServices * 100) / 118).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-zinc-600">GST (18%):</span>
                      <span className="font-mono">₹{(amountForServices - (amountForServices * 100) / 118).toFixed(2)}</span>
                    </div>
                    <div className="border-t border-zinc-300 pt-3">
                      <div className="flex justify-between items-center">
                        <span className="text-xl font-bold text-zinc-800">Total Amount:</span>
                        <span className="text-2xl font-bold text-blue-600 font-mono">₹{amountForServices.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-zinc-200 text-center text-sm text-zinc-500">
              <p>Thank you for your business!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;