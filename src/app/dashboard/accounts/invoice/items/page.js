// import Items from '@/components/pagesComponents/dashboard/accounts/invoice/items/Items';
// import { nodeAxios } from '@/lib/axios';
// import userbackAxios from '@/lib/userbackAxios';
// export const dynamic = 'force-dynamic';

// export default function page() {
//   return <Items />;
// }

// export async function getInvoiceItems() {
//   try {
//     const response = await userbackAxios.get(
//       `/invoice/items`,
//     );
//     console.log("hi");

//     console.log('🚀 ~ getInvoiceItems ~ response:', response);
//     const itemsData = response.data;
//     return itemsData;
//   } catch (error) {
//     // console.log('🚀 ~ getInvoiceItems ~ error:', error.message);
//     return null;
//   }
// }

// export async function getInvoiceItem(id) {
//   try {
//     const response = await userbackAxios.get(`/invoice/items/${id}`);
//     const itemsData = response.data;
//     return itemsData;
//   } catch (error) {
//     // console.log('🚀 ~ getInvoiceItem ~ error:', error.message);
//     return null;
//   }
// }


/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { useState, useEffect, useCallback, useTransition } from "react"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import Link from "next/link"
import { toast } from "react-toastify"
import { Search } from "lucide-react"
import userbackAxios from "@/lib/userbackAxios"
import DashSection from "@/components/pagesComponents/pageLayout/DashSection"
import Button from "@/components/ui/Button"
import { formatDate } from "@/utils/utilityFunctions"

// 🔹 Debounce helper
const debounce = (fn, delay = 300) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

export default function ItemsPage() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // 🔹 Filters state (sync with URL)
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "")
  const [dateFilter, setDateFilter] = useState(searchParams.get("dateFilter") || "")

  // 🔹 Data state
  const [isPending, startTransition] = useTransition()
  const [itemsData, setItemsData] = useState([])
  const [filteredItems, setFilteredItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  // Update query params in URL
  const updateSearchParams = useCallback(
    (key, value) => {
      const params = new URLSearchParams(searchParams.toString())
      value ? params.set(key, value) : params.delete(key)
      return params.toString()
    },
    [searchParams],
  )

  // 🔹 Debounced search update
  const debouncedUpdateSearch = useCallback(
    debounce((value) => {
      const newParams = updateSearchParams("search", value)
      router.push(`${pathname}?${newParams}`)
    }, 300),
    [updateSearchParams, pathname, router],
  )

  // 🔹 Handle search input
  const handleSearchChange = (e) => {
    const value = e.target.value
    setSearchTerm(value)
    debouncedUpdateSearch(value)
  }

  // 🔹 Handle date filter
  const handleDateFilterChange = (e) => {
    const value = e.target.value
    setDateFilter(value)
    const newParams = updateSearchParams("dateFilter", value)
    router.push(`${pathname}?${newParams}`)
  }

  // 🔹 Fetch items from API
  const fetchItems = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const { data } = await userbackAxios.get("/invoice/items")

      if (data.success) {
        setItemsData(data.items || [])
      } else {
        setError("Failed to fetch items")
        toast.error("Failed to load items")
      }
    } catch (err) {
      setError(err.message || "An error occurred")
      toast.error("Error loading items")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchItems()
  }, [])

  // 🔹 Apply search & date filters
  useEffect(() => {
    let filtered = [...itemsData]

    if (searchTerm) {
      const q = searchTerm.toLowerCase()
      filtered = filtered.filter(
        (item) =>
          item.itemName?.toLowerCase().includes(q) || item.id?.toString().includes(q),
      )
    }

    if (dateFilter) {
      const now = new Date()
      let start, end = null

      switch (dateFilter) {
        case "yesterday":
          start = new Date(now.setDate(now.getDate() - 1))
          start.setHours(0, 0, 0, 0)
          end = new Date(start)
          end.setHours(23, 59, 59, 999)
          break
        case "last_7_days":
        case "last_week":
          start = new Date()
          start.setDate(now.getDate() - 7)
          if (dateFilter === "last_week") {
            end = new Date()
            end.setDate(now.getDate() - 1)
          }
          break
        case "last_30_days":
          start = new Date()
          start.setDate(now.getDate() - 30)
          break
        case "last_month":
          start = new Date(now.getFullYear(), now.getMonth() - 1, 1)
          end = new Date(now.getFullYear(), now.getMonth(), 0)
          break
        default:
          start = new Date(0)
      }

      filtered = filtered.filter((item) => {
        const created = new Date(item.createdAt)
        return end ? created >= start && created <= end : created >= start
      })
    }

    setFilteredItems(filtered)
  }, [searchTerm, dateFilter, itemsData])

  // 🔹 Delete handler
  const handleDelete = async (id) => {
    try {
      const { data } = await userbackAxios.delete(`/invoice/items/${id}`)
      if (data.success) {
        toast.success(`Item Deleted: ${data.item?.itemName}`)
        fetchItems()
        startTransition(() => router.refresh())
      }
    } catch (err) {
      toast.error("Failed to delete item")
    }
  }

  const linkToCreate = "/dashboard/accounts/invoice/items/create-item"

  return (
    <DashSection title="Items" className="p-4 mx-auto my-2 border">
      {/* 🔹 Header actions */}
      <div className="flex justify-end mb-2">
        <Link href={linkToCreate}>
          <Button size="sm" className="m-2">Create Items</Button>
        </Link>
      </div>

      {/* 🔹 Filters */}
      <div className="grid md:grid-cols-[1fr_auto] gap-2 items-center">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
          <input
            type="search"
            className="block w-full py-2 pl-10 pr-4 text-sm border rounded-lg bg-neutral-50 dark:bg-neutral-700"
            placeholder="Search by name, id"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <select
          value={dateFilter}
          onChange={handleDateFilterChange}
          className="block w-40 rounded-lg border p-2 text-sm focus:ring-1 focus:ring-blue-400"
        >
          <option value="">All time</option>
          <option value="last_week">Last week</option>
          <option value="last_month">Last month</option>
          <option value="yesterday">Yesterday</option>
          <option value="last_7_days">Last 7 days</option>
          <option value="last_30_days">Last 30 days</option>
        </select>
      </div>

      {/* 🔹 Items Table */}
      <div className="my-4 overflow-x-auto shadow-md sm:rounded-lg">
        {isLoading ? (
          <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="text-center py-10 text-red-500">
            <p>{error}</p>
            <button onClick={fetchItems} className="mt-4 px-4 py-2 bg-primary text-white rounded-md">
              Try Again
            </button>
          </div>
        ) : (
          <table className="w-full text-sm text-left text-neutral-500 dark:text-neutral-400">
            <thead className="sticky top-0 bg-neutral-50 dark:bg-neutral-700">
              <tr>
                {[
                  "Item Name", "ID", "Unit", "Price", "Opening Stock", "Closing Stock", "Purchase Price", "GST", "Tax Exempted", "Description", "HSN Code", "Category ID", "Supplier ID", "User ID", "Created At", "Action"
                ].map((t, i) => (
                  <th key={i} className="px-6 py-4 font-bold text-gray-900 dark:text-white">{t}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 font-semibold">{item.itemName || "N/A"}</td>
                    <td className="px-6 py-4">{item.id}</td>
                    <td className="px-6 py-4">{item.unit || "N/A"}</td>
                    <td className="px-6 py-4">₹{item.price || "N/A"}</td>
                    <td className="px-6 py-4">{item.openingStock || "N/A"}</td>
                    <td className="px-6 py-4">{item.closingStock || "N/A"}</td>
                    <td className="px-6 py-4">₹{item.purchasePrice || "N/A"}</td>
                    <td className="px-6 py-4">{item.gst || "N/A"}</td>
                    <td className="px-6 py-4">{item.taxExempted ? "Yes" : "No"}</td>
                    <td className="px-6 py-4">{item.description || "N/A"}</td>
                    <td className="px-6 py-4">{item.hsnCode || "N/A"}</td>
                    <td className="px-6 py-4">{item.categoryId || "N/A"}</td>
                    <td className="px-6 py-4">{item.supplierId || "N/A"}</td>
                    <td className="px-6 py-4">{item.userId || "N/A"}</td>
                    <td className="px-6 py-4">{formatDate(item.createdAt, "DD, MMM YYYY")}</td>
                    <td className="px-6 py-4 flex gap-2">
                      <Link href={`${linkToCreate}?id=${item.id}`} className="px-3 py-1 bg-primary text-white rounded-md">Edit</Link>
                      <button
                        onClick={() => handleDelete(item.id)}
                        disabled={isPending}
                        className="px-3 py-1 bg-red-500 text-white rounded-md disabled:opacity-50"
                      >
                        {isPending ? "Deleting..." : "Delete"}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={16} className="px-6 py-10 text-center">
                    {searchTerm || dateFilter ? (
                      <>
                        No items found.{" "}
                        <button onClick={() => router.push(pathname)} className="text-primary underline">Clear filters</button>
                      </>
                    ) : (
                      <>
                        No items found.{" "}
                        <Link href={linkToCreate} className="text-primary underline">Add your first item</Link>
                      </>
                    )}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </DashSection>
  )
}
