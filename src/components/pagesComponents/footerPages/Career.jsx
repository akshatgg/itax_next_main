"use client"

import { toast } from "react-toastify"
import { useState } from "react"
import { useForm } from "react-hook-form"
import PageContainer from "../pageLayout/PageContainer.jsx"
import userAxios from "@/lib/userbackAxios.js"
import { Loader2, MapPin, Phone, Mail, Globe, CheckCircle } from "lucide-react"

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
      <div className="mx-auto max-w-7xl bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-900 dark:text-gray-50 border border-blue-100 dark:border-gray-700 ease-in-out text-black rounded-lg shadow-2xl overflow-hidden">
        {/* Header bar with aligned titles */}
        <div className="flex flex-col lg:flex-row border-b border-blue-200 dark:border-gray-700">
          <div className="lg:w-2/3 bg-gradient-to-r from-blue-600 to-blue-700 dark:from-gray-700 dark:to-gray-800 p-5 flex justify-center items-center">
            <h1 className="text-2xl font-bold text-white">
              <span className="border-b-2 border-white pb-1">Career Application</span>
            </h1>
          </div>
          <div className="lg:w-1/3 bg-gradient-to-r from-blue-700 to-blue-800 dark:from-gray-800 dark:to-gray-900 p-5 flex justify-center items-center">
            <h2 className="text-2xl font-bold text-white">
              <span className="border-b-2 border-red-400 pb-1">Con</span>tact us
            </h2>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row min-h-[600px]">
          {/* Form Section - Takes 2/3 of the space */}
          <div className="lg:w-2/3 bg-white dark:bg-gray-800 dark:text-gray-50 text-gray-800 p-6 relative">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8">
                <div className="bg-green-100 dark:bg-green-900/30 p-6 rounded-full mb-6">
                  <CheckCircle className="w-20 h-20 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-3xl font-bold text-green-600 dark:text-green-400 mb-4">Application Submitted!</h3>
                <p className="text-gray-600 dark:text-gray-300 max-w-md mb-8 text-lg">
                  Thank you for your interest in joining our team. We have received your application and will review it
                  shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-md text-lg font-medium"
                >
                  Submit Another Application
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} id="formName" className="relative z-10 h-full flex flex-col">
                <h3 className="text-xl font-bold text-blue-700 dark:text-blue-400 mb-6 pb-2 border-b border-blue-200 dark:border-blue-700">
                  Career Application Form
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4 flex-grow">
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-blue-700 dark:text-blue-400 uppercase tracking-wider mb-3">
                      Personal Information
                    </h3>

                    <div>
                      <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        id="name"
                        className="bg-gray-50 transition-all duration-300 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700/90 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                        {...register("name", { required: true })}
                        aria-invalid={errors.name ? "true" : "false"}
                      />
                      {errors.name?.type === "required" && (
                        <p className="text-red-500 text-xs mt-1 pl-1 font-medium" role="alert">
                          Name is required
                        </p>
                      )}
                    </div>

                    <div>
                      <input
                        placeholder="Email Address"
                        type="email"
                        name="email"
                        id="email"
                        className="bg-gray-50 transition-all duration-300 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700/90 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                        {...register("email", { required: true })}
                        aria-invalid={errors.email ? "true" : "false"}
                      />
                      {errors.email?.type === "required" && (
                        <p className="text-red-500 text-xs mt-1 pl-1 font-medium" role="alert">
                          Email is required
                        </p>
                      )}
                    </div>

                    <div>
                      <input
                        type="text"
                        name="mobile"
                        placeholder="Phone Number"
                        id="mobile"
                        className="bg-gray-50 transition-all duration-300 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700/90 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                        {...register("mobile", { required: true })}
                        aria-invalid={errors.mobile ? "true" : "false"}
                      />
                      {errors.mobile?.type === "required" && (
                        <p className="text-red-500 text-xs mt-1 pl-1 font-medium" role="alert">
                          Phone required
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Location Information */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-blue-700 dark:text-blue-400 uppercase tracking-wider mb-3">
                      Location Details
                    </h3>

                    <div>
                      <input
                        type="text"
                        name="address"
                        id="address"
                        placeholder="Complete Address"
                        className="bg-gray-50 transition-all duration-300 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700/90 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                        {...register("address", { required: true })}
                        aria-invalid={errors.address ? "true" : "false"}
                      />
                      {errors.address?.type === "required" && (
                        <p className="text-red-500 text-xs mt-1 pl-1 font-medium" role="alert">
                          Address is required
                        </p>
                      )}
                    </div>

                    <div>
                      <input
                        type="text"
                        placeholder="PIN Code"
                        className="bg-gray-50 transition-all duration-300 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700/90 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                        {...register("pin", { required: true })}
                        aria-invalid={errors.pin ? "true" : "false"}
                      />
                      {errors.pin?.type === "required" && (
                        <p className="text-red-500 text-xs mt-1 pl-1 font-medium" role="alert">
                          PIN required
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <select
                          className="bg-gray-50 transition-all duration-300 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700/90 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                          name="gender"
                          id="gender"
                          {...register("gender", { required: true })}
                          aria-invalid={errors.gender ? "true" : "false"}
                        >
                          <option value="" disabled selected hidden>
                            Gender
                          </option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="others">Others</option>
                        </select>
                        {errors.gender?.type === "required" && (
                          <p className="text-red-500 text-xs mt-1 pl-1 font-medium" role="alert">
                            Required
                          </p>
                        )}
                      </div>

                      <div>
                        <select
                          name="role"
                          className="bg-gray-50 transition-all duration-300 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700/90 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                          id="role"
                          {...register("role", { required: true })}
                          aria-invalid={errors.role ? "true" : "false"}
                        >
                          <option value="" disabled selected hidden>
                            Role
                          </option>
                          <option value="job">Job</option>
                          <option value="internship">Internship</option>
                        </select>
                        {errors.role?.type === "required" && (
                          <p className="text-red-500 text-xs mt-1 pl-1 font-medium" role="alert">
                            Required
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Resume Upload */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-blue-700 dark:text-blue-400 uppercase tracking-wider mb-3">
                      Resume Upload
                    </h3>

                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                      <div className="flex flex-col gap-2 mb-2">
                        <label htmlFor="resume" className="text-sm font-medium text-blue-700 dark:text-blue-300">
                          Upload your CV/Resume:
                        </label>
                        <div className="relative w-full">
                          <input
                            type="file"
                            name="cv"
                            id="cv"
                            className="block w-full text-sm text-gray-900 bg-white transition-all duration-300 border border-gray-200 rounded-lg cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 p-2 file:mr-2 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            {...register("cv", { required: true })}
                            aria-invalid={errors.cv ? "true" : "false"}
                          />
                          {errors.cv?.type === "required" && (
                            <p className="text-red-500 text-xs mt-1 pl-1 font-medium" role="alert">
                              CV / Resume is required
                            </p>
                          )}
                        </div>
                      </div>
                      <p className="text-xs text-blue-700 dark:text-blue-300 mt-2 flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="w-4 h-4 mr-1"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Only PDF files less than 1MB are accepted
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between mt-6">
                  <button
                    type="reset"
                    form="formName"
                    name="reset"
                    id="reset"
                    className="px-5 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-colors shadow-sm hover:shadow focus:ring-2 focus:ring-gray-300 focus:outline-none text-sm font-medium"
                  >
                    Reset Form
                  </button>

                  <button
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-sm hover:shadow focus:ring-2 focus:ring-blue-300 focus:outline-none flex items-center justify-center min-w-[120px] text-sm font-medium"
                    type="submit"
                    name="submit"
                    disabled={loading}
                    id="submit"
                  >
                    {loading ? (
                      <span className="flex items-center">
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Submitting...
                      </span>
                    ) : (
                      "Submit Application"
                    )}
                  </button>
                </div>

                {message && (
                  <div
                    className={`text-center font-medium mt-1 p-2 rounded-md text-sm ${
                      success
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                    }`}
                  >
                    {message}
                  </div>
                )}
              </form>
            )}
          </div>

          {/* Contact Section - Takes 1/3 of the space */}
          <div className="lg:w-1/3 bg-gradient-to-br from-blue-700 to-blue-800 dark:from-gray-800 dark:to-gray-900 text-white p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold mb-6 border-b border-blue-500 pb-2">Get In Touch</h3>
              <div className="space-y-5 mt-4">
                <div className="flex items-start gap-4 group">
                  <div className="bg-blue-600/50 dark:bg-blue-900/50 p-2.5 rounded-full text-white group-hover:bg-blue-500/70 dark:group-hover:bg-blue-800/70 transition-colors">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-xs text-blue-200 uppercase tracking-wider">ADDRESS</h3>
                    <p className="text-sm mt-1 text-white/90">
                      G - 41, Gandhi Nagar, Near Defense Colony, Padav Gwalior 474002 (M.P)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="bg-blue-600/50 dark:bg-blue-900/50 p-2.5 rounded-full text-white group-hover:bg-blue-500/70 dark:group-hover:bg-blue-800/70 transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-xs text-blue-200 uppercase tracking-wider">PHONE</h3>
                    <p className="text-sm mt-1 text-white/90">8770877270</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="bg-blue-600/50 dark:bg-blue-900/50 p-2.5 rounded-full text-white group-hover:bg-blue-500/70 dark:group-hover:bg-blue-800/70 transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-xs text-blue-200 uppercase tracking-wider">EMAIL</h3>
                    <p className="text-sm mt-1 text-white/90">support@itaxeasy.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="bg-blue-600/50 dark:bg-blue-900/50 p-2.5 rounded-full text-white group-hover:bg-blue-500/70 dark:group-hover:bg-blue-800/70 transition-colors">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-xs text-blue-200 uppercase tracking-wider">WEBSITE</h3>
                    <p className="text-sm mt-1 text-white/90">https://itaxeasy.com/</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-blue-600/50 dark:border-gray-700">
              <p className="text-sm text-blue-200 dark:text-gray-400 text-center">
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
