"use client"
import { useForm } from "react-hook-form"
import { useState, useEffect, useRef, useCallback } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import userAxios from "@/lib/userbackAxios"
import { toast } from "react-toastify"

// 🔹 Reusable form field with prefix/suffix
const FormField = ({
  id,
  label,
  type = "text",
  register,
  errors,
  disabled,
  className = "",
  prefix, // e.g. "₹"
  suffix, // e.g. "%"
  ...rest
}) => (
  <li className={disabled ? "opacity-50" : ""}>
    <label
      htmlFor={id}
      className="block mb-2 text-sm font-medium text-gray-950/90 dark:text-white"
    >
      {label}
    </label>

    <div className="relative flex items-center">
      {/* Prefix */}
      {prefix && (
        <span className="absolute left-3 text-gray-500 dark:text-gray-300 text-sm">
          {prefix}
        </span>
      )}

      {type === "textarea" ? (
        <textarea
          id={id}
          {...register(id, { required: `${label} is required` })}
          disabled={disabled}
          placeholder={`Enter ${label}`}
          className={`bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg 
          focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-neutral-700 
          dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white 
          ${prefix ? "pl-8" : ""} ${suffix ? "pr-8" : ""} ${className}`}
          {...rest}
        />
      ) : (
        <input
          type={type}
          id={id}
          {...register(id, { required: `${label} is required` })}
          disabled={disabled}
          placeholder={`Enter ${label}`}
          className={`bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg 
          focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-neutral-700 
          dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white 
          ${prefix ? "pl-8" : ""} ${suffix ? "pr-8" : ""} ${className}`}
          {...rest}
        />
      )}

      {/* Suffix */}
      {suffix && (
        <span className="absolute right-3 text-gray-500 dark:text-gray-300 text-sm">
          {suffix}
        </span>
      )}
    </div>

    {errors[id] && (
      <p className="text-xs text-red-500 italic">{errors[id]?.message}</p>
    )}
  </li>
)

export default function CreateItem() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const itemId = searchParams.get("id")

  const {
    handleSubmit,
    register,
    setValue,
    watch,
    getValues,
    formState: { errors, isDirty },
    reset,
  } = useForm({
    defaultValues: {
      itemName: "",
      hsnCode: "",
      taxExempted: false,
      price: "",
      purchasePrice: "",
      cgst: "",
      sgst: "",
      igst: "",
      utgst: "",
      openingStock: "",
      closingStock: "",
      unit: "pieces",
      description: "",
    },
  })

  const [isLoading, setIsLoading] = useState(false)
  const [apiError, setApiError] = useState(null)
  const [backendLimitation, setBackendLimitation] = useState(false)
  const originalItemRef = useRef(null)

  // 🔹 Fetch item details if editing
  useEffect(() => {
    if (!itemId) return
    const fetchItem = async () => {
      try {
        setIsLoading(true)
        const { data } = await userAxios.get(`/invoice/items/${itemId}?_=${Date.now()}`)
        if (!data?.item) throw new Error("Item data not found")

        reset({
          ...data.item,
          price: data.item.price?.toString() || "",
          purchasePrice: data.item.purchasePrice?.toString() || "",
          cgst: data.item.cgst?.toString() || "",
          sgst: data.item.sgst?.toString() || "",
          igst: data.item.igst?.toString() || "",
          utgst: data.item.utgst?.toString() || "",
          openingStock: data.item.openingStock?.toString() || "",
          closingStock: data.item.closingStock?.toString() || "",
        })
        originalItemRef.current = { ...data.item }
        setBackendLimitation(true)
      } catch (err) {
        setApiError(err.message)
        toast.error(err.message)
      } finally {
        setIsLoading(false)
      }
    }
    fetchItem()
  }, [itemId, reset])

  // 🔹 Centralized API request handler
  const sendRequest = useCallback(async (method, url, payload) => {
    return await userAxios[method](url, payload, { headers: { "Content-Type": "application/json" } })
  }, [])

  // 🔹 Create or update
  const onSubmit = async (formData) => {
    try {
      setIsLoading(true)
      setApiError(null)

      if (itemId) {
        const { data } = await sendRequest("put", `/invoice/items/${itemId}`, { itemName: formData.itemName })
        if (data.success || data.sucess) {
          toast.success("Item name updated successfully")
          router.push("/dashboard/accounts/invoice/items")
        } else throw new Error(data.message)
      } else {
        const payload = Object.fromEntries(
          Object.entries(formData).map(([k, v]) => [k, isNaN(v) || v === "" ? v : parseFloat(v)])
        )
        const { data } = await sendRequest("post", "/invoice/items", payload)
        if (data.success || data.sucess) {
          toast.success("Item created successfully")
          router.push("/dashboard/accounts/invoice/items")
        } else throw new Error(data.message)
      }
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Operation failed"
      setApiError(msg)
      toast.error(msg)
    } finally {
      setIsLoading(false)
    }
  }

  // 🔹 Create new & delete old
  const createNewAndDeleteOld = async () => {
    try {
      setIsLoading(true)
      const formData = getValues()
      const payload = Object.fromEntries(
        Object.entries(formData).map(([k, v]) => [k, isNaN(v) || v === "" ? v : parseFloat(v)])
      )
      const { data } = await sendRequest("post", "/invoice/items", payload)
      if (data.success || data.sucess) {
        toast.success("New item created successfully")
        if (itemId) {
          try {
            await sendRequest("delete", `/invoice/items/${itemId}`)
            toast.success("Old item deleted successfully")
          } catch {
            toast.warning("Created new item but couldn't delete old one")
          }
        }
        router.push("/dashboard/accounts/invoice/items")
      } else throw new Error(data.message)
    } catch (err) {
      toast.error(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="p-4 max-w-6xl mx-auto text-slate-800">
      {isLoading && <div className="flex justify-center items-center my-4"><div className="animate-spin h-8 w-8 border-b-2 border-blue-500 rounded-full"></div><span className="ml-2">Loading...</span></div>}

      <h1 className="text-4xl font-semibold my-4">{itemId ? "Update" : "Create"} Item</h1>

      {apiError && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{apiError}</div>}

      {backendLimitation && itemId && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-3 rounded mb-4">
          <p className="font-bold">⚠️ Backend Limitation</p>
          <p>The backend only supports updating the item name. Other fields cannot be updated.</p>
          <p className="mt-2">Use the &quot;Create New & Delete Old&quot; button below.</p>
          <button onClick={createNewAndDeleteOld} disabled={isLoading} className="bg-green-500 text-white px-2 py-1 rounded text-xs mt-2">
            Create New & Delete Old
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Basic */}
        <p className="text-lg mt-4 font-semibold text-gray-600 dark:text-gray-300">Basic Details</p>
        <ul className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4">
          <FormField id="itemName" label="Item Name" register={register} errors={errors} />
          <FormField id="hsnCode" label="HSN Code" register={register} errors={errors} disabled={!!itemId} />
          {/* Tax Exempted toggle */}
          <li className={itemId ? "opacity-50" : ""}>
            <div className="flex items-center space-x-3 p-2 bg-blue-50 dark:bg-blue-950 rounded-lg">
              <label htmlFor="taxExempted" className="text-sm font-medium text-gray-950/90 dark:text-white">Tax Exempted</label>
              <input type="checkbox" id="taxExempted" className="peer sr-only" {...register("taxExempted")} disabled={!!itemId} />
              <div className={`${watch("taxExempted") ? "bg-blue-400" : "bg-gray-400"} h-6 w-11 rounded-full relative after:absolute after:top-0.5 after:left-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow after:transition-all peer-checked:after:translate-x-full`}></div>
            </div>
          </li>
        </ul>

        {/* Pricing */}
        <p className="text-lg mt-4 font-semibold text-gray-600 dark:text-gray-300">Pricing</p>
        <ul className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4">
          <FormField id="price" label="Price" type="number" register={register} errors={errors} disabled={!!itemId} prefix="₹" />
          <FormField id="purchasePrice" label="Purchase Price" type="number" register={register} errors={errors} disabled={!!itemId} prefix="₹" />
        </ul>

        {/* Tax */}
        <p className="text-lg mt-4 font-semibold text-gray-600 dark:text-gray-300">Tax Details</p>
        <ul className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4">
          {"cgst sgst igst utgst".split(" ").map((id) => (
            <FormField key={id} id={id} label={id.toUpperCase()} type="number" register={register} errors={errors} disabled={!!itemId} suffix="%" />
          ))}
        </ul>

        {/* Inventory */}
        <p className="text-lg mt-4 font-semibold text-gray-600 dark:text-gray-300">Inventory</p>
        <ul className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4">
          <FormField id="openingStock" label="Opening Stock" type="number" register={register} errors={errors} disabled={!!itemId} />
          <FormField id="closingStock" label="Closing Stock" type="number" register={register} errors={errors} disabled={!!itemId} />
          <li className={itemId ? "opacity-50" : ""}>
            <label htmlFor="unit" className="block mb-2 text-sm font-medium text-gray-950/90 dark:text-white">Unit</label>
            <select id="unit" {...register("unit", { required: "Unit is required" })} disabled={!!itemId} className="bg-neutral-50 border border-neutral-300 text-sm rounded-lg p-2 w-full dark:bg-neutral-700 dark:border-neutral-600 dark:text-white">
              {"pieces box dozen kg meter liter".split(" ").map((u) => <option key={u} value={u}>{u}</option>)}
            </select>
            {errors.unit && <p className="text-xs text-red-500 italic">{errors.unit.message}</p>}
          </li>
        </ul>

        {/* Description */}
        <p className="text-lg mt-4 font-semibold text-gray-600 dark:text-gray-300">Additional Information</p>
        <ul className="grid grid-cols-1 gap-4">
          <FormField id="description" label="Description" type="textarea" register={register} errors={errors} disabled={!!itemId} rows="3" />
        </ul>

        <button type="submit" disabled={isLoading} className="w-full mt-4 text-white bg-blue-600 hover:bg-blue-700 rounded-lg px-10 py-4 text-sm">
          {isLoading ? "Processing..." : itemId ? "Update Item Name" : "Create Item"}
        </button>
      </form>
    </section>
  )
}
