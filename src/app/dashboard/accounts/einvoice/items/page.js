import Items from '@/components/pagesComponents/dashboard/accounts/invoice/items/Items';
import { nodeAxios } from '@/lib/axios';
import userbackAxios from '@/lib/userbackAxios';
export const dynamic = 'force-dynamic';

export default async function page() {
  const itemsData = await getInvoiceItems();
  return <Items itemsData={itemsData} />;
}

export async function getInvoiceItems() {
  try {
    const response = await userbackAxios.get(
      `/invoice/items`,
    );
    console.log("hi");

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
