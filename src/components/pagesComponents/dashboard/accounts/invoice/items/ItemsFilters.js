"use client"

import { useState, useCallback } from "react"
import { Search } from "lucide-react"
import { useRouter, useSearchParams, usePathname } from "next/navigation"

// Simple debounce function to avoid too many updates while typing
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

const ItemsFilters = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "")
  const [dateFilter, setDateFilter] = useState(searchParams.get("dateFilter") || "")

  // Update URL with search params
  const updateSearchParams = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams.toString())

      if (value) {
        params.set(name, value)
      } else {
        params.delete(name)
      }

      return params.toString()
    },
    [searchParams],
  )

  // Debounced function to update URL
  const debouncedUpdateSearch = useCallback(
    debounce((value) => {
      const newParams = updateSearchParams("search", value)
      router.push(`${pathname}?${newParams}`)
    }, 300), // 300ms delay
    [updateSearchParams, pathname, router],
  )

  // Handle search input change with auto-search
  const handleSearchChange = (e) => {
    const value = e.target.value
    setSearchTerm(value)
    debouncedUpdateSearch(value)
  }

  // Handle date filter change
  const handleDateFilterChange = (e) => {
    const value = e.target.value
    setDateFilter(value)
    const newParams = updateSearchParams("dateFilter", value)
    router.push(`${pathname}?${newParams}`)
  }

  return (
    <div className="grid md:grid-cols-[1fr_auto] gap-2 items-center mx-auto">
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center pl-3 pointer-events-none">
          <Search className="h-4 w-4 text-gray-500 dark:text-gray-400" />
        </div>
        <input
          type="search"
          id="default-search"
          className="block w-full py-2 pl-10 pr-4 text-sm text-neutral-900 border border-neutral-300 rounded-lg bg-neutral-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search by name, id"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      <div className="relative m-[2px] float-right ml-auto sm:block">
        <label htmlFor="inputFilter" className="sr-only">
          Filter
        </label>
        <select
          id="inputFilter"
          value={dateFilter}
          onChange={handleDateFilterChange}
          className="block w-40 rounded-lg border dark:border-none dark:bg-neutral-600 p-2 text-sm focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
        >
          <option value="">All time</option>
          <option value="last_week">Last week</option>
          <option value="last_month">Last month</option>
          <option value="yesterday">Yesterday</option>
          <option value="last_7_days">Last 7 days</option>
          <option value="last_30_days">Last 30 days</option>
        </select>
      </div>
    </div>
  )
}

export default ItemsFilters
