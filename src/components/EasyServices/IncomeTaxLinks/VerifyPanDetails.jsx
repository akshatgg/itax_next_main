"use client"
import { useRef, useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { CreditCard, User, Calendar, Search, RefreshCw, FileText, AlertCircle } from "lucide-react"
import useAuth from "../../../hooks/useAuth"
import { useReactToPrint } from "react-to-print"
import SearchResult_section from "@/components/pagesComponents/pageLayout/SearchResult_section.js"

export default function VerifyPanDetails() {
  const navigate = useRouter()
  const [showdata, setShowData] = useState("")
  const [showhide, setShowHide] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const pdf_ref = useRef()
  const { token } = useAuth()

  // Form state for name and DOB
  const [formValues, setFormValues] = useState({
    pan: "",
    name_as_per_pan: "",
    date_of_birth: "",
  })

  // Form validation state
  const [formErrors, setFormErrors] = useState({
    pan: "",
    name_as_per_pan: "",
    date_of_birth: "",
  })

  const validatePAN = (pan) => {
    const regex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/
    return regex.test(pan)
  }

  const validateDateFormat = (date) => {
    // Check if the date format is DD/MM/YYYY
    const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/
    return regex.test(date)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target

    // Clear the specific error when user starts typing
    setFormErrors({
      ...formErrors,
      [name]: "",
    })

    // For PAN, convert to uppercase
    if (name === "pan") {
      setFormValues({
        ...formValues,
        [name]: value.toUpperCase(),
      })
    }
    // Format date of birth (DD/MM/YYYY)
    else if (name === "date_of_birth") {
      let formattedValue = value.replace(/[^\d]/g, "")
      if (formattedValue.length > 2 && formattedValue.length <= 4) {
        formattedValue = `${formattedValue.slice(0, 2)}/${formattedValue.slice(2)}`
      } else if (formattedValue.length > 4) {
        formattedValue = `${formattedValue.slice(0, 2)}/${formattedValue.slice(2, 4)}/${formattedValue.slice(4, 8)}`
      }
      setFormValues({
        ...formValues,
        [name]: formattedValue,
      })
    } else {
      setFormValues({
        ...formValues,
        [name]: value,
      })
    }
  }

  const validateForm = () => {
    let isValid = true
    const newErrors = {
      pan: "",
      name_as_per_pan: "",
      date_of_birth: "",
    }

    // Validate PAN
    if (!formValues.pan) {
      newErrors.pan = "PAN number is required"
      isValid = false
    } else if (!validatePAN(formValues.pan)) {
      newErrors.pan = "Invalid PAN format. Should be like ABCDE1234F"
      isValid = false
    }

    // Validate Name
    if (!formValues.name_as_per_pan.trim()) {
      newErrors.name_as_per_pan = "Name is required"
      isValid = false
    }

    // Validate Date of Birth
    if (!formValues.date_of_birth) {
      newErrors.date_of_birth = "Date of birth is required"
      isValid = false
    } else if (!validateDateFormat(formValues.date_of_birth)) {
      newErrors.date_of_birth = "Invalid date format. Use DD/MM/YYYY"
      isValid = false
    }

    setFormErrors(newErrors)
    return isValid
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setLoading(true)
    setError("")

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/pan/get-pan-details`,
        {
          pan: formValues.pan,
          name_as_per_pan: formValues.name_as_per_pan,
          date_of_birth: formValues.date_of_birth,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      )
      console.log(response.data.data)
      setShowData(response.data.data)
      setShowHide(true)
    } catch (error) {
      console.error(error)
      setShowHide(false)
      setError(
        error.response?.data?.message ||
          "An error occurred while fetching PAN details. Please check your information and try again.",
      )
    } finally {
      setLoading(false)
    }
  }

  const handleClear = async (e) => {
    e.preventDefault()
    setShowData("")
    setShowHide(false)
    setError("")
    setFormErrors({
      pan: "",
      name_as_per_pan: "",
      date_of_birth: "",
    })
    setFormValues({
      pan: "",
      name_as_per_pan: "",
      date_of_birth: "",
    })
  }

  const generateDataObject = () => ({
    title: "PAN DETAILS",
    column: ["Field", "Detail"],
    data: [
      {
        Field: "Aadhaar Seeding Status",
        Detail: showdata.aadhaar_seeding_status === "y" ? "Yes" : "No",
      },
      { Field: "Category", Detail: showdata.category },
      { Field: "Last Updated", Detail: showdata.last_updated },
      { Field: "Status", Detail: showdata.status },
    ],
  })

  const payload = () => {
    navigate.push("/pdfViewer")
  }

  const details = [
    {
      label: "Aadhaar Seeding Status",
      value: showdata.aadhaar_seeding_status === "y" ? "Yes" : "No",
    },
    { label: "Category", value: showdata.category },
    { label: "Last Updated", value: showdata.last_updated },
    { label: "Status", value: showdata.status },
  ]

  const generatePDF = useReactToPrint({
    content: () => pdf_ref.current,
    documentTitle: "PAN DETAILS",
  })

  // Function to determine status type
  const getStatusType = (status) => {
    if (!status) return "neutral"

    const lowerStatus = status.toLowerCase()
    if (lowerStatus.includes("active") || lowerStatus.includes("valid")) {
      return "success"
    } else if (lowerStatus.includes("inactive") || lowerStatus.includes("invalid")) {
      return "error"
    }

    return "neutral"
  }

  return (
    <SearchResult_section title={"PAN Verification"}>
      <li className="bg-white rounded-lg shadow-md p-4 transition-all duration-300">
        <div className="bg-white rounded-lg">
          <div className="mb-4 border-b border-gray-200 pb-2">
            <h3 className="text-xl font-bold text-blue-700 flex items-center">
              <CreditCard className="h-5 w-5 mr-2" />
              Verify PAN Details
            </h3>
            <p className="text-gray-600 text-sm">Enter your information to verify your PAN card details</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 flex items-center">
                <CreditCard className="h-4 w-4 mr-1" />
                PAN Number
              </label>
              <div className="relative">
                <input
                  name="pan"
                  type="text"
                  value={formValues.pan}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                    formErrors.pan ? "border-red-500 bg-red-50" : "border-gray-300"
                  }`}
                  placeholder="Your PAN Number"
                  maxLength="10"
                />
                {formErrors.pan && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500">
                    <AlertCircle className="h-5 w-5" />
                  </div>
                )}
              </div>
              {formErrors.pan ? (
                <p className="text-xs text-red-600 mt-1">{formErrors.pan}</p>
              ) : (
                <p className="text-xs text-gray-500 mt-1">Format: ABCDE1234F (5 letters + 4 digits + 1 letter)</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 flex items-center">
                <User className="h-4 w-4 mr-1" />
                Name as per PAN
              </label>
              <div className="relative">
                <input
                  name="name_as_per_pan"
                  type="text"
                  value={formValues.name_as_per_pan}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                    formErrors.name_as_per_pan ? "border-red-500 bg-red-50" : "border-gray-300"
                  }`}
                  placeholder="Name as shown on PAN card"
                />
                {formErrors.name_as_per_pan && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500">
                    <AlertCircle className="h-5 w-5" />
                  </div>
                )}
              </div>
              {formErrors.name_as_per_pan && <p className="text-xs text-red-600 mt-1">{formErrors.name_as_per_pan}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                Date of Birth
              </label>
              <div className="relative">
                <input
                  name="date_of_birth"
                  type="text"
                  value={formValues.date_of_birth}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                    formErrors.date_of_birth ? "border-red-500 bg-red-50" : "border-gray-300"
                  }`}
                  placeholder="DD/MM/YYYY"
                  maxLength="10"
                />
                {formErrors.date_of_birth && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500">
                    <AlertCircle className="h-5 w-5" />
                  </div>
                )}
              </div>
              {formErrors.date_of_birth ? (
                <p className="text-xs text-red-600 mt-1">{formErrors.date_of_birth}</p>
              ) : (
                <p className="text-xs text-gray-500 mt-1">Format: DD/MM/YYYY (e.g., 01/05/1990)</p>
              )}
            </div>

            <div className="grid gap-3 grid-cols-1 sm:grid-cols-3">
              <button
                type="submit"
                disabled={loading}
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
                onClick={handleClear}
                type="button"
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 transition-colors"
              >
                <RefreshCw className="h-5 w-5" />
                <span>Clear</span>
              </button>

              {showhide && (
                <button
                  onClick={generatePDF}
                  type="button"
                  className="flex items-center justify-center gap-2 px-4 py-2 rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors"
                >
                  <FileText className="h-5 w-5" />
                  <span>PDF</span>
                </button>
              )}
            </div>
          </form>

          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                <p className="text-red-600 font-medium">{error}</p>
              </div>
            </div>
          )}
        </div>
      </li>
      <li className="lg:col-span-2 bg-gray-200 p-4 rounded-lg">
        {loading ? (
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="flex flex-col items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
              <p className="text-gray-700 font-medium">Verifying PAN details...</p>
              <p className="text-gray-500 text-sm mt-2">This may take a few moments</p>
            </div>
          </div>
        ) : showhide ? (
          <div className="bg-white rounded-lg shadow-md p-6" ref={pdf_ref}>
            <div className="mb-4 border-b border-gray-200 pb-4">
              <h2 className="text-xl font-bold text-blue-700">PAN Verification Result</h2>
              <div className="flex flex-col sm:flex-row sm:justify-between mt-2">
                <p className="text-gray-600 text-sm">
                  <span className="font-medium">PAN:</span> {formValues.pan}
                </p>
                <p className="text-gray-600 text-sm">
                  <span className="font-medium">Name:</span> {formValues.name_as_per_pan}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {details.map((detail, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg border ${
                    detail.label === "Status"
                      ? getStatusType(detail.value) === "success"
                        ? "bg-green-50 border-green-200"
                        : getStatusType(detail.value) === "error"
                          ? "bg-red-50 border-red-200"
                          : "bg-blue-50 border-blue-200"
                      : "bg-gray-50 border-gray-200"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-500">{detail.label}</span>
                    <span
                      className={`text-sm font-semibold ${
                        detail.label === "Status"
                          ? getStatusType(detail.value) === "success"
                            ? "text-green-700"
                            : getStatusType(detail.value) === "error"
                              ? "text-red-700"
                              : "text-blue-700"
                          : "text-gray-800"
                      }`}
                    >
                      {detail.value || "Not Available"}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <h3 className="font-medium text-blue-800 mb-2">What does this mean?</h3>
              <p className="text-sm text-blue-700 mb-2">
                This verification confirms the details of your PAN card as registered with the Income Tax Department.
              </p>
              <ul className="list-disc list-inside text-sm text-blue-700 space-y-1">
                <li>An active status means your PAN is valid and can be used for all financial transactions</li>
                <li>
                  Aadhaar seeding status indicates whether your PAN is linked with your Aadhaar as required by law
                </li>
                <li>The category shows the type of PAN holder (Individual, Company, etc.)</li>
                <li>Last updated shows when your PAN details were last modified</li>
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
                  d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
                />
              </svg>
              <h2 className="text-xl font-bold text-gray-800 mb-2">Welcome to PAN Verification</h2>
              <p className="text-gray-600 mb-6">
                Verify your PAN card details by providing your PAN number, name, and date of birth.
              </p>

              <div className="bg-blue-50 p-4 rounded-lg text-left border border-blue-100">
                <h3 className="font-semibold text-blue-800 mb-2">How to use:</h3>
                <ol className="list-decimal list-inside text-gray-700 space-y-2">
                  <li>Enter your 10-character PAN number</li>
                  <li>Enter your name exactly as it appears on your PAN card</li>
                  <li>Enter your date of birth in DD/MM/YYYY format</li>
                  <li>Click the "Verify PAN" button</li>
                  <li>View your PAN details and verification status</li>
                </ol>
              </div>

              <div className="mt-6 bg-yellow-50 p-4 rounded-lg text-left border border-yellow-100">
                <h3 className="font-semibold text-yellow-800 flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  Important Note:
                </h3>
                <p className="text-sm text-yellow-700 mt-1">
                  Ensure that you enter your details exactly as they appear on your PAN card. Any discrepancy may result
                  in verification failure.
                </p>
              </div>
            </div>
          </div>
        )}
      </li>
    </SearchResult_section>
  )
}
