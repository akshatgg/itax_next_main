"use client"
import { useRef, useState } from "react"
import useAuth from "../../../hooks/useAuth"
import { useReactToPrint } from "react-to-print"
import SearchResult_section from "@/components/pagesComponents/pageLayout/SearchResult_section.js"
import { FileSpreadsheet, FileText, Search, RefreshCw, Calendar, Building2, AlertCircle } from "lucide-react"
import handleExport from "@/helper/ExcelExport"
import userAxios from "@/lib/userAxios"

export default function Trackgstreturn() {
  const yearRef = useRef("")
  const gstinRef = useRef("")

  const [showdata, setShowData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [showhide, setShowHide] = useState(false)
  const pdf_ref = useRef()
  const { token } = useAuth()

  const handleInputChange = (event) => {
    if (event.target.value) {
      event.target.value = event.target.value.toUpperCase()
    }
  }

  const validateGSTIN = (gstin) => {
    const regex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/
    return regex.test(gstin)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validate inputs
    if (!validateGSTIN(gstinRef.current.value) || !yearRef.current.value || yearRef.current.value === "Choose..") {
      setError(true)
      return
    }

    setLoading(true)
    setError(false)

    try {
      const response = await userAxios.post(`/gst/return/track`, {
        gstin: gstinRef.current.value,
        financial_year: yearRef.current.value,
      })

      setShowData(response.data)
      console.log("API Response:", response.data)
      console.log("EFiledlist:", response.data?.data?.data?.data?.EFiledlist)
      setShowHide(true)
    } catch (error) {
      console.log(error)
      setError(true)
      setShowHide(false)
    } finally {
      setLoading(false)
    }
  }

  const headers = {
    "Return Type": "rtntype",
    "Arn Number": "arn",
    "Date of Filing": "dof",
    "Mode of Filing": "mof",
    "Return Period": "ret_prd",
    Status: "status",
    Valid: "valid",
  }

  const manageHandleClear = (e) => {
    e.preventDefault()
    gstinRef.current.value = ""
    yearRef.current.value = ""
    setShowData(null)
    setShowHide(false)
    setError(false)
  }

  const generatePDF = useReactToPrint({
    content: () => pdf_ref.current,
    documentTitle: "track-gst-return",
  })

  const handleExcelExport = async () => {
    const data = {
      "Track Gst Return": {
        headers: headers,
        bodyData: showdata?.data?.data?.data?.EFiledlist,
        bannerData: [
          {
            text: "Blaze",
            fontSize: 25,
            fontItalic: false,
            fontUnderline: false,
            fontBold: true,
            textColor: "fffffff",
            backgroundColor: "FF3C7CDD",
            startRow: 1,
            endRow: 1,
            startCol: 1,
            endCol: 24,
            height: 60,
          },
          {
            text: "Track GST return",
            fontSize: 11,
            fontUnderline: false,
            fontBold: false,
            textColor: "2550000000",
            backgroundColor: "fef9c3",
            height: 25,
            startRow: 2,
            endRow: 2,
            startCol: 1,
            endCol: 24,
            fontItalic: false,
            height: 40,
          },
          {
            text: "",
            fontSize: 16,
            fontUnderline: false,
            fontBold: false,
            textColor: "2550000000",
            backgroundColor: "ffffff",
            height: 25,
            startRow: 3,
            endRow: 3,
            startCol: 1,
            endCol: 24,
            fontItalic: false,
            height: 25,
          },
        ],
      },
    }
    await handleExport(data, "Track_GST_Return")
  }

  // Function to get status badge color
  const getStatusColor = (status) => {
    if (status?.toLowerCase().includes("filed") || status?.toLowerCase().includes("success")) {
      return "bg-green-500 text-white"
    } else if (status?.toLowerCase().includes("pending") || status?.toLowerCase().includes("processing")) {
      return "bg-yellow-500 text-white"
    } else if (status?.toLowerCase().includes("error") || status?.toLowerCase().includes("failed")) {
      return "bg-red-500 text-white"
    }
    return "bg-blue-500 text-white"
  }

  // Function to get validity badge color
  const getValidityColor = (valid) => {
    return valid === "Y" ? "bg-green-500 text-white" : "bg-red-500 text-white"
  }

  // Function to format return period
  const formatReturnPeriod = (period) => {
    if (!period || period.length !== 6) return period

    const month = period.substring(0, 2)
    const year = period.substring(2)

    const monthNames = {
      "01": "Jan",
      "02": "Feb",
      "03": "Mar",
      "04": "Apr",
      "05": "May",
      "06": "Jun",
      "07": "Jul",
      "08": "Aug",
      "09": "Sep",
      "10": "Oct",
      "11": "Nov",
      "12": "Dec",
    }

    return `${monthNames[month] || month} 20${year}`
  }

  return (
    <SearchResult_section title="Track GST Return">
      <li className="bg-white rounded-lg shadow-md p-4 transition-all duration-300">
        <form className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
            <div className="">
              <label
                htmlFor="gstin"
                className="form-label inline-block mb-2 text-gray-700 font-medium flex items-center"
              >
                <Building2 className="h-4 w-4 mr-1" />
                GSTN Of The Tax Payer
              </label>
              <div className="relative">
                <input
                  type="text"
                  className={`form-input w-full border p-2 border-blue-500 rounded focus:ring-2 focus:ring-blue-300 focus:outline-none ${
                    error && (!gstinRef.current.value || !validateGSTIN(gstinRef.current.value))
                      ? "border-red-500 bg-red-50"
                      : ""
                  }`}
                  id="gstin"
                  placeholder="Enter GSTN Of The Tax Payer"
                  ref={gstinRef}
                  onChange={handleInputChange}
                  maxLength={15}
                />
                {error && (!gstinRef.current.value || !validateGSTIN(gstinRef.current.value)) && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500">
                    <AlertCircle className="h-5 w-5" />
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Format: 2 digits + 5 letters + 4 digits + 1 letter + 1 letter/digit + Z + 1 letter/digit
              </p>
            </div>
            <div className="">
              <label
                htmlFor="financialYear"
                className="form-label inline-block mb-2 text-gray-700 font-medium flex items-center"
              >
                <Calendar className="h-4 w-4 mr-1" />
                Financial Year
              </label>
              <select
                ref={yearRef}
                className={`form-input w-full border p-2 border-blue-500 rounded focus:ring-2 focus:ring-blue-300 focus:outline-none ${
                  error && (!yearRef.current.value || yearRef.current.value === "Choose..")
                    ? "border-red-500 bg-red-50"
                    : ""
                }`}
                aria-label="Default select example"
                defaultValue={""}
              >
                <option>Choose..</option>
                <option value="FY 2023-24">2023-24</option>
                <option value="FY 2022-23">2022-23</option>
                <option value="FY 2021-22">2021-22</option>
              </select>
              {error && (!yearRef.current.value || yearRef.current.value === "Choose..") && (
                <p className="text-xs text-red-500 mt-1">Please select a financial year</p>
              )}
            </div>
          </div>
          <div className="grid gap-3 place-content-center grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`flex items-center justify-center gap-2 px-4 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
              type="button"
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
                  <Search className="h-5 w-5" />
                  <span>Search</span>
                </>
              )}
            </button>
            <button
              disabled={loading}
              onClick={(e) => manageHandleClear(e)}
              className={`flex items-center justify-center gap-2 px-4 py-2 rounded-md text-white bg-amber-500 hover:bg-amber-600 transition-colors ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
              type="button"
            >
              <RefreshCw className="h-5 w-5" />
              <span>Clear</span>
            </button>
            {showhide && (
              <button
                onClick={handleExcelExport}
                type="button"
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-md text-white bg-green-500 hover:bg-green-600 transition-colors"
              >
                <FileSpreadsheet className="h-5 w-5" />
                <span>Excel</span>
              </button>
            )}
            {showhide && (
              <button
                type="button"
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-md text-white bg-red-500 hover:bg-red-600 transition-colors"
                onClick={generatePDF}
              >
                <FileText className="h-5 w-5" />
                <span>PDF</span>
              </button>
            )}
          </div>
        </form>
        <div className="py-2">
          {error && (
            <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 mr-2" />
                <span className="font-medium">Please check your inputs:</span>
              </div>
              <ul className="mt-1.5 ml-4 list-disc list-inside">
                {(!gstinRef.current.value || !validateGSTIN(gstinRef.current.value)) && (
                  <li>Enter a valid 15-character GSTIN</li>
                )}
                {(!yearRef.current.value || yearRef.current.value === "Choose..") && <li>Select a financial year</li>}
              </ul>
            </div>
          )}
        </div>
      </li>
      <li className="lg:col-span-2 bg-gray-200 p-4 rounded-lg">
        {loading ? (
          <div className="flex items-center justify-center p-8 bg-white rounded-lg shadow-md">
            <div className="flex flex-col items-center">
              <svg
                className="animate-spin h-10 w-10 text-blue-600 mb-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <p className="text-lg font-medium text-gray-700">Fetching GST Returns...</p>
              <p className="text-sm text-gray-500 mt-2">This may take a moment</p>
            </div>
          </div>
        ) : showhide ? (
          <div ref={pdf_ref} className="bg-white rounded-lg shadow-md p-4">
            <div className="bg-blue-50 p-3 rounded-lg mb-3 border border-blue-100">
              <h2 className="text-xl font-bold text-blue-800 mb-1">GST Return Summary</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="flex items-center">
                  <Building2 className="h-4 w-4 text-blue-600 mr-2" />
                  <span className="text-gray-600 mr-1">GSTIN:</span>
                  <span className="font-semibold text-gray-800">{gstinRef.current.value}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 text-blue-600 mr-2" />
                  <span className="text-gray-600 mr-1">Financial Year:</span>
                  <span className="font-semibold text-gray-800">{yearRef.current.value}</span>
                </div>
              </div>
            </div>

            {showdata && showdata?.data?.data?.data?.EFiledlist && showdata.data.data.data.EFiledlist.length > 0 ? (
              <div className="overflow-x-auto scrollbar-thin">
                <table className="w-full text-sm text-left text-gray-500 border-collapse">
                  <thead className="text-xs text-white bg-blue-600">
                    <tr>
                      {Object.keys(headers).map((col) => (
                        <th className="px-4 py-2 font-semibold" key={col}>
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {showdata.data.data.data.EFiledlist.map((row, i) => (
                      <tr
                        className={`${i % 2 === 0 ? "bg-white" : "bg-blue-50"} border-b hover:bg-gray-50 transition-colors`}
                        key={i}
                      >
                        <td className="px-4 py-2 font-medium text-gray-900">
                          <div className="flex items-center">
                            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded">
                              {row.rtntype}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-2 font-mono text-xs">{row.arn}</td>
                        <td className="px-4 py-2">{row.dof}</td>
                        <td className="px-4 py-2">{row.mof}</td>
                        <td className="px-4 py-2">{formatReturnPeriod(row.ret_prd)}</td>
                        <td className="px-4 py-2">
                          <span
                            className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(row.status)}`}
                          >
                            {row.status}
                          </span>
                        </td>
                        <td className="px-4 py-2">
                          <span
                            className={`px-2 py-1 text-xs font-semibold rounded-full ${getValidityColor(row.valid)}`}
                          >
                            {row.valid === "Y" ? "Yes" : "No"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="mt-4 text-right text-xs text-gray-500">
                  Total Returns: {showdata.data.data.data.EFiledlist.length}
                </div>
              </div>
            ) : (
              <div className="text-center p-8 bg-gray-50 rounded-lg border border-gray-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 mx-auto text-gray-400 mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 2a10 10 0 110 20 10 10 0 010-20z"
                  />
                </svg>
                <p className="text-lg text-gray-600 font-medium">No GST return data found</p>
                <p className="text-gray-500 mt-1">Try a different GSTIN or financial year</p>
              </div>
            )}
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
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                />
              </svg>
              <h2 className="text-xl font-bold text-gray-800 mb-2">Welcome to the Track GST Return page</h2>
              <p className="text-gray-600 mb-6">
                Use the search form to find information about GST Returns and their filing status.
              </p>

              <div className="bg-blue-50 p-4 rounded-lg text-left border border-blue-100">
                <h3 className="font-semibold text-blue-800 mb-2">How to use:</h3>
                <ol className="list-decimal list-inside text-gray-700 space-y-2">
                  <li>Enter a valid 15-digit GSTIN in the search box</li>
                  <li>Select the financial year for which you want to check returns</li>
                  <li>Click the Search button to retrieve GST return details</li>
                  <li>View the filing status of different return types</li>
                  <li>Export the information to Excel or PDF if needed</li>
                </ol>
              </div>
            </div>
          </div>
        )}
      </li>
    </SearchResult_section>
  )
}
