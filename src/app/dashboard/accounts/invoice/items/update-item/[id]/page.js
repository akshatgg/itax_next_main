import React from 'react';
import CreateItem from '@/components/pagesComponents/dashboard/accounts/invoice/items/CreateItem';
import { getInvoiceItem } from '../../page';

export default async function UpdateItem({ params: { id } }) {
  const data = await getInvoiceItem(id);

  return <CreateItem data={data} id={id} />;
}
