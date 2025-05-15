'use client';
import Sales from '@/components/pagesComponents/dashboard/accounts/invoice/sales/Sales';
import userAxios from '@/lib/userbackAxios';
import { useEffect, useState } from 'react';
export default function Page() {
  const [respAllInvoice, setRespAllInvoice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const handleGetInvoices = async () => {
      try {
        setLoading(true);
        setError({ error: null });
        const resp = await userAxios.get('/invoice/invoices');
        const salesInvoice = resp.data.invoices.filter((invoice) => {
          return invoice.type === 'sales';
        });
        const updatedSalesInvoice = await Promise.all(
          salesInvoice.map(async (invoice) => {
            const response = await userAxios.get(
              'invoice/parties/' + invoice.partyId,
            );
            if (response.data.success)
              invoice.partyName = response.data?.party?.partyName;
            return invoice;
          }),
        );
        setRespAllInvoice(updatedSalesInvoice);
      } catch (error) {
        console.log(error);
        setError({ isError: true, ...error });
      } finally {
        setLoading(false);
      }
    };
    handleGetInvoices();
  }, []);

  return (
    <Sales salesInvoices={respAllInvoice} loading={loading} error={error} />
  );
}
// import Sales from "@/components/pagesComponents/dashboard/accounts/invoice/sales/Sales";
// import Axios from "@/lib/Axios";
// import { getCurrentUser } from "@/hooks/authProvider";
// export default async function page() {
//     const { token } = await getCurrentUser();
//     try {
//         const respAllInvoice = await Axios.get("/invoice/invoices",{
//             headers:{
//                 Authorization: "Bearer " + token
//             }
//         });
//         const salesInvoice = respAllInvoice.data.invoices.filter((invoice)=>{
//             return invoice.type === "sales"
//         })
//         return (
//             <Sales salesInvoices={salesInvoice}/>
//         );
//     } catch (error) {
//         console.log(error);
//     }

// }
