"use client"
import { useRef, useState, useEffect } from "react"
import useAuth from "../../../hooks/useAuth"
import { useRouter } from "next/navigation"
import { useReactToPrint } from "react-to-print"
import SearchResult_section from "@/components/pagesComponents/pageLayout/SearchResult_section.js"
import userAxios from "@/lib/userbackAxios"
import { toast } from "react-toastify"
import FormComponent from "../Components/FormComponent"
import ResultComponent from "../Components/ResultComponent"
import { useDispatch } from "react-redux"
const PDF_DOC = "PDF_DOC"
import Button from "@/components/ui/Button"
import { InputStyles } from "@/app/styles/InputStyles"

export default function Searchbygstin() {
  const { token } = useAuth()
  const navigate = useRouter()
  const [showdata, setShowData] = useState("")
  const [showhide, setShowHide] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const pdf_ref = useRef()
  const dispatch = useDispatch()

  const validateGSTIN = (gstin) => {
    const regex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/
    return regex.test(gstin)
  }

  // Get the actual GST data properties safely
  const getGstData = () => {
    if (!showdata || !showdata.data) return {}
    return showdata.data
  }

  const generateDataObject = () => {
    const gstData = getGstData()
    return {
      title: "TAX PAYER DETAIL",
      column: ["Field", "Detail"],
      data: [
        { Field: "GSTIN", Detail: gstData.gstin },
        { Field: "Registration Date", Detail: gstData.rgdt },
        { Field: "Legal Name Of Business", Detail: gstData.lgnm },
        { Field: "Trade Name", Detail: gstData.tradeNam },
        { Field: "Effective Date Of Registration", Detail: gstData.rgdt },
        { Field: "Constitution of Business", Detail: gstData.ctb },
        { Field: "GSTIN/UIN/Status", Detail: gstData.sts },
        { Field: "Tax Payer Type", Detail: gstData.dty },
        { Field: "State Juridication", Detail: gstData.stj },
        { Field: "City Juridication", Detail: gstData.ctj },
        {
          Field: "Administrative Office",
          Detail: gstData.pradr?.addr
            ? `${gstData.pradr.addr.bno || ""} ${gstData.pradr.addr.flno || ""} ${gstData.pradr.addr.st || ""} ${gstData.pradr.addr.loc || ""} ${gstData.pradr.addr.pncd || ""} ${gstData.pradr.addr.stcd || ""}`.trim()
            : "",
        },
        {
          Field: "Principal place of Business",
          Detail: gstData.pradr?.addr
            ? `${gstData.pradr.addr.dst || ""} ${gstData.pradr.addr.stcd || ""} ${gstData.pradr.addr.pncd || ""}`.trim()
            : "",
        },
      ],
    }
  }

  const handleSubmit = async (e, inputValue) => {
    e.preventDefault()
    if (!validateGSTIN(inputValue)) {
      setError(true)
      setShowHide(false)
      return
    }

    try {
      setLoading(true)
      console.log("Making API request with GSTIN:", inputValue)

      const response = await userAxios.post(`/gst/search/gstin`, { gstin: inputValue })

      console.log("Full API Response:", response)
      console.log("Response data:", response.data)

      if (response.data && response.data.success) {
        console.log("Success flag found")
      }

      if (response.data && response.data.data) {
        console.log("Data object found at first level")
      }

      if (response.data && response.data.data && response.data.data.data) {
        console.log("Data object found at second level")
        console.log("GST Details:", response.data.data)
      }

      if (response.data && response.data.success && response.data.data) {
        // Extract the actual GST data from the response
        const gstData = response.data.data.data
        console.log("Setting GST data:", gstData)
        setShowData(gstData)
        setShowHide(true)
        setError(false)
        toast?.success("GST details fetched successfully")
      } else {
        console.error("Unexpected response structure:", response)
        throw new Error("Invalid response structure")
      }
    } catch (error) {
      console.error("Error fetching GST data:", error)
      setError(true)
      setShowHide(false)
      toast?.error("Error while fetching GST profile!")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (showdata) {
      console.log("GST data updated:", showdata)
    } else {
      console.log("No GST data available")
    }
  }, [showdata])

  const handleClear = async (e) => {
    e.preventDefault()
    setShowData("")
    setShowHide(false)
    setError(false)
  }

  const payload = () => {
    dispatch({ type: `${PDF_DOC}`, payload: generateDataObject() })
    navigate.push("/pdfViewer")
  }

  // Get GST data for rendering
  const gstData = getGstData()

  // Safe access to nested properties with optional chaining
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
  } = gstData.pradr?.addr || {}

  const details = [
    { label: "GSTIN:", value: gstData.gstin || "" },
    { label: "Registration Date:", value: gstData.rgdt || "" },
    { label: "Legal Name Of Business:", value: gstData.lgnm || "" },
    { label: "Trade Name:", value: gstData.tradeNam || "" },
    { label: "Effective Date Of Registration:", value: gstData.rgdt || "" },
    { label: "Constitution of Business:", value: gstData.ctb || "" },
    { label: "GSTIN/UIN/Status:", value: gstData.sts || "" },
    { label: "TaxPayer Type:", value: gstData.dty || "" },
    { label: "State Jurisdiction:", value: gstData.stj || "" },
    { label: "City Jurisdiction:", value: gstData.ctj || "" },
    {
      label: "Administrative Office:",
      value: gstData.pradr?.addr
        ? `${bno || ""} ${dst || ""} ${flno || ""} ${loc || ""} ${pncd || ""} ${st || ""} ${stcd || ""}`.trim()
        : "",
    },
    {
      label: "Principal place of Business:",
      value: gstData.pradr?.addr ? `${dst || ""} ${stcd || ""} ${pncd || ""}`.trim() : "",
    },
  ]

  const generatePDF = useReactToPrint({
    content: () => pdf_ref.current,
    documentTitle: "GSTIN Detail",
  })

  return (
    <SearchResult_section title="Search by GSTIN" titleClassName="text-xl font-bold text-blue-600 mb-4">
      <li className="bg-white rounded-lg shadow-md p-4 transition-all duration-300">
        <FormComponent
          onSubmit={handleSubmit}
          validateInput={validateGSTIN}
          inputLabel="Search By"
          inputPlaceholder="Your GST Identification Number"
          buttonText="Search"
          handleClear={handleClear}
          showhide={showhide}
          generatePDF={generatePDF}
          loading={loading}
        />

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
              Please Enter Valid GSTIN
            </p>
            <p className="text-red-500 text-sm mt-1 ml-7">
              Format: 2 digits + 5 letters + 4 digits + 1 letter + 1 letter/digit + Z + 1 letter/digit
            </p>
          </div>
        )}
      </li>
      <li className={InputStyles.SearchGSTbase}>
        {loading && (
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="flex flex-col items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
              <p className="text-gray-700 font-medium">Loading GST details...</p>
              <p className="text-gray-500 text-sm mt-2">This may take a few moments</p>
            </div>
          </div>
        )}
        {!loading && showhide ? (
          <div className="bg-white p-4 rounded-lg shadow-md transition-all duration-300" ref={pdf_ref}>
            <div className="mb-3 border-b border-gray-200 pb-2">
              <h2 className="text-xl font-bold text-blue-700">Taxpayer Information</h2>
            </div>

            <ResultComponent details={details} dispatch={payload} title="TAX PAYER DETAIL" />
          </div>
        ) : (
          !loading &&
          !showhide && (
            <div className= "bg-white p-4 rounded-lg shadow-md transition-all duration-300" >
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
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <h2 className={InputStyles.tdstitle}>Welcome to the TaxPayer search page</h2>
                </div>
                <p className="paragraph-md text-gray-600 mb-4">
                  Use the search bar to find information about taxpayers and their financial records.
                </p>
                <div className="bg-blue-50 p-3 rounded-lg text-left">
                  <h3 className="font-semibold text-blue-800 mb-1">How to use:</h3>
                  <ol className="list-decimal list-inside text-gray-700 space-y-1 text-sm">
                    <li>Enter a valid 15-digit GSTIN in the search box</li>
                    <li>Click the Search button to retrieve taxpayer details</li>
                    <li>View comprehensive information about the GST registered entity</li>
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
