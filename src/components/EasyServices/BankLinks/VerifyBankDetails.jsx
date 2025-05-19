"use client"
import { useRef, useState } from "react"
import axios from "axios"
import {
  CreditCard,
  Building2,
  User,
  Phone,
  Search,
  RefreshCw,
  FileText,
  AlertCircle,
  CheckCircle,
  XCircle,
} from "lucide-react"
import useAuth from "../../../hooks/useAuth"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import { useReactToPrint } from "react-to-print"
import SearchResult_section from "@/components/pagesComponents/pageLayout/SearchResult_section.js"

// Make sure this environment variable is properly set in your .env.local file
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL

const VerifyBankDetails = () => {
  const { token } = useAuth()
  const [showdata, setShowdata] = useState(null)
  const [showhide, setShowHide] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formValues, setFormValues] = useState({
    accountNumber: "",
    ifscCode: "",
    accountHolderName: "",
    phone: "",
  })
  const [formErrors, setFormErrors] = useState({
    accountNumber: "",
    ifscCode: "",
    accountHolderName: "",
    phone: "",
  })
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const pdf_ref = useRef()

  // Regex patterns for validation
  const nameRegex = /^[A-Za-z\s.'-]{2,}$/i
  const ifscRegex = /^[A-Z]{4}[0][A-Z0-9]{6}$/
  const accountNumberRegex = /^\d{3,20}$/
  const phoneNumberRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/

  const navigate = useRouter()

  const generatePDF = useReactToPrint({
    content: () => pdf_ref.current,
    documentTitle: "Bank Account Verification",
  })

  const generateDataObject = () => ({
    title: "VERIFICATION DETAILS",
    column: ["Field", "Detail"],
    data: [
      {
        Field: "Account Status",
        Detail: showdata?.message || "N/A",
      },
      {
        Field: "Account Holder Name ",
        Detail: showdata?.name_at_bank || "N/A",
      },
      {
        Field: "Account Reference Id",
        Detail: showdata?.utr || "N/A",
      },
    ],
  })

  const validateField = (name, value) => {
    switch (name) {
      case "accountNumber":
        return accountNumberRegex.test(value)
          ? ""
          : "Account number should be 3-20 digits without spaces or special characters"
      case "ifscCode":
        return ifscRegex.test(value)
          ? ""
          : "IFSC should be 4 letters followed by 0 and 6 alphanumeric characters (e.g., HDFC0001234)"
      case "accountHolderName":
        return nameRegex.test(value) ? "" : "Please enter a valid name (at least 2 characters)"
      case "phone":
        return phoneNumberRegex.test(value) ? "" : "Please enter a valid 10-digit mobile number"
      default:
        return ""
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    let processedValue = value

    // For IFSC, convert to uppercase
    if (name === "ifscCode") {
      processedValue = value.toUpperCase()
    }

    // For account holder name, convert to uppercase
    if (name === "accountHolderName") {
      processedValue = value.toUpperCase()
    }

    setFormValues({
      ...formValues,
      [name]: processedValue,
    })

    // Validate the field only if it has a value
    if (processedValue) {
      setFormErrors({
        ...formErrors,
        [name]: validateField(name, processedValue),
      })
    } else {
      // Clear error if field is empty
      setFormErrors({
        ...formErrors,
        [name]: "",
      })
    }
  }

  const validateForm = () => {
    const errors = {}
    let isValid = true

    // Validate all fields
    Object.keys(formValues).forEach((key) => {
      const value = formValues[key]
      if (!value) {
        errors[key] = `${key === "ifscCode" ? "IFSC Code" : key.replace(/([A-Z])/g, " $1").trim()} is required`
        isValid = false
      } else {
        const error = validateField(key, value)
        if (error) {
          errors[key] = error
          isValid = false
        }
      }
    })

    setFormErrors(errors)
    return isValid
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      toast.error("Please fill all fields correctly")
      return
    }

    setLoading(true)
    setError(false)
    setErrorMessage("")

    try {
      // Add debug logging
      console.log("Submitting to:", `${BACKEND_URL}/bank/verify-account`)

      if (!BACKEND_URL) {
        throw new Error("BACKEND_URL is not configured")
      }

      if (!token) {
        throw new Error("Authentication token is missing")
      }

      const response = await axios.post(
        `${BACKEND_URL}/bank/verify-account`,
        {
          accountNumber: formValues.accountNumber,
          ifsc: formValues.ifscCode,
          name: formValues.accountHolderName,
          mobile: formValues.phone,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          timeout: 10000, // 10 second timeout
        },
      )

      console.log("API Response:", response)

      if (response.data && response.data.data) {
        setShowdata(response.data.data)
        setShowHide(true)
        toast.success("Bank details verified successfully")
      } else {
        throw new Error("Invalid response format")
      }
    } catch (error) {
      console.error("Error verifying bank details:", error)

      // Extract and display meaningful error messages
      let message = "Failed to verify bank details"

      if (error.response) {
        // The server responded with a status code outside the 2xx range
        message = error.response.data?.message || `Server error: ${error.response.status}`
        console.log("Error response data:", error.response.data)
      } else if (error.request) {
        // The request was made but no response was received
        message = "No response from server. Please check your connection"
      } else {
        // Something happened in setting up the request
        message = error.message || "Unknown error occurred"
      }

      setErrorMessage(message)
      setError(true)
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  const handleClear = (e) => {
    e.preventDefault()
    setFormValues({
      accountNumber: "",
      ifscCode: "",
      accountHolderName: "",
      phone: "",
    })
    setFormErrors({
      accountNumber: "",
      ifscCode: "",
      accountHolderName: "",
      phone: "",
    })
    setShowdata(null)
    setShowHide(false)
    setError(false)
    setErrorMessage("")
  }

  // Get verification status type
  const getStatusType = (status) => {
    if (!status) return "neutral"

    const lowerStatus = status.toLowerCase()
    if (lowerStatus.includes("success") || lowerStatus.includes("verified") || lowerStatus.includes("valid")) {
      return "success"
    } else if (lowerStatus.includes("fail") || lowerStatus.includes("invalid") || lowerStatus.includes("not")) {
      return "error"
    }

    return "neutral"
  }

  return (
    <SearchResult_section title="Bank Account Verification">
      <li className="bg-white rounded-lg shadow-md p-4 transition-all duration-300">
        <div className="mb-4 border-b border-gray-200 pb-2">
          <h3 className="text-xl font-bold text-blue-700 flex items-center">
            <Building2 className="h-5 w-5 mr-2" />
            Verify Bank Account Details
          </h3>
          <p className="text-gray-600 text-sm">Enter account details to verify bank information</p>
        </div>

        <form className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
            <div>
              <label
                htmlFor="accountNumber"
                className="form-label inline-block mb-2 text-gray-700 font-medium flex items-center"
              >
                <CreditCard className="h-4 w-4 mr-1" />
                Account Number
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="accountNumber"
                  name="accountNumber"
                  className={`form-input w-full border p-2 rounded-md focus:ring-2 focus:ring-blue-300 focus:outline-none transition-all duration-200 ${
                    formErrors.accountNumber ? "border-red-500 bg-red-50" : "border-blue-500"
                  }`}
                  placeholder="Enter Account Number"
                  value={formValues.accountNumber}
                  onChange={handleInputChange}
                />
                {formErrors.accountNumber && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500">
                    <AlertCircle className="h-5 w-5" />
                  </div>
                )}
              </div>
              {formErrors.accountNumber ? (
                <p className="text-xs text-red-600 mt-1">{formErrors.accountNumber}</p>
              ) : (
                <p className="text-xs text-gray-500 mt-1">Enter your bank account number (3-20 digits)</p>
              )}
            </div>

            <div>
              <label
                htmlFor="ifscCode"
                className="form-label inline-block mb-2 text-gray-700 font-medium flex items-center"
              >
                <Building2 className="h-4 w-4 mr-1" />
                IFSC Code
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="ifscCode"
                  name="ifscCode"
                  className={`form-input w-full border p-2 rounded-md focus:ring-2 focus:ring-blue-300 focus:outline-none transition-all duration-200 ${
                    formErrors.ifscCode ? "border-red-500 bg-red-50" : "border-blue-500"
                  }`}
                  placeholder="Enter IFSC Code (e.g., HDFC0001234)"
                  value={formValues.ifscCode}
                  onChange={handleInputChange}
                  maxLength={11}
                />
                {formErrors.ifscCode && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500">
                    <AlertCircle className="h-5 w-5" />
                  </div>
                )}
              </div>
              {formErrors.ifscCode ? (
                <p className="text-xs text-red-600 mt-1">{formErrors.ifscCode}</p>
              ) : (
                <p className="text-xs text-gray-500 mt-1">Format: AAAA0XXXXXX (e.g., HDFC0001234)</p>
              )}
            </div>

            <div>
              <label
                htmlFor="accountHolderName"
                className="form-label inline-block mb-2 text-gray-700 font-medium flex items-center"
              >
                <User className="h-4 w-4 mr-1" />
                Account Holder Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="accountHolderName"
                  name="accountHolderName"
                  className={`form-input w-full border p-2 rounded-md focus:ring-2 focus:ring-blue-300 focus:outline-none transition-all duration-200 ${
                    formErrors.accountHolderName ? "border-red-500 bg-red-50" : "border-blue-500"
                  }`}
                  placeholder="Enter Account Holder Name"
                  value={formValues.accountHolderName}
                  onChange={handleInputChange}
                />
                {formErrors.accountHolderName && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500">
                    <AlertCircle className="h-5 w-5" />
                  </div>
                )}
              </div>
              {formErrors.accountHolderName ? (
                <p className="text-xs text-red-600 mt-1">{formErrors.accountHolderName}</p>
              ) : (
                <p className="text-xs text-gray-500 mt-1">Enter name exactly as it appears on your bank account</p>
              )}
            </div>

            <div>
              <label
                htmlFor="phone"
                className="form-label inline-block mb-2 text-gray-700 font-medium flex items-center"
              >
                <Phone className="h-4 w-4 mr-1" />
                Mobile Number
              </label>
              <div className="relative">
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className={`form-input w-full border p-2 rounded-md focus:ring-2 focus:ring-blue-300 focus:outline-none transition-all duration-200 ${
                    formErrors.phone ? "border-red-500 bg-red-50" : "border-blue-500"
                  }`}
                  placeholder="Enter 10-digit Mobile Number"
                  value={formValues.phone}
                  onChange={handleInputChange}
                  maxLength={10}
                />
                {formErrors.phone && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500">
                    <AlertCircle className="h-5 w-5" />
                  </div>
                )}
              </div>
              {formErrors.phone ? (
                <p className="text-xs text-red-600 mt-1">{formErrors.phone}</p>
              ) : (
                <p className="text-xs text-gray-500 mt-1">Enter the mobile number linked to your bank account</p>
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
                  <span>Verifying...</span>
                </>
              ) : (
                <>
                  <Search className="h-4 w-4" />
                  <span>Verify</span>
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
              {errorMessage || "The details entered could not be verified. Please check and try again."}
            </p>
          </div>
        )}
      </li>

      <li className="lg:col-span-2 bg-gray-200 p-4 rounded-lg">
        {loading ? (
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="flex flex-col items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
              <p className="text-gray-700 font-medium">Verifying bank account details...</p>
              <p className="text-gray-500 text-sm mt-2">This may take a few moments</p>
            </div>
          </div>
        ) : showhide && showdata ? (
          <div className="bg-white rounded-lg shadow-md p-6" ref={pdf_ref}>
            <div className="mb-4 border-b border-gray-200 pb-4">
              <h2 className="text-xl font-bold text-blue-700">Bank Account Verification Result</h2>
              <div className="flex flex-col sm:flex-row sm:justify-between mt-2">
                <p className="text-gray-600 text-sm">
                  <span className="font-medium">Account:</span> {formValues.accountNumber}
                </p>
                <p className="text-gray-600 text-sm">
                  <span className="font-medium">IFSC:</span> {formValues.ifscCode}
                </p>
              </div>
            </div>

            <div
              className={`p-6 rounded-lg border mb-6 ${
                getStatusType(showdata.message) === "success"
                  ? "bg-green-50 border-green-200"
                  : getStatusType(showdata.message) === "error"
                    ? "bg-red-50 border-red-200"
                    : "bg-blue-50 border-blue-100"
              }`}
            >
              {getStatusType(showdata.message) === "success" ? (
                <div className="flex items-start">
                  <CheckCircle className="h-10 w-10 text-green-500 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-green-700">Verification Successful</h3>
                    <p className="mt-1 text-green-600">{showdata.message}</p>
                    <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2">
                      <div className="bg-white bg-opacity-50 p-2 rounded border border-green-100">
                        <span className="text-sm font-medium text-green-800">Account Holder:</span>
                        <p className="text-sm font-semibold">{showdata.name_at_bank || "Not Available"}</p>
                      </div>
                      <div className="bg-white bg-opacity-50 p-2 rounded border border-green-100">
                        <span className="text-sm font-medium text-green-800">Reference ID:</span>
                        <p className="text-sm font-mono">{showdata.utr || "Not Available"}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : getStatusType(showdata.message) === "error" ? (
                <div className="flex items-start">
                  <XCircle className="h-10 w-10 text-red-500 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-red-700">Verification Failed</h3>
                    <p className="mt-1 text-red-600">{showdata.message}</p>
                    {showdata.name_at_bank && (
                      <div className="mt-3 bg-white bg-opacity-50 p-2 rounded border border-red-100">
                        <span className="text-sm font-medium text-red-800">Account Holder:</span>
                        <p className="text-sm font-semibold">{showdata.name_at_bank}</p>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex items-start">
                  <AlertCircle className="h-10 w-10 text-blue-500 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-blue-700">Verification Status</h3>
                    <p className="mt-1 text-blue-600">{showdata.message}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-100">
              <h3 className="font-medium text-blue-800 mb-2">About Bank Account Verification</h3>
              <p className="text-sm text-blue-700 mb-2">
                Bank account verification confirms that the account details you've provided are valid and match the
                account holder's information.
              </p>
              <ul className="list-disc list-inside text-sm text-blue-700 space-y-1">
                <li>Ensures that payments are sent to the correct recipient</li>
                <li>Helps prevent fraud and errors in financial transactions</li>
                <li>Verifies the link between account number, IFSC code, and account holder name</li>
                <li>Provides a reference ID for future tracking</li>
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
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                />
              </svg>
              <h2 className="text-xl font-bold text-gray-800 mb-2">Welcome to Bank Account Verification</h2>
              <p className="text-gray-600 mb-6">
                Verify bank account details to ensure secure and accurate financial transactions.
              </p>

              <div className="bg-blue-50 p-4 rounded-lg text-left border border-blue-100">
                <h3 className="font-semibold text-blue-800 mb-2">How to use:</h3>
                <ol className="list-decimal list-inside text-gray-700 space-y-2">
                  <li>Enter the account number you want to verify</li>
                  <li>Enter the IFSC code of the bank branch</li>
                  <li>Enter the account holder's name exactly as it appears on the bank account</li>
                  <li>Enter the mobile number linked to the bank account</li>
                  <li>Click the "Verify Account" button</li>
                  <li>View the verification result</li>
                </ol>
              </div>

              <div className="mt-6 bg-yellow-50 p-4 rounded-lg text-left border border-yellow-100">
                <h3 className="font-semibold text-yellow-800 flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  Important Note:
                </h3>
                <p className="text-sm text-yellow-700 mt-1">
                  Always verify bank account details before making payments to avoid sending money to the wrong account.
                  The name must match exactly as registered with the bank.
                </p>
              </div>
            </div>
          </div>
        )}
      </li>
    </SearchResult_section>
  )
}

export default VerifyBankDetails
