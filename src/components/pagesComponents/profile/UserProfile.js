"use client"

import Button from "@/components/ui/Button"
import userAxios from "@/lib/userbackAxios"
import { useCallback, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import UserProfileCard from "./UserProfileCard"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import Image from "next/image"
import regex from "@/utils/regex"
import { zodResolver } from "@hookform/resolvers/zod"
import { userCreate, userSchema } from "./validation/schemas"
import useAuth from "@/hooks/useAuth"
import axios from "axios"
import { parseNonNullObject } from "@/utils/utilityFunctions"
import { Edit2, ArrowLeft, Save, X, CheckCircle } from "lucide-react"

const UserProfile = () => {
  const router = useRouter()
  const { token } = useAuth()

  // DATA FOR PROFILE CARD ~ USER DETAILS
  const [data, setData] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // PAN CARD
  const [loading, setLoading] = useState(false)
  const [panDetails, setPanDetails] = useState("")
  const [panVerificationOpen, setPanVerificationOpen] = useState(false)
  const [nameAsPan, setNameAsPan] = useState("")
  const [dateOfBirth, setDateOfBirth] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // HOOK FORM
  const [editable, setEditable] = useState(false)
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: userCreate,
    resolver: zodResolver(userSchema),
  })

  const panCard = watch("pan")

  // EVENT HANDLERS
  const handleEditbutton = () => setEditable(!editable)

  // EDIT CANCEL HANDLER
  const editCancelHandler = () => {
    setEditable(!editable)
    reset(data)
  }

  // Format date from yyyy-mm-dd to dd/mm/yyyy
  const formatDateForApi = (dateString) => {
    if (!dateString) return ""
    const [year, month, day] = dateString.split("-")
    return `${day}/${month}/${year}`
  }

  // UPDATES USER DETAILS
  const submitHandler = async (data) => {
    const formData = new FormData()
    const BASE = process.env.NEXT_PUBLIC_BACK_URL

    // Properly handle form data creation
    for (const key in data) {
      if (key === "avatar" && data[key]?.[0]) {
        formData.append(key, data[key][0])
      } else if (data[key] !== undefined && data[key] !== null) {
        formData.append(key, data[key])
      }
    }

    try {
      setIsSubmitting(true)
      setIsLoading(true)
      const response = await axios.put(`${BASE}/user/update`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })

      if (response.status === 200) {
        setEditable(false)
        // Refresh user data after successful update
        getUserDetails()
        toast.success("Profile updated successfully!")
      } else {
        toast.error("Failed to update profile!")
      }
    } catch (error) {
      console.error("Update error:", error)
      toast.error(error.response?.data?.message || "Error updating profile")
    } finally {
      setIsLoading(false)
      setIsSubmitting(false)
    }
  }

  // FETCHES USER DETAILS
  const getUserDetails = useCallback(async () => {
    try {
      setIsLoading(true)
      const { data, status } = await userAxios.get(`/user/profile`)

      if (status === 200 && data?.data?.user) {
        const userData = parseNonNullObject(data.data.user)
        reset(userData)
        setData(userData)
      } else {
        toast.error("Invalid user data received")
      }
    } catch (error) {
      console.error("Error fetching user details:", error)
      toast.error(error.response?.data?.message || "Error fetching user details")
    } finally {
      setIsLoading(false)
    }
  }, [reset])

  // FETCHES PAN DETAILS WITH USER INPUT
  const handlePanDetails = useCallback(
    async (pan) => {
      if (!pan || !regex.PAN_CARD.test(pan)) {
        toast.error("Please enter a valid PAN number")
        return
      }

      // If we don't have name and DOB yet, open the modal to collect them
      if (!nameAsPan || !dateOfBirth) {
        setPanVerificationOpen(true)
        return
      }

      try {
        setLoading(true)
        const existingValues = getValues()

        // Format date for API
        const formattedDate = formatDateForApi(dateOfBirth)

        // Make the POST request with all required fields in the request body
        const response = await userAxios.post(`/pan/get-pan-details`, {
          pan: pan,
          name_as_per_pan: nameAsPan,
          date_of_birth: formattedDate,
        })

        const data = response?.data?.data

        if (data) {
          setPanDetails(data)
          toast.success("PAN details verified successfully")

          // Set form values from the response
          setValue("firstName", data.first_name || existingValues?.firstName)
          setValue("lastName", data.last_name || existingValues?.lastName)
          setValue("email", data.email || existingValues?.email)
          setValue("phone", data.phone || existingValues?.phone)
          setValue("address", data.address || existingValues?.address)
          setValue("gender", data.gender || existingValues?.gender)
          setValue("pin", data.pin || existingValues?.pin)

          // Close the verification modal
          setPanVerificationOpen(false)
        } else {
          toast.error("No data received from PAN verification")
        }
      } catch (error) {
        console.error("PAN verification error:", error)
        toast.error(error.response?.data?.message || "Error verifying PAN details")
      } finally {
        setLoading(false)
      }
    },
    [getValues, setValue, nameAsPan, dateOfBirth],
  )

  // Submit PAN verification with name and DOB
  const submitPanVerification = () => {
    if (!nameAsPan) {
      toast.error("Please enter your name as per PAN")
      return
    }

    if (!dateOfBirth) {
      toast.error("Please enter your date of birth")
      return
    }

    handlePanDetails(panCard)
  }

  // FETCHES USER DETAILS ON RENDER
  useEffect(() => {
    getUserDetails()
  }, [getUserDetails])

  // PAN CARD HANDLER - Only validate format, don't auto-fetch
  useEffect(() => {
    if (panCard && regex.PAN_CARD.test(panCard)) {
      // Just validate the format, don't auto-fetch
      // We'll fetch when user provides name and DOB
    }
  }, [panCard])

  return (
    <div className="container mx-auto px-4 py-6">
      {isLoading ? (
        <div className="flex justify-center items-center h-[70vh]">
          <div className="flex flex-col items-center">
            <Image src={"/loading.svg"} alt="Loading.." width={75} height={75} className="animate-spin" />
            <p className="mt-4 text-gray-600">Loading your profile...</p>
          </div>
        </div>
      ) : (
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 my-2">
          <UserProfileCard panDetails={panDetails} data={data} />

          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b">
              <h1 className="text-2xl font-semibold text-slate-800">
                {editable ? "Edit Your Profile" : "Your Profile"}
              </h1>
              {!editable && (
                <button
                  onClick={handleEditbutton}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors duration-300"
                >
                  <Edit2 size={16} /> Edit Profile
                </button>
              )}
            </div>

            {/* PAN Verification Modal */}
            {panVerificationOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn">
                <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md transform transition-all animate-slideIn">
                  <div className="flex justify-between items-center mb-6 border-b pb-3">
                    <h2 className="text-2xl font-semibold text-slate-800">Verify PAN Details</h2>
                    <button
                      onClick={() => setPanVerificationOpen(false)}
                      className="text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  <div className="mb-5">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Name as per PAN</label>
                    <input
                      className="appearance-none block w-full bg-gray-50 text-gray-700 border border-gray-300 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                      type="text"
                      value={nameAsPan}
                      onChange={(e) => setNameAsPan(e.target.value)}
                      placeholder="Enter name exactly as on PAN card"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Enter your full name exactly as it appears on your PAN card
                    </p>
                  </div>

                  <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Date of Birth</label>
                    <input
                      className="appearance-none block w-full bg-gray-50 text-gray-700 border border-gray-300 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                      type="date"
                      value={dateOfBirth}
                      onChange={(e) => setDateOfBirth(e.target.value)}
                    />
                    <p className="text-xs text-gray-500 mt-1">Select your date of birth as per PAN card</p>
                  </div>

                  <div className="flex justify-end gap-3">
                    <button
                      className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-6 rounded-lg transition-all duration-200"
                      onClick={() => setPanVerificationOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-lg transition-all duration-200 flex items-center"
                      onClick={submitPanVerification}
                    >
                      {loading ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                          Verifying...
                        </>
                      ) : (
                        <>
                          <CheckCircle size={18} className="mr-2" />
                          Verify
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit(submitHandler)} className="p-6 relative">
              <div className="grid md:grid-cols-2 gap-x-6 gap-y-4">
                <div className="w-full">
                  <div className="flex justify-between items-center mb-2">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold" htmlFor="pan">
                      PAN Card
                    </label>
                    <div className="flex items-center">
                      {loading && (
                        <svg
                          aria-hidden="true"
                          className="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600 mr-2"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                          />
                        </svg>
                      )}
                      {panDetails && Object.keys(panDetails).length > 0 && (
                        <div className="flex items-center text-green-500">
                          <CheckCircle size={16} className="mr-1" />
                          <span className="text-xs">Verified</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <input
                      className={`appearance-none block w-full ${
                        editable ? "bg-white" : "bg-gray-100"
                      } text-gray-700 border ${
                        errors.pan ? "border-red-500" : "border-gray-300"
                      } rounded-md py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 uppercase placeholder:capitalize`}
                      id="pan"
                      type="text"
                      disabled={!editable}
                      placeholder="Enter your PAN card"
                      {...register("pan")}
                    />
                    {editable && (
                      <button
                        type="button"
                        className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-all duration-200 whitespace-nowrap flex items-center"
                        onClick={() => handlePanDetails(panCard)}
                      >
                        <CheckCircle size={16} className="mr-1" />
                        Verify
                      </button>
                    )}
                  </div>
                  {errors.pan && <p className="text-red-500 text-xs mt-1">{errors.pan.message}</p>}
                  {!errors.pan && <p className="text-xs text-gray-500 mt-1">Format: ABCDE1234F</p>}
                </div>

                <div className="w-full">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Aadhaar</label>
                  <input
                    className={`appearance-none block w-full ${
                      editable ? "bg-white" : "bg-gray-100"
                    } text-gray-700 border ${
                      errors.aadhaar ? "border-red-500" : "border-gray-300"
                    } rounded-md py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 placeholder:capitalize`}
                    id="aadhaar"
                    type="text"
                    disabled={!editable}
                    placeholder={"Enter your aadhaar"}
                    {...register("aadhaar")}
                  />
                  {errors.aadhaar && <p className="text-red-500 text-xs mt-1">{errors.aadhaar.message}</p>}
                </div>

                <div className="w-full">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    First Name
                  </label>
                  <input
                    className={`appearance-none block w-full ${
                      editable ? "bg-white" : "bg-gray-100"
                    } text-gray-700 border ${
                      errors.firstName ? "border-red-500" : "border-gray-300"
                    } rounded-md py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 placeholder:capitalize`}
                    id="firstName"
                    type="text"
                    placeholder={"Enter Your first name"}
                    disabled={!editable}
                    {...register("firstName")}
                  />
                  {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
                </div>

                <div className="w-full">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Middle Name (If Applicable)
                  </label>
                  <input
                    className={`appearance-none block w-full ${
                      editable ? "bg-white" : "bg-gray-100"
                    } text-gray-700 border ${
                      errors.middleName ? "border-red-500" : "border-gray-300"
                    } rounded-md py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 placeholder:capitalize`}
                    id="middleName"
                    type="text"
                    placeholder="Enter your middle name"
                    disabled={!editable}
                    {...register("middleName")}
                  />
                  {errors.middleName && <p className="text-red-500 text-xs mt-1">{errors.middleName.message}</p>}
                </div>

                <div className="w-full">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Last Name
                  </label>
                  <input
                    className={`appearance-none block w-full ${
                      editable ? "bg-white" : "bg-gray-100"
                    } text-gray-700 border ${
                      errors.lastName ? "border-red-500" : "border-gray-300"
                    } rounded-md py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 placeholder:capitalize`}
                    {...register("lastName")}
                    id="lastName"
                    type="text"
                    placeholder="Enter your last name"
                    disabled={!editable}
                  />
                  {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
                </div>

                <div className="w-full">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Email</label>
                  <input
                    className={`appearance-none block w-full ${
                      editable ? "bg-white" : "bg-gray-100"
                    } text-gray-700 border ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    } rounded-md py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 placeholder:capitalize`}
                    id="email"
                    disabled={!editable}
                    type="email"
                    {...register("email")}
                    placeholder="Enter your email"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>

                <div className="w-full">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Phone Number
                  </label>
                  <input
                    className={`appearance-none block w-full ${
                      editable ? "bg-white" : "bg-gray-100"
                    } text-gray-700 border ${
                      errors.phone ? "border-red-500" : "border-gray-300"
                    } rounded-md py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 placeholder:capitalize`}
                    id="mobile"
                    type="text"
                    disabled={!editable}
                    {...register("phone")}
                    placeholder="Enter your phone number"
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                </div>

                <div className="w-full">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Gender</label>
                  <select
                    {...register("gender")}
                    id="gender"
                    disabled={!editable}
                    className={`appearance-none capitalize block w-full ${
                      editable ? "bg-white" : "bg-gray-100"
                    } text-gray-700 border ${
                      errors.gender ? "border-red-500" : "border-gray-300"
                    } rounded-md py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200`}
                  >
                    <option selected value="male">
                      Male
                    </option>
                    <option value="female">Female</option>
                  </select>
                  {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender.message}</p>}
                </div>

                <div className="w-full">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="address"
                  >
                    Address
                  </label>
                  <input
                    className={`appearance-none block w-full ${
                      editable ? "bg-white" : "bg-gray-100"
                    } text-gray-700 border ${
                      errors.address ? "border-red-500" : "border-gray-300"
                    } rounded-md py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 placeholder:capitalize`}
                    id="address"
                    type="text"
                    placeholder="Enter your address"
                    {...register("address")}
                    disabled={!editable}
                  />
                  {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
                </div>

                <div className="w-full">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="pin">
                    Pin Code
                  </label>
                  <input
                    id="pin"
                    type="text"
                    placeholder="Enter your pin code"
                    disabled={!editable}
                    className={`appearance-none block w-full ${
                      editable ? "bg-white" : "bg-gray-100"
                    } text-gray-700 border ${
                      errors.pin ? "border-red-500" : "border-gray-300"
                    } rounded-md py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 placeholder:capitalize`}
                    {...register("pin")}
                  />
                  {errors.pin && <p className="text-red-500 text-xs mt-1">{errors.pin.message}</p>}
                </div>

                <div className="w-full">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="file_input"
                  >
                    Profile Photo
                  </label>
                  <div className={`relative ${!editable ? "opacity-70" : ""}`}>
                    <input
                      disabled={!editable}
                      className={`appearance-none block w-full ${
                        editable ? "bg-white" : "bg-gray-100"
                      } text-gray-700 border border-gray-300 rounded-md py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 placeholder:capitalize file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100`}
                      id="file_input"
                      type="file"
                      {...register("avatar")}
                    />
                  </div>
                </div>
              </div>

              {/* Dark overlay during saving */}
              {isSubmitting && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10 rounded-lg">
                  <div className="bg-white p-6 rounded-lg shadow-xl flex flex-col items-center">
                    <svg
                      className="animate-spin h-10 w-10 text-blue-600 mb-4"
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
                    <p className="text-gray-700 font-medium text-lg">Saving your profile...</p>
                    <p className="text-gray-500 text-sm mt-2">Please wait, this may take a moment</p>
                  </div>
                </div>
              )}

              <div className="flex gap-3 justify-end mt-8 border-t pt-6">
                {!editable ? (
                  <>
                    {/* <Button type="button" onClick={() => router.push("/")} size={"md-1"} className="flex items-center">
                      <ArrowLeft size={16} className="mr-2" />
                      Back
                    </Button> */}
                  </>
                ) : (
                  <>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-6 rounded-md transition-colors duration-300 disabled:bg-blue-400"
                    >
                      {isSubmitting ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save size={16} />
                          Save Changes
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      className="flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white py-2.5 px-6 rounded-md transition-colors duration-300"
                      onClick={editCancelHandler}
                    >
                      <X size={16} />
                      Cancel
                    </button>
                  </>
                )}
              </div>
            </form>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideIn {
          from { transform: translateY(-20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}

export default UserProfile
