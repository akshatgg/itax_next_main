'use client';
import { useState, useEffect, useMemo } from 'react';
import userbackAxios from '@/lib/userbackAxios';
import Button from '@/components/ui/Button';

// ---------- Utils ----------
const formatDate = (d) =>
  d ? new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }) : '';

const formatCurrency = (amt = 0) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amt);

const getAuthToken = () =>
  document.cookie.split('; ').find((r) => r.startsWith('token='))?.split('=')[1];

// ---------- Small Components ----------
const StatusBadge = ({ status }) => {
  const color =
    status?.toLowerCase() === 'paid'
      ? 'bg-green-100 text-green-800'
      : status?.toLowerCase() === 'pending'
        ? 'bg-yellow-100 text-yellow-800'
        : status?.toLowerCase() === 'overdue'
          ? 'bg-red-100 text-red-800'
          : 'bg-gray-100 text-gray-800';
  return <span className={`px-3 py-1 rounded-full text-sm font-medium ${color}`}>{status || 'Unknown'}</span>;
};

const PaymentMethod = ({ method }) => {
  if (!method) return <span className="text-gray-500">N/A</span>;
  const m = method.toLowerCase();
  const isCash = m === 'cash';
  const isBank = ['bank', 'online', 'upi'].includes(m);

  return (
    <div className="flex items-center font-semibold">
      <span className={`mr-2 ${isCash ? 'text-green-600' : isBank ? 'text-blue-600' : 'text-gray-600'}`}>
        {isCash ? '💵' : isBank ? '🏦' : '💳'}
      </span>
      {method[0].toUpperCase() + method.slice(1)}
    </div>
  );
};

// ---------- Main ----------
export default function InvoiceTable() {
  const [loading, setLoading] = useState(true);
  const [invoices, setInvoices] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const token = getAuthToken();
        if (!token) throw new Error('Authentication token not found');
        const { data } = await userbackAxios.get('/invoice/invoices', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setInvoices(data?.invoices || []);
      } catch (err) {
        console.error('Invoice fetch error:', err);
        setError(err.message || 'Failed to fetch invoices');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // ------- Summary Precompute -------
  const summary = useMemo(() => {
    let total = 0,
      cash = 0,
      bank = 0,
      cashCount = 0,
      bankCount = 0;
    invoices.forEach((inv) => {
      const amt = inv.totalAmount || 0;
      total += amt;
      const m = inv.modeOfPayment?.toLowerCase();
      if (m === 'cash') {
        cash += amt;
        cashCount++;
      } else if (['bank', 'online', 'upi'].includes(m)) {
        bank += amt;
        bankCount++;
      }
    });
    return { total, cash, bank, cashCount, bankCount };
  }, [invoices]);

  // ------- States -------
  if (loading)
    return (
      <div className="flex flex-col justify-center items-center h-64 text-gray-600">
        <div className="w-14 h-14 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        <p className="mt-3">Loading invoices...</p>
      </div>
    );

  if (error && !invoices.length)
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <h3 className="text-red-800 font-semibold text-lg">Error Loading Invoices</h3>
        <p className="text-red-700 mt-2">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-red-100 text-red-800 rounded-md hover:bg-red-200"
        >
          Try Again
        </button>
      </div>
    );

  // ------- UI -------
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border rounded-lg shadow">
        <div className="px-6 py-4 border-b flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold">Invoice List</h2>
            <p className="text-gray-500 text-sm mt-1">Showing {invoices.length} invoices</p>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="secondary">Filter</Button>
            <Button size="sm" variant="primary">Export</Button>
          </div>
        </div>
      </div>

      {/* Invoices */}
      <div className="grid gap-6">
        {invoices.map((inv) => (
          <div key={inv.id} className="bg-white border rounded-lg shadow hover:shadow-md transition">
            <div className="px-6 py-4 border-b flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className={`w-2 h-12 rounded-sm ${inv.status?.toLowerCase() === 'paid'
                  ? 'bg-green-500'
                  : inv.status?.toLowerCase() === 'pending'
                    ? 'bg-yellow-500'
                    : 'bg-red-500'
                  }`}
                />
                <div>
                  <h3 className="text-lg font-medium">{inv.invoiceNumber}</h3>
                  <p className="text-sm text-gray-500 capitalize">{inv.type} Invoice</p>
                </div>
              </div>
              <StatusBadge status={inv.status} />
            </div>

            <div className="p-6 grid md:grid-cols-3 gap-6">
              <Info label="Invoice Date" value={formatDate(inv.invoiceDate)} />
              <Info label="Due Date" value={formatDate(inv.dueDate)} />
              <Info label="Payment Method" value={<PaymentMethod method={inv.modeOfPayment} />} />
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Total Amount</p>
                <p className="text-xl font-bold">{formatCurrency(inv.totalAmount)}</p>
                <p className="text-xs text-gray-500">Includes GST: {formatCurrency(inv.totalGst)}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="secondary" size="sm">View</Button>
                <Button variant="primary" size="sm">Download</Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="bg-white border rounded-lg shadow">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-medium">Payment Summary</h3>
        </div>
        <div className="p-6 grid md:grid-cols-2 gap-6">
          <SummaryCard label="Cash Payments" count={summary.cashCount} amount={summary.cash} icon="💵" color="green" />
          <SummaryCard label="Bank Payments" count={summary.bankCount} amount={summary.bank} icon="🏦" color="blue" />
        </div>
        <div className="px-6 py-4 bg-gray-50 border-t flex justify-between items-center">
          <p className="font-medium text-gray-700">Total Invoices Value</p>
          <p className="text-xl font-bold">{formatCurrency(summary.total)}</p>
        </div>
      </div>
    </div>
  );
}

// ---------- Helpers ----------
const Info = ({ label, value }) => (
  <div>
    <p className="text-sm font-medium text-gray-500">{label}</p>
    <p className="text-base font-semibold">{value}</p>
  </div>
);

const SummaryCard = ({ label, count, amount, icon, color }) => (
  <div className="bg-white p-5 rounded-lg border shadow-sm flex justify-between items-center">
    <div className="flex items-center">
      <span className={`h-12 w-12 flex items-center justify-center rounded-full bg-${color}-100 text-${color}-500 text-xl`}>
        {icon}
      </span>
      <div className="ml-4">
        <p className="font-medium">{label}</p>
        <p className="text-sm text-gray-500">{count} invoices</p>
      </div>
    </div>
    <p className="text-xl font-bold">{formatCurrency(amount)}</p>
  </div>
);
