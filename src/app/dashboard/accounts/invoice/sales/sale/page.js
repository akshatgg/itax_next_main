'use client';
const formatDate = (timestamp) =>
  new Date(timestamp).toLocaleString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
import userbackAxios from '@/lib/userbackAxios';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import DashSection from '@/components/pagesComponents/pageLayout/DashSection';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
export default function Page() {
  const url = useSearchParams();
  const router = useRouter();
  const id = url?.get('id');
  const [certainInvoice, setCertainInvoice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const handleGetInvoice = async () => {
      try {
        setLoading(true);
        setError({ error: null });
        setCertainInvoice(null);
        const resp = await userbackAxios.get(`/invoice/invoices/${id}`);
        setCertainInvoice(resp.data);
      } catch (error) {
        console.log(error);
        setError({ isError: true, ...error });
      } finally {
        setLoading(false);
      }
    };
    handleGetInvoice();
  }, [id]);

  const handleDelete = async () => {
    try {
      setLoadingDelete(true);
      setError({ error: null });
      const resp = await userbackAxios.delete(`/invoice/invoices/${id}`);
      console.log(resp);
      if (resp.status === 200) {
        toast.success('Invoice Deleted');
        router.replace('/dashboard/accounts/invoice/sales');
      }
    } catch (error) {
      console.log(error);
      toast.error('something went wrong');
      setError({ isError: true, ...error });
    } finally {
      setLoadingDelete(false);
    }
  };
  if (loading) {
    return (
      <div className="grid place-content-center min-h-[calc(100vh-5rem)]">
        <h1>loading</h1>
      </div>
    );
  }
  if (error?.isError) {
    return (
      <div className="grid place-content-center min-h-[calc(100vh-5rem)]">
        <h1>{error?.response?.data?.message}</h1>
      </div>
    );
  }
  // console.log(certainInvoice)
  return (
    <>
      <div className=" mx-auto w-[calc(100%-1rem)] max-w-7xl py-4 ">
        <div className="flex justify-between flex-wrap items-center">
          <h1 className="px-4 border-l-4 border-l-blue-500 text-neutral-700 text-xl leading-10 font-medium">
            Sales Invoice{' '}
            <span className="text-xs">{certainInvoice?.invoiceNumber}</span>
          </h1>
          <div className=" flex flex-wrap items-center gap-2 justify-end mb-2 p-2">
            <Link
              href={`/dashboard/accounts/invoice/invoice/${certainInvoice?.id}`}
              className="text-lg inline-block p-1 rounded-md text-white bg-green-500 hover:bg-green-600 hover:scale-105 transition-[transform,_colors] duration-300 "
            >
              <Icon icon="material-symbols:download" />
            </Link>
            <Link
              href={`/dashboard/accounts/invoice/invoice/${certainInvoice?.id}`}
              className="inline-block px-4 text-sm py-1 rounded-md text-white bg-blue-500 hover:bg-blue-600 hover:scale-105 transition-[transform,_colors] duration-300"
            >
              Edit
            </Link>
            {loadingDelete ? (
              <button
                disabled
                className=" flex gap-1 items-center cursor-not-allowed px-4 text-sm py-1 rounded-md text-white bg-red-500 hover:bg-red-600"
              >
                <span className="spinner"></span>
                Deleting...
              </button>
            ) : (
              <button
                onClick={handleDelete}
                className="inline-block px-4 text-sm py-1 rounded-md text-white bg-red-500 hover:bg-red-600 hover:scale-105 transition-[transform,_colors] duration-300 "
              >
                Delete
              </button>
            )}
          </div>
        </div>
        <div className="px-4 text-sm">
          <div className="mb-2 font-medium">
            Date -{' '}
            <span className="text-gray-500">
              {formatDate(certainInvoice?.createdAt)}
            </span>
          </div>
          <div>
            <div>Details {certainInvoice?.details}</div>
            <div>Extra Details {certainInvoice?.extraDetails}</div>
          </div>
        </div>
      </div>
      <DashSection
        title={
          <div className="text-sm">
            Sales Invoice Items: ${certainInvoice?.invoiceItems?.length}
          </div>
        }
      >
        <ul className="px-4 divide-y-2  max-h-96 overflow-y-auto scrollbar-thin">
          {certainInvoice?.invoiceItems.map((invoiceItem) => (
            <li
              key={invoiceItem?.id}
              className="text-xs grid grid-cols-2 tracking-tighter p-2"
            >
              <div>
                <div className="text-sm font-medium">
                  {invoiceItem?.item.itemName}
                </div>
                <div>QTY {invoiceItem?.quantity}</div>
              </div>
              <div className="text-end ">
                <div className="text-sm font-medium">
                  &#8377;{invoiceItem?.item.price}
                </div>
                <div>
                  Discount{' '}
                  <span className="text-green-500">
                    {invoiceItem?.discount}%
                  </span>
                </div>
                <div>GST {invoiceItem?.item.gst || '0'}%</div>
              </div>
            </li>
          ))}
        </ul>
      </DashSection>
      <div className=" mx-auto w-[calc(100%-1rem)] max-w-7xl py-4 ">
        <span>Total Amount: {certainInvoice?.totalAmount}</span>
      </div>
    </>
  );
}
