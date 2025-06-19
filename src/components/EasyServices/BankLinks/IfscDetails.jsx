"use client"
import { useRef, useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import { Building2, Search, RefreshCw, FileText, AlertCircle, MapPin, Home, Globe, Landmark } from "lucide-react"
import useAuth from "../../../hooks/useAuth"
import { useReactToPrint } from "react-to-print"
import SearchResult_section from "@/components/pagesComponents/pageLayout/SearchResult_section.js"
import { toast } from "react-toastify"

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL

const IfscDetails = () => {
  const { token } = useAuth()
  const navigate = useRouter()
  const [showdata, setShowdata] = useState({})
  const [showhide, setShowHide] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const [isValid, setIsValid] = useState(true)
  const pdf_ref = useRef()
  const inputRef = useRef(null)

  const generatePDF = useReactToPrint({
    content: () => pdf_ref.current,
    documentTitle: "IFSC Details",
  })

  const validateIfsc = (ifsc) => {
    // IFSC validation logic using regular expression
    return /^[A-Z]{4}0[A-Z0-9]{6}$/.test(ifsc)
  }

  const handleInputChange = (e) => {
    const value = e.target.value.toUpperCase()
    setInputValue(value)

    if (value) {
      setIsValid(validateIfsc(value))
    } else {
      setIsValid(true) // Empty input is considered valid until submission
    }
  }

  const generateDataObject = () => ({
    title: "IFSC DETAILS",
    column: ["Field", "Detail"],
    data: [
      {
        Field: "Bank Name",
        Detail: showdata.BANK || "Not Available",
      },
      {
        Field: "Address",
        Detail: showdata.ADDRESS || "Not Available",
      },
      {
        Field: "Bank Code",
        Detail: showdata.BANKCODE || "Not Available",
      },
      {
        Field: "Center",
        Detail: showdata.CENTRE || "Not Available",
      },
      {
        Field: "Branch",
        Detail: showdata.BRANCH || "Not Available",
      },
      {
        Field: "City",
        Detail: showdata.CITY || "Not Available",
      },
      {
        Field: "State",
        Detail: showdata.STATE || "Not Available",
      },
    ],
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!inputValue || !validateIfsc(inputValue)) {
      setIsValid(false)
      return
    }

    setLoading(true)
    setError(false)

    try {
      const response = await axios.post(
        `${BACKEND_URL}/bank/details?ifsc=${inputValue}`,
        { ifsc: inputValue },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      )

      setShowdata(response.data.data)
      setShowHide(true)
    } catch (error) {
      console.error("Error fetching IFSC details:", error)
      setError(true)
      setShowHide(false)
      toast.error(`Could not find any details for this IFSC code!`)
    } finally {
      setLoading(false)
    }
  }

  const payload = () => {
    // Assuming dispatch is defined elsewhere in your actual code
    // dispatch({ type: PDF_DOC, payload: generateDataObject() });
    navigate.push("/pdfViewer")
  }

  const handleClear = async (e) => {
    e.preventDefault()
    setInputValue("")
    setShowdata({})
    setShowHide(false)
    setError(false)
    setIsValid(true)

    // Focus the input after clearing
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  const details = [
    {
      label: "Bank Name",
      value: showdata.BANK || "Not Available",
      icon: <Landmark className="h-4 w-4 text-blue-600" />,
    },
    {
      label: "Address",
      value: showdata.ADDRESS || "Not Available",
      icon: <MapPin className="h-4 w-4 text-blue-600" />,
    },
    {
      label: "Bank Code",
      value: showdata.BANKCODE || "Not Available",
      icon: <Building2 className="h-4 w-4 text-blue-600" />,
    },
    {
      label: "Center",
      value: showdata.CENTRE || "Not Available",
      icon: <Globe className="h-4 w-4 text-blue-600" />,
    },
    {
      label: "Branch",
      value: showdata.BRANCH || "Not Available",
      icon: <Home className="h-4 w-4 text-blue-600" />,
    },
    {
      label: "City",
      value: showdata.CITY || "Not Available",
      icon: <Building2 className="h-4 w-4 text-blue-600" />,
    },
    {
      label: "State",
      value: showdata.STATE || "Not Available",
      icon: <Globe className="h-4 w-4 text-blue-600" />,
    },
  ]

  return (
    <SearchResult_section title="IFSC Code Details">
      <li className="bg-white rounded-lg shadow-md p-4 transition-all duration-300">
        <div className="mb-4 border-b border-gray-200 pb-2">
          <h3 className="text-xl font-bold text-blue-700 flex items-center">
            <Landmark className="h-5 w-5 mr-2" />
            Bank IFSC Search
          </h3>
          <p className="text-gray-600 text-sm">Enter an IFSC code to retrieve bank branch details</p>
        </div>

        <form className="space-y-4">
          <div className="space-y-2">
            <div className="flex flex-col">
              <label htmlFor="ifscInput" className="form-label inline-block mb-1 text-gray-700 font-medium">
                IFSC Code
              </label>
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-grow">
                  <input
                    type="text"
                    id="ifscInput"
                    ref={inputRef}
                    className={`form-input w-full border p-2 rounded-md focus:ring-2 focus:ring-blue-300 focus:outline-none transition-all duration-200 ${
                      !isValid ? "border-red-500 bg-red-50" : "border-blue-500"
                    }`}
                    placeholder="Enter IFSC Code"
                    value={inputValue}
                    onChange={handleInputChange}
                    maxLength={11}
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
                <p className="text-xs text-red-600 mt-1">
                  Please enter a valid IFSC code (Format: AAAA0XXXXXX - 4 letters, 0, followed by 6 alphanumeric
                  characters)
                </p>
              ) : (
                <p className="text-xs text-gray-500 mt-1">
                  Format: AAAA0XXXXXX (4 letters, 0, followed by 6 alphanumeric characters)
                </p>
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

            {showhide && (
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
              Could not find any details for this IFSC code. Please check and try again.
            </p>
          </div>
        )}
      </li>
      <li className="lg:col-span-2 bg-gray-200 p-4 rounded-lg">
        {loading ? (
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="flex flex-col items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
              <p className="text-gray-700 font-medium">Retrieving bank details...</p>
              <p className="text-gray-500 text-sm mt-2">This may take a few moments</p>
            </div>
          </div>
        ) : showhide ? (
          <div className="bg-white rounded-lg shadow-md p-6" ref={pdf_ref}>
            <div className="mb-4 border-b border-gray-200 pb-4">
              <h2 className="text-xl font-bold text-blue-700">Bank Branch Details</h2>
              <p className="text-gray-600 text-sm">
                Information for IFSC: <span className="font-semibold">{inputValue}</span>
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {details.slice(0, 2).map((detail, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg border border-gray-200 col-span-full">
                  <div className="flex items-start">
                    <div className="mr-3 mt-0.5">{detail.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-500">{detail.label}</h3>
                      <p className="text-sm font-semibold text-gray-800 mt-1">{detail.value}</p>
                    </div>
                  </div>
                </div>
              ))}

              {details.slice(2).map((detail, index) => (
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

            <div className="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-100">
              <h3 className="font-medium text-blue-800 mb-2">What is an IFSC Code?</h3>
              <p className="text-sm text-blue-700 mb-2">
                The Indian Financial System Code (IFSC) is an 11-character code assigned by the Reserve Bank of India to
                identify bank branches in India for electronic fund transfers.
              </p>
              <ul className="list-disc list-inside text-sm text-blue-700 space-y-1">
                <li>First 4 characters represent the bank name</li>
                <li>The 5th character is always 0 (zero)</li>
                <li>Last 6 characters represent the branch code</li>
                <li>Required for NEFT, RTGS, and IMPS transactions</li>
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
                  d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                />
              </svg>
              <h2 className="text-xl font-bold text-gray-800 mb-2">Welcome to the IFSC Code Search</h2>
              <p className="text-gray-600 mb-6">
                Use this tool to search for bank branch details using the Indian Financial System Code (IFSC).
              </p>

              <div className="bg-blue-50 p-4 rounded-lg text-left border border-blue-100">
                <h3 className="font-semibold text-blue-800 mb-2">How to use:</h3>
                <ol className="list-decimal list-inside text-gray-700 space-y-2">
                  <li>Enter a valid 11-character IFSC code in the search box</li>
                  <li>Click the Search button to retrieve bank branch details</li>
                  <li>View comprehensive information about the bank branch</li>
                  <li>Download the information as PDF if needed</li>
                </ol>
              </div>

              <div className="mt-6 bg-yellow-50 p-4 rounded-lg text-left border border-yellow-100">
                <h3 className="font-semibold text-yellow-800 flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  Where to find your IFSC code:
                </h3>
                <p className="text-sm text-yellow-700 mt-1">
                  You can find the IFSC code on your cheque book, bank passbook, bank statements, or by contacting your
bank branch. It&apos;s also available on the official websites of most banks.
                </p>
              </div>
            </div>
          </div>
        )}
      </li>
    </SearchResult_section>
  )
}

export default IfscDetails
