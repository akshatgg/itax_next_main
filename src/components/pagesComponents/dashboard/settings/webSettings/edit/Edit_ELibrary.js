"use client"

import { useState, useEffect, useMemo } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { Icon } from "@iconify/react"
import Section from "@/components/pagesComponents/pageLayout/Section"
import { H5 } from "@/components/pagesComponents/pageLayout/Headings"
import Pagination from "@/components/navigation/Pagination"
import userbackAxios from "@/lib/userbackAxios"

// Modal component for editing library entries
function EditModal({ isOpen, onClose, libraryData, onUpdate }) {
  const [isLoading, setIsLoading] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
    getValues,
    setValue,
    watch,
  } = useForm({
    defaultValues: libraryData || {},
  })

  // Watch for form changes
  const watchAllFields = watch()

  useEffect(() => {
    setHasChanges(isDirty)
  }, [watchAllFields, isDirty])

  useEffect(() => {
    if (libraryData) {
      // Reset form with libraryData
      reset(libraryData)
      setHasChanges(false)
    }
  }, [libraryData, reset])

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setValue(name, value)
    setHasChanges(true)
  }

  // Handle closing with unsaved changes
  const handleClose = () => {
    if (hasChanges) {
      if (window.confirm("You have unsaved changes. Are you sure you want to close?")) {
        onClose()
      }
    } else {
      onClose()
    }
  }

  const onSubmit = async () => {
    try {
      setIsLoading(true)
      // Using getValues directly instead of data parameter
      console.log("Form values before submission:", getValues())
      const dataToSend = getValues()
      const { status, data: responseData } = await userbackAxios.put(`/library/update/${libraryData.id}`, dataToSend, {
        headers: { "Content-Type": "application/json" },
      })

      console.log("Update response:", responseData)

      if (status === 200) {
        toast.success("Library entry updated successfully")
        setHasChanges(false)
        onUpdate() // Refresh data after update
        onClose() // Close modal
      }
    } catch (error) {
      console.error("Update error:", error)
      toast.error("Failed to update library entry: " + (error.response?.data?.message || error.message))
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  const formFields = [
    { name: "pan", label: "PAN" },
    { name: "section", label: "Section" },
    { name: "sub_section", label: "Sub-section" },
    { name: "subject", label: "Subject" },
    { name: "ao_order", label: "AO Order" },
    { name: "itat_no", label: "ITAT No." },
    { name: "rsa_no", label: "RSA No." },
    { name: "bench", label: "Bench" },
    { name: "appeal_no", label: "Appeal No." },
    { name: "appellant", label: "Appellant" },
    { name: "respondent", label: "Respondent" },
    { name: "appeal_type", label: "Appeal Type" },
    { name: "appeal_filed_by", label: "Appeal Filed By" },
    { name: "order_result", label: "Order Result" },
    { name: "tribunal_order_date", label: "Tribunal Order Date", type: "date" },
    { name: "assessment_year", label: "Assessment Year" },
    { name: "judgment", label: "Judgment", multiline: true },
    { name: "conclusion", label: "Conclusion", multiline: true },
    { name: "download", label: "Download Link" },
    { name: "upload", label: "Upload Link" },
  ]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white rounded-lg w-11/12 md:w-4/5 lg:w-3/4 xl:w-2/3 h-5/6 overflow-hidden shadow-xl">
        <div className="p-4 bg-primary text-white flex justify-between items-center border-b border-primary/30">
          <h3 className="font-bold text-lg flex items-center">
            <Icon icon="material-symbols:edit-document" className="mr-2" />
            Edit Library Entry
          </h3>
          <button
            onClick={handleClose}
            className="text-2xl hover:bg-primary-dark rounded-full w-8 h-8 flex items-center justify-center transition-colors"
          >
            &times;
          </button>
        </div>

        <div className="p-4 overflow-y-auto h-[calc(100%-136px)]">
          <form id="edit-form" onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {formFields.map((field) => (
              <div key={field.name} className={`col-span-1 ${field.multiline ? "sm:col-span-2" : ""}`}>
                <label className="text-txt font-semibold block mb-1 text-sm" htmlFor={field.name}>
                  {field.label}
                </label>
                {field.multiline ? (
                  <textarea
                    id={field.name}
                    placeholder={field.label}
                    {...register(field.name)}
                    onChange={handleInputChange}
                    className="mt-1 bg-bg_2/10 border border-txt/300 focus:border-primary focus:ring-1 focus:ring-primary/30 text-txt text-sm block w-full p-2 rounded transition-all"
                    rows={4}
                  />
                ) : (
                  <input
                    id={field.name}
                    type={field.type || "text"}
                    placeholder={field.label}
                    {...register(field.name)}
                    onChange={handleInputChange}
                    className="mt-1 bg-bg_2/10 border border-txt/300 focus:border-primary focus:ring-1 focus:ring-primary/30 text-txt text-sm block w-full p-2 rounded transition-all"
                  />
                )}
                {errors[field.name] && (
                  <small className="text-red-500 italic text-xs mt-1 block">{errors[field.name]?.message}</small>
                )}
              </div>
            ))}
          </form>
        </div>

        <div className="p-4 bg-gray-100 flex justify-end items-center border-t border-gray-200">
          <button
            onClick={handleClose}
            className="px-4 py-2 mr-3 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors flex items-center"
          >
            <Icon icon="material-symbols:cancel-outline" className="mr-1" /> Cancel
          </button>
          <button
            type="submit"
            form="edit-form"
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition-colors flex items-center shadow-md"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Icon icon="svg-spinners:180-ring" className="animate-spin mr-1" /> Saving...
              </>
            ) : (
              <>
                <Icon icon="material-symbols:save-outline" className="mr-1" /> Save Changes
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

function LibraryCard({ libraryData, onEdit, onDelete, isExpanded, toggleExpand }) {
  // Format display data
  const title = `${libraryData.appellant} vs ${libraryData.respondent}`
  const overview = libraryData.judgment?.substring(0, 150) + (libraryData.judgment?.length > 150 ? "..." : "")
  const date = new Date(libraryData.updatedAt).toLocaleDateString()

  // Extract key details for card display
  const keyDetails = [
    { label: "Appeal No", value: libraryData.appeal_no, icon: "mdi:gavel" },
    { label: "Section", value: libraryData.section, icon: "mdi:file-document-outline" },
    { label: "Assessment Year", value: libraryData.assessment_year, icon: "mdi:calendar-outline" },
    { label: "Result", value: libraryData.order_result, icon: "mdi:check-decagram-outline" },
  ]

  // Additional details for expanded view
  const additionalDetails = [
    { label: "PAN", value: libraryData.pan, icon: "mdi:card-account-details-outline" },
    { label: "Bench", value: libraryData.bench, icon: "mdi:bench-back" },
    { label: "Appeal Type", value: libraryData.appeal_type, icon: "mdi:format-list-bulleted-type" },
    { label: "Appeal Filed By", value: libraryData.appeal_filed_by, icon: "mdi:file-send-outline" },
  ]

  return (
    <div className="shadow-md shadow-primary/20 rounded-lg p-5 bg-bg_1/70 hover:shadow-lg transition-all duration-300 border border-primary/10 group">
      <div className="flex flex-col md:flex-row">
        <div className="flex-1">
          <div className="flex justify-between items-start mb-3">
            <div className="text-txt font-semibold self-center text-xl flex items-center group-hover:text-primary transition-colors">
              <Icon icon="mdi:scale-balance" className="mr-2 text-primary" />
              {title}
            </div>
            <button
              onClick={() => toggleExpand(libraryData.id)}
              className="text-primary/70 hover:text-primary transition-colors p-1 rounded-full hover:bg-primary/10"
              title={isExpanded ? "Show less" : "Show more"}
            >
              <Icon icon={isExpanded ? "mdi:chevron-up" : "mdi:chevron-down"} className="text-xl" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mb-3">
            {keyDetails.map((detail, idx) => (
              <div
                key={idx}
                className="text-sm flex items-center bg-bg_2/10 p-2 rounded hover:bg-bg_2/20 transition-colors"
              >
                <Icon icon={detail.icon} className="mr-2 text-primary/70" />
                <div>
                  <span className="font-semibold block text-xs text-primary/80">{detail.label}</span>
                  <span className="text-txt/90">{detail.value || "-"}</span>
                </div>
              </div>
            ))}
          </div>

          {isExpanded && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mb-3 mt-2 animate-fadeIn">
                {additionalDetails.map((detail, idx) => (
                  <div
                    key={idx}
                    className="text-sm flex items-center bg-bg_2/10 p-2 rounded hover:bg-bg_2/20 transition-colors"
                  >
                    <Icon icon={detail.icon} className="mr-2 text-primary/70" />
                    <div>
                      <span className="font-semibold block text-xs text-primary/80">{detail.label}</span>
                      <span className="text-txt/90">{detail.value || "-"}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-3 animate-fadeIn">
                <h4 className="text-sm font-semibold text-primary/80 mb-2 flex items-center">
                  <Icon icon="mdi:text-box" className="mr-1" /> Full Judgment
                </h4>
                <div className="bg-bg_2/5 p-3 rounded-md border-l-2 border-primary/30 hover:bg-bg_2/10 transition-colors max-h-60 overflow-y-auto">
                  <p className="text-txt/90 whitespace-pre-line">{libraryData.judgment || "No judgment available"}</p>
                </div>
              </div>

              {libraryData.conclusion && (
                <div className="mt-3 animate-fadeIn">
                  <h4 className="text-sm font-semibold text-primary/80 mb-2 flex items-center">
                    <Icon icon="mdi:text-box-check" className="mr-1" /> Conclusion
                  </h4>
                  <div className="bg-bg_2/5 p-3 rounded-md border-l-2 border-primary/30 hover:bg-bg_2/10 transition-colors">
                    <p className="text-txt/90">{libraryData.conclusion}</p>
                  </div>
                </div>
              )}
            </>
          )}

          {!isExpanded && (
            <p className="text-txt/90 bg-bg_2/5 p-3 rounded-md border-l-2 border-primary/30 hover:bg-bg_2/10 transition-colors">
              {overview || "No judgment available"}
            </p>
          )}
        </div>
        <div className="flex md:flex-col justify-between gap-2 md:ml-4 mt-3 md:mt-0">
          <button
            className="flex-1 md:flex-none border border-blue-600 rounded-md p-2 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors cursor-pointer flex items-center justify-center"
            title="Edit entry"
            onClick={() => onEdit(libraryData)}
          >
            <Icon icon="material-symbols:edit-outline" className="text-xl" />
            <span className="ml-2 md:hidden">Edit</span>
          </button>
          <button
            className="flex-1 md:flex-none border border-red-600 rounded-md p-2 text-red-600 hover:bg-red-600 hover:text-white transition-colors cursor-pointer flex items-center justify-center"
            title="Delete entry"
            onClick={() => onDelete(libraryData.id)}
          >
            <Icon icon="material-symbols:delete-outline" className="text-xl" />
            <span className="ml-2 md:hidden">Delete</span>
          </button>
        </div>
      </div>
      <div className="flex items-center mt-3 text-xs text-txt/40 italic">
        <Icon icon="mdi:clock-outline" className="mr-1" /> Last updated: {date}
      </div>
    </div>
  )
}

// Filter dropdown component
function FilterDropdown({ label, options, value, onChange, icon }) {
  return (
    <div className="relative">
      <label className="text-xs text-primary/70 mb-1 block">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="appearance-none pl-9 pr-8 py-2 w-full border border-primary/20 rounded-md focus:outline-none focus:ring-1 focus:ring-primary/30 text-sm bg-white"
        >
          <option value="">All {label}s</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <Icon icon={icon} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary/60" />
        <Icon icon="mdi:chevron-down" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary/60" />
      </div>
    </div>
  )
}

export default function Edit_ELibrary() {
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [allLib, setAllLib] = useState({ allLibrary: [] })
  const [totalPages, setTotalPages] = useState(14)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedLibrary, setSelectedLibrary] = useState(null)
  const [activeTab, setActiveTab] = useState("list") // "add" or "list"
  const [searchTerm, setSearchTerm] = useState("")
  const [expandedCards, setExpandedCards] = useState([])

  // Filters
  const [filters, setFilters] = useState({
    section: "",
    assessmentYear: "",
    orderResult: "",
    bench: "",
  })

  const fetchAllLib = async () => {
    try {
      setIsLoading(true)
      const { data } = await userbackAxios.get(`/library/getAll`, {
        headers: { "Content-Type": "application/json" },
      })
      setAllLib(data)
      console.log("Fetched library data:", data)
    } catch (error) {
      console.error("Error fetching library data:", error)
      toast.error("Failed to fetch library data")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchAllLib()
  }, [])

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      pan: "",
      section: "",
      sub_section: "",
      subject: "",
      ao_order: "",
      itat_no: "",
      rsa_no: "",
      bench: "",
      appeal_no: "",
      appellant: "",
      respondent: "",
      appeal_type: "",
      appeal_filed_by: "",
      order_result: "",
      tribunal_order_date: "",
      assessment_year: "",
      judgment: "",
      conclusion: "",
      download: "",
      upload: "",
    },
  })

  const onSubmit = async (data) => {
    try {
      setIsLoading(true)
      const { status } = await userbackAxios.post(`/library/create`, data, {
        headers: { "Content-Type": "application/json" },
      })

      if (status === 200 || status === 201) {
        console.log("Library entry created:", data)
        toast.success("Library entry created successfully")
        reset()
        fetchAllLib() // Refresh the list
        setActiveTab("list") // Switch to list view after successful submission
      }
    } catch (error) {
      console.error("Form submission error:", error)
      toast.error("Failed to create library entry")
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = (libraryData) => {
    console.log("Editing library data:", libraryData)
    setSelectedLibrary(libraryData)
    setIsModalOpen(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      try {
        const { status } = await userbackAxios.delete(`/library/delete/${id}`, {
          headers: { "Content-Type": "application/json" },
        })

        if (status === 200) {
          toast.success("Library entry deleted successfully")
          fetchAllLib() // Refresh the list
        }
      } catch (error) {
        console.error("Delete error:", error)
        toast.error("Failed to delete library entry")
      }
    }
  }

  const toggleExpandCard = (id) => {
    setExpandedCards((prev) => {
      if (prev.includes(id)) {
        return prev.filter((cardId) => cardId !== id)
      } else {
        return [...prev, id]
      }
    })
  }

  const formFields = [
    { name: "pan", label: "PAN", icon: "mdi:card-account-details-outline" },
    { name: "section", label: "Section", icon: "mdi:file-document-outline" },
    { name: "sub_section", label: "Sub-section", icon: "mdi:file-document-multiple-outline" },
    { name: "subject", label: "Subject", icon: "mdi:format-title" },
    { name: "ao_order", label: "AO Order", icon: "mdi:order-bool-ascending-variant" },
    { name: "itat_no", label: "ITAT No.", icon: "mdi:identifier" },
    { name: "rsa_no", label: "RSA No.", icon: "mdi:identifier" },
    { name: "bench", label: "Bench", icon: "mdi:bench-back" },
    { name: "appeal_no", label: "Appeal No.", icon: "mdi:gavel" },
    { name: "appellant", label: "Appellant", icon: "mdi:account-outline" },
    { name: "respondent", label: "Respondent", icon: "mdi:account-multiple-outline" },
    { name: "appeal_type", label: "Appeal Type", icon: "mdi:format-list-bulleted-type" },
    { name: "appeal_filed_by", label: "Appeal Filed By", icon: "mdi:file-send-outline" },
    { name: "order_result", label: "Order Result", icon: "mdi:check-decagram-outline" },
    { name: "tribunal_order_date", label: "Tribunal Order Date", type: "date", icon: "mdi:calendar" },
    { name: "assessment_year", label: "Assessment Year", icon: "mdi:calendar-range" },
    { name: "judgment", label: "Judgment", multiline: true, icon: "mdi:gavel" },
    { name: "conclusion", label: "Conclusion", multiline: true, icon: "mdi:text-box-check-outline" },
    { name: "download", label: "Download Link", icon: "mdi:download-outline" },
    { name: "upload", label: "Upload Link", icon: "mdi:upload-outline" },
  ]

  // Extract unique values for filters
  const uniqueSections = useMemo(() => {
    const sections = allLib.allLibrary?.map((entry) => entry.section).filter(Boolean)
    return [...new Set(sections)].sort()
  }, [allLib.allLibrary])

  const uniqueAssessmentYears = useMemo(() => {
    const years = allLib.allLibrary?.map((entry) => entry.assessment_year).filter(Boolean)
    return [...new Set(years)].sort()
  }, [allLib.allLibrary])

  const uniqueOrderResults = useMemo(() => {
    const results = allLib.allLibrary?.map((entry) => entry.order_result).filter(Boolean)
    return [...new Set(results)].sort()
  }, [allLib.allLibrary])

  const uniqueBenches = useMemo(() => {
    const benches = allLib.allLibrary?.map((entry) => entry.bench).filter(Boolean)
    return [...new Set(benches)].sort()
  }, [allLib.allLibrary])

  // Filter library entries based on search term and filters
  const filteredLibrary = useMemo(() => {
    return allLib.allLibrary?.filter((entry) => {
      // Search term filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase()
        const matchesSearch =
          (entry.appellant && entry.appellant.toLowerCase().includes(searchLower)) ||
          (entry.respondent && entry.respondent.toLowerCase().includes(searchLower)) ||
          (entry.appeal_no && entry.appeal_no.toLowerCase().includes(searchLower)) ||
          (entry.section && entry.section.toLowerCase().includes(searchLower)) ||
          (entry.judgment && entry.judgment.toLowerCase().includes(searchLower)) ||
          (entry.pan && entry.pan.toLowerCase().includes(searchLower))

        if (!matchesSearch) return false
      }

      // Apply dropdown filters
      if (filters.section && entry.section !== filters.section) return false
      if (filters.assessmentYear && entry.assessment_year !== filters.assessmentYear) return false
      if (filters.orderResult && entry.order_result !== filters.orderResult) return false
      if (filters.bench && entry.bench !== filters.bench) return false

      return true
    })
  }, [allLib.allLibrary, searchTerm, filters])

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm("")
    setFilters({
      section: "",
      assessmentYear: "",
      orderResult: "",
      bench: "",
    })
  }

  // Handle filter change
  const handleFilterChange = (filterName, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }))
  }

  return (
    <>
      <H5 className="mt-8 mb-4 flex items-center">
        <Icon icon="mdi:law" className="mr-2 text-primary" />
        E-Library Management
      </H5>

      <div className="mb-6 flex flex-wrap">
        <button
          className={`px-6 py-3 flex items-center ${
            activeTab === "list"
              ? "bg-primary text-white font-medium shadow-md"
              : "bg-bg_2/20 text-txt/70 hover:bg-bg_2/40"
          } 
            rounded-t-lg transition-colors mr-1`}
          onClick={() => setActiveTab("list")}
        >
          <Icon icon="mdi:view-list" className="mr-2" /> View Library
        </button>
        <button
          className={`px-6 py-3 flex items-center ${
            activeTab === "add"
              ? "bg-primary text-white font-medium shadow-md"
              : "bg-bg_2/20 text-txt/70 hover:bg-bg_2/40"
          } 
            rounded-t-lg transition-colors`}
          onClick={() => setActiveTab("add")}
        >
          <Icon icon="mdi:plus-circle-outline" className="mr-2" /> Add New Entry
        </button>
      </div>

      <Section className="p-0 overflow-hidden rounded-lg border border-primary/10">
        {activeTab === "add" ? (
          <div className="bg-white p-6 rounded-md">
            <h3 className="text-lg font-medium mb-4 flex items-center text-primary">
              <Icon icon="mdi:form-textbox" className="mr-2" /> Create New Library Entry
            </h3>

            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {formFields.map((field) => (
                <div key={field.name} className={`col-span-1 ${field.multiline ? "sm:col-span-2" : ""}`}>
                  <label className="text-txt font-medium flex items-center text-sm mb-1" htmlFor={field.name}>
                    {field.icon && <Icon icon={field.icon} className="mr-2 text-primary/70" />}
                    {field.label}
                  </label>

                  {field.multiline ? (
                    <textarea
                      id={field.name}
                      placeholder={`Enter ${field.label.toLowerCase()}`}
                      {...register(field.name, {
                        required: `${field.label} is required`,
                      })}
                      rows={4}
                      className="mt-1 bg-bg_2/5 border border-txt/300 focus:border-primary focus:ring-1 focus:ring-primary/30 text-txt text-sm block w-full p-3 rounded transition-all"
                    />
                  ) : (
                    <input
                      id={field.name}
                      type={field.type || "text"}
                      placeholder={`Enter ${field.label.toLowerCase()}`}
                      {...register(field.name, {
                        required: `${field.label} is required`,
                      })}
                      className="mt-1 bg-bg_2/5 border border-txt/300 focus:border-primary focus:ring-1 focus:ring-primary/30 text-txt text-sm block w-full p-3 rounded transition-all"
                    />
                  )}

                  {errors[field.name] && (
                    <small className="text-red-500 italic text-xs mt-1 block">{errors[field.name]?.message}</small>
                  )}
                </div>
              ))}

              <div className="col-span-2 mt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => reset()}
                  className="px-5 py-2 mr-3 border border-gray-300 text-gray-600 rounded-md hover:bg-gray-100 transition-colors flex items-center"
                >
                  <Icon icon="mdi:refresh" className="mr-1" /> Reset
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors shadow-md flex items-center"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Icon icon="svg-spinners:180-ring" className="animate-spin mr-2" /> Submitting...
                    </>
                  ) : (
                    <>
                      <Icon icon="mdi:send" className="mr-2" /> Submit
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <>
            <div className="p-4 bg-primary/5 border-b border-primary/10">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 mb-3">
                <h3 className="font-medium text-lg flex items-center">
                  <Icon icon="mdi:library" className="mr-2 text-primary" />
                  Library Entries
                </h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => fetchAllLib()}
                    className="flex items-center text-sm text-primary hover:bg-primary/10 p-2 rounded-md transition-colors"
                  >
                    <Icon icon="mdi:refresh" className="mr-1" /> Refresh
                  </button>
                  {(searchTerm || Object.values(filters).some(Boolean)) && (
                    <button
                      onClick={resetFilters}
                      className="flex items-center text-sm text-red-500 hover:bg-red-50 p-2 rounded-md transition-colors"
                    >
                      <Icon icon="mdi:filter-remove" className="mr-1" /> Clear Filters
                    </button>
                  )}
                </div>
              </div>

              {/* Search and filters */}
              <div className="flex flex-col gap-3">
                <div className="relative w-full">
                  <input
                    type="text"
                    placeholder="Search by appellant, respondent, appeal no, section, PAN..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 pr-4 py-2 w-full border border-primary/20 rounded-md focus:outline-none focus:ring-1 focus:ring-primary/30 text-sm"
                  />
                  <Icon
                    icon="mdi:magnify"
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary/60"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                  <FilterDropdown
                    label="Section"
                    options={uniqueSections}
                    value={filters.section}
                    onChange={(value) => handleFilterChange("section", value)}
                    icon="mdi:file-document-outline"
                  />
                  <FilterDropdown
                    label="Assessment Year"
                    options={uniqueAssessmentYears}
                    value={filters.assessmentYear}
                    onChange={(value) => handleFilterChange("assessmentYear", value)}
                    icon="mdi:calendar-range"
                  />
                  <FilterDropdown
                    label="Order Result"
                    options={uniqueOrderResults}
                    value={filters.orderResult}
                    onChange={(value) => handleFilterChange("orderResult", value)}
                    icon="mdi:check-decagram-outline"
                  />
                  <FilterDropdown
                    label="Bench"
                    options={uniqueBenches}
                    value={filters.bench}
                    onChange={(value) => handleFilterChange("bench", value)}
                    icon="mdi:bench-back"
                  />
                </div>
              </div>
            </div>

            {isLoading ? (
              <div className="p-16 text-center flex flex-col items-center justify-center">
                <Icon icon="svg-spinners:180-ring" className="text-4xl text-primary mb-2 animate-spin" />
                <p className="text-txt/70">Loading library data...</p>
              </div>
            ) : allLib.allLibrary?.length === 0 ? (
              <div className="p-16 text-center">
                <Icon icon="mdi:bookshelf" className="text-6xl text-txt/20 mb-2 mx-auto" />
                <p className="text-txt/50">No library entries found</p>
                <button
                  onClick={() => setActiveTab("add")}
                  className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition-colors inline-flex items-center"
                >
                  <Icon icon="mdi:plus" className="mr-1" /> Add First Entry
                </button>
              </div>
            ) : filteredLibrary?.length === 0 ? (
              <div className="p-16 text-center">
                <Icon icon="mdi:file-search-outline" className="text-6xl text-txt/20 mb-2 mx-auto" />
                <p className="text-txt/50">No matching entries found</p>
                <button
                  onClick={resetFilters}
                  className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition-colors inline-flex items-center"
                >
                  <Icon icon="mdi:filter-remove" className="mr-1" /> Clear Filters
                </button>
              </div>
            ) : (
              <div className="px-4 py-4 grid gap-4">
                <div className="flex justify-between items-center text-sm text-txt/60 px-2">
                  <span>
                    Showing {filteredLibrary.length} of {allLib.allLibrary?.length} entries
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setExpandedCards(filteredLibrary.map((entry) => entry.id))}
                      className="text-primary hover:underline flex items-center"
                    >
                      <Icon icon="mdi:unfold-more-horizontal" className="mr-1" /> Expand All
                    </button>
                    <button
                      onClick={() => setExpandedCards([])}
                      className="text-primary hover:underline flex items-center"
                    >
                      <Icon icon="mdi:unfold-less-horizontal" className="mr-1" /> Collapse All
                    </button>
                  </div>
                </div>

                {filteredLibrary?.map((lib, index) => (
                  <LibraryCard
                    key={index}
                    libraryData={lib}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    isExpanded={expandedCards.includes(lib.id)}
                    toggleExpand={toggleExpandCard}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </Section>

      {activeTab === "list" && filteredLibrary?.length > 0 && (
        <div className="flex p-6 justify-center">
          <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
        </div>
      )}

      {/* Edit Modal */}
      {isModalOpen && (
        <EditModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          libraryData={selectedLibrary}
          onUpdate={fetchAllLib}
        />
      )}
    </>
  )
}
