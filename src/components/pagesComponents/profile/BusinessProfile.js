"use client"

import userAxios from "@/lib/userbackAxios"
import { useForm } from "react-hook-form"
import { useCallback, useEffect, useState } from "react"
import BProfileCard from "./BProfileCard"
import { toast } from "react-toastify"
import { defaultValuesBsProfile, labelKeyMapping } from "./validation/staticData"
import GreenTick from "./Tick"
import Loader from "./Loader"
import Image from "next/image"
import { zodResolver } from "@hookform/resolvers/zod"
import { bsProfileCreateSchema } from "./validation/schemas"
import regex from "@/utils/regex"
import Button from "@/components/ui/Button"
import { useRouter } from "next/navigation"
import { PlusCircle, Edit2, ArrowLeft, Save, X } from "lucide-react"

const BusinessProfile = () => {
  const router = useRouter()

  // SAVES BUSINESS PROFILE IF EXISTS
  const [businessProfile, setBusinessProfile] = useState({})

  // LOADING STATES
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingGstDetails, setIsLoadingGstDetails] = useState(false)
  const [editable, setEditable] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // GST DETAILS FETCHED FROM API ~
  const [gstDetails, setGstDetails] = useState({})

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    setValue,
    watch,
    reset,
  } = useForm({
    defaultValues: defaultValuesBsProfile,
    resolver: zodResolver(bsProfileCreateSchema),
  })

  const pan = watch("pan")
  const gstin = watch("gstin")
  const keysToBeCap = ["pan", "gstin"]

  // FETCHES GST PROFILE BY GSTIN
  const getGstProfileByGstin = useCallback(async (gstin) => {
    try {
      setIsLoadingGstDetails(true)
      const { data, status } = await userAxios.post(`/gst/search/gstin`, { gstin })
      console.log("GST Profile:", data)
      if (status === 200 && data && data.data && data.data.data) {
        setGstDetails(data.data.data.data)
        toast.success("GST details fetched successfully")
      }
    } catch (error) {
      toast.error("Error while fetching GST profile!")
    } finally {
      setIsLoadingGstDetails(false)
    }
  }, [])

  useEffect(() => {
    console.log(gstDetails);
    
    if (editable && regex.GSTIN.test(gstin) && isDirty) {
      getGstProfileByGstin(gstin)
    }
  }, [editable, gstin, getGstProfileByGstin, isDirty,gstDetails])

  // FETCHES AND SETS BUSINESS PROFILE
  const getBusinessProfile = useCallback(async () => {
    try {
      setIsLoading(true)
      const { data, status } = await userAxios.get(`/business/profile`)
      console.log("Business Profile:", data)
      const profile = data?.data?.profile

      if (status === 200 && profile) {
        setBusinessProfile(profile)
        reset(profile)
        return true
      }
    } catch (error) {
      if (error.response?.status === 404) {
        return toast.info("No business profile created yet!")
      }
      toast.error("Failed to fetch business profile.")
    } finally {
      setIsLoading(false)
    }
  }, [reset, setBusinessProfile])

  useEffect(() => {
    if (businessProfile.id) {
      reset(businessProfile)
    }
    if (!businessProfile.id) {
      getBusinessProfile()
    }
  }, [reset, businessProfile, getBusinessProfile])

  // EVENT HANDLERS
  const handleEdit = () => {
    if (businessProfile.id) {
      reset(businessProfile)
    } else {
      reset(defaultValuesBsProfile)
    }
    return setEditable(!editable)
  }

  // FORM INPUT CHANGE HANDLER
  const onChangeHandler = (key, value) => {
    setValue(key, value)
  }

  // FORM SUBMIT HANDLER
  const formSubmitHandler = async (body) => {
    try {
      setIsSubmitting(true)
      setIsLoading(true)
      const { data, status } = await userAxios.post(`/business`, body)

      if (status === 200 && data) {
        toast.success(data.message)
        await getBusinessProfile()
        handleEdit()
      }
    } catch (error) {
      if (error?.response?.status === 400) {
        return toast.error(error?.response?.data?.message)
      }
      toast.error("Failed to create business profile")
    } finally {
      setIsLoading(false)
      setIsSubmitting(false)
    }
  }

  // UPDATES STATE CODE AND PANCARD WHEN GST CHANGES
  useEffect(() => {
    if (regex.GSTIN.test(gstin)) {
      const code = gstin.slice(0, 2)
      const pan = gstin.slice(2, 12)
      setValue("statecode", code)
      setValue("pan", pan)
    }
  }, [gstin, setValue, businessProfile])

  // UPDATES FORM IF GST PROFILE EXISTS VIA API
  useEffect(() => {
    if (gstDetails.lgnm) {
      const address = gstDetails?.pradr?.addr
      if (address) {
        setValue("businessName", gstDetails?.tradeNam)
        setValue("taxpayer_type", gstDetails?.dty)
        setValue("status", gstDetails?.sts)
        setValue("ctb", gstDetails?.ctb)
        setValue("street", address.bno ? address.bno + ", " + address?.st : address?.st)
        setValue("landmark", address?.landMark)
        setValue("city", address?.loc)
        setValue("dst", address?.dst)
        setValue("stcd", address?.stcd)
      }
    }
  }, [businessProfile, gstDetails, setValue])
   

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 my-2">
        {isLoading ? (
          <div className="flex col-span-2 justify-center items-center h-[70vh]">
            <Image src={"/loading.svg"} alt="Loading.." width={75} height={75} />
          </div>
        ) : (
          <>
            <BProfileCard businessProfile={businessProfile} />
            <div className="bg-white shadow-md rounded-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold text-slate-800">
                  {businessProfile.id ? "Your Business Profile" : "Create Business Profile"}
                </h1>
                {!editable && (
                  <button
                    onClick={handleEdit}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors duration-300"
                  >
                    {businessProfile.id ? (
                      <>
                        <Edit2 size={16} /> Edit Profile
                      </>
                    ) : (
                      <>
                        <PlusCircle size={16} /> Create Profile
                      </>
                    )}
                  </button>
                )}
              </div>
              <form className="my-2" onSubmit={handleSubmit(formSubmitHandler)}>
                <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
                  {Object.keys(defaultValuesBsProfile).map((key) => (
                    <div key={key} className="relative w-full">
                      <label
                        className="flex justify-between uppercase items-center tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor={key}
                      >
                        {labelKeyMapping[key]}:{false && <GreenTick />}
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${errors[key] ? "border-red-500" : "border-gray-200"} rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 ${!editable ? "opacity-70" : ""} ${keysToBeCap.includes(key) ? "placeholder:capitalize uppercase" : ""}`}
                          placeholder={`Enter ${labelKeyMapping[key]}`}
                          disabled={!editable}
                          id={key}
                          {...register(key, {
                            onChange: (e) => onChangeHandler(key, e.target.value),
                          })}
                        />
                        <div className="absolute right-[10px] top-[15px] flex items-center pointer-events-none">
                          {key === "gstin" && isLoadingGstDetails && <Loader />}
                        </div>
                      </div>
                      {errors[key] && <p className="text-red-500 text-xs mt-1">{errors[key].message}</p>}
                    </div>
                  ))}
                </div>
                <div className="flex justify-end items-center py-4 gap-3">
                  {!editable ? (
                    // <Button
                    //   type="button"
                    //   onClick={() => router.push("/")}
                    //   size={"md-1"}
                    //   className="flex items-center gap-2"
                    // >
                    //   <ArrowLeft size={16} /> Back
                    // </Button>
                    <>  </>
                  ) : (
                    <>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors duration-300 disabled:bg-blue-400"
                      >
                        <Save size={16} /> Save
                      </button>
                      <button
                        type="button"
                        className="flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-md transition-colors duration-300"
                        onClick={handleEdit}
                      >
                        <X size={16} /> Cancel
                      </button>
                    </>
                  )}
                </div>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default BusinessProfile
