'use client';
import { useState, useEffect } from 'react';
import userbackAxios from '@/lib/userbackAxios';
import Button from '@/components/ui/Button';

// Utility function to format date strings
const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

// Utility function to format currency
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
  }).format(amount);
};

// Payment status badge component
const StatusBadge = ({ status }) => {
  const getStatusColor = () => {
    switch (status?.toLowerCase()) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor()}`}
    >
      {status || 'Unknown'}
    </span>
  );
};

// Payment method icon component
const PaymentMethodIcon = ({ method }) => {
  if (!method) return null;

  const methodLower = method.toLowerCase();

  if (methodLower === 'cash') {
    return (
      <div className="flex items-center">
        <span className="mr-2 text-green-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="2" y="6" width="20" height="12" rx="2" />
            <circle cx="12" cy="12" r="2" />
            <path d="M6 12h.01M18 12h.01" />
          </svg>
        </span>
        Cash
      </div>
    );
  }

  if (
    methodLower === 'bank' ||
    methodLower === 'online' ||
    methodLower === 'upi'
  ) {
    return (
      <div className="flex items-center">
        <span className="mr-2 text-blue-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
            <line x1="1" y1="10" x2="23" y2="10" />
          </svg>
        </span>
        {method.charAt(0).toUpperCase() + method.slice(1)}
      </div>
    );
  }

  return <span>{method.charAt(0).toUpperCase() + method.slice(1)}</span>;
};

// Get auth token from cookies
const getAuthToken = async () => {
  // In client-side component, we can't use the server-side cookies() function
  // So we simulate getting the token from cookies or local storage
  return document.cookie
    .split('; ')
    .find((row) => row.startsWith('token='))
    ?.split('=')[1];
};

export default function InvoiceTable() {
  const [loading, setLoading] = useState(true);
  const [invoices, setInvoices] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
  const fetchInvoices = async () => {
    try {
      setLoading(true);
      const token = await getAuthToken();
      if (!token) {
        throw new Error('Authentication token not found');
      }

      const response = await userbackAxios.get('/invoice/invoices', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      // Extract invoices from response.data
      const allInvoices = response.data?.invoices || [];

      setInvoices(allInvoices);
      setError(null);
    } catch (err) {
      console.error(
        'Invoice fetch error:',
        err?.response?.status,
        err?.response?.data || err.message
      );
      setError(err.message || 'Failed to fetch invoices');

      // Optional: fallback mock data (for dev/testing)
      setInvoices([]);
    } finally {
      setLoading(false);
    }
  };

  fetchInvoices();
}, []);


  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading invoice data...</p>
        </div>
      </div>
    );
  }

  if (error && invoices.length === 0) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <h3 className="text-red-800 font-medium text-lg">
          Error Loading Invoices
        </h3>
        <p className="text-red-700 mt-2">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-red-100 text-red-800 rounded-md hover:bg-red-200"
        >
          Try Again
        </button>
      </div>
    );
  }

  // Function to get payment method color
  const getPaymentMethodColor = (method) => {
    if (!method) return 'text-gray-500';

    const methodLower = method.toLowerCase();
    if (methodLower === 'cash') return 'text-green-600';
    if (
      methodLower === 'bank' ||
      methodLower === 'online' ||
      methodLower === 'upi'
    )
      return 'text-blue-600';
    return 'text-gray-700';
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Invoice List
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Showing {invoices.length} invoices
            </p>
          </div>
          <div className="flex space-x-2">
            {/* <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors">
              Filter
            </button> */}
            <Button size={'sm'} className={'m-2'} variant="secondary">
              Filter
            </Button>
            {/* <button className="px-4 py-2 bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100 transition-colors">
              Export
            </button> */}
            <Button size={'sm'} className={'m-2'} variant="primary">
              Export
            </Button>
          </div>
        </div>
      </div>

      {/* Individual Invoice Cards */}
      <div className="grid grid-cols-1 gap-6">
        {invoices.map((invoice) => (
          <div
            key={invoice.id}
            className="bg-white border border-gray-200 rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div
                  className={`w-2 h-12 rounded-sm ${invoice.status?.toLowerCase() === 'paid' ? 'bg-green-500' : invoice.status?.toLowerCase() === 'pending' ? 'bg-yellow-500' : 'bg-red-500'}`}
                ></div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {invoice.invoiceNumber}
                  </h3>
                  <p className="text-sm text-gray-500 capitalize">
                    {invoice.type} Invoice
                  </p>
                </div>
              </div>
              <StatusBadge status={invoice.status} />
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-500">
                  Invoice Date
                </p>
                <p className="text-base font-semibold">
                  {formatDate(invoice.invoiceDate)}
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-500">Due Date</p>
                <p className="text-base font-semibold">
                  {formatDate(invoice.dueDate)}
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-500">
                  Payment Method
                </p>
                <div
                  className={`text-base font-semibold ${getPaymentMethodColor(invoice.modeOfPayment)}`}
                >
                  <PaymentMethodIcon method={invoice.modeOfPayment} />
                </div>
              </div>
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Total Amount</p>
                <p className="text-xl font-bold text-gray-900">
                  {formatCurrency(invoice.totalAmount)}
                </p>
                <p className="text-xs text-gray-500">
                  Includes GST: {formatCurrency(invoice.totalGst)}
                </p>
              </div>

              <div className="flex space-x-2">
                <button className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                  View Details
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                  Download
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary section - Payment methods */}
      <div className="bg-white border border-gray-200 rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-800">Payment Summary</h3>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <span className="flex-shrink-0 h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="6" width="20" height="12" rx="2" />
                    <circle cx="12" cy="12" r="2" />
                    <path d="M6 12h.01M18 12h.01" />
                  </svg>
                </span>
                <div className="ml-4">
                  <p className="text-base font-medium text-gray-900">
                    Cash Payments
                  </p>
                  <p className="text-sm text-gray-500">
                    {
                      invoices.filter(
                        (inv) => inv.modeOfPayment?.toLowerCase() === 'cash',
                      ).length
                    }{' '}
                    invoices
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-gray-900">
                  {formatCurrency(
                    invoices
                      .filter(
                        (inv) => inv.modeOfPayment?.toLowerCase() === 'cash',
                      )
                      .reduce((sum, inv) => sum + (inv.totalAmount || 0), 0),
                  )}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <span className="flex-shrink-0 h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                    <line x1="1" y1="10" x2="23" y2="10" />
                  </svg>
                </span>
                <div className="ml-4">
                  <p className="text-base font-medium text-gray-900">
                    Bank Payments
                  </p>
                  <p className="text-sm text-gray-500">
                    {
                      invoices.filter((inv) =>
                        ['bank', 'online', 'upi'].includes(
                          inv.modeOfPayment?.toLowerCase(),
                        ),
                      ).length
                    }{' '}
                    invoices
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-gray-900">
                  {formatCurrency(
                    invoices
                      .filter((inv) =>
                        ['bank', 'online', 'upi'].includes(
                          inv.modeOfPayment?.toLowerCase(),
                        ),
                      )
                      .reduce((sum, inv) => sum + (inv.totalAmount || 0), 0),
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <p className="text-base font-medium text-gray-700">
              Total Invoices Value
            </p>
            <p className="text-xl font-bold text-gray-900">
              {formatCurrency(
                invoices.reduce((sum, inv) => sum + (inv.totalAmount || 0), 0),
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
