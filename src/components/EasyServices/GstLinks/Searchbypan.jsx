"use client"
import { useRef, useState } from "react"
import axios from "axios"
import useAuth from "../../../hooks/useAuth"
import { useRouter } from "next/navigation"
import { useReactToPrint } from "react-to-print"
import SearchResult_section from "@/components/pagesComponents/pageLayout/SearchResult_section.js"
import ResultComponent from "../Components/ResultComponent"
import gstStateCodes from "@/utils/gstStateCodes"
import { useDispatch } from "react-redux"
const PDF_DOC = "PDF_DOC"

export default function Searchbypan() {
  const { token } = useAuth()
  const navigate = useRouter()
  const dispatch = useDispatch()

  const panRef = useRef("")

  const [selectStateCode, setSelectStateCode] = useState(0)
  const [showdata, setShowData] = useState("")
  const [loading, setLoading] = useState(false)
  const [showHide, setShowHide] = useState(false)
  const [error, setError] = useState(false)
  const pdf_ref = useRef()

  const generateDataObject = () => ({
    title: "TAX PAYER DETAIL",
    column: ["Field", "Detail"],
    data: [
      { Field: "Legal Name Of Business", Detail: showdata.lgnm },
      { Field: "Trade Name", Detail: showdata.tradeNam },
      { Field: "Effective Date Of Registration", Detail: showdata.rgdt },
      { Field: "Constitution of Business", Detail: showdata.ctb },
      { Field: "GSTIN/UIN/Status", Detail: showdata.sts },
      { Field: "Tax Payer Type", Detail: showdata.dty },
      { Field: "State Juridication", Detail: showdata.stj },
      {
        Field: "Administrative Office",
        Detail: "GURUDWARA SANTAR  Gwalior MORAR  GWALIOR  474005 GWALIOR Madhya Pradesh",
      },
      {
        Field: "Principal place of Business",
        Detail: showdata.pradr?.ntr || "",
      },
    ],
  })

  const generatePDF = useReactToPrint({
    content: () => pdf_ref.current,
    documentTitle: "PAN Of Tax Payer",
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    const enteredPAN = panRef.current.value
    const enteredStateCode = selectStateCode

    // Validate PAN before making the API request
    if (!validatePAN(enteredPAN)) {
      setError(true)
      setShowHide(false)
      setLoading(false)
      return // Don't proceed with the API request
    }

    // Validate state code
    if (enteredStateCode === 0) {
      setError(true)
      setShowHide(false)
      setLoading(false)
      return
    }

    setLoading(true)

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/gst/search/gstin-by-pan?pan=${enteredPAN}&gst_state_code=${+enteredStateCode}`,
        { pan: enteredPAN, gst_state_code: enteredStateCode },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      )

      setShowData(response.data.data.data[0].data)
      console.log("response", response.data.data.data[0].data)
      setShowHide(true)
      setError(false)
    } catch (error) {
      console.error("Error fetching data:", error)
      setError(true)
      setShowHide(false)
    } finally {
      setLoading(false)
    }
  }

  const manageHandleClear = (e) => {
    e.preventDefault()
    panRef.current.value = ""
    setShowData("")
    setSelectStateCode(0)
    setShowHide(false)
    setError(false)
  }

  const validatePAN = (pan) => {
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/
    return panRegex.test(pan)
  }

  const payload = () => {
    dispatch({ type: `${PDF_DOC}`, payload: generateDataObject() })
    navigate.push("/pdfViewer")
  }

  // Safe access to nested properties
  const {
    bnm = "",
    bno = "",
    city = "",
    dst = "",
    flno = "",
    lg = "",
    loc = "",
    lt = "",
    pncd = "",
    st = "",
    stcd = "",
  } = showdata.pradr?.addr || {}

  const details = [
    { label: "Legal Name Of Business", value: showdata.lgnm || "" },
    { label: "Trade Name", value: showdata.tradeNam || "" },
    { label: "Effective Date Of Registration", value: showdata.rgdt || "" },
    { label: "Constitution of Business", value: showdata.ctb || "" },
    { label: "GSTIN/UIN/Status", value: showdata.sts || "" },
    { label: "Tax Payer Type", value: showdata.dty || "" },
    { label: "State Juridication", value: showdata.stj || "" },
    {
      label: "Administrative Office",
      value:
        `${bnm || ""} ${bno || ""} ${city || ""} ${dst || ""} ${flno || ""} ${lg || ""} ${loc || ""} ${lt || ""} ${pncd || ""} ${st || ""} ${stcd || ""}`.trim() ||
        "Not Available",
    },
    {
      label: "Principal place of Business",
      value: `${dst || ""} ${stcd || ""} ${pncd || ""}`.trim() || "Not Available",
    },
  ]

  return (
    <SearchResult_section title="Search by PAN">
      <li className="bg-white rounded-lg shadow-md p-4 transition-all duration-300">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
            <div>
              <label htmlFor="pan" className="form-label inline-block mb-2 text-gray-700 font-medium">
                PAN Of Tax Payer
              </label>
              <div className="relative">
                <input
                  type="text"
                  className="form-input w-full border p-2 border-blue-500 rounded focus:ring-2 focus:ring-blue-300 focus:outline-none uppercase"
                  id="pan"
                  placeholder="Enter PAN Of The Tax Payer"
                  ref={panRef}
                  maxLength={10}
                />
                {error && !validatePAN(panRef.current?.value) && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1">Format: ABCDE1234F (5 letters + 4 digits + 1 letter)</p>
            </div>
            <div>
              <label htmlFor="stateCode" className="form-label inline-block mb-2 text-gray-700 font-medium">
                GST State Code
              </label>
              <select
                className="form-input w-full border border-blue-500 p-2 rounded focus:ring-2 focus:ring-blue-300 focus:outline-none"
                id="stateCode"
                placeholder="Select State"
                onChange={(e) => {
                  setSelectStateCode(e.target.value)
                }}
                value={selectStateCode}
              >
                <option value={0}>Select State</option>
                {gstStateCodes.map((state) => (
                  <option className="capitalize" key={state.code} value={state.code}>
                    {state.code} - {state.state}
                  </option>
                ))}
              </select>
              {error && selectStateCode === 0 && <p className="text-xs text-red-500 mt-1">Please select a state</p>}
            </div>
          </div>
          <div className="grid gap-3 place-content-center grid-cols-1 sm:grid-cols-3">
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
                  <span>Searching...</span>
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Search</span>
                </>
              )}
            </button>
            <button
              type="button"
              disabled={loading}
              onClick={(e) => manageHandleClear(e)}
              className={`flex items-center justify-center gap-2 px-4 py-2 rounded-md text-white bg-amber-500 hover:bg-amber-600 transition-colors ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Clear</span>
            </button>
            {showHide && (
              <button
                type="button"
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-md text-white bg-green-500 hover:bg-green-600 transition-colors"
                onClick={generatePDF}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>PDF</span>
              </button>
            )}
          </div>
        </form>
        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600 font-medium flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              Please Enter Valid Credentials
            </p>
            <ul className="text-red-500 text-sm mt-1 ml-7 list-disc">
              <li>PAN must be in format: 5 letters + 4 digits + 1 letter</li>
              <li>State code must be selected</li>
            </ul>
          </div>
        )}
      </li>
      <li className="lg:col-span-2 bg-gray-200 p-4 rounded-lg">
        {loading && (
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="flex flex-col items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
              <p className="text-gray-700 font-medium">Loading taxpayer details...</p>
              <p className="text-gray-500 text-sm mt-2">This may take a few moments</p>
            </div>
          </div>
        )}
        {!loading && showHide ? (
          <div className="bg-white p-4 rounded-lg shadow-md" ref={pdf_ref}>
            <div className="mb-3 border-b border-gray-200 pb-2">
              <h2 className="text-xl font-bold text-blue-700">PAN Card Details</h2>
              <p className="text-gray-600 text-sm">Information retrieved based on PAN and State Code</p>
            </div>

            <ResultComponent title="PAN CARD DETAILS" details={details} />
          </div>
        ) : (
          !loading &&
          !showHide && (
            <div className="bg-white mx-auto md:w-2/3 px-6 py-8 rounded-lg shadow-md">
              <div className="text-center">
                <div className="mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 mx-auto text-blue-500 mb-3"
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
                  <h2 className="text-xl font-bold text-gray-800 mb-2">Welcome to the PAN Search page</h2>
                </div>
                <p className="text-gray-600 mb-4">
                  Use the search form to find information about taxpayers using their PAN number and state code.
                </p>
                <div className="bg-blue-50 p-3 rounded-lg text-left">
                  <h3 className="font-semibold text-blue-800 mb-1">How to use:</h3>
                  <ol className="list-decimal list-inside text-gray-700 space-y-1 text-sm">
                    <li>Enter a valid 10-character PAN in the search box</li>
                    <li>Select the appropriate GST state code from the dropdown</li>
                    <li>Click the Search button to retrieve taxpayer details</li>
                    <li>Download the information as PDF if needed</li>
                  </ol>
                </div>
              </div>
            </div>
          )
        )}
      </li>
    </SearchResult_section>
  )
}
