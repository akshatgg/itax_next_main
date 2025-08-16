"use client"
import { toast } from "react-toastify"
import { useState } from "react"
import { useForm } from "react-hook-form"
import PageContainer from "../pageLayout/PageContainer.jsx"
import userAxios from "@/lib/userbackAxios.js"
import { Loader2, MapPin, Phone, Mail, Globe, CheckCircle, Upload, User, MapPinIcon, FileText } from "lucide-react"

const Career = () => {
  const [success, setSuccess] = useState(true)
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [uploadedFile, setUploadedFile] = useState(null)

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm()

  const onSubmit = async (body) => {
    console.log("Form submitted with data:", body)
    console.log("Backend URL:", process.env.NEXT_PUBLIC_BACK_URL)

    try {
      const maxlimit = 1024 * 1024
      const file = body.cv[0]
      console.log("File selected:", file)

      if (!file) {
        toast.error("Please select a resume file")
        return
      }

      const size = file.size
      const type = file.type
      console.log("File size:", size, "File type:", type)

      if (size > maxlimit) {
        toast.error("File size should be less than 1 MB")
        return
      }

      if (type !== "application/pdf") {
        toast.error("Only PDF files are accepted")
        return
      }

      setSuccess(false)
      setMessage("")
      setLoading(true)

      const formData = new FormData()
      formData.append("name", body?.name)
      formData.append("skills", "Available in CV")
      formData.append("gender", body.gender)
      formData.append("email", body.email)
      formData.append("pin", body.pin)
      formData.append("address", body.address)
      formData.append("mobile", body.mobile)
      formData.append("cv", body.cv[0])

      console.log("FormData prepared, making API call...")

      const { data, status } = await userAxios.post("/career/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      console.log("API Response:", { data, status })

      if (status === 201 || status === 200) {
        setSuccess(true)
        setSubmitted(true)
        setUploadedFile(null)
        reset({
          name: "",
          gender: "",
          email: "",
          pin: "",
          address: "",
          mobile: "",
          cv: "",
        })
        toast.success(data?.message || "Application submitted successfully!")
      } else {
        toast.error("Server error - please try again")
      }
    } catch (error) {
      console.error("Error occurred:", error)
      console.error("Error response:", error?.response)

      let errorMessage = "An error occurred while submitting your application"

      if (error?.response?.data?.message) {
        errorMessage = error.response.data.message
      } else if (error?.message) {
        if (error.message.includes("Network Error")) {
          errorMessage = "Network error - please check your connection or try again later"
        } else if (error.message.includes("timeout")) {
          errorMessage = "Request timeout - please try again"
        } else {
          errorMessage = error.message
        }
      } else if (error?.code === "ECONNREFUSED") {
        errorMessage = "Unable to connect to server - please try again later"
      }

      console.log("Error message to show:", errorMessage)
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setUploadedFile({
        name: file.name,
        size: (file.size / 1024 / 1024).toFixed(2), // Convert to MB
      })
    } else {
      setUploadedFile(null)
    }
  }

  return (
    <PageContainer className="p-4">
      <div className="max-w-6xl mx-auto bg-white">
        {/* Header */}
        <div className="bg-[#3C7CDD] text-white text-center py-4 mb-6 rounded-lg">
          <h1 className="text-2xl font-semibold">Career Application</h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Form Section */}
          <div className="flex-1">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              {submitted ? (
                <div className="text-center py-8">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Application Submitted!</h3>
                  <p className="text-gray-600 mb-4">We'll review your application and get back to you soon.</p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-4 py-2 bg-[#3C7CDD] hover:bg-[#2A5EBB] text-white rounded transition-colors"
                  >
                    Submit Another Application
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Personal Info */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 mb-3">
                        <User className="w-4 h-4 text-[#3C7CDD]" />
                        <h3 className="font-semibold text-gray-900">Personal Info</h3>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Enter your name"
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-[#3C7CDD] focus:border-[#3C7CDD]"
                          {...register("name", { required: true })}
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1">Name required</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          placeholder="your@email.com"
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-[#3C7CDD] focus:border-[#3C7CDD]"
                          {...register("email", { required: true })}
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">Email required</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Phone number"
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-[#3C7CDD] focus:border-[#3C7CDD]"
                          {...register("mobile", { required: true })}
                        />
                        {errors.mobile && <p className="text-red-500 text-xs mt-1">Phone required</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Gender <span className="text-red-500">*</span>
                        </label>
                        <select
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-[#3C7CDD] focus:border-[#3C7CDD]"
                          {...register("gender", { required: true })}
                        >
                          <option value="">Select Gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="others">Others</option>
                        </select>
                        {errors.gender && <p className="text-red-500 text-xs mt-1">Gender required</p>}
                      </div>
                    </div>

                    {/* Location */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 mb-3">
                        <MapPinIcon className="w-4 h-4 text-[#3C7CDD]" />
                        <h3 className="font-semibold text-gray-900">Location</h3>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Address <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          rows="3"
                          placeholder="Complete address"
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-[#3C7CDD] focus:border-[#3C7CDD] resize-none"
                          {...register("address", { required: true })}
                        />
                        {errors.address && <p className="text-red-500 text-xs mt-1">Address required</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          PIN Code <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="PIN code"
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-[#3C7CDD] focus:border-[#3C7CDD]"
                          {...register("pin", { required: true })}
                        />
                        {errors.pin && <p className="text-red-500 text-xs mt-1">PIN required</p>}
                      </div>
                    </div>

                    {/* Resume Upload */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 mb-3">
                        <FileText className="w-4 h-4 text-[#3C7CDD]" />
                        <h3 className="font-semibold text-gray-900">Resume</h3>
                      </div>

                      <div className="border-2 border-dashed border-gray-300 rounded p-4 text-center">
                        <input
                          type="file"
                          id="cv"
                          className="hidden"
                          accept=".pdf"
                          {...register("cv", {
                            required: true,
                            onChange: (e) => handleFileChange(e),
                          })}
                        />
                        <label htmlFor="cv" className="cursor-pointer">
                          {uploadedFile ? (
                            <div>
                              <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                              <p className="text-sm font-medium text-green-700">{uploadedFile.name}</p>
                              <p className="text-xs text-green-600">{uploadedFile.size} MB</p>
                            </div>
                          ) : (
                            <div>
                              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                              <p className="text-sm text-gray-600">Upload CV/Resume</p>
                              <p className="text-xs text-gray-500">PDF only, max 1MB</p>
                            </div>
                          )}
                        </label>
                        {errors.cv && <p className="text-red-500 text-xs mt-2">Resume required</p>}
                      </div>
                    </div>
                  </div>

                  {/* Form Actions */}
                  <div className="flex gap-3 pt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 px-4 py-2 bg-[#3C7CDD] hover:bg-[#2A5EBB] disabled:bg-gray-400 text-white rounded transition-colors flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        "Submit Application"
                      )}
                    </button>
                    <button
                      type="reset"
                      className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded transition-colors"
                    >
                      Reset
                    </button>
                  </div>

                  {message && (
                    <div
                      className={`text-center text-sm p-3 rounded ${
                        success
                          ? "bg-green-50 text-green-700 border border-green-200"
                          : "bg-red-50 text-red-700 border border-red-200"
                      }`}
                    >
                      {message}
                    </div>
                  )}
                </form>
              )}
            </div>
          </div>

          {/* Contact Section */}
          <div className="lg:w-80">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-4">Contact Info</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#3C7CDD] mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Address</p>
                    <p className="text-xs text-gray-600">
                      G - 41, Gandhi Nagar, Near Defense Colony, Padav Gwalior 474002 (M.P)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#3C7CDD] mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Phone</p>
                    <p className="text-xs text-gray-600">8770877270</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#3C7CDD] mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Email</p>
                    <p className="text-xs text-gray-600">support@itaxeasy.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Globe className="w-4 h-4 text-[#3C7CDD] mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Website</p>
                    <p className="text-xs text-gray-600">https://itaxeasy.com/</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-200">
                <p className="text-xs text-gray-500 text-center">
                  © {new Date().getFullYear()} ITaxEasy. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  )
}

export default Career
