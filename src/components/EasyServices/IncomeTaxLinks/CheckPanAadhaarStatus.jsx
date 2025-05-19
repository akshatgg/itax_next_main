"use client"
import { useRef, useState } from "react"
import axios from "axios"
import useAuth from "../../../hooks/useAuth"
import { aadharRegex, panRegex } from "@/components/regexPatterns"
import { useReactToPrint } from "react-to-print"
import SearchResult_section from "@/components/pagesComponents/pageLayout/SearchResult_section.js"
import { CreditCard, Fingerprint, Search, RefreshCw, FileText, AlertCircle, CheckCircle, XCircle } from "lucide-react"

export default function CheckPanAadhaarStatus() {
  const { token } = useAuth()

  const panRef = useRef("")
  const aadhaarRef = useRef("")
  const [showdata, setShowData] = useState("")
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const pdf_ref = useRef()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const newErrors = {}

    if (!aadhaarRef.current.value || !aadharRegex.test(aadhaarRef.current.value)) {
      newErrors.adhaar = "Invalid Aadhaar number"
    }

    if (!panRef.current.value || !panRegex.test(panRef.current.value)) {
      newErrors.pan = "Invalid PAN number"
    }

    setErrors(newErrors)

    try {
      if (Object.keys(newErrors).length === 0) {
        console.log("Form submitted successfully")
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/pan/pan-aadhaar-link-status/`,
          {
            pan: panRef.current.value,
            aadhaar: aadhaarRef.current.value,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        )

        console.log(response.data.data.message) // Check the response data received from the server
        setShowData(response.data.data.message)
      }
    } catch (error) {
      console.log(error)
      setShowData("Error: Unable to verify the link status. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const manageHandleClear = (e) => {
    e.preventDefault()
    panRef.current.value = ""
    aadhaarRef.current.value = ""
    setShowData("")
    setErrors({})
    setLoading(false)
  }

  const handleInputChange = (event) => {
    if (event.target.value) {
      event.target.value = event.target.value.toUpperCase()
    }
  }

  const generatePDF = useReactToPrint({
    content: () => pdf_ref.current,
    documentTitle: "Pan Aadhaar Status",
  })

  // Function to determine if the link status is positive or negative
  const getLinkStatusType = (message) => {
    if (!message) return "neutral"

    const lowerMessage = message.toLowerCase()
    if (lowerMessage.includes("successfully") || lowerMessage.includes("linked") || lowerMessage.includes("valid")) {
      return "success"
    } else if (
      lowerMessage.includes("not linked") ||
      lowerMessage.includes("invalid") ||
      lowerMessage.includes("failed") ||
      lowerMessage.includes("error")
    ) {
      return "error"
    }

    return "neutral"
  }

  // Get appropriate styling based on link status
  const getLinkStatusStyle = (message) => {
    const statusType = getLinkStatusType(message)

    switch (statusType) {
      case "success":
        return "bg-green-50 border-green-200 text-green-800"
      case "error":
        return "bg-red-50 border-red-200 text-red-800"
      default:
        return "bg-blue-50 border-blue-200 text-blue-800"
    }
  }

  // Get appropriate icon based on link status
  const getLinkStatusIcon = (message) => {
    const statusType = getLinkStatusType(message)

    switch (statusType) {
      case "success":
        return <CheckCircle className="h-8 w-8 text-green-500 mr-3" />
      case "error":
        return <XCircle className="h-8 w-8 text-red-500 mr-3" />
      default:
        return null
    }
  }

  return (
    <SearchResult_section title="Check PAN-Aadhaar Link Status">
      <li className="bg-white rounded-lg shadow-md p-4 transition-all duration-300">
        <form className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
            <div>
              <label
                htmlFor="panInput"
                className="form-label inline-block mb-2 text-gray-700 font-medium flex items-center"
              >
                <CreditCard className="h-4 w-4 mr-1" />
                PAN Number
              </label>
              <div className="relative">
                <input
                  type="text"
                  className={`form-input w-full border p-2 rounded border-blue-500 focus:ring-2 focus:ring-blue-300 focus:outline-none ${
                    errors.pan ? "border-red-500 bg-red-50" : ""
                  }`}
                  id="panInput"
                  placeholder="Enter PAN Number"
                  ref={panRef}
                  onChange={handleInputChange}
                  maxLength={10}
                />
                {errors.pan && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500">
                    <AlertCircle className="h-5 w-5" />
                  </div>
                )}
              </div>
              {errors.pan ? (
                <p className="text-xs text-red-700 mt-1">{errors.pan}</p>
              ) : (
                <p className="text-xs text-gray-500 mt-1">Format: ABCDE1234F (5 letters + 4 digits + 1 letter)</p>
              )}
            </div>
            <div>
              <label
                htmlFor="aadhaarInput"
                className="form-label inline-block mb-2 text-gray-700 font-medium flex items-center"
              >
                <Fingerprint className="h-4 w-4 mr-1" />
                Aadhaar Number
              </label>
              <div className="relative">
                <input
                  type="text"
                  className={`form-input w-full border p-2 rounded border-blue-500 focus:ring-2 focus:ring-blue-300 focus:outline-none ${
                    errors.adhaar ? "border-red-500 bg-red-50" : ""
                  }`}
                  id="aadhaarInput"
                  placeholder="Enter Aadhaar Number"
                  ref={aadhaarRef}
                  maxLength={12}
                />
                {errors.adhaar && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500">
                    <AlertCircle className="h-5 w-5" />
                  </div>
                )}
              </div>
              {errors.adhaar ? (
                <p className="text-xs text-red-700 mt-1">{errors.adhaar}</p>
              ) : (
                <p className="text-xs text-gray-500 mt-1">Format: 12 digits (e.g., 123456789012)</p>
              )}
            </div>
          </div>
          <div className="grid gap-3 grid-cols-1 sm:grid-cols-3">
            <button
              disabled={loading}
              onClick={handleSubmit}
              type="button"
              className={`flex items-center justify-center gap-2 px-4 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
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
                  <Search className="h-5 w-5" />
                  <span>Verify</span>
                </>
              )}
            </button>
            <button
              disabled={loading}
              onClick={(e) => manageHandleClear(e)}
              type="button"
              className={`flex items-center justify-center gap-2 px-4 py-2 rounded-md text-white bg-amber-500 hover:bg-amber-600 transition-colors ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              <RefreshCw className="h-5 w-5" />
              <span>Clear</span>
            </button>
            {showdata && (
              <button
                type="button"
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-md text-white bg-green-500 hover:bg-green-600 transition-colors"
                onClick={generatePDF}
              >
                <FileText className="h-5 w-5" />
                <span>PDF</span>
              </button>
            )}
          </div>
        </form>
      </li>
      <li className="lg:col-span-2 bg-gray-200 p-4 rounded-lg">
        <div className="flex flex-col" ref={pdf_ref}>
          {loading ? (
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="flex flex-col items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
                <p className="text-gray-700 font-medium">Verifying PAN-Aadhaar link status...</p>
                <p className="text-gray-500 text-sm mt-2">This may take a few moments</p>
              </div>
            </div>
          ) : showdata ? (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="mb-4 border-b border-gray-200 pb-4">
                <h2 className="text-xl font-bold text-blue-700">PAN-Aadhaar Link Status</h2>
                <p className="text-gray-600 text-sm">
                  Verification result for PAN {panRef.current.value} and Aadhaar {aadhaarRef.current.value}
                </p>
              </div>

              <div className={`p-4 rounded-lg border ${getLinkStatusStyle(showdata)} flex items-start`}>
                {getLinkStatusIcon(showdata)}
                <div>
                  <h3 className="font-semibold text-lg mb-1">Verification Result</h3>
                  <p className="text-base">{showdata}</p>
                </div>
              </div>

              <div className="mt-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="font-medium text-gray-700 mb-2">What does this mean?</h3>
                <p className="text-sm text-gray-600 mb-2">
                  The PAN-Aadhaar linking is mandatory as per the Income Tax Act. A linked status ensures:
                </p>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                  <li>Seamless filing of income tax returns</li>
                  <li>Faster processing of tax refunds</li>
                  <li>Prevention of duplicate PAN issuance</li>
                  <li>Enhanced security for your financial transactions</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-center">
                <div className="mb-6">
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
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                  <h2 className="text-xl font-bold text-gray-800 mb-2">Welcome to the PAN-Aadhaar Verification</h2>
                </div>
                <p className="text-gray-600 mb-6">
                  Use this tool to check if your PAN card is linked with your Aadhaar number as required by the Income
                  Tax Department.
                </p>
                <div className="bg-blue-50 p-4 rounded-lg text-left border border-blue-100">
                  <h3 className="font-semibold text-blue-800 mb-2">How to use:</h3>
                  <ol className="list-decimal list-inside text-gray-700 space-y-2">
                    <li>Enter your 10-character PAN number</li>
                    <li>Enter your 12-digit Aadhaar number</li>
                    <li>Click the "Verify Link Status" button</li>
                    <li>View the verification result</li>
                    <li>Download the result as PDF if needed</li>
                  </ol>
                </div>
                <div className="mt-6 bg-yellow-50 p-4 rounded-lg text-left border border-yellow-100">
                  <h3 className="font-semibold text-yellow-800 flex items-center">
                    <AlertCircle className="h-5 w-5 mr-2" />
                    Important Note:
                  </h3>
                  <p className="text-sm text-yellow-700 mt-1">
                    Linking your PAN with Aadhaar is mandatory as per the Income Tax Act. Failure to link may result in
                    your PAN becoming inoperative.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </li>
    </SearchResult_section>
  )
}
