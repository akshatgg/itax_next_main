'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { iconList } from "../../apiService/staticData";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const TransactionHistory = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);
  const [allTransactions, setAllTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [selectedHistory, setSelectedHistory] = useState('Past 3 Months');
  const [searchQuery, setSearchQuery] = useState('');

  const getAuthToken = async () => {
    return document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1]
  }

  const fetchTransactionData = async () => {
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
        // Filter only successful transactions
        const successfulTransactions = data.data.filter(order => order.status === 'success');
        
        const sortedTransactions = [...successfulTransactions].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        setAllTransactions(sortedTransactions);
        filterTransactions(sortedTransactions, selectedHistory);
      } else {
        setAllTransactions([]);
        console.error('Unexpected API response structure:', data);
      }

      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching transaction data:', error);
      setIsLoading(false);
      setIsError(true);
      setError(error);
    }
  };

  const filterTransactions = (transactions, duration) => {
    const now = new Date();
    const filtered = transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.createdAt);
      switch (duration) {
        case 'Past 3 Months':
          return now - transactionDate <= 3 * 30 * 24 * 60 * 60 * 1000;
        case 'Past 6 Months':
          return now - transactionDate <= 6 * 30 * 24 * 60 * 60 * 1000;
        case 'Past Year':
          return now - transactionDate <= 12 * 30 * 24 * 60 * 60 * 1000;
        default:
          return true;
      }
    });
    setFilteredTransactions(filtered);
  };

  useEffect(() => {
    fetchTransactionData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    filterTransactions(allTransactions, selectedHistory);
  }, [selectedHistory, allTransactions]);

  const handleHistoryChange = (e) => {
    setSelectedHistory(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const searchTransactions = (transactions, query) => {
    if (!query) return transactions;
    return transactions.filter((transaction) =>
      transaction.id.toLowerCase().includes(query.toLowerCase())
    );
  };

  const filteredAndSearchedTransactions = searchTransactions(filteredTransactions, searchQuery);

  const calculateTotalItems = (transaction) => {
    
    return transaction.registrationStartup.length + 
           transaction.registrationServices.length + 
           transaction.services.length;
  };

  const TransactionCard = ({ transaction }) => {
    const totalItems = calculateTotalItems(transaction);
    const subtotal = (transaction.amountForServices);
    const gstAmount = 0;

    return (
      <div className="transaction-card bg-white border border-zinc-200 rounded-xl p-6 mb-6 text-black shadow-lg hover:shadow-xl transition-all duration-300">
        {/* Transaction Header */}
        <div className="border-b border-zinc-100 pb-4 mb-4">
          <div className="flex justify-between items-start mb-3">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="bg-zinc-100 text-zinc-700 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                  ✅ Success
                </span>
                <span className="text-xs text-zinc-400 uppercase tracking-wide font-medium">
                  Transaction ID: {transaction.id}
                </span>
              </div>
              <p className="text-sm font-semibold text-zinc-700">
                {new Date(transaction.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-zinc-800">
                ₹{subtotal.toFixed(2)}
              </p>
              <p className="text-xs text-zinc-500">
                {totalItems} {totalItems === 1 ? 'item' : 'items'}
              </p>
            </div>
          </div>
        </div>

        {/* Payment Breakdown */}
        <div className="bg-zinc-50 rounded-lg p-4 mb-4">
          <h4 className="text-sm font-semibold text-zinc-700 mb-3">Payment Breakdown</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-zinc-600">Subtotal (incl. GST):</span>
              <span className="font-mono">₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-600"></span>
              <span className="font-mono">₹{gstAmount.toFixed(2)}</span>
            </div>
            <div className="border-t border-zinc-200 pt-2 flex justify-between font-semibold">
              <span>Total Paid:</span>
              <span className="font-mono text-zinc-800">₹{subtotal.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Transaction Items */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-zinc-700 mb-3">Transaction Items</h4>
          
          {transaction.registrationStartup?.length > 0 && (
            <div className="space-y-3">
              {transaction.registrationStartup.map((startup, index) => (
                <div key={index} className="flex items-center p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="flex-shrink-0 mr-4">
                    <Image
                      src={startup.image}
                      alt={startup.title}
                      className="rounded-lg object-cover"
                      width="50"
                      height="50"
                    />
                  </div>
                  <div className="flex-grow">
                    <h5 className="font-medium text-zinc-800 mb-1">{startup.title}</h5>
                    <span className="text-xs text-slate-600 font-medium">Startup Registration</span>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold text-zinc-800">
                      ₹{startup.priceWithGst.toFixed(2)}
                    </span>
                    <p className="text-xs text-zinc-500">incl. GST</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {transaction.registrationServices?.length > 0 && (
            <div className="space-y-3">
              {transaction.registrationServices.map((service, index) => (
                <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex-shrink-0 mr-4">
                    <Image
                      src={service.image}
                      alt={service.title}
                      className="rounded-lg object-cover"
                      width="50"
                      height="50"
                    />
                  </div>
                  <div className="flex-grow">
                    <h5 className="font-medium text-zinc-800 mb-1">{service.title}</h5>
                    <span className="text-xs text-gray-600 font-medium">Registration Service</span>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold text-zinc-800">
                      ₹{service.price.toFixed(2)}
                    </span>
                    <p className="text-xs text-zinc-500">incl. GST</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {transaction.services?.length > 0 && (
            <div className="space-y-3">
              {transaction.services.map((service, index) => (
                <div key={index} className="flex items-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex-shrink-0 mr-4 flex items-center justify-center w-[50px] h-[50px] bg-white rounded-lg">
                    {iconList[service.title]?.icon ? (
                      <span className="h-6 w-6 text-blue-600">{iconList[service.title]?.icon}</span>
                    ) : (
                      <Image
                        src={iconList[service.title]?.src || "/default-service.svg"}
                        width={30}
                        height={30}
                        alt={service.title}
                        className="object-contain"
                      />
                    )}
                  </div>
                  <div className="flex-grow">
                    <h5 className="font-medium text-zinc-800 mb-1">{service.title}</h5>
                    <span className="text-xs text-blue-600 font-medium">Service</span>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold text-blue-600">
                      ₹{service.price.toFixed(2)}
                    </span>
                    <p className="text-xs text-zinc-500">incl. GST</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Transaction Footer */}
        <div className="mt-4 pt-4 border-t border-zinc-100">
          <div className="flex justify-between items-center text-sm text-zinc-500">
            <span>Payment Method: Online Payment</span>
            <span>Status: Completed</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto p-6 bg-gradient-to-br from-slate-50 to-blue-100 py-10 text-black min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-zinc-800 flex items-center gap-3">
          💳 Transaction History
        </h1>
        <p className="text-zinc-600">
          {filteredAndSearchedTransactions.length} successful {filteredAndSearchedTransactions.length === 1 ? 'transaction' : 'transactions'} found
        </p>
        {allTransactions.length > 0 && (
          <div className="mt-2 p-3 bg-slate-100 rounded-lg">
            <p className="text-sm text-zinc-700">
              💰 Total amount transacted: <span className="font-bold">₹{allTransactions.reduce((sum, t) => sum + (t.amountForServices), 0).toFixed(2)}</span>
            </p>
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl p-6 mb-6 shadow-lg">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <label htmlFor="transaction-history" className="block text-sm font-medium text-zinc-700 mb-2">
              Filter by Time Period
            </label>
            <select
              id="transaction-history"
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
              Search Transactions
            </label>
            <div className="relative">
              <input
                type="text"
                id="search"
                placeholder="Search by Transaction ID..."
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
            <p className="text-zinc-600 text-center">Loading your transactions...</p>
          </div>
        </div>
      ) : isError ? (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading Transactions</h3>
          <p className="text-red-600">{error.message}</p>
        </div>
      ) : filteredAndSearchedTransactions.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center shadow-lg">
          <div className="text-zinc-400 text-6xl mb-4">💳</div>
          <h3 className="text-xl font-semibold text-zinc-700 mb-2">No Transactions Found</h3>
          <p className="text-zinc-500">
            {searchQuery ? 'No transactions match your search criteria.' : 'You haven\'t completed any transactions in the selected time period.'}
          </p>
        </div>
      ) : (
        <div className="space-y-0">
          {filteredAndSearchedTransactions.map((transaction) => (
            <TransactionCard key={transaction.id} transaction={transaction} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TransactionHistory;