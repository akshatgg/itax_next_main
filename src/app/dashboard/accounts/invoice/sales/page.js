'use client';

import React, { useEffect, useState, Suspense } from 'react';
import userAxios from '@/lib/userbackAxios';
const Sales = React.lazy(() => import('./Sales'));


export default function Page() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInvoices = async () => {
      setLoading(true);
      setError(null);

      try {
        const { data } = await userAxios.get('/invoice/invoices');
        const salesInvoices = (data?.invoices || []).filter(inv => inv.type === 'sales');
        const invoicesWithParty = await Promise.all(
          salesInvoices.map(async (invoice) => {
            try {
              const { data: partyData } = await userAxios.get(`/invoice/parties/${invoice.partyId}`);
              if (partyData?.success) invoice.partyName = partyData.party?.partyName || '-';
            } catch (err) {
              console.warn(`Failed to fetch party for invoice ${invoice.id}`, err);
              invoice.partyName = '-';
            }
            return invoice;
          })
        );

        setInvoices(invoicesWithParty);
      } catch (err) {
        setError({ isError: true, message: err?.response?.data?.message || 'Something went wrong' });
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  return (
    <Suspense fallback={<div>Loading Page...</div>}>

      <Sales salesInvoices={invoices} loading={loading} error={error} />
    </Suspense>
  );
}