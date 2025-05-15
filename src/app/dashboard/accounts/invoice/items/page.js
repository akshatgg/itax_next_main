import Items from '@/components/pagesComponents/dashboard/accounts/invoice/items/Items';
import { nodeAxios } from '@/lib/axios';
import userbackAxios from '@/lib/userbackAxios';
export const dynamic = 'force-dynamic';

export default function page() {
  return <Items />;
}

export async function getInvoiceItems(params) {
  try {
    const response = await userbackAxios.get(
      `/invoice/items/${params ? params : ''}`,
    );
    console.log('🚀 ~ getInvoiceItems ~ response:', response);
    const itemsData = response.data;
    return itemsData;
  } catch (error) {
    // console.log('🚀 ~ getInvoiceItems ~ error:', error.message);
    return null;
  }
}

export async function getInvoiceItem(id) {
  try {
    const response = await userbackAxios.get(`/invoice/items/${id}`);
    const itemsData = response.data;
    return itemsData;
  } catch (error) {
    // console.log('🚀 ~ getInvoiceItem ~ error:', error.message);
    return null;
  }
}
