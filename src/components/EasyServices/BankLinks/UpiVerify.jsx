"use client"
import { useRef, useState } from "react"
import axios from "axios"
import { CreditCard, User, Search, RefreshCw, FileText, AlertCircle, CheckCircle, XCircle } from "lucide-react"
import useAuth from "../../../hooks/useAuth"
import { toast } from "react-toastify"
import { useReactToPrint } from "react-to-print"
import SearchResult_section from "@/components/pagesComponents/pageLayout/SearchResult_section.js"

const UpiVerify = () => {
  const { token } = useAuth()
  const [upiAddress, setUpiAddress] = useState("")
  const [name, setName] = useState("")
  const [showdata, setShowData] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const pdf_ref = useRef()

  // Validation states
  const [isUpiValid, setIsUpiValid] = useState(true)
  const [isNameValid, setIsNameValid] = useState(true)

  const generatePDF = useReactToPrint({
    content: () => pdf_ref.current,
    documentTitle: "UPI Verification Result",
  })

  const validateUpi = (upi) => {
    // Basic UPI validation - should contain @ symbol and have proper format
    return /^[a-zA-Z0-9.\-_]{3,}@[a-zA-Z]{3,}$/i.test(upi)
  }

  const validateName = (name) => {
    // Name should be at least 2 characters
    return name.trim().length >= 2
  }

  const handleUpiChange = (e) => {
    const value = e.target.value
    setUpiAddress(value)
    if (value) {
      setIsUpiValid(validateUpi(value))
    } else {
      setIsUpiValid(true) // Empty is considered valid until submission
    }
  }

  const handleNameChange = (e) => {
    const value = e.target.value
    setName(value)
    if (value) {
      setIsNameValid(validateName(value))
    } else {
      setIsNameValid(true) // Empty is considered valid until submission
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validate inputs before submission
    if (!upiAddress || !validateUpi(upiAddress)) {
      setIsUpiValid(false)
      toast.error("Please enter a valid UPI address")
      return
    }

    if (!name || !validateName(name)) {
      setIsNameValid(false)
      toast.error("Please enter a valid name")
      return
    }

    setLoading(true)
    setError("")

    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/bank/upi-verify`, {
        params: {
          virtual_payment_address: upiAddress,
          name: name,
        },
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      if (response.data && response.data.data) {
        setShowData(response.data.data.account_exists)
        toast.success("UPI verification completed")
      } else {
        throw new Error("Invalid response format")
      }
    } catch (error) {
      console.error("Error verifying UPI:", error)
      setError(error.response?.data?.message || "Failed to verify UPI details. Please try again.")
      toast.error("Details entered are incorrect or not found")
    } finally {
      setLoading(false)
    }
  }

  const handleClear = (e) => {
    e.preventDefault()
    setUpiAddress("")
    setName("")
    setShowData("")
    setError("")
    setIsUpiValid(true)
    setIsNameValid(true)
  }

  return (
    <SearchResult_section title="UPI Verification">
      <li className="bg-white rounded-lg shadow-md p-4 transition-all duration-300">
        <div className="mb-4 border-b border-gray-200 pb-2">
          <h3 className="text-xl font-bold text-blue-700 flex items-center">
            <CreditCard className="h-5 w-5 mr-2" />
            Verify UPI Details
          </h3>
          <p className="text-gray-600 text-sm">Enter UPI address and name to verify account</p>
        </div>

        <form className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
            <div>
              <label
                htmlFor="upiInput"
                className="form-label inline-block mb-2 text-gray-700 font-medium flex items-center"
              >
                <CreditCard className="h-4 w-4 mr-1" />
                UPI Address
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="upiInput"
                  className={`form-input w-full border p-2 rounded-md focus:ring-2 focus:ring-blue-300 focus:outline-none transition-all duration-200 ${
                    !isUpiValid ? "border-red-500 bg-red-50" : "border-blue-500"
                  }`}
                  placeholder="e.g., name@upi"
                  value={upiAddress}
                  onChange={handleUpiChange}
                />
                {!isUpiValid && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500">
                    <AlertCircle className="h-5 w-5" />
                  </div>
                )}
              </div>
              {!isUpiValid ? (
                <p className="text-xs text-red-600 mt-1">Please enter a valid UPI address (e.g., username@bankname)</p>
              ) : (
                <p className="text-xs text-gray-500 mt-1">Format: username@bankname</p>
              )}
            </div>

            <div>
              <label
                htmlFor="nameInput"
                className="form-label inline-block mb-2 text-gray-700 font-medium flex items-center"
              >
                <User className="h-4 w-4 mr-1" />
                Account Holder Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="nameInput"
                  className={`form-input w-full border p-2 rounded-md focus:ring-2 focus:ring-blue-300 focus:outline-none transition-all duration-200 ${
                    !isNameValid ? "border-red-500 bg-red-50" : "border-blue-500"
                  }`}
                  placeholder="Enter account holder name"
                  value={name}
                  onChange={handleNameChange}
                />
                {!isNameValid && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500">
                    <AlertCircle className="h-5 w-5" />
                  </div>
                )}
              </div>
              {!isNameValid ? (
                <p className="text-xs text-red-600 mt-1">Please enter a valid name (at least 2 characters)</p>
              ) : (
                <p className="text-xs text-gray-500 mt-1">Enter the name exactly as registered with the UPI</p>
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
                  <span>Verify UPI</span>
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

            {showdata && (
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
              {error}
            </p>
          </div>
        )}
      </li>

      <li className="lg:col-span-2 bg-gray-200 p-4 rounded-lg">
        {loading ? (
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="flex flex-col items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
              <p className="text-gray-700 font-medium">Verifying UPI details...</p>
              <p className="text-gray-500 text-sm mt-2">This may take a few moments</p>
            </div>
          </div>
        ) : showdata ? (
          <div className="bg-white rounded-lg shadow-md p-6" ref={pdf_ref}>
            <div className="mb-4 border-b border-gray-200 pb-4">
              <h2 className="text-xl font-bold text-blue-700">UPI Verification Result</h2>
              <p className="text-gray-600 text-sm">
                Verification for UPI: <span className="font-semibold">{upiAddress}</span>
              </p>
            </div>

            <div
              className={`p-6 rounded-lg border flex items-center ${
                showdata === "Yes" || showdata === true ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
              }`}
            >
              {showdata === "Yes" || showdata === true ? (
                <CheckCircle className="h-10 w-10 text-green-500 mr-4" />
              ) : (
                <XCircle className="h-10 w-10 text-red-500 mr-4" />
              )}
              <div>
                <h3
                  className={`text-lg font-semibold ${
                    showdata === "Yes" || showdata === true ? "text-green-700" : "text-red-700"
                  }`}
                >
                  {showdata === "Yes" || showdata === true ? "Valid UPI ID" : "Invalid UPI ID"}
                </h3>
                <p className={`mt-1 ${showdata === "Yes" || showdata === true ? "text-green-600" : "text-red-600"}`}>
                  {showdata === "Yes" || showdata === true
                    ? `The UPI ID ${upiAddress} is valid and belongs to ${name}.`
                    : `The UPI ID ${upiAddress} is not valid or does not belong to ${name}.`}
                </p>
              </div>
            </div>

            <div className="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-100">
              <h3 className="font-medium text-blue-800 mb-2">What is UPI?</h3>
              <p className="text-sm text-blue-700 mb-2">
                Unified Payments Interface (UPI) is an instant real-time payment system developed by the National
                Payments Corporation of India (NPCI).
              </p>
              <ul className="list-disc list-inside text-sm text-blue-700 space-y-1">
                <li>UPI allows instant money transfers between bank accounts using a mobile device</li>
                <li>Each UPI ID is linked to a specific bank account</li>
                <li>UPI verification ensures that the payment is sent to the correct recipient</li>
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
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h2 className="text-xl font-bold text-gray-800 mb-2">Welcome to UPI Verification</h2>
              <p className="text-gray-600 mb-6">Verify UPI addresses to ensure secure and accurate money transfers.</p>

              <div className="bg-blue-50 p-4 rounded-lg text-left border border-blue-100">
                <h3 className="font-semibold text-blue-800 mb-2">How to use:</h3>
                <ol className="list-decimal list-inside text-gray-700 space-y-2">
                  <li>Enter the UPI address you want to verify (e.g., username@bankname)</li>
            <li>Enter the account holder&apos;s name exactly as registered with the UPI</li>
<li>Click the &quot;Verify UPI&quot; button</li>

                  <li>View the verification result</li>
                  <li>Download the verification result as PDF if needed</li>
                </ol>
              </div>

              <div className="mt-6 bg-yellow-50 p-4 rounded-lg text-left border border-yellow-100">
                <h3 className="font-semibold text-yellow-800 flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  Important Note:
                </h3>
                <p className="text-sm text-yellow-700 mt-1">
                  Always verify UPI details before making payments to avoid sending money to the wrong account. The name
                  must match exactly as registered with the UPI service.
                </p>
              </div>
            </div>
          </div>
        )}
      </li>
    </SearchResult_section>
  )
}

export default UpiVerify
