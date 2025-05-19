"use client"
import { useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { Building2, Search, RefreshCw, FileText, AlertCircle, Mail, MapPin, Calendar, User } from "lucide-react"
import useAuth from "../../../hooks/useAuth"
import { useReactToPrint } from "react-to-print"
import SearchResult_section from "@/components/pagesComponents/pageLayout/SearchResult_section.js"
import userAxios from "@/lib/userAxios"

export default function SearchTan() {
  const navigate = useRouter()
  const { token } = useAuth()

  const [showdata, setShowdata] = useState({})
  const [showhide, setShowHide] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const [isValid, setIsValid] = useState(true)
  const pdf_ref = useRef()
  const inputRef = useRef(null)

  const validateTan = (tan) => {
    // TAN validation logic using regular expression
    return /^[A-Z]{4}[0-9]{5}[A-Z]$/.test(tan)
  }

  const handleInputChange = (e) => {
    const value = e.target.value.toUpperCase()
    setInputValue(value)

    if (value) {
      setIsValid(validateTan(value))
    } else {
      setIsValid(true) // Empty input is considered valid until submission
    }
  }

  const generateDataObject = () => ({
    title: "TAN DETAILS",
    column: ["Field", "Detail"],
    data: [
      {
        Field: "Name",
        Detail: showdata.nameOrgn || "Not Available",
      },
      {
        Field: "Address",
        Detail:
          `${showdata.addLine1 || ""} ${showdata.addLine2 || ""} ${showdata.addLine3 || ""} ${
            showdata.addLine5 || ""
          }`.trim() || "Not Available",
      },
      {
        Field: "Pin Code",
        Detail: showdata.pin || "Not Available",
      },
      {
        Field: "Tan Allotment",
        Detail: showdata.dtTanAllotment || "Not Available",
      },
      {
        Field: "Email",
        Detail: showdata.emailId1 || "Not Available",
      },
    ],
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!inputValue || !validateTan(inputValue)) {
      setIsValid(false)
      return
    }

    setLoading(true)
    setError(false)

    try {
      const response = await userAxios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/tan/search?tan=${inputValue}`)

      setShowdata(response.data.data)
      setShowHide(true)
    } catch (error) {
      console.error("Error fetching TAN details:", error)
      setError(true)
      setShowHide(false)
    } finally {
      setLoading(false)
    }
  }

  const payload = () => {
    // Assuming dispatch is defined elsewhere in your actual code
    // dispatch({ type: `${PDF_DOC}`, payload: generateDataObject() });
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
      label: "Name",
      value: showdata.nameOrgn || "Not Available",
      icon: <User className="h-4 w-4 text-blue-600" />,
    },
    {
      label: "Address",
      value:
        `${showdata.addLine1 || ""} ${showdata.addLine2 || ""} ${showdata.addLine3 || ""} ${
          showdata.addLine5 || ""
        }`.trim() || "Not Available",
      icon: <Building2 className="h-4 w-4 text-blue-600" />,
    },
    {
      label: "Pin Code",
      value: showdata.pin || "Not Available",
      icon: <MapPin className="h-4 w-4 text-blue-600" />,
    },
    {
      label: "Tan Allotment",
      value: showdata.dtTanAllotment || "Not Available",
      icon: <Calendar className="h-4 w-4 text-blue-600" />,
    },
    {
      label: "Email",
      value: showdata.emailId1 || "Not Available",
      icon: <Mail className="h-4 w-4 text-blue-600" />,
    },
  ]

  const generatePDF = useReactToPrint({
    content: () => pdf_ref.current,
    documentTitle: "TAN Details",
  })

  return (
    <SearchResult_section title="Search TAN Details">
      <li className="bg-white rounded-lg shadow-md p-4 transition-all duration-300">
        <div className="mb-4 border-b border-gray-200 pb-2">
          <h3 className="text-xl font-bold text-blue-700 flex items-center">
            <Building2 className="h-5 w-5 mr-2" />
            TAN Search
          </h3>
          <p className="text-gray-600 text-sm">Enter a TAN number to retrieve associated details</p>
        </div>

        <form className="space-y-4">
          <div className="space-y-2">
            <div className="flex flex-col">
              <label htmlFor="tanInput" className="form-label inline-block mb-1 text-gray-700 font-medium">
                TAN Number
              </label>
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-grow">
                  <input
                    type="text"
                    id="tanInput"
                    ref={inputRef}
                    className={`form-input w-full border p-2 rounded-md focus:ring-2 focus:ring-blue-300 focus:outline-none transition-all duration-200 ${
                      !isValid ? "border-red-500 bg-red-50" : "border-blue-500"
                    }`}
                    placeholder="Enter TAN Number"
                    value={inputValue}
                    onChange={handleInputChange}
                    maxLength={10}
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
                  Please enter a valid TAN number (Format: AAAA00000A - 4 letters, 5 digits, 1 letter)
                </p>
              ) : (
                <p className="text-xs text-gray-500 mt-1">Format: AAAA00000A (4 letters + 5 digits + 1 letter)</p>
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
                <span>Download PDF</span>
              </button>
            )}
          </div>
        </form>

        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600 font-medium flex items-center">
              <AlertCircle className="h-5 w-5 mr-2" />
              Error retrieving TAN details. Please check the TAN number and try again.
            </p>
          </div>
        )}
      </li>
      <li className="lg:col-span-2 bg-gray-200 p-4 rounded-lg">
        {loading ? (
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="flex flex-col items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
              <p className="text-gray-700 font-medium">Retrieving TAN details...</p>
              <p className="text-gray-500 text-sm mt-2">This may take a few moments</p>
            </div>
          </div>
        ) : showhide ? (
          <div className="bg-white rounded-lg shadow-md p-6" ref={pdf_ref}>
            <div className="mb-4 border-b border-gray-200 pb-4">
              <h2 className="text-xl font-bold text-blue-700">TAN Details</h2>
              <p className="text-gray-600 text-sm">
                Information for TAN: <span className="font-semibold">{inputValue}</span>
              </p>
            </div>

            <div className="space-y-4">
              {details.map((detail, index) => (
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
              <h3 className="font-medium text-blue-800 mb-2">What is a TAN?</h3>
              <p className="text-sm text-blue-700 mb-2">
                A Tax Deduction and Collection Account Number (TAN) is a 10-character alphanumeric number required by
                entities responsible for deducting or collecting tax.
              </p>
              <ul className="list-disc list-inside text-sm text-blue-700 space-y-1">
                <li>Required for filing TDS (Tax Deducted at Source) returns</li>
                <li>Mandatory for all persons who deduct or collect tax on payments</li>
                <li>Used for all TDS/TCS related correspondence with the Income Tax Department</li>
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
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <h2 className="text-xl font-bold text-gray-800 mb-2">Welcome to the TAN Search page</h2>
              <p className="text-gray-600 mb-6">
                Use this tool to search for details associated with a Tax Deduction and Collection Account Number (TAN).
              </p>

              <div className="bg-blue-50 p-4 rounded-lg text-left border border-blue-100">
                <h3 className="font-semibold text-blue-800 mb-2">How to use:</h3>
                <ol className="list-decimal list-inside text-gray-700 space-y-2">
                  <li>Enter a valid 10-character TAN in the search box</li>
                  <li>Click the Search button to retrieve TAN details</li>
                  <li>View comprehensive information about the TAN holder</li>
                  <li>Download the information as PDF if needed</li>
                </ol>
              </div>

              <div className="mt-6 bg-yellow-50 p-4 rounded-lg text-left border border-yellow-100">
                <h3 className="font-semibold text-yellow-800 flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  Important Note:
                </h3>
                <p className="text-sm text-yellow-700 mt-1">
                  TAN is a 10-character code assigned to those who are required to deduct tax at source (TDS) or collect
                  tax at source (TCS). It follows the format: AAAA00000A (4 letters + 5 digits + 1 letter).
                </p>
              </div>
            </div>
          </div>
        )}
      </li>
    </SearchResult_section>
  )
}
