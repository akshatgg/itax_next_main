"use client"

import { useState, useEffect } from "react"
import ReactTable from "@/components/ui/ReactTable"
import { careerTableHeaders } from "./staticData"
import userbackAxios from "@/lib/userbackAxios"
import { Search, RefreshCw } from "lucide-react"

export const AllCareers = () => {
  const [careers, setCareers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")

  const fetchCareers = async () => {
    try {
      setLoading(true)
      const response = await userbackAxios.get("/career/findAll")
      setCareers(response.data.allCareer || [])
      setError(null)
    } catch (error) {
      console.error("Error fetching careers:", error)
      setError("Failed to load career applications")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCareers()
  }, [])

  const filteredCareers = careers.filter((career) => {
    const searchLower = searchTerm.toLowerCase()
    return (
      career.name?.toLowerCase().includes(searchLower) ||
      career.email?.toLowerCase().includes(searchLower) ||
      career.mobile?.toLowerCase().includes(searchLower) ||
      career.role?.toLowerCase().includes(searchLower)
    )
  })

  return (
    <div className="p-4">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Career Applications</h1>

        <div className="flex gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-none sm:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search applications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full rounded-md border border-gray-300 py-2 px-3 text-sm text-gray-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <button
            onClick={fetchCareers}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            <RefreshCw className="w-4 h-4 mr-1" />
            Refresh
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
            <span className="text-sm text-gray-500">
              Showing <span className="font-medium">{filteredCareers.length}</span> applications
            </span>
          </div>

          <ReactTable columns={careerTableHeaders} data={filteredCareers} id="careers-table" />
        </div>
      )}
    </div>
  )
}

export default AllCareers
