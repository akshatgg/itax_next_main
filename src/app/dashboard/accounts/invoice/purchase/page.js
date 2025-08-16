'use client';

import React, { Suspense, useEffect, useState } from 'react';
import userAxios from '@/lib/userbackAxios';
const Purchase = React.lazy(() => import('./Purchase'));


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
        const purchaseInvoices = (data?.invoices || []).filter(inv => inv.type === 'purchase');
        const invoicesWithParty = await Promise.all(
          purchaseInvoices.map(async (invoice) => {
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
        console.error('Failed to fetch invoices:', err);
        setError({ isError: true, message: err?.response?.data?.message || 'Something went wrong' });
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  return (
    <Suspense fallback={<div>Loading Page...</div>}>
      <Purchase purchaseInvoices={invoices} loading={loading} error={error} />
    </Suspense>
  );
}