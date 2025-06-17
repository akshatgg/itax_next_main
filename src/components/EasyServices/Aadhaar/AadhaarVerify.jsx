"use client"
import { useRef, useState } from "react"
import axios from "axios"
import {
  Fingerprint,
  KeyRound,
  Send,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  ArrowLeft,
  User,
  Calendar,
  MapPin,
  Download,
} from "lucide-react"
import useAuth from "../../../hooks/useAuth"
import { useReactToPrint } from "react-to-print"
import SearchResult_section from "@/components/pagesComponents/pageLayout/SearchResult_section.js"

const AadhaarVerify = () => {
  const { token } = useAuth()
  const [aadhaarNumber, setAadhaarNumber] = useState("")
  const [otp, setOtp] = useState("")
  const [referenceId, setReferenceId] = useState("")
  const [currentStep, setCurrentStep] = useState(1)
  const [showdata, setShowData] = useState("")
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState({ message: "", type: "" })
  const [verificationComplete, setVerificationComplete] = useState(false)
  const [errors, setErrors] = useState({
    aadhaar: "",
    otp: "",
  })

  const pdf_ref = useRef()
  const generatePDF = useReactToPrint({
    content: () => pdf_ref.current,
    documentTitle: "Aadhaar Verification Result",
  })

  // Validate Aadhaar number
  const validateAadhaar = (value) => {
    return /^\d{12}$/.test(value)
  }

  // Validate OTP
  const validateOTP = (value) => {
    return /^\d{6}$/.test(value)
  }

  // Handle Aadhaar input change
  const handleAadhaarChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 12)
    setAadhaarNumber(value)

    if (value && !validateAadhaar(value)) {
      setErrors({ ...errors, aadhaar: "Please enter a valid 12-digit Aadhaar number" })
    } else {
      setErrors({ ...errors, aadhaar: "" })
    }
  }

  // Handle OTP input change
  const handleOTPChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6)
    setOtp(value)

    if (value && !validateOTP(value)) {
      setErrors({ ...errors, otp: "Please enter a valid 6-digit OTP" })
    } else {
      setErrors({ ...errors, otp: "" })
    }
  }

  // Step 1: Generate OTP
  const handleGenerateOTP = async (e) => {
    e.preventDefault()

    // Validate Aadhaar number
    if (!aadhaarNumber || !validateAadhaar(aadhaarNumber)) {
      setErrors({ ...errors, aadhaar: "Please enter a valid 12-digit Aadhaar number" })
      return
    }

    setLoading(true)
    setResponse({ message: "", type: "" })

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/aadhaar/aadhaar-generate-otp`,
        { aadhaar: aadhaarNumber },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      if (response.data.success) {
        setReferenceId(response.data.data.data.reference_id)
        setResponse({
          message: "OTP sent successfully to your registered mobile number",
          type: "success",
        })
        setCurrentStep(2)
      } else {
        setResponse({
          message: response.data.message || "Failed to send OTP. Please try again.",
          type: "error",
        })
      }
    } catch (error) {
      console.error("Error generating OTP:", error)
      setResponse({
        message: error.response?.data?.message || "Failed to send OTP. Please try again.",
        type: "error",
      })
    } finally {
      setLoading(false)
    }
  }

  // Step 2: Verify OTP
  const handleVerifyOTP = async (e) => {
    e.preventDefault()

    // Validate OTP
    if (!otp || !validateOTP(otp)) {
      setErrors({ ...errors, otp: "Please enter a valid 6-digit OTP" })
      return
    }

    setLoading(true)
    setResponse({ message: "", type: "" })

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/aadhaar/aadhaar-verify-otp`,
        {
          otp: otp,
          reference_id: referenceId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      if (response.data.success) {
        setResponse({
          message: "Aadhaar verification successful!",
          type: "success",
        })
        setVerificationComplete(true)
        setShowData(response.data.data)
      } else {
        setResponse({
          message: response.data.message || "OTP verification failed. Please try again.",
          type: "error",
        })
      }
    } catch (error) {
      console.error("Error verifying OTP:", error)
      setResponse({
        message: error.response?.data?.message || "OTP verification failed. Please try again.",
        type: "error",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleClear = (e) => {
    e.preventDefault()
    setAadhaarNumber("")
    setOtp("")
    setCurrentStep(1)
    setReferenceId("")
    setShowData("")
    setResponse({ message: "", type: "" })
    setVerificationComplete(false)
    setErrors({ aadhaar: "", otp: "" })
  }

  const renderStepIndicator = () => {
    return (
      <div className="flex items-center justify-center mb-6">
        <div className="flex items-center">
          <div
            className={`rounded-full h-10 w-10 flex items-center justify-center font-medium ${
              currentStep >= 1 ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-600"
            }`}
          >
            1
          </div>
          <div className={`h-1 w-16 ${currentStep >= 2 ? "bg-blue-600" : "bg-gray-300"}`}></div>
          <div
            className={`rounded-full h-10 w-10 flex items-center justify-center font-medium ${
              currentStep >= 2 ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-600"
            }`}
          >
            2
          </div>
        </div>
      </div>
    )
  }

  // Format Aadhaar number for display (XXXX-XXXX-XXXX)
  const formatAadhaarForDisplay = (aadhaar) => {
    if (!aadhaar) return ""
    return aadhaar.replace(/(\d{4})(\d{4})(\d{4})/, "$1-$2-$3")
  }

  return (
    <SearchResult_section title="Aadhaar Verification">
      <li className="bg-white rounded-lg shadow-md p-4 transition-all duration-300">
        <div className="mb-4 border-b border-gray-200 pb-2">
          <h3 className="text-xl font-bold text-blue-700 flex items-center">
            <Fingerprint className="h-5 w-5 mr-2" />
            Aadhaar Verification
          </h3>
          <p className="text-gray-600 text-sm">Verify your Aadhaar details securely through OTP verification</p>
        </div>

        <form className="space-y-4">
          {!verificationComplete && renderStepIndicator()}

          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="aadhaarInput" className="form-label inline-block mb-1 text-gray-700 font-medium">
                  Aadhaar Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Fingerprint className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="aadhaarInput"
                    className={`form-input w-full pl-10 p-2 border rounded-md focus:ring-2 focus:ring-blue-300 focus:outline-none transition-all duration-200 ${
                      errors.aadhaar ? "border-red-500 bg-red-50" : "border-blue-500"
                    }`}
                    placeholder="Enter 12-digit Aadhaar Number"
                    value={aadhaarNumber}
                    onChange={handleAadhaarChange}
                    maxLength={12}
                  />
                  {errors.aadhaar && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500">
                      <AlertCircle className="h-5 w-5" />
                    </div>
                  )}
                </div>
                {errors.aadhaar ? (
                  <p className="text-xs text-red-600 mt-1">{errors.aadhaar}</p>
                ) : (
                  <p className="text-xs text-gray-500 mt-1">Enter your 12-digit Aadhaar number</p>
                )}
              </div>

              <div className="grid gap-2 grid-cols-1 sm:grid-cols-2">
                <button
                  onClick={handleGenerateOTP}
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
                      <span>Sending OTP...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      <span>OTP</span>
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
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="otpInput" className="form-label inline-block mb-1 text-gray-700 font-medium">
                  Enter OTP
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <KeyRound className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="otpInput"
                    className={`form-input w-full pl-10 p-2 border rounded-md focus:ring-2 focus:ring-blue-300 focus:outline-none transition-all duration-200 ${
                      errors.otp ? "border-red-500 bg-red-50" : "border-blue-500"
                    }`}
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    onChange={handleOTPChange}
                    maxLength={6}
                  />
                  {errors.otp && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500">
                      <AlertCircle className="h-5 w-5" />
                    </div>
                  )}
                </div>
                {errors.otp ? (
                  <p className="text-xs text-red-600 mt-1">{errors.otp}</p>
                ) : (
                  <p className="text-xs text-gray-500 mt-1">Enter the 6-digit OTP sent to your registered mobile</p>
                )}
              </div>

              <div className="grid gap-2 grid-cols-1 sm:grid-cols-2">
                <button
                  onClick={handleVerifyOTP}
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
                      <CheckCircle className="h-4 w-4" />
                      <span>Verify OTP</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="flex items-center justify-center gap-2 px-3 py-2 rounded-md text-white bg-gray-500 hover:bg-gray-600 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back</span>
                </button>

                <button
                  type="button"
                  onClick={handleGenerateOTP}
                  className="flex items-center justify-center gap-2 px-3 py-2 rounded-md text-white bg-green-500 hover:bg-green-600 transition-colors col-span-full"
                >
                  <Send className="h-4 w-4" />
                  <span>Resend OTP</span>
                </button>
              </div>
            </div>
          )}

          {response.message && (
            <div
              className={`p-4 rounded-lg border ${
                response.type === "success"
                  ? "bg-green-50 border-green-200 text-green-700"
                  : "bg-red-50 border-red-200 text-red-700"
              }`}
            >
              <div className="flex items-center">
                {response.type === "success" ? (
                  <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                ) : (
                  <AlertCircle className="h-5 w-5 mr-2 text-red-500" />
                )}
                <p className="font-medium">{response.message}</p>
              </div>
            </div>
          )}

          {verificationComplete && showdata && (
            <div className="mt-6 bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="flex justify-center mb-4">
                <div className="rounded-full bg-green-100 p-3">
                  <CheckCircle className="h-10 w-10 text-green-500" />
                </div>
              </div>
              <h2 className="text-xl font-semibold mb-4 text-center text-green-700">Verification Complete</h2>
              <div className="grid gap-2 grid-cols-1 sm:grid-cols-2">
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 px-3 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                  onClick={generatePDF}
                >
                  <Download className="h-4 w-4" />
                  <span>Download PDF</span>
                </button>
                <button
                  onClick={handleClear}
                  className="flex items-center justify-center gap-2 px-3 py-2 rounded-md text-white bg-amber-500 hover:bg-amber-600 transition-colors"
                >
                  <RefreshCw className="h-4 w-4" />
                  <span>Verify Another</span>
                </button>
              </div>
            </div>
          )}
        </form>
      </li>
      <li className="lg:col-span-2 bg-gray-200 p-4 rounded-lg">
        {loading ? (
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="flex flex-col items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
              <p className="text-gray-700 font-medium">
                {currentStep === 1 ? "Sending OTP to your registered mobile..." : "Verifying your Aadhaar details..."}
              </p>
              <p className="text-gray-500 text-sm mt-2">This may take a few moments</p>
            </div>
          </div>
        ) : verificationComplete && showdata ? (
          <div className="bg-white rounded-lg shadow-md p-6" ref={pdf_ref}>
            <div className="mb-6 border-b border-gray-200 pb-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-blue-700">Aadhaar Verification Result</h2>
                <div className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Verified
                </div>
              </div>
              <p className="text-gray-600 text-sm mt-1">
                Aadhaar: <span className="font-medium">{formatAadhaarForDisplay(showdata.aadhaar_number)}</span>
              </p>
            </div>

            <div className="space-y-4">
              {showdata.name && (
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-start">
                    <User className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Name</h3>
                      <p className="text-base font-semibold text-gray-800 mt-1">{showdata.name}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {showdata.gender && (
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-start">
                      <User className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Gender</h3>
                        <p className="text-base font-semibold text-gray-800 mt-1">{showdata.gender}</p>
                      </div>
                    </div>
                  </div>
                )}

                {showdata.dob && (
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-start">
                      <Calendar className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Date of Birth</h3>
                        <p className="text-base font-semibold text-gray-800 mt-1">{showdata.dob}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {showdata.address && (
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Address</h3>
                      <p className="text-base font-semibold text-gray-800 mt-1">{showdata.address}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Verification Status</h3>
                    <p className="text-base font-semibold text-green-600 mt-1">
                      Aadhaar Exists: {showdata.aadhaar_exists}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-100">
              <h3 className="font-medium text-blue-800 mb-2">About Aadhaar Verification</h3>
              <p className="text-sm text-blue-700 mb-2">
                Aadhaar verification confirms the authenticity of an Aadhaar number and the associated demographic
                details of the Aadhaar holder.
              </p>
              <ul className="list-disc list-inside text-sm text-blue-700 space-y-1">
                <li>This verification was completed using OTP authentication</li>
                <li>The OTP was sent to the mobile number registered with your Aadhaar</li>
                <li>This verification is secure and compliant with UIDAI guidelines</li>
                <li>Your Aadhaar details are protected and not stored permanently</li>
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
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              <h2 className="text-xl font-bold text-gray-800 mb-2">Welcome to Aadhaar Verification</h2>
              <p className="text-gray-600 mb-6">
                Verify your Aadhaar details securely through OTP verification sent to your registered mobile number.
              </p>

              <div className="bg-blue-50 p-4 rounded-lg text-left border border-blue-100">
                <h3 className="font-semibold text-blue-800 mb-2">How to verify your Aadhaar:</h3>
                <ol className="list-decimal list-inside text-gray-700 space-y-2">
                  <li>Enter your 12-digit Aadhaar number</li>
                  <li>Click "Generate OTP" to receive a one-time password on your registered mobile</li>
                  <li>Enter the 6-digit OTP you received</li>
                  <li>Click "Verify OTP" to complete the verification</li>
                  <li>View and download your verification details</li>
                </ol>
              </div>

              <div className="mt-6 bg-yellow-50 p-4 rounded-lg text-left border border-yellow-100">
                <h3 className="font-semibold text-yellow-800 flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  Important Note:
                </h3>
                <p className="text-sm text-yellow-700 mt-1">
                  Make sure your mobile number is registered with your Aadhaar. The OTP will only be sent to the
                  registered mobile number. This verification is secure and compliant with UIDAI guidelines.
                </p>
              </div>
            </div>
          </div>
        )}
      </li>
    </SearchResult_section>
  )
}

export default AadhaarVerify
