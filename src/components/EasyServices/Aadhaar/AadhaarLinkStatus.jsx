"use client"
import { useState, useRef } from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import { panRegex, aadharRegex } from "../../../components/regexPatterns"
import axios from "axios"
import {
  CreditCard,
  Fingerprint,
  Search,
  RefreshCw,
  FileText,
  AlertCircle,
  CheckCircle,
  XCircle,
  Link,
} from "lucide-react"
import { useReactToPrint } from "react-to-print"
import SearchResult_section from "@/components/pagesComponents/pageLayout/SearchResult_section.js"
import useAuth from "../../../hooks/useAuth"

const AadhaarLinkStatus = () => {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [data, setData] = useState("")
  const [error, setError] = useState("")
  const pdf_ref = useRef()
  const { token } = useAuth()

  const generatePDF = useReactToPrint({
    content: () => pdf_ref.current,
    documentTitle: "Aadhaar-PAN Link Status",
  })

  const handleSubmit = async (formData) => {
    setLoading(true)
    setError("")

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/pan/pan-aadhaar-link-status/`,
        { pan: formData.pan, aadhaar: formData.aadhaar },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      )

      setSuccess(true)
      setData(res.data.data.message)
    } catch (err) {
      console.error("Error checking link status:", err)
      setError(err.response?.data?.message || "Failed to check link status. Please try again.")
      setSuccess(false)
    } finally {
      setLoading(false)
    }
  }

  const formik = useFormik({
    initialValues: {
      pan: "",
      aadhaar: "",
    },
    validationSchema: Yup.object({
      pan: Yup.string().required("PAN number is required").matches(panRegex, "Invalid PAN format (e.g., ABCDE1234F)"),
      aadhaar: Yup.string()
        .required("Aadhaar number is required")
        .matches(aadharRegex, "Invalid Aadhaar format (12 digits)"),
    }),
    onSubmit: (values) => handleSubmit(values),
  })

  const handleClear = (e) => {
    e.preventDefault()
    formik.resetForm()
    setData("")
    setSuccess(false)
    setError("")
  }

  // Function to determine if the link status is positive or negative
  const getLinkStatusType = (message) => {
    if (!message) return "neutral"

    const lowerMessage = message.toLowerCase()
    if (
      lowerMessage.includes("successfully") ||
      lowerMessage.includes("linked") ||
      lowerMessage.includes("valid") ||
      lowerMessage.includes("yes")
    ) {
      return "success"
    } else if (
      lowerMessage.includes("not linked") ||
      lowerMessage.includes("invalid") ||
      lowerMessage.includes("failed") ||
      lowerMessage.includes("error") ||
      lowerMessage.includes("no")
    ) {
      return "error"
    }

    return "neutral"
  }

  // Format PAN for display
  const formatPAN = (pan) => {
    return pan ? pan.toUpperCase() : ""
  }

  // Format Aadhaar for display (mask middle digits)
  const formatAadhaar = (aadhaar) => {
    if (!aadhaar) return ""
    return aadhaar.replace(/(\d{4})(\d{4})(\d{4})/, "$1-XXXX-$3")
  }

  return (
    <SearchResult_section title="Check Aadhaar-PAN Link Status">
      <li className="bg-white rounded-lg shadow-md p-4 transition-all duration-300">
        <div className="mb-4 border-b border-gray-200 pb-2">
          <h3 className="text-xl font-bold text-blue-700 flex items-center">
            <Link className="h-5 w-5 mr-2" />
            Aadhaar-PAN Link Status
          </h3>
          <p className="text-gray-600 text-sm">Check if your Aadhaar is linked with your PAN</p>
        </div>

        <form className="space-y-4" onSubmit={formik.handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
            <div>
              <label
                htmlFor="aadhaar"
                className="form-label inline-block mb-2 text-gray-700 font-medium flex items-center"
              >
                <Fingerprint className="h-4 w-4 mr-1" />
                Aadhaar Number
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="aadhaar"
                  id="aadhaar"
                  className={`form-input w-full border p-2 rounded-md focus:ring-2 focus:ring-blue-300 focus:outline-none transition-all duration-200 ${
                    formik.touched.aadhaar && formik.errors.aadhaar ? "border-red-500 bg-red-50" : "border-blue-500"
                  }`}
                  placeholder="Enter 12-digit Aadhaar Number"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.aadhaar}
                  maxLength={12}
                />
                {formik.touched.aadhaar && formik.errors.aadhaar && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500">
                    <AlertCircle className="h-5 w-5" />
                  </div>
                )}
              </div>
              {formik.touched.aadhaar && formik.errors.aadhaar ? (
                <p className="text-xs text-red-600 mt-1">{formik.errors.aadhaar}</p>
              ) : (
                <p className="text-xs text-gray-500 mt-1">Format: 12 digits (e.g., 123456789012)</p>
              )}
            </div>

            <div>
              <label htmlFor="pan" className="form-label inline-block mb-2 text-gray-700 font-medium flex items-center">
                <CreditCard className="h-4 w-4 mr-1" />
                PAN Number
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="pan"
                  id="pan"
                  className={`form-input w-full border p-2 rounded-md focus:ring-2 focus:ring-blue-300 focus:outline-none transition-all duration-200 ${
                    formik.touched.pan && formik.errors.pan ? "border-red-500 bg-red-50" : "border-blue-500"
                  }`}
                  placeholder="Enter PAN Number"
                  onChange={(e) => {
                    // Convert to uppercase
                    formik.setFieldValue("pan", e.target.value.toUpperCase())
                  }}
                  onBlur={formik.handleBlur}
                  value={formik.values.pan}
                  maxLength={10}
                />
                {formik.touched.pan && formik.errors.pan && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500">
                    <AlertCircle className="h-5 w-5" />
                  </div>
                )}
              </div>
              {formik.touched.pan && formik.errors.pan ? (
                <p className="text-xs text-red-600 mt-1">{formik.errors.pan}</p>
              ) : (
                <p className="text-xs text-gray-500 mt-1">Format: ABCDE1234F (5 letters + 4 digits + 1 letter)</p>
              )}
            </div>
          </div>

          <div className="grid gap-2 grid-cols-1 sm:grid-cols-3">
            <button
              type="submit"
              disabled={loading}
              className={`flex items-center justify-center gap-2 px-3 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
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
                  <span>Checking...</span>
                </>
              ) : (
                <>
                  <Search className="h-4 w-4" />
                  <span>Status</span>
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

            {data && (
              <button
                type="button"
                onClick={generatePDF}
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
              <p className="text-gray-700 font-medium">Checking Aadhaar-PAN link status...</p>
              <p className="text-gray-500 text-sm mt-2">This may take a few moments</p>
            </div>
          </div>
        ) : data ? (
          <div className="bg-white rounded-lg shadow-md p-6" ref={pdf_ref}>
            <div className="mb-4 border-b border-gray-200 pb-4">
              <h2 className="text-xl font-bold text-blue-700">Aadhaar-PAN Link Status</h2>
              <div className="flex flex-col sm:flex-row sm:justify-between mt-2">
                <p className="text-gray-600 text-sm">
                  <span className="font-medium">PAN:</span> {formatPAN(formik.values.pan)}
                </p>
                <p className="text-gray-600 text-sm">
                  <span className="font-medium">Aadhaar:</span> {formatAadhaar(formik.values.aadhaar)}
                </p>
              </div>
            </div>

            <div
              className={`p-6 rounded-lg border flex items-center ${
                getLinkStatusType(data) === "success"
                  ? "bg-green-50 border-green-200"
                  : getLinkStatusType(data) === "error"
                    ? "bg-red-50 border-red-200"
                    : "bg-blue-50 border-blue-100"
              }`}
            >
              {getLinkStatusType(data) === "success" ? (
                <CheckCircle className="h-10 w-10 text-green-500 mr-4 flex-shrink-0" />
              ) : getLinkStatusType(data) === "error" ? (
                <XCircle className="h-10 w-10 text-red-500 mr-4 flex-shrink-0" />
              ) : (
                <AlertCircle className="h-10 w-10 text-blue-500 mr-4 flex-shrink-0" />
              )}
              <div>
                <h3
                  className={`text-lg font-semibold ${
                    getLinkStatusType(data) === "success"
                      ? "text-green-700"
                      : getLinkStatusType(data) === "error"
                        ? "text-red-700"
                        : "text-blue-700"
                  }`}
                >
                  {getLinkStatusType(data) === "success"
                    ? "Successfully Linked"
                    : getLinkStatusType(data) === "error"
                      ? "Not Linked"
                      : "Link Status"}
                </h3>
                <p
                  className={`mt-1 ${
                    getLinkStatusType(data) === "success"
                      ? "text-green-600"
                      : getLinkStatusType(data) === "error"
                        ? "text-red-600"
                        : "text-blue-600"
                  }`}
                >
                  {data}
                </p>
              </div>
            </div>

            <div className="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-100">
              <h3 className="font-medium text-blue-800 mb-2">What does this mean?</h3>
              <p className="text-sm text-blue-700 mb-2">
                The PAN-Aadhaar linking is mandatory as per the Income Tax Act. A linked status ensures:
              </p>
              <ul className="list-disc list-inside text-sm text-blue-700 space-y-1">
                <li>Seamless filing of income tax returns</li>
                <li>Faster processing of tax refunds</li>
                <li>Prevention of duplicate PAN issuance</li>
                <li>Enhanced security for your financial transactions</li>
              </ul>
              {getLinkStatusType(data) === "error" && (
                <div className="mt-3 p-3 bg-red-100 rounded-md">
                  <p className="text-sm text-red-700 font-medium">
                    <AlertCircle className="h-4 w-4 inline mr-1" />
                    Important: You need to link your PAN with Aadhaar to avoid your PAN becoming inoperative.
                  </p>
                </div>
              )}
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
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                />
              </svg>
              <h2 className="text-xl font-bold text-gray-800 mb-2">Welcome to Aadhaar-PAN Link Status Check</h2>
              <p className="text-gray-600 mb-6">
                Check if your Aadhaar number is linked with your PAN card as required by the Income Tax Department.
              </p>

              <div className="bg-blue-50 p-4 rounded-lg text-left border border-blue-100">
                <h3 className="font-semibold text-blue-800 mb-2">How to check link status:</h3>
                <ol className="list-decimal list-inside text-gray-700 space-y-2">
                  <li>Enter your 12-digit Aadhaar number</li>
                  <li>Enter your 10-character PAN number</li>
                  <li>Click &quot;Check Status&quot; to verify if they are linked</li>
                  <li>View the link status result</li>
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
                  your PAN becoming inoperative, which can affect your financial transactions.
                </p>
              </div>
            </div>
          </div>
        )}
      </li>
    </SearchResult_section>
  )
}

export default AadhaarLinkStatus
