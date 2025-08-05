"use client"

import { useState, useEffect } from "react"
import userbackAxios from "@/lib/userbackAxios"
import { FaSearch, FaUser, FaEnvelope, FaPhone, FaBriefcase, FaDownload } from "react-icons/fa"
import { HiRefresh, HiDocumentText } from "react-icons/hi"

export const AllCareers = () => {
  const [careers, setCareers] = useState([])
  const [filteredCareers, setFilteredCareers] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const handleResumeView = (cvUrl, candidateName) => {
    if (cvUrl) {
      window.open(cvUrl, '_blank', 'noopener,noreferrer')
    }
  }

  const handleResumeDownload = (cvUrl, candidateName) => {
    if (cvUrl) {
      try {
        // Get file extension from URL
        const urlParts = cvUrl.split('.')
        const extension = urlParts[urlParts.length - 1] || 'pdf'
        
        const link = document.createElement('a')
        link.href = cvUrl
        link.download = `${candidateName.replace(/\s+/g, '_')}_Resume.${extension}`
        link.target = '_blank'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      } catch (error) {
        console.error('Error downloading resume:', error)
        // Fallback to opening in new tab
        window.open(cvUrl, '_blank', 'noopener,noreferrer')
      }
    }
  }

  const fetchCareers = async () => {
    try {
      setIsLoading(true)
      setIsError(false)
      const response = await userbackAxios.get("/career/findAll")
      const careerData = response.data.allCareer || []
      setCareers(careerData)
      setFilteredCareers(careerData)
    } catch (error) {
      console.error("Error fetching careers:", error)
      setIsError(true)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchCareers()
  }, [])

  // Filter careers based on search term
  useEffect(() => {
    if (!searchTerm) {
      setFilteredCareers(careers)
    } else {
      const filtered = careers.filter((career) => {
        const searchLower = searchTerm.toLowerCase()
        return (
          career.name?.toLowerCase().includes(searchLower) ||
          career.email?.toLowerCase().includes(searchLower) ||
          career.mobile?.toLowerCase().includes(searchLower) ||
          career.skills?.toLowerCase().includes(searchLower) ||
          career.address?.toLowerCase().includes(searchLower)
        )
      })
      setFilteredCareers(filtered)
    }
  }, [searchTerm, careers])

  return (
    <div className="space-y-6">
      {/* Search and Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex-1 w-full sm:max-w-md">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search applications by name, email, skills, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 bg-gray-50 focus:bg-white"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={fetchCareers}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-3 bg-white hover:bg-gray-50 text-gray-600 border border-gray-200 rounded-lg transition-all duration-200 shadow-sm disabled:opacity-50"
          >
            <HiRefresh className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Refresh</span>
          </button>
          
          <div className="text-sm text-gray-600 bg-gray-50 px-4 py-3 rounded-lg border border-gray-200">
            <span className="font-medium">{filteredCareers.length}</span> of <span className="font-medium">{careers.length}</span> applications
          </div>
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 border-collapse">
            <thead className="text-xs text-white bg-blue-600">
              <tr>
                <th className="px-4 py-3 font-semibold">Candidate</th>
                <th className="px-4 py-3 font-semibold">Contact</th>
                <th className="px-4 py-3 font-semibold">Skills</th>
                <th className="px-4 py-3 font-semibold">Address</th>
                <th className="px-4 py-3 font-semibold">Resume</th>
                <th className="px-4 py-3 font-semibold">Applied Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredCareers.length > 0 ? (
                filteredCareers.map((career, index) => (
                  <tr 
                    key={career.id || index} 
                    className={`${index % 2 === 0 ? "bg-white" : "bg-blue-50"} border-b hover:bg-gray-50 transition-colors`}
                  >
                    {/* Candidate Info */}
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center border border-blue-100">
                            <FaUser className="text-blue-500 text-sm" />
                          </div>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-800">
                            {career.name || 'N/A'}
                          </div>
                          <div className="text-xs text-gray-500">
                            {career.gender || 'N/A'}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Contact Info */}
                    <td className="px-4 py-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <FaEnvelope className="text-gray-400 text-xs" />
                          <span className="text-sm text-blue-500 hover:text-blue-600">
                            {career.email || 'N/A'}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FaPhone className="text-gray-400 text-xs" />
                          <span className="text-sm font-mono text-gray-700 bg-gray-50 px-2 py-1 rounded">
                            {career.mobile || 'N/A'}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Skills */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <FaBriefcase className="text-gray-400 text-xs" />
                        <span className="text-sm font-medium text-gray-900 bg-blue-50 px-2 py-1 rounded border border-blue-100">
                          {career.skills || 'N/A'}
                        </span>
                      </div>
                      
                    </td>

                    {/* Address */}
                    <td className="px-4 py-3">
                      <div className="text-sm text-gray-700">
                        <div>{career.address || 'N/A'}</div>
                        {career.pin && (
                          <div className="text-xs text-gray-500 mt-1">
                            PIN: {career.pin}
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Resume */}
                    <td className="px-4 py-3">
                      {career.cv ? (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleResumeView(career.cv, career.name)}
                            className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1 rounded border border-blue-200 transition-colors"
                          >
                            <HiDocumentText className="text-xs" />
                            <span>View</span>
                          </button>
                          <button
                            onClick={() => handleResumeDownload(career.cv, career.name)}
                            className="flex items-center gap-1 text-sm text-green-600 hover:text-green-700 bg-green-50 hover:bg-green-100 px-2 py-1 rounded border border-green-200 transition-colors"
                            title="Download Resume"
                          >
                            <FaDownload className="text-xs" />
                          </button>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-500">No resume</span>
                      )}
                    </td>

                    {/* Applied Date */}
                    <td className="px-4 py-3">
                      <div className="text-sm text-gray-900">
                        {career.createdAt ? new Date(career.createdAt).toLocaleDateString() : 'N/A'}
                      </div>
                      <div className="text-xs text-gray-500">
                        {career.createdAt ? new Date(career.createdAt).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric',
                          year: 'numeric'
                        }) : ''}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-4 py-8 text-center text-gray-500">
                    {isLoading ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
                        <span>Loading career applications...</span>
                      </div>
                    ) : isError ? (
                      <div className="text-red-500">
                        <span>Error loading applications. Please try again.</span>
                      </div>
                    ) : (
                      <div>
                        <span>No career applications found matching your criteria.</span>
                      </div>
                    )}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AllCareers
