"use client"
import { useRef, useState } from "react"
import axios from "axios"
import {
  Building2,
  Mail,
  Users,
  Calendar,
  MapPin,
  FileText,
  Search,
  RefreshCw,
  AlertCircle,
  DollarSign,
  Briefcase,
} from "lucide-react"
import useAuth from "../../../hooks/useAuth"
import { useRouter } from "next/navigation"
import { useReactToPrint } from "react-to-print"
import SearchResult_section from "@/components/pagesComponents/pageLayout/SearchResult_section.js"

const CompanyDetails = () => {
  const { token } = useAuth()
  const [showdata, setShowData] = useState("")
  const [loading, setLoading] = useState(false)
  const [showhide, setShowHide] = useState(false)
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [inputValue, setInputValue] = useState("")
  const [isValid, setIsValid] = useState(true)
  const navigate = useRouter()
  const pdf_ref = useRef()
  const inputRef = useRef(null)

  const generatePDF = useReactToPrint({
    content: () => pdf_ref.current,
    documentTitle: "Company Details",
  })

  const validateCIN = (cin) => {
    // Basic CIN validation - should be 21 characters
    // Format: U74999TG2016PTC111111
    return /^[A-Z]{1}\d{5}[A-Z]{2}\d{4}[A-Z]{3}\d{6}$/.test(cin)
  }

  const handleInputChange = (e) => {
    const value = e.target.value.toUpperCase()
    setInputValue(value)

    if (value) {
      setIsValid(validateCIN(value))
    } else {
      setIsValid(true) // Empty input is considered valid until submission
    }
  }

  const generateDataObject = () => ({
    title: "COMPANY DETAILS",
    column: ["Field", "Detail"],
    data: [
      {
        Field: "Company Name",
        Detail: showdata.company_name || "Not Available",
      },
      {
        Field: "Class",
        Detail: showdata.class_of_company || "Not Available",
      },
      {
        Field: "Company Category",
        Detail: showdata.company_category || "Not Available",
      },
      {
        Field: "Email Id",
        Detail: showdata.email_id || "Not Available",
      },
      {
        Field: "Number Of Member",
        Detail: showdata.number_of_members || "Not Available",
      },
      {
        Field: "Date Of The Last AGM",
        Detail: showdata.date_of_last_agm || "Not Available",
      },
      {
        Field: "Registered Address",
        Detail: showdata.registered_address || "Not Available",
      },
      {
        Field: "Address Other Then R/O",
        Detail:
          showdata["address_other_than_r/o_where_all_or_any_books_of_account_and_papers_are_maintained"] ||
          "Not Available",
      },
      {
        Field: "Active Compliance",
        Detail: showdata.active_compliance || "Not Available",
      },
      {
        Field: "Registration Number",
        Detail: showdata.registration_number || "Not Available",
      },
      {
        Field: "Paid Up Capital(rs)",
        Detail: showdata["paid_up_capital(rs)"] || "Not Available",
      },
      {
        Field: "Whether Listed Or Not",
        Detail: showdata.whether_listed_or_not || "Not Available",
      },
      {
        Field: "Suspended At Stock Exchange",
        Detail: showdata.suspended_at_stock_exchange || "Not Available",
      },
      {
        Field: "Company Subcategory",
        Detail: showdata.company_subcategory || "Not Available",
      },
      {
        Field: "Authorised Capital(rs)",
        Detail: showdata["authorised_capital(rs)"] || "Not Available",
      },
      {
        Field: "Company Status(For Efiling)",
        Detail: showdata["company_status(for_efiling)"] || "Not Available",
      },
      {
        Field: "Roc Code",
        Detail: showdata.roc_code || "Not Available",
      },
      {
        Field: "Date Of Balance Sheet",
        Detail: showdata.date_of_balance_sheet || "Not Available",
      },
      {
        Field: "Date Of Incorporation",
        Detail: showdata.date_of_incorporation || "Not Available",
      },
    ],
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!inputValue || !validateCIN(inputValue)) {
      setIsValid(false)
      return
    }

    setLoading(true)
    setError(false)
    setErrorMessage("")

    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/mca/company-details?cin=${inputValue}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      setShowData(response.data.data.company_master_data)
      setShowHide(true)
    } catch (error) {
      console.error("Error fetching company details:", error)
      setError(true)
      setShowHide(false)
      setErrorMessage(
        error.response?.data?.message || "An error occurred while fetching company details. Please try again.",
      )
    } finally {
      setLoading(false)
    }
  }

  const handleClear = (e) => {
    e.preventDefault()
    setInputValue("")
    setShowData("")
    setShowHide(false)
    setError(false)
    setErrorMessage("")
    setIsValid(true)

    // Focus the input after clearing
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  // Group details for better display
  const basicDetails = [
    {
      label: "Company Name",
      value: showdata.company_name || "Not Available",
      icon: <Building2 className="h-4 w-4 text-blue-600" />,
    },
    {
      label: "Class",
      value: showdata.class_of_company || "Not Available",
      icon: <Briefcase className="h-4 w-4 text-blue-600" />,
    },
    {
      label: "Company Category",
      value: showdata.company_category || "Not Available",
      icon: <Briefcase className="h-4 w-4 text-blue-600" />,
    },
    {
      label: "Company Subcategory",
      value: showdata.company_subcategory || "Not Available",
      icon: <Briefcase className="h-4 w-4 text-blue-600" />,
    },
  ]

  const contactDetails = [
    {
      label: "Email Id",
      value: showdata.email_id || "Not Available",
      icon: <Mail className="h-4 w-4 text-blue-600" />,
    },
    {
      label: "Registered Address",
      value: showdata.registered_address || "Not Available",
      icon: <MapPin className="h-4 w-4 text-blue-600" />,
    },
    {
      label: "Address Other Then R/O",
      value:
        showdata["address_other_than_r/o_where_all_or_any_books_of_account_and_papers_are_maintained"] ||
        "Not Available",
      icon: <MapPin className="h-4 w-4 text-blue-600" />,
    },
  ]

  const financialDetails = [
    {
      label: "Paid Up Capital(rs)",
      value: showdata["paid_up_capital(rs)"] || "Not Available",
      icon: <DollarSign className="h-4 w-4 text-blue-600" />,
    },
    {
      label: "Authorised Capital(rs)",
      value: showdata["authorised_capital(rs)"] || "Not Available",
      icon: <DollarSign className="h-4 w-4 text-blue-600" />,
    },
    {
      label: "Whether Listed Or Not",
      value: showdata.whether_listed_or_not || "Not Available",
      icon: <FileText className="h-4 w-4 text-blue-600" />,
    },
    {
      label: "Suspended At Stock Exchange",
      value: showdata.suspended_at_stock_exchange || "Not Available",
      icon: <FileText className="h-4 w-4 text-blue-600" />,
    },
  ]

  const complianceDetails = [
    {
      label: "Active Compliance",
      value: showdata.active_compliance || "Not Available",
      icon: <FileText className="h-4 w-4 text-blue-600" />,
    },
    {
      label: "Company Status(For Efiling)",
      value: showdata["company_status(for_efiling)"] || "Not Available",
      icon: <FileText className="h-4 w-4 text-blue-600" />,
    },
    {
      label: "Number Of Members",
      value: showdata.number_of_members || "Not Available",
      icon: <Users className="h-4 w-4 text-blue-600" />,
    },
  ]

  const dateDetails = [
    {
      label: "Date Of Incorporation",
      value: showdata.date_of_incorporation || "Not Available",
      icon: <Calendar className="h-4 w-4 text-blue-600" />,
    },
    {
      label: "Date Of The Last AGM",
      value: showdata.date_of_last_agm || "Not Available",
      icon: <Calendar className="h-4 w-4 text-blue-600" />,
    },
    {
      label: "Date Of Balance Sheet",
      value: showdata.date_of_balance_sheet || "Not Available",
      icon: <Calendar className="h-4 w-4 text-blue-600" />,
    },
  ]

  const otherDetails = [
    {
      label: "Registration Number",
      value: showdata.registration_number || "Not Available",
      icon: <FileText className="h-4 w-4 text-blue-600" />,
    },
    {
      label: "Roc Code",
      value: showdata.roc_code || "Not Available",
      icon: <FileText className="h-4 w-4 text-blue-600" />,
    },
  ]

  return (
    <SearchResult_section title="Company Details">
      <li className="bg-white rounded-lg shadow-md p-4 transition-all duration-300">
        <div className="mb-4 border-b border-gray-200 pb-2">
          <h3 className="text-xl font-bold text-blue-700 flex items-center">
            <Building2 className="h-5 w-5 mr-2" />
            Company Information Search
          </h3>
          <p className="text-gray-600 text-sm">Enter a Company Identification Number (CIN) to retrieve details</p>
        </div>

        <form className="space-y-4">
          <div className="space-y-2">
            <div className="flex flex-col">
              <label htmlFor="cinInput" className="form-label inline-block mb-1 text-gray-700 font-medium">
                Company Identification Number (CIN)
              </label>
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-grow">
                  <input
                    type="text"
                    id="cinInput"
                    ref={inputRef}
                    className={`form-input w-full border p-2 rounded-md focus:ring-2 focus:ring-blue-300 focus:outline-none transition-all duration-200 ${
                      !isValid ? "border-red-500 bg-red-50" : "border-blue-500"
                    }`}
                    placeholder="Enter CIN (e.g., U74999TG2016PTC111111)"
                    value={inputValue}
                    onChange={handleInputChange}
                    maxLength={21}
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
                  Please enter a valid CIN (Format: 1 letter + 5 digits + 2 letters + 4 digits + 3 letters + 6 digits)
                </p>
              ) : (
                <p className="text-xs text-gray-500 mt-1">Format: U74999TG2016PTC111111</p>
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
              {errorMessage || "Please enter a valid CIN"}
            </p>
          </div>
        )}
      </li>
      <li className="lg:col-span-2 bg-gray-200 p-4 rounded-lg">
        {loading ? (
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="flex flex-col items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
              <p className="text-gray-700 font-medium">Retrieving company details...</p>
              <p className="text-gray-500 text-sm mt-2">This may take a few moments</p>
            </div>
          </div>
        ) : showhide ? (
          <div className="bg-white rounded-lg shadow-md p-6" ref={pdf_ref}>
            <div className="mb-4 border-b border-gray-200 pb-4">
              <h2 className="text-xl font-bold text-blue-700">Company Information</h2>
              <p className="text-gray-600 text-sm">
                CIN: <span className="font-semibold">{inputValue}</span>
              </p>
            </div>

            <div className="space-y-6">
              {/* Basic Details Section */}
              <div>
                <h3 className="text-lg font-semibold text-blue-700 mb-3 flex items-center">
                  <Building2 className="h-5 w-5 mr-2" />
                  Basic Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {basicDetails.map((detail, index) => (
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
              </div>

              {/* Contact Details Section */}
              <div>
                <h3 className="text-lg font-semibold text-blue-700 mb-3 flex items-center">
                  <Mail className="h-5 w-5 mr-2" />
                  Contact Information
                </h3>
                <div className="space-y-3">
                  {contactDetails.map((detail, index) => (
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
              </div>

              {/* Financial Details Section */}
              <div>
                <h3 className="text-lg font-semibold text-blue-700 mb-3 flex items-center">
                  <DollarSign className="h-5 w-5 mr-2" />
                  Financial Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {financialDetails.map((detail, index) => (
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
              </div>

              {/* Compliance Details Section */}
              <div>
                <h3 className="text-lg font-semibold text-blue-700 mb-3 flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Compliance Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {complianceDetails.map((detail, index) => (
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
              </div>

              {/* Date Details Section */}
              <div>
                <h3 className="text-lg font-semibold text-blue-700 mb-3 flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Important Dates
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {dateDetails.map((detail, index) => (
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
              </div>

              {/* Other Details Section */}
              <div>
                <h3 className="text-lg font-semibold text-blue-700 mb-3 flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Other Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {otherDetails.map((detail, index) => (
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
              </div>
            </div>

            <div className="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-100">
              <h3 className="font-medium text-blue-800 mb-2">What is a CIN?</h3>
              <p className="text-sm text-blue-700 mb-2">
                A Corporate Identity Number (CIN) is a unique 21-character alphanumeric identifier assigned to companies
                registered in India by the Ministry of Corporate Affairs.
              </p>
              <ul className="list-disc list-inside text-sm text-blue-700 space-y-1">
                <li>First character: Company type (e.g., U for Unlisted, L for Listed)</li>
                <li>Next 5 digits: Industry code</li>
                <li>Next 2 characters: State code</li>
                <li>Next 4 digits: Year of incorporation</li>
                <li>Next 3 characters: Company status (e.g., PTC for Private Limited)</li>
                <li>Last 6 digits: Company registration number</li>
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
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
              <h2 className="text-xl font-bold text-gray-800 mb-2">Welcome to the Company Search page</h2>
              <p className="text-gray-600 mb-6">
                Use this tool to search for comprehensive information about companies registered in India.
              </p>

              <div className="bg-blue-50 p-4 rounded-lg text-left border border-blue-100">
                <h3 className="font-semibold text-blue-800 mb-2">How to use:</h3>
                <ol className="list-decimal list-inside text-gray-700 space-y-2">
                  <li>Enter a valid 21-character Company Identification Number (CIN)</li>
                  <li>Click the Search button to retrieve company details</li>
                  <li>View comprehensive information about the company</li>
                  <li>Download the information as PDF if needed</li>
                </ol>
              </div>

              <div className="mt-6 bg-yellow-50 p-4 rounded-lg text-left border border-yellow-100">
                <h3 className="font-semibold text-yellow-800 flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  Important Note:
                </h3>
                <p className="text-sm text-yellow-700 mt-1">
                  The CIN is a 21-character code assigned to companies registered under the Companies Act. It follows
                  the format: U74999TG2016PTC111111 (1 letter + 5 digits + 2 letters + 4 digits + 3 letters + 6 digits).
                </p>
              </div>
            </div>
          </div>
        )}
      </li>
    </SearchResult_section>
  )
}

export default CompanyDetails
