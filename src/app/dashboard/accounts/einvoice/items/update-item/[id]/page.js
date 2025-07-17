import CreateItem from "@/components/pagesComponents/dashboard/accounts/invoice/items/CreateItem"
import userbackAxios from "@/lib/userbackAxios"

// Move the function outside the component
async function getInvoiceItem(id) {
  try {
    const response = await userbackAxios.get(`/invoice/items/${id}`)
    const itemsData = response.data
    return itemsData
  } catch (error) {
    // console.log('🚀 ~ getInvoiceItem ~ error:', error.message);
    return null
  }
}

export default async function UpdateItem({ params: { id } }) {
  // Fetch the data before rendering the component
  const data = await getInvoiceItem(id)

  return <CreateItem />
}
