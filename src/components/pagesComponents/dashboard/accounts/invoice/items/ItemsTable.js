"use client"

import { useEffect, useState, useTransition } from "react"
import { formatDate } from "@/utils/utilityFunctions"
import Link from "next/link"
import userbackAxios from "@/lib/userbackAxios"
import { toast } from "react-toastify"
import { useRouter, useSearchParams, usePathname } from "next/navigation"

const itemData = {
  itemsData_title: [
    { title: "item name" },
    { title: "id" },
    { title: "unit" },
    { title: "price" },
    { title: "opening stock" },
    { title: "closing stock" },
    { title: "purchase price" },
    { title: "gst" },
    { title: "tax exempted" },
    { title: "description" },
    { title: "hsn code" },
    { title: "category id" },
    { title: "supplier id" },
    { title: "user id" },
    { title: "created at" },
  ],
}

const ItemsTable = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const searchTerm = searchParams.get("search") || ""
  const dateFilter = searchParams.get("dateFilter") || ""

  const [isPending, startTransition] = useTransition()
  const [itemsData, setItemsData] = useState({ items: [] })
  const [filteredItems, setFilteredItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch items data from API
  const fetchItems = async () => {
    try {
      setIsLoading(true)
      setError(null)

      console.log("Fetching items data...")
      const response = await userbackAxios.get("/invoice/items")
      console.log("API Response:", response.data)

      if (response.data.success) {
        setItemsData(response.data)
      } else {
        setError("Failed to fetch items data")
        toast.error("Failed to load items")
      }
    } catch (error) {
      console.error("Error fetching items:", error)
      setError(error.message || "An error occurred while fetching items")
      toast.error("Error loading items")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchItems()
  }, [])

  // Apply filters whenever search term or date filter changes
  useEffect(() => {
    if (!itemsData.items) return

    let filtered = [...itemsData.items]

    // Apply search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase()
      filtered = filtered.filter(
        (item) =>
          (item.itemName && item.itemName.toLowerCase().includes(searchLower)) ||
          (item.id && item.id.toString().includes(searchLower)),
      )
    }

    // Apply date filter
    if (dateFilter) {
      const now = new Date()
      let startDate

      switch (dateFilter) {
        case "yesterday":
          startDate = new Date(now)
          startDate.setDate(now.getDate() - 1)
          startDate.setHours(0, 0, 0, 0)
          const endOfYesterday = new Date(now)
          endOfYesterday.setDate(now.getDate() - 1)
          endOfYesterday.setHours(23, 59, 59, 999)
          filtered = filtered.filter((item) => {
            const createdAt = new Date(item.createdAt)
            return createdAt >= startDate && createdAt <= endOfYesterday
          })
          break
        case "last_7_days":
          startDate = new Date(now)
          startDate.setDate(now.getDate() - 7)
          filtered = filtered.filter((item) => new Date(item.createdAt) >= startDate)
          break
        case "last_week":
          startDate = new Date(now)
          startDate.setDate(now.getDate() - 7)
          const endOfLastWeek = new Date(now)
          endOfLastWeek.setDate(now.getDate() - 1)
          filtered = filtered.filter((item) => {
            const createdAt = new Date(item.createdAt)
            return createdAt >= startDate && createdAt <= endOfLastWeek
          })
          break
        case "last_30_days":
          startDate = new Date(now)
          startDate.setDate(now.getDate() - 30)
          filtered = filtered.filter((item) => new Date(item.createdAt) >= startDate)
          break
        case "last_month":
          startDate = new Date(now)
          startDate.setMonth(now.getMonth() - 1)
          const endOfLastMonth = new Date(now)
          endOfLastMonth.setDate(0) // Last day of previous month
          filtered = filtered.filter((item) => {
            const createdAt = new Date(item.createdAt)
            return createdAt >= startDate && createdAt <= endOfLastMonth
          })
          break
      }
    }

    setFilteredItems(filtered)
  }, [searchTerm, dateFilter, itemsData.items])

  const handleDelete = async (id) => {
    try {
      const response = await userbackAxios.delete("/invoice/items/" + id)
      if (response.data.success) {
        toast.success(`Item Deleted : ${response.data.item?.itemName}`)

        // Refresh the data after deletion
        fetchItems()
      }

      startTransition(() => {
        // Refresh the current route and fetch new data
        // from the server without losing
        // client-side browser or React state.
        router.refresh()
      })
    } catch (error) {
      console.error("Error deleting item:", error)
      toast.error("Failed to delete item")
    }
  }

  return (
    <div className="w-full overflow-x-auto">
      {isLoading ? (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : error ? (
        <div className="text-center py-10 text-red-500">
          <p>Error: {error}</p>
          <button onClick={fetchItems} className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-opacity-80">
            Try Again
          </button>
        </div>
      ) : (
        <table className="w-full text-sm text-left rtl:text-right text-neutral-500 dark:text-neutral-400">
          <thead className="sticky -top-0 shadow-md text-neutral-700 uppercase bg-neutral-50 dark:bg-neutral-700 dark:text-neutral-400">
            <tr className="border-b-2 dark:border-neutral-900">
              {itemData.itemsData_title.map((item, index) => (
                <th className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap dark:text-white" key={index}>
                  {item.title}
                </th>
              ))}
              <th className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap dark:text-white">action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {filteredItems && filteredItems.length > 0 ? (
              filteredItems.map((item, i) => (
                <tr key={i} className="border-b hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 font-semibold">{item.itemName || "N/A"}</td>
                  <td className="px-6 py-4">{item.id || "N/A"}</td>
                  <td className="px-6 py-4 capitalize">{item.unit || "N/A"}</td>
                  <td className="px-6 py-4">₹{item.price || "N/A"}</td>
                  <td className="px-6 py-4">{item.openingStock || "N/A"}</td>
                  <td className="px-6 py-4">{item.closingStock || "N/A"}</td>
                  <td className="px-6 py-4">₹{item.purchasePrice || "N/A"}</td>
                  <td className="px-6 py-4">{item.gst || "N/A"}</td>
                  <td className="px-6 py-4">{item.taxExempted === true ? "Yes" : "No"}</td>
                  <td className="px-6 py-4">{item.description || "N/A"}</td>
                  <td className="px-6 py-4">{item.hsnCode || "N/A"}</td>
                  <td className="px-6 py-4">{item.categoryId || "N/A"}</td>
                  <td className="px-6 py-4">{item.supplierId || "N/A"}</td>
                  <td className="px-6 py-4">{item.userId || "N/A"}</td>
                  <td className="px-6 py-4">{formatDate(item.createdAt, "DD, MMM YYYY") || "N/A"}</td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center items-center gap-2">
                      <Link
                        href={`/dashboard/accounts/invoice/items/create-item?id=${item.id}`}
                        className="cursor-pointer p-2 rounded-md bg-primary text-white active:scale-95 hover:opacity-70"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(item.id)}
                        disabled={isPending}
                        className="cursor-pointer p-2 rounded-md bg-red-500 text-white active:scale-95 hover:opacity-70 disabled:opacity-50"
                      >
                        {isPending ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={16} className="px-6 py-10 text-center text-gray-500">
                  {searchTerm || dateFilter ? (
                    <>
                      No items found matching your filters.
                      <button
                        onClick={() => {
                          router.push(pathname)
                        }}
                        className="text-primary ml-2 hover:underline"
                      >
                        Clear filters
                      </button>
                    </>
                  ) : (
                    <>
                      No items found.
                      <Link
                        href="/dashboard/accounts/invoice/items/create-item"
                        className="text-primary ml-2 hover:underline"
                      >
                        Add your first item
                      </Link>
                    </>
                  )}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default ItemsTable
