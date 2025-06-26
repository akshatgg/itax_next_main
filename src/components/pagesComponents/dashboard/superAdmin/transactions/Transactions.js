'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { iconList } from '@/components/pagesComponents/apiService/staticData';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const SuperAdminTransactionHistory = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);
  const [allTransactions, setAllTransactions] = useState([]);
  const [groupedTransactions, setGroupedTransactions] = useState({});
  const [selectedHistory, setSelectedHistory] = useState('Past 3 Months');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All Status');

  const getAuthToken = async () => {
    return document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1]
  }

  const fetchAllTransactions = async () => {
    try {
      setIsLoading(true);
      setIsError(false);

      const token = await getAuthToken();
      if (!token) throw new Error("Authentication token not found");

      const response = await axios.get(`${BASE_URL}/apis/get-all-subscriptions`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { data } = response;
      console.log('API Response:', data);

      if (data && data.success && Array.isArray(data.subscriptions)) {
        const allTransactions = data.subscriptions;
        
        const sortedTransactions = [...allTransactions].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        setAllTransactions(sortedTransactions);
        
        // Apply filters and grouping
        filterAndGroupTransactions(sortedTransactions, selectedHistory, selectedStatus);
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

  const filterAndGroupTransactions = (transactions, duration, status) => {
    const now = new Date();
    
    // First filter by time duration
    const filteredTransactions = transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.createdAt);
      
      let timeMatch = true;
      switch (duration) {
        case 'Past 3 Months':
          timeMatch = now - transactionDate <= 3 * 30 * 24 * 60 * 60 * 1000;
          break;
        case 'Past 6 Months':
          timeMatch = now - transactionDate <= 6 * 30 * 24 * 60 * 60 * 1000;
          break;
        case 'Past Year':
          timeMatch = now - transactionDate <= 12 * 30 * 24 * 60 * 60 * 1000;
          break;
        default:
          timeMatch = true;
      }
      
      return timeMatch;
    });

    // Group by user and status
    const grouped = {};
    
    filteredTransactions.forEach((transaction) => {
      const userKey = transaction.userId || 'unknown';
      const userInfo = {
        firstName: transaction.user?.firstName || 'Unknown',
        lastName: transaction.user?.lastName || '',
        email: transaction.user?.email || 'No email',
        phone: transaction.user?.phone || 'No phone'
      };

      if (!grouped[userKey]) {
        grouped[userKey] = {
          userInfo,
          pending: [],
          success: []
        };
      }

      // Add transaction to appropriate status array
      if (transaction.status === 'pending') {
        grouped[userKey].pending.push(transaction);
      } else if (transaction.status === 'success') {
        grouped[userKey].success.push(transaction);
      }
    });

    // Filter by status if needed
    if (status !== 'All Status') {
      Object.keys(grouped).forEach(userKey => {
        if (status.toLowerCase() === 'pending') {
          grouped[userKey].success = [];
        } else if (status.toLowerCase() === 'success') {
          grouped[userKey].pending = [];
        }
        
        // Remove users with no transactions after status filter
        if (grouped[userKey].pending.length === 0 && grouped[userKey].success.length === 0) {
          delete grouped[userKey];
        }
      });
    }

    setGroupedTransactions(grouped);
  };

  useEffect(() => {
    fetchAllTransactions();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    filterAndGroupTransactions(allTransactions, selectedHistory, selectedStatus);
  }, [selectedHistory, selectedStatus, allTransactions]);

  const handleHistoryChange = (e) => {
    setSelectedHistory(e.target.value);
  };

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter grouped transactions by search query
  const searchFilteredGroups = () => {
    if (!searchQuery) return groupedTransactions;
    
    const filtered = {};
    Object.entries(groupedTransactions).forEach(([userKey, userData]) => {
      const { userInfo } = userData;
      const searchLower = searchQuery.toLowerCase();
      
      if (
        userInfo.firstName.toLowerCase().includes(searchLower) ||
        userInfo.lastName.toLowerCase().includes(searchLower) ||
        userInfo.email.toLowerCase().includes(searchLower) ||
        userKey.toLowerCase().includes(searchLower)
      ) {
        filtered[userKey] = userData;
      }
    });
    
    return filtered;
  };

  const filteredGroups = searchFilteredGroups();

  // Calculate totals
  const calculateGroupTotals = (transactions) => {
    return {
      count: transactions.length,
      total: transactions.reduce((sum, t) => sum + ((t.amountForServices)), 0),
      items: transactions.reduce((sum, t) => sum + (t.services?.length || 0), 0)
    };
  };

  const StatusCard = ({ transactions, status, userInfo }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const totals = calculateGroupTotals(transactions);
    
    if (transactions.length === 0) return null;

    const statusConfig = {
      pending: {
        bgColor: 'bg-amber-50',
        borderColor: 'border-amber-200',
        textColor: 'text-amber-700',
        iconColor: 'text-amber-600',
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      },
      success: {
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200',
        textColor: 'text-green-700',
        iconColor: 'text-green-600',
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      }
    };

    const config = statusConfig[status];

    return (
      <div className={`${config.bgColor} border ${config.borderColor} rounded-xl mb-4 overflow-hidden`}>
        {/* Header */}
        <div 
          className="p-4 cursor-pointer hover:bg-opacity-80 transition-colors"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className={`flex items-center justify-center w-10 h-10 bg-white rounded-lg ${config.iconColor}`}>
                {config.icon}
              </div>
              <div>
                <h4 className={`font-semibold ${config.textColor} capitalize`}>
                  {status} Transactions
                </h4>
                <p className="text-sm text-gray-600">
                  {totals.count} {totals.count === 1 ? 'transaction' : 'transactions'} • {totals.items} {totals.items === 1 ? 'item' : 'items'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className={`text-xl font-bold ${config.textColor}`}>
                  ₹{totals.total.toFixed(2)}
                </p>
                <p className="text-sm text-gray-500">Total Amount</p>
              </div>
              <svg 
                className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Expanded Details */}
        {isExpanded && (
          <div className="border-t border-gray-200 bg-white">
            <div className="p-4 space-y-4">
              {transactions.map((transaction) => (
                <TransactionDetails key={transaction.id} transaction={transaction} />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

const TransactionDetails = ({ transaction }) => {
  const subtotal = (transaction.amountForServices) ;
  const gstAmount = 0;

  return (
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
      <div className="flex justify-between items-start mb-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs text-gray-500 font-mono">
              #{transaction.id.slice(-8).toUpperCase()}
            </span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              transaction.status === 'success' 
                ? 'bg-green-100 text-green-700' 
                : 'bg-amber-100 text-amber-700'
            }`}>
              {transaction.status === 'success' ? 'Completed' : 'Pending'}
            </span>
          </div>
          <p className="text-sm text-gray-600">
            {new Date(transaction.createdAt).toLocaleDateString('en-IN', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-gray-800">
            ₹{((transaction.amountForServices)).toFixed(2)}
          </p>
          <p className="text-xs text-gray-500">incl. GST</p>
        </div>
      </div>

      {/* API Services */}
      {transaction.services?.length > 0 && (
        <div className="space-y-2 mb-4">
          <h6 className="text-xs font-semibold text-blue-700 uppercase tracking-wide flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
            API Services
          </h6>
          <div className="grid gap-2">
            {transaction.services.map((service, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-white rounded-md border border-blue-100">
                <div className="flex items-center space-x-2">
                  <div className="flex items-center justify-center w-8 h-8 bg-blue-50 rounded-md">
                    {iconList[service.title]?.icon ? (
                      <span className="h-4 w-4 text-blue-600">{iconList[service.title]?.icon}</span>
                    ) : (
                      <Image
                        src={iconList[service.title]?.src || "/default-service.svg"}
                        width={16}
                        height={16}
                        alt={service.title}
                        className="object-contain"
                      />
                    )}
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-700">{service.title}</span>
                    <p className="text-xs text-gray-500">{service.category}</p>
                  </div>
                </div>
                <span className="text-sm font-semibold text-gray-800">
                  ₹{service.price?.toFixed(2) || '0.00'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Registration/Startup Services */}
      {transaction.registrationStartup?.length > 0 && (
        <div className="space-y-2 mb-4">
          <h6 className="text-xs font-semibold text-green-700 uppercase tracking-wide flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            Registration & Startup Services
          </h6>
          <div className="grid gap-2">
            {transaction.registrationStartup.map((startup, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-white rounded-md border border-green-100">
                <div className="flex items-center space-x-2">
                  <div className="flex items-center justify-center w-8 h-8 bg-green-50 rounded-md">
                    <Image
                      src={startup.image || "/default-startup.svg"}
                      width={16}
                      height={16}
                      alt={startup.title}
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-700">{startup.title}</span>
                    <p className="text-xs text-gray-500 capitalize">{startup.categories}</p>
                  </div>
                </div>
                <span className="text-sm font-semibold text-gray-800">
                  ₹{startup.priceWithGst?.toFixed(2) || '0.00'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Registration Services (if any) */}
      {transaction.registrationServices?.length > 0 && (
        <div className="space-y-2 mb-4">
          <h6 className="text-xs font-semibold text-purple-700 uppercase tracking-wide flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Registration Services
          </h6>
          <div className="grid gap-2">
            {transaction.registrationServices.map((regService, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-white rounded-md border border-purple-100">
                <div className="flex items-center space-x-2">
                  <div className="flex items-center justify-center w-8 h-8 bg-purple-50 rounded-md">
                    <span className="text-purple-600 text-xs font-bold">RS</span>
                  </div>
                  <span className="text-sm font-medium text-gray-700">{regService.title}</span>
                </div>
                <span className="text-sm font-semibold text-gray-800">
                  ₹{regService.price?.toFixed(2) || '0.00'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Show message if no services */}
      {(!transaction.services || transaction.services.length === 0) && 
       (!transaction.registrationStartup || transaction.registrationStartup.length === 0) && 
       (!transaction.registrationServices || transaction.registrationServices.length === 0) && (
        <div className="text-center py-4 text-gray-500">
          <p className="text-sm">No services found for this transaction</p>
        </div>
      )}

      {/* Payment Breakdown */}
      <div className="mt-3 pt-3 border-t border-gray-200">
        <div className="text-xs space-y-1 text-gray-600 ">
          <div className="flex justify-between">
            <span>Subtotal (incl. GST):</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>GST (18%):</span>
            <span>₹{gstAmount.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};


  const UserCard = ({ userKey, userData }) => {
    const { userInfo, pending, success } = userData;
    const totalTransactions = pending.length + success.length;
    const totalSuccessAmount = success.reduce((sum, t) => sum + ((t.amountForServices)), 0);

    return (
      <div className="bg-white border border-slate-200 rounded-2xl mb-6 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
        {/* User Header */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-400 text-white p-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold mb-2">
                {userInfo.firstName} {userInfo.lastName}
              </h3>
              <div className="space-y-1 text-blue-100">
                <p className="text-sm flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                  {userInfo.email}
                </p>
                <p className="text-sm flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {userInfo.phone}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="bg-white bg-opacity-20 text-white px-3 py-1 rounded-full text-sm font-medium mb-2">
                User ID: {userKey}
              </div>
              <div className="text-right">
                <p className="text-lg font-bold">₹{totalSuccessAmount.toFixed(2)}</p>
                <p className="text-sm text-blue-100">{totalTransactions} transactions</p>
                <p className="text-xs text-blue-200">Completed payments only</p>
              </div>
            </div>
          </div>
        </div>

        {/* Status Cards */}
        <div className="p-6 space-y-4">
          <StatusCard transactions={success} status="success" userInfo={userInfo} />
          <StatusCard transactions={pending} status="pending" userInfo={userInfo} />
        </div>
      </div>
    );
  };

  // Get unique statuses from all transactions for dynamic filter options
  const uniqueStatuses = [...new Set(allTransactions.map(t => t.status))];

  // Calculate summary stats
  const summaryStats = {
    totalTransactions: allTransactions.length,
    totalRevenue: allTransactions.filter(t => t.status === 'success').reduce((sum, t) => sum + ((t.amountForServices)), 0),
    completedCount: allTransactions.filter(t => t.status === 'success').length,
    pendingCount: allTransactions.filter(t => t.status === 'pending').length,
    totalUsers: Object.keys(filteredGroups).length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-6 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-500 rounded-xl">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-blue-800">
                User Transaction Management
              </h1>
              <p className="text-blue-600">Super Admin Dashboard - Grouped by Users</p>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600 mb-1">
                  {summaryStats.totalUsers}
                </div>
                <div className="text-sm text-slate-600">
                  Total Users
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-800 mb-1">
                  {summaryStats.totalTransactions}
                </div>
                <div className="text-sm text-slate-600">
                  Total Transactions
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 mb-1">
                  ₹{summaryStats.totalRevenue.toFixed(2)}
                </div>
                <div className="text-sm text-slate-600">
                  Total Revenue
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 mb-1">
                  {summaryStats.completedCount}
                </div>
                <div className="text-sm text-slate-600">
                  Completed
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-600 mb-1">
                  {summaryStats.pendingCount}
                </div>
                <div className="text-sm text-slate-600">
                  Pending
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Controls Section */}
        <div className="bg-white rounded-2xl p-6 mb-8 shadow-sm border border-slate-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label htmlFor="transaction-history" className="block text-sm font-semibold text-slate-700 mb-3">
                Filter by Time Period
              </label>
              <select
                id="transaction-history"
                className="w-full bg-white text-slate-800 border border-slate-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                value={selectedHistory}
                onChange={handleHistoryChange}
              >
                <option>Past 3 Months</option>
                <option>Past 6 Months</option>
                <option>Past Year</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="status-filter" className="block text-sm font-semibold text-slate-700 mb-3">
                Filter by Status
              </label>
              <select
                id="status-filter"
                className="w-full bg-white text-slate-800 border border-slate-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                value={selectedStatus}
                onChange={handleStatusChange}
              >
                <option>All Status</option>
                {uniqueStatuses.map(status => (
                  <option key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="search" className="block text-sm font-semibold text-slate-700 mb-3">
                Search Users
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="search"
                  placeholder="Search by name, email, or user ID..."
                  className="w-full bg-white text-slate-800 border border-slate-300 rounded-xl p-3 pl-12 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        {isLoading ? (
          <div className="flex justify-center items-center py-16">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-slate-600 text-center">Loading transactions...</p>
            </div>
          </div>
        ) : isError ? (
          <div className="bg-white border border-red-200 rounded-2xl p-8 text-center shadow-sm">
            <div className="text-red-500 text-5xl mb-4">⚠️</div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">Error Loading Transactions</h3>
            <p className="text-slate-600">{error.message}</p>
          </div>
        ) : Object.keys(filteredGroups).length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-slate-200">
            <div className="text-slate-400 text-6xl mb-4">👥</div>
            <h3 className="text-xl font-semibold text-slate-700 mb-2">No Users Found</h3>
            <p className="text-slate-500">
              {searchQuery ? 'No users match your search criteria.' : 'No users found with the selected filters.'}
            </p>
          </div>
        ) : (
          <div className="space-y-0">
            {Object.entries(filteredGroups).map(([userKey, userData]) => (
              <UserCard key={userKey} userKey={userKey} userData={userData} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SuperAdminTransactionHistory;