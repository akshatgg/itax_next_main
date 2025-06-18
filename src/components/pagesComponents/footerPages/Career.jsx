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

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm()

  const onSubmit = async (body) => {
    try {
      const maxlimit = 1024 * 1024
      const file = body.cv[0]

      const size = file.size
      const type = file.type

      if (!file) {
        throw new Error("Resume is required.")
      }

      if (size > maxlimit && type !== "application/pdf") {
        throw new Error("Only Pdf File Accepted and Should be less than 1 mb.")
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

      const { data, status } = await userAxios.post("/career/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      if (status === 201) {
        setSuccess(data?.status)
        setSubmitted(true)
        reset({
          name: "",
          skills: "",
          gender: "",
          email: "",
          pin: "",
          address: "",
          mobile: "",
          cv: "",
          role: "",
        })
        toast.success(data?.message)
      } else {
        toast.error(message ?? "Server error")
        setSuccess(true)
      }
    } catch (error) {
      const message = error?.response?.data?.message
      toast.error(message || "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <PageContainer className="p-0">
      <div className="mx-auto max-w-7xl h-screen bg-gradient-to-br from-blue-50 to-sky-100 rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#3C7CDD] to-[#5B9EF0] px-6 py-4 text-center">
          <h1 className="text-2xl font-bold text-white">Career Application Portal</h1>
        </div>

        <div className="flex h-[calc(100vh-80px)]">
          {/* Form Section - 70% */}
          <div className="w-[70%] p-6 overflow-y-auto">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <div className="bg-green-50 p-6 rounded-full mb-4 border border-green-200">
                  <CheckCircle className="w-16 h-16 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Application Submitted!</h3>
                <p className="text-gray-600 max-w-md mb-6">
                  Thank you for your interest. We&apos;ll review your application and get back to you soon.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2 bg-[#3C7CDD] hover:bg-[#2A5EBB] text-white rounded-lg transition-colors"
                >
                  Submit Another Application
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} id="formName" className="h-full">
                <div className="grid grid-cols-3 gap-6 h-full">
                  {/* Personal Info Column */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="p-1.5 bg-[#E8F2FF] rounded-lg">
                        <User className="w-4 h-4 text-[#3C7CDD]" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">Personal Info</h3>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3C7CDD] focus:border-[#3C7CDD] bg-white"
                        {...register("name", { required: true })}
                        aria-invalid={errors.name ? "true" : "false"}
                      />
                      {errors.name?.type === "required" && (
                        <p className="text-red-500 text-xs mt-1" role="alert">Name required</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Email *</label>
                      <input
                        type="email"
                        name="email"
                        placeholder="your@email.com"
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3C7CDD] focus:border-[#3C7CDD] bg-white"
                        {...register("email", { required: true })}
                        aria-invalid={errors.email ? "true" : "false"}
                      />
                      {errors.email?.type === "required" && (
                        <p className="text-red-500 text-xs mt-1" role="alert">Email required</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Phone *</label>
                      <input
                        type="text"
                        name="mobile"
                        placeholder="Phone number"
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3C7CDD] focus:border-[#3C7CDD] bg-white"
                        {...register("mobile", { required: true })}
                        aria-invalid={errors.mobile ? "true" : "false"}
                      />
                      {errors.mobile?.type === "required" && (
                        <p className="text-red-500 text-xs mt-1" role="alert">Phone required</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Gender *</label>
                      <select
                        name="gender"
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3C7CDD] focus:border-[#3C7CDD] bg-white"
                        {...register("gender", { required: true })}
                        aria-invalid={errors.gender ? "true" : "false"}
                      >
                        <option value="" disabled selected hidden>Select</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="others">Others</option>
                      </select>
                      {errors.gender?.type === "required" && (
                        <p className="text-red-500 text-xs mt-1" role="alert">Required</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Application Type *</label>
                      <select
                        name="role"
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3C7CDD] focus:border-[#3C7CDD] bg-white"
                        {...register("role", { required: true })}
                        aria-invalid={errors.role ? "true" : "false"}
                      >
                        <option value="" disabled selected hidden>Select</option>
                        <option value="job">Job</option>
                        <option value="internship">Internship</option>
                      </select>
                      {errors.role?.type === "required" && (
                        <p className="text-red-500 text-xs mt-1" role="alert">Required</p>
                      )}
                    </div>
                  </div>

                  {/* Location Column */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="p-1.5 bg-[#E8F2FF] rounded-lg">
                        <MapPinIcon className="w-4 h-4 text-[#3C7CDD]" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">Location</h3>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Address *</label>
                      <textarea
                        name="address"
                        rows="4"
                        placeholder="Complete address"
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3C7CDD] focus:border-[#3C7CDD] bg-white resize-none"
                        {...register("address", { required: true })}
                        aria-invalid={errors.address ? "true" : "false"}
                      />
                      {errors.address?.type === "required" && (
                        <p className="text-red-500 text-xs mt-1" role="alert">Address required</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">PIN Code *</label>
                      <input
                        type="text"
                        placeholder="PIN code"
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3C7CDD] focus:border-[#3C7CDD] bg-white"
                        {...register("pin", { required: true })}
                        aria-invalid={errors.pin ? "true" : "false"}
                      />
                      {errors.pin?.type === "required" && (
                        <p className="text-red-500 text-xs mt-1" role="alert">PIN required</p>
                      )}
                    </div>

                    {/* Form Actions */}
                    <div className="pt-4 space-y-3">
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full px-4 py-2.5 bg-[#3C7CDD] hover:bg-[#2A5EBB] disabled:bg-[#A3C7F0] text-white rounded-lg transition-colors font-medium text-sm flex items-center justify-center gap-2"
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
                        className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
                      >
                        Reset Form
                      </button>
                    </div>

                    {message && (
                      <div
                        className={`text-center text-xs p-2 rounded-lg ${
                          success
                            ? "bg-green-50 text-green-700 border border-green-200"
                            : "bg-red-50 text-red-700 border border-red-200"
                        }`}
                      >
                        {message}
                      </div>
                    )}
                  </div>

                  {/* Resume Upload Column */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="p-1.5 bg-[#E8F2FF] rounded-lg">
                        <FileText className="w-4 h-4 text-[#3C7CDD]" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">Resume</h3>
                    </div>

                    <div className="border-2 border-dashed border-[#A3C7F0] rounded-lg p-6 text-center bg-[#F8FBFF] hover:border-[#3C7CDD] transition-colors">
                      <Upload className="w-8 h-8 text-[#3C7CDD] mx-auto mb-3" />
                      <label htmlFor="cv" className="cursor-pointer">
                        <span className="text-sm font-medium text-gray-900 block mb-1">Upload CV/Resume</span>
                        <span className="text-xs text-gray-500 block mb-3">PDF only, max 1MB</span>
                        <input
                          type="file"
                          name="cv"
                          id="cv"
                          className="hidden"
                          accept=".pdf"
                          {...register("cv", { required: true })}
                          aria-invalid={errors.cv ? "true" : "false"}
                        />
                        <span className="inline-flex items-center px-3 py-1.5 bg-[#3C7CDD] text-white rounded-md hover:bg-[#2A5EBB] transition-colors text-xs">
                          Choose File
                        </span>
                      </label>
                      {errors.cv?.type === "required" && (
                        <p className="text-red-500 text-xs mt-2" role="alert">Resume required</p>
                      )}
                    </div>
                  </div>
                </div>
              </form>
            )}
          </div>

          {/* Contact Section - 30% */}
          <div className="w-[30%] bg-gradient-to-b from-[#F0F7FF] to-[#E8F2FF] p-6 border-l border-[#D1E5FF]">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Contact Info</h3>
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg shadow-sm border border-[#E8F2FF]">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-[#E8F2FF] rounded-lg">
                    <MapPin className="w-4 h-4 text-[#3C7CDD]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm mb-1">Address</h4>
                    <p className="text-gray-600 text-xs leading-relaxed">
                      G - 41, Gandhi Nagar, Near Defense Colony, Padav Gwalior 474002 (M.P)
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm border border-[#E8F2FF]">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-[#E8F2FF] rounded-lg">
                    <Phone className="w-4 h-4 text-[#3C7CDD]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm mb-1">Phone</h4>
                    <p className="text-gray-600 text-xs">8770877270</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm border border-[#E8F2FF]">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-[#E8F2FF] rounded-lg">
                    <Mail className="w-4 h-4 text-[#3C7CDD]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm mb-1">Email</h4>
                    <p className="text-gray-600 text-xs">support@itaxeasy.com</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm border border-[#E8F2FF]">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-[#E8F2FF] rounded-lg">
                    <Globe className="w-4 h-4 text-[#3C7CDD]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm mb-1">Website</h4>
                    <p className="text-gray-600 text-xs">https://itaxeasy.com/</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#D1E5FF]">
              <p className="text-xs text-gray-500 text-center">
                © {new Date().getFullYear()} ITaxEasy. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  )
}

export default Career