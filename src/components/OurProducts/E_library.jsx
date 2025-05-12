"use client"
const BASE_URL = process.env.NEXT_PUBLIC_BACK_URL
import axios from "axios"
import { Icon } from "@iconify/react"
import { useEffect, useState, useMemo } from "react"
import { useRef } from "react"
import { useReactToPrint } from "react-to-print"

const E_library = () => {
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [searchkey, setSearchkey] = useState(null)
  const [currdata, setCurrData] = useState([])
  const [show, setShow] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState("all")
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null })

  // Filter options
  const [filterOptions, setFilterOptions] = useState({
    section: "",
    bench: "",
    assessmentYear: "",
  })

  const showtype = (id) => {
    const crrid = data.filter((item) => item.id == id)
    setCurrData(crrid)
    setShow(!show)
  }

  useEffect(() => {
    setIsLoading(true)
    axios
      .get(`${BASE_URL}/library/getAll`)
      .then((response) => {
        setData(response.data.allLibrary)
        setFilteredData(response.data.allLibrary)
        setIsLoading(false)
      })
      .catch((error) => {
        console.log(error)
        setIsLoading(false)
      })
  }, [])

  const filterRef = useRef()
  const conponentPDF = useRef()
  const tableRef = useRef()

  const generatePDF = useReactToPrint({
    content: () => conponentPDF.current,
    documentTitle: "E_Library Itax Easy",
  })

  // Extract unique values for filters
  const uniqueSections = useMemo(() => {
    const sections = data.map((item) => item.section).filter(Boolean)
    return [...new Set(sections)].sort()
  }, [data])

  const uniqueBenches = useMemo(() => {
    const benches = data.map((item) => item.bench).filter(Boolean)
    return [...new Set(benches)].sort()
  }, [data])

  const uniqueAssessmentYears = useMemo(() => {
    const years = data.map((item) => item.assessment_year).filter(Boolean)
    return [...new Set(years)].sort()
  }, [data])

  function handleSearch() {
    const searchTerm = filterRef.current.value.trim().toLowerCase()
    if (!searchTerm) return
    setSearchkey(searchTerm)

    const newFilteredData = data.filter((row) => {
      return Object.values(row).some((value) => {
        return value?.toString().toLowerCase().includes(searchTerm)
      })
    })

    setFilteredData(newFilteredData)
  }

  function handleResetSearch() {
    setFilteredData(data)
    filterRef.current.value = ""
    setSearchkey(null)
    setFilterOptions({
      section: "",
      bench: "",
      assessmentYear: "",
    })
    setActiveFilter("all")
    setSortConfig({ key: null, direction: null })
  }

  // Apply filters
  useEffect(() => {
    let result = [...data]

    // Apply search term
    if (searchkey) {
      result = result.filter((row) => {
        return Object.values(row).some((value) => {
          return value?.toString().toLowerCase().includes(searchkey.toLowerCase())
        })
      })
    }

    // Apply dropdown filters
    if (filterOptions.section) {
      result = result.filter((item) => item.section === filterOptions.section)
    }

    if (filterOptions.bench) {
      result = result.filter((item) => item.bench === filterOptions.bench)
    }

    if (filterOptions.assessmentYear) {
      result = result.filter((item) => item.assessment_year === filterOptions.assessmentYear)
    }

    // Apply sorting
    if (sortConfig.key) {
      result.sort((a, b) => {
        if (!a[sortConfig.key]) return sortConfig.direction === "ascending" ? -1 : 1
        if (!b[sortConfig.key]) return sortConfig.direction === "ascending" ? 1 : -1

        const aValue = a[sortConfig.key].toString().toLowerCase()
        const bValue = b[sortConfig.key].toString().toLowerCase()

        if (aValue < bValue) {
          return sortConfig.direction === "ascending" ? -1 : 1
        }
        if (aValue > bValue) {
          return sortConfig.direction === "ascending" ? 1 : -1
        }
        return 0
      })
    }

    setFilteredData(result)
  }, [data, searchkey, filterOptions, sortConfig])

  // Handle filter change
  const handleFilterChange = (filterName, value) => {
    setFilterOptions((prev) => ({
      ...prev,
      [filterName]: value,
    }))
  }

  // Handle sorting
  const requestSort = (key) => {
    let direction = "ascending"
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending"
    }
    setSortConfig({ key, direction })
  }

  // Get sort direction indicator
  const getSortDirectionIndicator = (name) => {
    if (sortConfig.key !== name) {
      return <Icon icon="mdi:sort" className="ml-1 text-gray-400" />
    }
    return sortConfig.direction === "ascending" ? (
      <Icon icon="mdi:sort-ascending" className="ml-1 text-primary" />
    ) : (
      <Icon icon="mdi:sort-descending" className="ml-1 text-primary" />
    )
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 bg-white rounded-lg shadow-sm">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-primary flex items-center">
          <Icon icon="mdi:library" className="mr-2" /> E-Library
        </h1>

        {/* Search and Filter Section */}
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative flex-grow">
            <input
              type="text"
              ref={filterRef}
              placeholder="Search anything..."
              className="w-full border-2 border-gray-300 rounded-md px-3 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-300"
            />
            <Icon icon="mdi:magnify" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <button
            onClick={handleSearch}
            className="bg-primary hover:bg-primary/90 text-white font-medium py-2 px-4 rounded transition-all duration-300 flex items-center justify-center"
          >
            <Icon icon="mdi:search" className="mr-1" /> Search
          </button>
          {searchkey && (
            <button
              onClick={handleResetSearch}
              className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded transition-all duration-300 flex items-center justify-center"
            >
              <Icon icon="mdi:close-circle" className="mr-1" /> Reset
            </button>
          )}
        </div>
      </div>

      {/* Filter Pills */}
      <div className="mb-4 flex flex-wrap gap-2">
        <button
          onClick={() => setActiveFilter("all")}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
            activeFilter === "all" ? "bg-primary text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          All
        </button>

        {/* Filter Dropdowns */}
        <div className="flex flex-wrap gap-2">
          {/* Section Filter */}
          <div className="relative">
            <select
              value={filterOptions.section}
              onChange={(e) => handleFilterChange("section", e.target.value)}
              className="appearance-none bg-gray-100 text-gray-700 px-3 py-1 pr-8 rounded-full text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              <option value="">Section</option>
              {uniqueSections.map((section) => (
                <option key={section} value={section}>
                  {section}
                </option>
              ))}
            </select>
            <Icon
              icon="mdi:chevron-down"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
            />
          </div>

          {/* Bench Filter */}
          <div className="relative">
            <select
              value={filterOptions.bench}
              onChange={(e) => handleFilterChange("bench", e.target.value)}
              className="appearance-none bg-gray-100 text-gray-700 px-3 py-1 pr-8 rounded-full text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              <option value="">Bench</option>
              {uniqueBenches.map((bench) => (
                <option key={bench} value={bench}>
                  {bench}
                </option>
              ))}
            </select>
            <Icon
              icon="mdi:chevron-down"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
            />
          </div>

          {/* Assessment Year Filter */}
          <div className="relative">
            <select
              value={filterOptions.assessmentYear}
              onChange={(e) => handleFilterChange("assessmentYear", e.target.value)}
              className="appearance-none bg-gray-100 text-gray-700 px-3 py-1 pr-8 rounded-full text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              <option value="">Assessment Year</option>
              {uniqueAssessmentYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            <Icon
              icon="mdi:chevron-down"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
            />
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-4 text-sm text-gray-500">
        Showing {filteredData.length} of {data.length} entries
      </div>

      {/* Table Container */}
      <div className="w-full overflow-auto rounded-lg border border-gray-200 shadow-sm" ref={tableRef}>
        {isLoading ? (
          <div className="flex items-center justify-center p-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : filteredData.length === 0 ? (
          <div className="text-center p-8">
            <Icon icon="mdi:file-search-outline" className="text-6xl text-gray-300 mx-auto mb-2" />
            <p className="text-gray-500 text-lg">No matching records found</p>
            <button
              onClick={handleResetSearch}
              className="mt-4 bg-primary hover:bg-primary/90 text-white font-medium py-2 px-4 rounded transition-all duration-300"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => requestSort("id")}
                >
                  <div className="flex items-center">ID {getSortDirectionIndicator("id")}</div>
                </th>
                <th
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => requestSort("pan")}
                >
                  <div className="flex items-center">PAN {getSortDirectionIndicator("pan")}</div>
                </th>
                <th
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => requestSort("section")}
                >
                  <div className="flex items-center">Section {getSortDirectionIndicator("section")}</div>
                </th>
                <th
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => requestSort("sub_section")}
                >
                  <div className="flex items-center">Sub Section {getSortDirectionIndicator("sub_section")}</div>
                </th>
                <th
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => requestSort("subject")}
                >
                  <div className="flex items-center">Subject {getSortDirectionIndicator("subject")}</div>
                </th>
                <th
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => requestSort("bench")}
                >
                  <div className="flex items-center">Bench {getSortDirectionIndicator("bench")}</div>
                </th>
                <th
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => requestSort("appeal_no")}
                >
                  <div className="flex items-center">Appeal No {getSortDirectionIndicator("appeal_no")}</div>
                </th>
                <th
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => requestSort("appellant")}
                >
                  <div className="flex items-center">Appellant {getSortDirectionIndicator("appellant")}</div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.map((element) => (
                <tr key={element.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{element.id}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{element.pan}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{element.section}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{element.sub_section}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{element.subject}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{element.bench}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{element.appeal_no}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{element.appellant}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    <button
                      type="button"
                      className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/30 transition-all duration-300"
                      onClick={() => showtype(element.id)}
                    >
                      <Icon icon="mdi:eye" className="mr-1" />
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Detail Modal */}
      <div
        id="static-modal"
        data-modal-backdrop="static"
        tabIndex={-1}
        aria-hidden="true"
        className={
          show
            ? "fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center"
            : "hidden"
        }
      >
        <div className="relative w-full max-w-4xl p-4 mx-auto">
          {/* Modal content */}
          <div className="relative bg-white rounded-lg shadow-xl">
            {/* Modal header */}
            <div className="flex items-center justify-between p-4 border-b rounded-t">
              <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                <Icon icon="mdi:file-document-outline" className="mr-2" />
                Library Entry Details
              </h3>
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={generatePDF}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/30 transition-all duration-300"
                >
                  <Icon icon="mdi:download" className="mr-1" />
                  Download
                </button>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex items-center"
                  onClick={() => setShow(false)}
                >
                  <Icon icon="mdi:close" className="w-5 h-5" />
                  <span className="sr-only">Close</span>
                </button>
              </div>
            </div>

            {/* Modal body */}
            <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto" ref={conponentPDF}>
              {currdata.map((element) => (
                <div key={element.id}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-gray-50 rounded-lg p-4 shadow-sm">
                      <h4 className="text-lg font-medium text-primary mb-3 border-b pb-2">Basic Information</h4>
                      <div className="space-y-2">
                        <div className="flex flex-col">
                          <span className="text-xs text-gray-500">ID</span>
                          <span className="font-medium">{element.id}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs text-gray-500">PAN</span>
                          <span className="font-medium">{element.pan}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs text-gray-500">Section</span>
                          <span className="font-medium">{element.section}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs text-gray-500">Sub Section</span>
                          <span className="font-medium">{element.sub_section}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs text-gray-500">Subject</span>
                          <span className="font-medium">{element.subject}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs text-gray-500">AO Order</span>
                          <span className="font-medium">{element.ao_order}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs text-gray-500">ITAT No</span>
                          <span className="font-medium">{element.itat_no}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs text-gray-500">RSA No</span>
                          <span className="font-medium">{element.rsa_no}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs text-gray-500">Bench</span>
                          <span className="font-medium">{element.bench}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4 shadow-sm">
                      <h4 className="text-lg font-medium text-primary mb-3 border-b pb-2">Appeal Information</h4>
                      <div className="space-y-2">
                        <div className="flex flex-col">
                          <span className="text-xs text-gray-500">Appeal No</span>
                          <span className="font-medium">{element.appeal_no}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs text-gray-500">Appellant</span>
                          <span className="font-medium">{element.appellant}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs text-gray-500">Respondent</span>
                          <span className="font-medium">{element.respondent}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs text-gray-500">Appeal Type</span>
                          <span className="font-medium">{element.appeal_type}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs text-gray-500">Appeal Filed By</span>
                          <span className="font-medium">{element.appeal_filed_by}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs text-gray-500">Order Result</span>
                          <span className="font-medium">{element.order_result}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs text-gray-500">Tribunal Order Date</span>
                          <span className="font-medium">{element.tribunal_order_date}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs text-gray-500">Assessment Year</span>
                          <span className="font-medium">{element.assessment_year}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs text-gray-500">Download</span>
                          <span className="font-medium">{element.download}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {element.conclusion && (
                      <div className="bg-gray-50 rounded-lg p-4 shadow-sm">
                        <h4 className="text-lg font-medium text-primary mb-3 border-b pb-2 flex items-center">
                          <Icon icon="mdi:book-open-variant" className="mr-2" /> Lesson
                        </h4>
                        <p className="text-gray-700 whitespace-pre-line">{element.conclusion}</p>
                      </div>
                    )}

                    {element.judgment && (
                      <div className="bg-gray-50 rounded-lg p-4 shadow-sm">
                        <h4 className="text-lg font-medium text-primary mb-3 border-b pb-2 flex items-center">
                          <Icon icon="mdi:gavel" className="mr-2" /> Judgment
                        </h4>
                        <p className="text-gray-700 whitespace-pre-line">{element.judgment}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default E_library
