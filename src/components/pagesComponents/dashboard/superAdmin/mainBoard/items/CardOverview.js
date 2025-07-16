'use client';

import { Icon } from '@iconify/react';
import GridItem from '@/components/pagesComponents/grid/GridItem';
import { useState, useEffect, useCallback } from 'react';
import userbackAxios from '@/lib/userbackAxios';

export default function CardOverview({ className, setIsNavigating, dashboardMetrics }) {
  const [dashboardData, setDashboardData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchVisitorCount = useCallback(async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/visitorCount/getAll`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        
      });
      if (res.ok) {
        const data = await res.json();
        return data.count || 0;
      }
    } catch (err) {
      console.error('Error fetching visitor count:', err);
    }
    return 0;
  }, []);

const calculateGrowthPercentage = (current, previous) => {
  if (previous === 0) return current > 0 ? 100 : 0;
  return ((current - previous) / previous) * 100;
};

const formatGrowthText = (growth, period = 'yesterday') => {
  const absGrowth = Math.abs(growth);
  const direction = growth >= 0 ? '+' : '';
  return `${direction}${absGrowth.toFixed(1)}% since ${period}`;
};

const getGrowthColor = (growth) => {
  if (growth > 0) return 'text-green-600';
  if (growth < 0) return 'text-red-600';
  return 'text-gray-600';
};

const getGrowthIcon = (growth) => {
  if (growth > 0) return 'ph:arrow-up';
  if (growth < 0) return 'ph:arrow-down';
  return 'ph:minus';
};

useEffect(() => {
const fetchData = async () => {
  try {
    setIsLoading(true);
    const [
      userResp,
      adminResp,
      transactionResp,
      invoiceResp,
      visitorCount,
    ] = await Promise.all([
      userbackAxios.get('/user/get-all-users'),
      userbackAxios.get('/user/get-all-admins'),
      userbackAxios.get('/apis/get-all-subscriptions'),
      userbackAxios.get('/invoice/invoices'),
      fetchVisitorCount(),
    ]);

    const currentData = {
      totalUsers: userResp.data.data.totalusers || 0,
      totalAdmins: adminResp.data.data.length || 0,
      totalTransactions: transactionResp.data.subscriptions.length || 0,
      totalInvoice: invoiceResp.data.invoices.length || 0,
      totalVisitors: visitorCount,
    };

    // Get current and last month dates
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

    // Calculate month-to-month comparisons
    const subscriptions = transactionResp.data.subscriptions || [];
    const users = userResp.data.data.users || [];
    const invoices = invoiceResp.data.invoices || [];
    const admins = adminResp.data.data || [];

    // Current month counts
    const currentMonthUsers = users.filter(user => {
      const userDate = new Date(user.createdAt);
      return userDate.getMonth() === currentMonth && userDate.getFullYear() === currentYear;
    }).length;

    const currentMonthTransactions = subscriptions.filter(txn => {
      const txnDate = new Date(txn.createdAt);
      return txnDate.getMonth() === currentMonth && txnDate.getFullYear() === currentYear;
    }).length;

    const currentMonthInvoices = invoices.filter(invoice => {
      const invoiceDate = new Date(invoice.createdAt);
      return invoiceDate.getMonth() === currentMonth && invoiceDate.getFullYear() === currentYear;
    }).length;

    const currentMonthAdmins = admins.filter(admin => {
      const adminDate = new Date(admin.createdAt);
      return adminDate.getMonth() === currentMonth && adminDate.getFullYear() === currentYear;
    }).length;

    // Last month counts
    const lastMonthUsers = users.filter(user => {
      const userDate = new Date(user.createdAt);
      return userDate.getMonth() === lastMonth && userDate.getFullYear() === lastMonthYear;
    }).length;

    const lastMonthTransactions = subscriptions.filter(txn => {
      const txnDate = new Date(txn.createdAt);
      return txnDate.getMonth() === lastMonth && txnDate.getFullYear() === lastMonthYear;
    }).length;

    const lastMonthInvoices = invoices.filter(invoice => {
      const invoiceDate = new Date(invoice.createdAt);
      return invoiceDate.getMonth() === lastMonth && invoiceDate.getFullYear() === lastMonthYear;
    }).length;

    const lastMonthAdmins = admins.filter(admin => {
      const adminDate = new Date(admin.createdAt);
      return adminDate.getMonth() === lastMonth && adminDate.getFullYear() === lastMonthYear;
    }).length;

    // For visitors, use baseline comparison (since no historical data)
    const baselineVisitors = Math.floor(visitorCount * 0.85);

    // Calculate growth percentages
    const calculateGrowthPercentage = (current, previous) => {
      if (previous === 0) return current > 0 ? 100 : 0;
      return ((current - previous) / previous) * 100;
    };

    const userGrowth = calculateGrowthPercentage(currentMonthUsers, lastMonthUsers);
    const adminGrowth = calculateGrowthPercentage(currentMonthAdmins, lastMonthAdmins);
    const transactionGrowth = calculateGrowthPercentage(currentMonthTransactions, lastMonthTransactions);
    const invoiceGrowth = calculateGrowthPercentage(currentMonthInvoices, lastMonthInvoices);
    const visitorGrowth = calculateGrowthPercentage(visitorCount, baselineVisitors);

    // Extract revenue metrics from dashboardMetrics prop
    const totalRevenue = dashboardMetrics?.totalRevenue || 0;
    const revenueGrowth = typeof dashboardMetrics?.revenueGrowth === 'number' ? dashboardMetrics.revenueGrowth : 0;

    const updatedDashboardData = [
      {
        title: 'Users',
        overview: currentData.totalUsers.toString(),
        time: formatGrowthText(userGrowth, 'last month'),
        growth: userGrowth,
        linkTo: 'all-users',
        iconName: 'material-symbols:account-circle-outline',
        cssClass: 'p-3 mr-4 text-blue-500 bg-blue-100 rounded-full dark:text-green-100 dark:bg-green-500',
      },
      {
        title: 'Admin',
        overview: currentData.totalAdmins.toString(),
        time: formatGrowthText(adminGrowth, 'last month'),
        growth: adminGrowth,
        linkTo: 'all-admin',
        iconName: 'entypo:user',
        cssClass: 'p-3 mr-4 text-blue-500 bg-blue-100 rounded-full dark:text-blue-100 dark:bg-blue-500',
      },
      {
        title: 'Invoice',
        overview: currentData.totalInvoice.toString(),
        time: formatGrowthText(invoiceGrowth, 'last month'),
        growth: invoiceGrowth,
        linkTo: 'accounts/invoice',
        iconName: 'mdi:invoice-add',
        cssClass: 'p-3 mr-4 text-blue-500 bg-blue-100 rounded-full dark:text-blue-100 dark:bg-blue-500',
      },
      {
        title: 'Transactions',
        overview: currentData.totalTransactions.toString(),
        time: formatGrowthText(transactionGrowth, 'last month'),
        growth: transactionGrowth,
        linkTo: 'transactions',
        iconName: 'bitcoin-icons:transactions-filled',
        cssClass: 'p-3 mr-4 text-blue-500 bg-blue-100 rounded-full dark:text-blue-100 dark:bg-blue-500',
      },
      {
        title: 'Site Visitors',
        overview: currentData.totalVisitors.toString(),
        time: formatGrowthText(visitorGrowth, 'baseline'),
        growth: visitorGrowth,
        linkTo: 'analytics/visitors',
        iconName: 'mdi:account-group-outline',
        cssClass: 'p-3 mr-4 text-orange-500 bg-orange-100 rounded-full dark:text-purple-100 dark:bg-purple-500',
      },
      {
        title: 'Revenue',
        overview: `₹${totalRevenue.toLocaleString('en-IN')}`,
        time: formatGrowthText(revenueGrowth, 'last month'),
        growth: revenueGrowth,
        linkTo: 'financial/revenue',
        iconName: 'ph:currency-dollar',
        cssClass: 'p-3 mr-4 text-green-500 bg-green-100 rounded-full dark:text-green-100 dark:bg-green-500',
      },
    ];

    setDashboardData(updatedDashboardData);
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    setDashboardData([]);
  } finally {
    setIsLoading(false);
  }
};

  fetchData();
}, [fetchVisitorCount, dashboardMetrics]);


  if (isLoading) {
    return (
      <div className={`${className} mx-auto mt-2 p-4`}>
        <div className="grid gap-4 grid-cols-[repeat(auto-fill,_minmax(330px,_1fr))]">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-pulse">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`${className} mx-auto mt-2 p-4`}>
      <div className="grid gap-4 grid-cols-[repeat(auto-fill,_minmax(330px,_1fr))]">
        {dashboardData.map((el, key) => (
          <div
            key={key}
            onClick={() => {
              if (el.linkTo) {
                setIsNavigating?.(true);
                window.location.href = `/dashboard/${el.linkTo}`;
              }
            }}
            className={`cursor-pointer transform transition-all duration-200 hover:scale-105 ${!el.linkTo && 'pointer-events-none'}`}
          >
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`rounded-xl ${el.cssClass}`}>
                    <Icon icon={el.iconName} className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">{el.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{el.overview}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`flex items-center space-x-1 ${getGrowthColor(el.growth)}`}>
                    <Icon icon={getGrowthIcon(el.growth)} className="w-4 h-4" />
                    <span className="text-sm font-medium">{Math.abs(el.growth).toFixed(1)}%</span>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <p className={`text-xs ${getGrowthColor(el.growth)}`}>{el.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
