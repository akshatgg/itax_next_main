"use client"
import { useState, useRef } from "react"
import axios from "axios"
import { User, Building2, Calendar, FileText, Search, RefreshCw, AlertCircle } from "lucide-react"
import useAuth from "../../../hooks/useAuth"
import { useRouter } from "next/navigation"
import { useReactToPrint } from "react-to-print"
import SearchResult_section from "@/components/pagesComponents/pageLayout/SearchResult_section.js"

const DirectorDetails = () => {
  const { token } = useAuth()
  const navigate = useRouter()
  const [directorData, setDirectorData] = useState({})
  const [showResult, setShowResult] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [inputValue, setInputValue] = useState("")
  const [isValid, setIsValid] = useState(true)
  const pdf_ref = useRef()
  const inputRef = useRef(null)

  const generatePDF = useReactToPrint({
    content: () => pdf_ref.current,
    documentTitle: "Director Details",
  })

  const validateDIN = (din) => {
    // Basic DIN validation - should be a number with 8 digits
    return /^\d{8}$/.test(din)
  }

  const handleInputChange = (e) => {
    const value = e.target.value
    setInputValue(value)

    if (value) {
      setIsValid(validateDIN(value))
    } else {
      setIsValid(true) // Empty input is considered valid until submission
    }
  }

  const generateDataObject = () => ({
    title: "Director Details",
    column: ["Field", "Detail"],
    data: [
      {
        Field: "Company Name",
        Detail: directorData.company_name || "Not Available",
      },
      {
        Field: "Begin Date",
        Detail: directorData.begin_date || "Not Available",
      },
      {
        Field: "End Date",
        Detail: directorData.end_date || "Not Available",
      },
      {
        Field: "CIN/FCRN",
        Detail: directorData.cin_fcrn || "Not Available",
      },
      {
        Field: "Director Name",
        Detail: directorData.director_name || "Not Available",
      },
      {
        Field: "DIN No.",
        Detail: directorData.director_din || "Not Available",
      },
    ],
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!inputValue || !validateDIN(inputValue)) {
      setIsValid(false)
      return
    }

    setLoading(true)
    setError(false)
    setErrorMessage("")

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/mca/director-details?din=${inputValue}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      const responseData = response.data.data
      const companyData = responseData.company_data[0]

      const updatedDirectorData = {
        active_compliance: companyData.active_compliance,
        company_name: companyData.company_name,
        begin_date: companyData.begin_date,
        end_date: companyData.end_date,
        cin_fcrn: companyData["cin/fcrn"],
        director_name: responseData.director_data.name,
        director_din: responseData.director_data.din,
        llp_data: responseData.llp_data,
      }

      setDirectorData(updatedDirectorData)
      setShowResult(true)
    } catch (error) {
      console.error("Error fetching director details:", error)
      setError(true)
      setShowResult(false)
      setErrorMessage(
        error.response?.data?.message || "An error occurred while fetching director details. Please try again.",
      )
    } finally {
      setLoading(false)
    }
  }

  const handleClear = (e) => {
    e.preventDefault()
    setInputValue("")
    setDirectorData({})
    setShowResult(false)
    setError(false)
    setErrorMessage("")
    setIsValid(true)

    // Focus the input after clearing
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  const resultDetails = [
    {
      label: "Company Name",
      value: directorData.company_name || "Not Available",
      icon: <Building2 className="h-4 w-4 text-blue-600" />,
    },
    {
      label: "Begin Date",
      value: directorData.begin_date || "Not Available",
      icon: <Calendar className="h-4 w-4 text-blue-600" />,
    },
    {
      label: "End Date",
      value: directorData.end_date || "Not Available",
      icon: <Calendar className="h-4 w-4 text-blue-600" />,
    },
    {
      label: "CIN/FCRN",
      value: directorData.cin_fcrn || "Not Available",
      icon: <FileText className="h-4 w-4 text-blue-600" />,
    },
    {
      label: "Director Name",
      value: directorData.director_name || "Not Available",
      icon: <User className="h-4 w-4 text-blue-600" />,
    },
    {
      label: "DIN No.",
      value: directorData.director_din || "Not Available",
      icon: <User className="h-4 w-4 text-blue-600" />,
    },
  ]

  return (
    <SearchResult_section title="Director Details">
      <li className="bg-white rounded-lg shadow-md p-4 transition-all duration-300">
        <div className="mb-4 border-b border-gray-200 pb-2">
          <h3 className="text-xl font-bold text-blue-700 flex items-center">
            <User className="h-5 w-5 mr-2" />
            Company Director Search
          </h3>
          <p className="text-gray-600 text-sm">Enter a Director Identification Number (DIN) to retrieve details</p>
        </div>

        <form className="space-y-4">
          <div className="space-y-2">
            <div className="flex flex-col">
              <label htmlFor="dinInput" className="form-label inline-block mb-1 text-gray-700 font-medium">
                Director Identification Number (DIN)
              </label>
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-grow">
                  <input
                    type="text"
                    id="dinInput"
                    ref={inputRef}
                    className={`form-input w-full border p-2 rounded-md focus:ring-2 focus:ring-blue-300 focus:outline-none transition-all duration-200 ${
                      !isValid ? "border-red-500 bg-red-50" : "border-blue-500"
                    }`}
                    placeholder="Enter 8-digit DIN"
                    value={inputValue}
                    onChange={handleInputChange}
                    maxLength={8}
                    autoComplete="off"
                  />
                  {!isValid && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500">
                      <AlertCircle className="h-5 w-5" />
                    </div>
                  )}
                </div>
              </div>
              {!isValid ? (
                <p className="text-xs text-red-600 mt-1">Please enter a valid 8-digit DIN number</p>
              ) : (
                <p className="text-xs text-gray-500 mt-1">Format: 8-digit number (e.g., 00123456)</p>
              )}
            </div>
          </div>

          <div className="grid gap-2 grid-cols-1 sm:grid-cols-3">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`flex items-center justify-center gap-2 px-3 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
              type="button"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span>Searching...</span>
                </>
              ) : (
                <>
                  <Search className="h-4 w-4" />
                  <span>Search</span>
                </>
              )}
            </button>

            <button
              onClick={handleClear}
              disabled={loading}
              className={`flex items-center justify-center gap-2 px-3 py-2 rounded-md text-white bg-amber-500 hover:bg-amber-600 transition-colors ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
              type="button"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Clear</span>
            </button>

            {showResult && (
              <button
                onClick={generatePDF}
                type="button"
                className="flex items-center justify-center gap-2 px-3 py-2 rounded-md text-white bg-green-500 hover:bg-green-600 transition-colors"
              >
                <FileText className="h-4 w-4" />
                <span>PDF</span>
              </button>
            )}
          </div>
        </form>

        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600 font-medium flex items-center">
              <AlertCircle className="h-5 w-5 mr-2" />
              {errorMessage || "An error occurred while fetching director details. Please try again."}
            </p>
          </div>
        )}
      </li>
      <li className="lg:col-span-2 bg-gray-200 p-4 rounded-lg">
        {loading ? (
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="flex flex-col items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
              <p className="text-gray-700 font-medium">Retrieving director details...</p>
              <p className="text-gray-500 text-sm mt-2">This may take a few moments</p>
            </div>
          </div>
        ) : showResult ? (
          <div className="bg-white rounded-lg shadow-md p-6" ref={pdf_ref}>
            <div className="mb-4 border-b border-gray-200 pb-4">
              <h2 className="text-xl font-bold text-blue-700">Director Information</h2>
              <div className="flex flex-col sm:flex-row sm:justify-between mt-2">
                <p className="text-gray-600 text-sm">
                  <span className="font-medium">DIN:</span> {directorData.director_din}
                </p>
                <p className="text-gray-600 text-sm">
                  <span className="font-medium">Name:</span> {directorData.director_name}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {resultDetails.map((detail, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-start">
                    <div className="mr-3 mt-0.5">{detail.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-500">{detail.label}</h3>
                      <p className="text-sm font-semibold text-gray-800 mt-1">{detail.value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {directorData.llp_data && directorData.llp_data.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-blue-700 mb-3">LLP Associations</h3>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <ul className="space-y-2">
                    {directorData.llp_data.map((llp, index) => (
                      <li key={index} className="bg-white p-2 rounded border border-blue-100">
                        <p className="font-medium text-blue-800">{llp.llp_name || "Unnamed LLP"}</p>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">LLPIN:</span> {llp.llpin || "N/A"}
                        </p>
                        {llp.designation && (
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Designation:</span> {llp.designation}
                          </p>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            <div className="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-100">
              <h3 className="font-medium text-blue-800 mb-2">What is a DIN?</h3>
              <p className="text-sm text-blue-700 mb-2">
                A Director Identification Number (DIN) is a unique identification number assigned to an existing or
                potential director of a company.
              </p>
              <ul className="list-disc list-inside text-sm text-blue-700 space-y-1">
                <li>Required for anyone who serves as a director on a company board in India</li>
                <li>Issued by the Ministry of Corporate Affairs (MCA)</li>
                <li>Helps prevent fraud and maintain transparency in corporate governance</li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 mx-auto text-blue-500 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <h2 className="text-xl font-bold text-gray-800 mb-2">Welcome to the Director Search page</h2>
              <p className="text-gray-600 mb-6">
                Use this tool to search for information about company directors using their DIN.
              </p>

              <div className="bg-blue-50 p-4 rounded-lg text-left border border-blue-100">
                <h3 className="font-semibold text-blue-800 mb-2">How to use:</h3>
                <ol className="list-decimal list-inside text-gray-700 space-y-2">
                  <li>Enter a valid 8-digit Director Identification Number (DIN)</li>
                  <li>Click the Search button to retrieve director details</li>
                  <li>View comprehensive information about the director and their company associations</li>
                  <li>Download the information as PDF if needed</li>
                </ol>
              </div>

              <div className="mt-6 bg-yellow-50 p-4 rounded-lg text-left border border-yellow-100">
                <h3 className="font-semibold text-yellow-800 flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  Important Note:
                </h3>
                <p className="text-sm text-yellow-700 mt-1">
                  The DIN is an 8-digit unique identification number issued by the Ministry of Corporate Affairs to
                  individuals who are directors or intend to be directors of a company.
                </p>
              </div>
            </div>
          </div>
        )}
      </li>
    </SearchResult_section>
  )
}

export default DirectorDetails
