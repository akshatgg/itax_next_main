"use client"

import { useForm } from "react-hook-form"
import { useState, useEffect, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import userAxios from "@/lib/userbackAxios"
import { toast } from "react-toastify"
import { InputStyles } from "@/app/styles/InputStyles"

export default function CreateItem() {
  const defaultValues = {
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
  }

  const {
    handleSubmit,
    register,
    setValue,
    watch,
    getValues,
    formState: { errors, isDirty },
    reset,
  } = useForm({
    defaultValues,
  })

  const [isLoading, setIsLoading] = useState(false)
  const [apiError, setApiError] = useState(null)
  const [backendLimitation, setBackendLimitation] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const itemId = searchParams.get("id") // Get the item ID from the query parameter
  const formValues = watch() // Watch all form values
  const originalItemRef = useRef(null)

  useEffect(() => {
    if (itemId) {
      // Fetch the item details if in edit mode
      const fetchItemDetails = async () => {
        try {
          setIsLoading(true)
          setApiError(null)
          console.log("Fetching item details for ID:", itemId)

          // Add cache-busting parameter to prevent caching
          const response = await userAxios.get(`/invoice/items/${itemId}?_=${Date.now()}`)
          console.log("API Response:", response.data)

          if (response.data && response.data.item) {
            const item = response.data.item
            console.log("Item data received:", item)

            // Store the original item data for comparison
            originalItemRef.current = { ...item }

            // Reset form with the item data
            reset({
              itemName: item.itemName || "",
              hsnCode: item.hsnCode || "",
              taxExempted: item.taxExempted || false,
              price: item.price?.toString() || "",
              purchasePrice: item.purchasePrice?.toString() || "",
              cgst: item.cgst?.toString() || "",
              sgst: item.sgst?.toString() || "",
              igst: item.igst?.toString() || "",
              utgst: item.utgst?.toString() || "",
              openingStock: item.openingStock?.toString() || "",
              closingStock: item.closingStock?.toString() || "",
              unit: item.unit || "pieces",
              description: item.description || "",
            })

            console.log("Form reset with item data")

            // Show backend limitation warning
            setBackendLimitation(true)
          } else {
            console.log("No item data found in response")
            setApiError("Item data not found")
            toast.error("Item data not found")
          }
          setIsLoading(false)
        } catch (error) {
          console.error("Error fetching item details:", error)
          setApiError(error.message || "Failed to fetch item details")
          toast.error("Failed to fetch item details")
          setIsLoading(false)
        }
      }

      fetchItemDetails()
    }
  }, [itemId, reset])

  const onCreateOrUpdateItem = async (formData) => {
    try {
      console.log("Form data received:", formData)
      setIsLoading(true)
      setApiError(null)

      if (itemId) {
        // For update, only send itemName as that's all the backend supports
        const updateData = {
          itemName: formData.itemName,
        }

        console.log("Sending only itemName for update:", updateData)

        const apiUrl = `/invoice/items/${itemId}`
        const response = await userAxios.put(apiUrl, updateData, {
          headers: {
            "Content-Type": "application/json",
          },
        })

        console.log("Update response:", response)

        if (response.data.success || response.data.sucess) {
          // Handle both spellings
          toast.success("Item name updated successfully")
          // toast.info("Note: Only the item name can be updated due to backend limitations")

          setTimeout(() => {
            router.push("/dashboard/accounts/invoice/items")
          }, 1500)
        } else {
          const errorMsg = response.data.message || "Operation failed. Please try again."
          setApiError(errorMsg)
          toast.error(errorMsg)
        }
      } else {
        // For create, send all fields
        const JsonData = {
          itemName: formData.itemName,
          hsnCode: formData.hsnCode,
          taxExempted: formData.taxExempted,
          price: Number.parseFloat(formData.price),
          purchasePrice: Number.parseFloat(formData.purchasePrice),
          cgst: Number.parseFloat(formData.cgst),
          sgst: Number.parseFloat(formData.sgst),
          igst: Number.parseFloat(formData.igst),
          utgst: Number.parseFloat(formData.utgst),
          openingStock: Number.parseFloat(formData.openingStock),
          closingStock: Number.parseFloat(formData.closingStock),
          unit: formData.unit,
          description: formData.description,
        }

        console.log("Creating new item with data:", JsonData)

        const apiUrl = "/invoice/items"
        const response = await userAxios.post(apiUrl, JsonData, {
          headers: {
            "Content-Type": "application/json",
          },
        })

        console.log("Create response:", response)

        if (response.data.success || response.data.sucess) {
          toast.success("Item created successfully")

          setTimeout(() => {
            router.push("/dashboard/accounts/invoice/items")
          }, 1500)
        } else {
          const errorMsg = response.data.message || "Operation failed. Please try again."
          setApiError(errorMsg)
          toast.error(errorMsg)
        }
      }

      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      const errorMsg = error.response?.data?.message || error.message || "An error occurred. Please try again."
      console.error("Error:", error)
      console.error("Error Response:", error.response?.data)
      setApiError(errorMsg)
      toast.error(errorMsg)
    }
  }

  // Function to create a completely new item with the updated data and delete the old one
  const createNewAndDeleteOld = async () => {
    try {
      setIsLoading(true)
      setApiError(null)

      const formData = getValues()
      console.log("Creating new item with updated data:", formData)

      // Prepare data for new item
      const JsonData = {
        itemName: formData.itemName,
        hsnCode: formData.hsnCode,
        taxExempted: formData.taxExempted,
        price: Number.parseFloat(formData.price),
        purchasePrice: Number.parseFloat(formData.purchasePrice),
        cgst: Number.parseFloat(formData.cgst),
        sgst: Number.parseFloat(formData.sgst),
        igst: Number.parseFloat(formData.igst),
        utgst: Number.parseFloat(formData.utgst),
        openingStock: Number.parseFloat(formData.openingStock),
        closingStock: Number.parseFloat(formData.closingStock),
        unit: formData.unit,
        description: formData.description,
      }

      // Create a new item
      const apiUrl = "/invoice/items"
      console.log("Creating new item at:", apiUrl)

      const response = await userAxios.post(apiUrl, JsonData, {
        headers: {
          "Content-Type": "application/json",
        },
      })

      console.log("Create new item response:", response)

      if (response.data.success || response.data.sucess) {
        toast.success("New item created successfully")

        // If successful, delete the old item
        if (itemId) {
          try {
            console.log("Deleting old item:", itemId)
            const deleteResponse = await userAxios.delete(`/invoice/items/${itemId}`)
            console.log("Delete response:", deleteResponse)

            if (deleteResponse.data.success || deleteResponse.data.sucess) {
              toast.success("Old item deleted successfully")
            } else {
              toast.warning("Created new item but couldn't delete the old one")
            }
          } catch (deleteError) {
            console.error("Error deleting old item:", deleteError)
            toast.warning("Created new item but couldn't delete the old one")
          }
        }

        setTimeout(() => {
          router.push("/dashboard/accounts/invoice/items")
        }, 1500)
      } else {
        const errorMsg = response.data.message || "Operation failed. Please try again."
        setApiError(errorMsg)
        toast.error(errorMsg)
      }
    } catch (error) {
      console.error("Create new item error:", error)
      const errorMsg = error.response?.data?.message || error.message || "Failed to create new item"
      setApiError(errorMsg)
      toast.error(errorMsg)
    } finally {
      setIsLoading(false)
    }
  }

  // const formClassNames = {
  //   label: "block mb-2 text-sm font-medium text-gray-950/90 dark:text-white",
  //   input:
  //     "bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
  //   button:
  //     "w-full text-center mt-4 focus:outline-none text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300 font-medium rounded-lg text-sm px-10 py-4",
  //   gridUL: "grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4",
  //   formSectionTitle: "text-lg mt-4 font-semibold text-gray-600 dark:text-gray-300",
  // }

  return (
    <>
      <section 
      className="p-4 max-w-6xl mx-auto text-slate-800"
      >
        {isLoading && (
          <div className="flex justify-center items-center my-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <span className="ml-2">Loading...</span>
          </div>
        )}
         <div className={InputStyles.section80Deduction}>
        <h1 className="text-4xl font-semibold my-4">{itemId ? "Update" : "Create"} Item</h1>

        {apiError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <p>Error: {apiError}</p>
          </div>
        )}

        {backendLimitation && itemId && (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-3 rounded mb-4">
            <p className="font-bold">⚠️ Backend Limitation</p>
            <p>The backend only supports updating the item name. Other fields cannot be updated.</p>

<p className="mt-2">To update all fields, use the &quot;Create New &amp; Delete Old&quot; button below.</p>

          </div>
        )}

        {/* Debug info - remove in production */}
        <div className="bg-gray-100 p-2 mb-4 text-xs rounded">
          <p>Form is {isDirty ? "dirty" : "pristine"}</p>
          <p>Item ID: {itemId || "None (Creating new item)"}</p>
          {itemId && (
            <div className="flex flex-wrap gap-2 mt-2">
              <button
                onClick={createNewAndDeleteOld}
                className="bg-green-500 text-white px-2 py-1 rounded text-xs"
                disabled={isLoading}
              >
                Create New & Delete Old
              </button>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit(onCreateOrUpdateItem)}>
          <p className={formClassNames.formSectionTitle}>Basic Details</p>
          <ul className={formClassNames.gridUL}>
            <li>
              <label htmlFor="itemName" className={formClassNames.label}>
                Item name
              </label>
              <input
                type="text"
                id="itemName"
                className={formClassNames.input}
                placeholder="Item name"
                {...register("itemName", {
                  required: "Item name is required",
                })}
              />
              {errors.itemName && <p className="text-xs text-red-500 italic">{errors.itemName.message}</p>}
            </li>
            <li className={itemId ? "opacity-50" : ""}>
              <label htmlFor="hsnCode" className={formClassNames.label}>
                HSN Code
              </label>
              <input
                type="text"
                id="hsnCode"
                className={formClassNames.input}
                placeholder="HSN Code"
                disabled={itemId}
                {...register("hsnCode", {
                  required: "HSN is required",
                })}
              />
              {errors.hsnCode && <p className="text-xs text-red-500 italic">{errors.hsnCode.message}</p>}
            </li>
            <li className={itemId ? "opacity-50" : ""}>
              <div className="flex items-center space-x-3 p-2 bg-blue-50 dark:bg-blue-950 rounded-lg">
                <label htmlFor="taxExempted" className={formClassNames.label}>
                  Tax Exempted
                </label>
                <label htmlFor="taxExempted" className="relative inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    id="taxExempted"
                    className="peer sr-only"
                    disabled={itemId}
                    {...register("taxExempted")}
                  />
                  <div
                    className={`${
                      watch("taxExempted") ? "bg-blue-400" : "bg-gray-400"
                    } h-6 w-11 rounded-full after:absolute after:top-0.5 after:left-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow after:transition-all after:content-[''] hover:bg-gray-200 peer-checked:bg-primary-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-4 peer-focus:ring-primary-200 peer-disabled:cursor-not-allowed peer-disabled:bg-gray-100 peer-disabled:after:bg-gray-50`}
                  ></div>
                </label>
              </div>
            </li>
          </ul>

          <p className={formClassNames.formSectionTitle}>Pricing</p>
          <ul className={formClassNames.gridUL}>
            <li className={itemId ? "opacity-50" : ""}>
              <label htmlFor="price" className={formClassNames.label}>
                Price
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-2.5 text-gray-500">
                  ₹
                </div>
                <input
                  type="number"
                  id="price"
                  className="pl-8 bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="0.00"
                  step="0.01"
                  disabled={itemId}
                  {...register("price", {
                    required: "Selling Price is required",
                  })}
                />
              </div>
              {errors.price && <p className="text-xs text-red-500 italic">{errors.price.message}</p>}
            </li>
            <li className={itemId ? "opacity-50" : ""}>
              <label htmlFor="purchasePrice" className={formClassNames.label}>
                Purchase Price
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-2.5 text-gray-500">
                  ₹
                </div>
                <input
                  type="number"
                  id="purchasePrice"
                  className="pl-8 bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="0.00"
                  step="0.01"
                  disabled={itemId}
                  {...register("purchasePrice", {
                    required: "Purchase Price is required",
                  })}
                />
              </div>
              {errors.purchasePrice && <p className="text-xs text-red-500 italic">{errors.purchasePrice.message}</p>}
            </li>
          </ul>

          <p className={formClassNames.formSectionTitle}>Tax Details</p>
          <ul className={formClassNames.gridUL}>
            <li className={itemId ? "opacity-50" : ""}>
              <label htmlFor="cgst" className={formClassNames.label}>
                CGST
              </label>
              <input
                type="number"
                id="cgst"
                className={formClassNames.input}
                placeholder="0.00"
                step="0.01"
                disabled={itemId}
                {...register("cgst", {
                  required: "CGST is required",
                })}
              />
              {errors.cgst && <p className="text-xs text-red-500 italic">{errors.cgst.message}</p>}
            </li>
            <li className={itemId ? "opacity-50" : ""}>
              <label htmlFor="sgst" className={formClassNames.label}>
                SGST
              </label>
              <input
                type="number"
                id="sgst"
                className={formClassNames.input}
                placeholder="0.00"
                step="0.01"
                disabled={itemId}
                {...register("sgst", {
                  required: "SGST is required",
                })}
              />
              {errors.sgst && <p className="text-xs text-red-500 italic">{errors.sgst.message}</p>}
            </li>
            <li className={itemId ? "opacity-50" : ""}>
              <label htmlFor="igst" className={formClassNames.label}>
                IGST
              </label>
              <input
                type="number"
                id="igst"
                className={formClassNames.input}
                placeholder="0.00"
                step="0.01"
                disabled={itemId}
                {...register("igst", {
                  required: "IGST is required",
                })}
              />
              {errors.igst && <p className="text-xs text-red-500 italic">{errors.igst.message}</p>}
            </li>
            <li className={itemId ? "opacity-50" : ""}>
              <label htmlFor="utgst" className={formClassNames.label}>
                UTGST
              </label>
              <input
                type="number"
                id="utgst"
                className={formClassNames.input}
                placeholder="0.00"
                step="0.01"
                disabled={itemId}
                {...register("utgst", {
                  required: "UTGST is required",
                })}
              />
              {errors.utgst && <p className="text-xs text-red-500 italic">{errors.utgst.message}</p>}
            </li>
          </ul>

          <p className={formClassNames.formSectionTitle}>Inventory</p>
          <ul className={formClassNames.gridUL}>
            <li className={itemId ? "opacity-50" : ""}>
              <label htmlFor="openingStock" className={formClassNames.label}>
                Opening Stock
              </label>
              <input
                type="number"
                id="openingStock"
                className={formClassNames.input}
                placeholder="0.00"
                step="0.01"
                disabled={itemId}
                {...register("openingStock", {
                  required: "Opening Stock is required",
                })}
              />
              {errors.openingStock && <p className="text-xs text-red-500 italic">{errors.openingStock.message}</p>}
            </li>
            <li className={itemId ? "opacity-50" : ""}>
              <label htmlFor="closingStock" className={formClassNames.label}>
                Closing Stock
              </label>
              <input
                type="number"
                id="closingStock"
                className={formClassNames.input}
                placeholder="0.00"
                step="0.01"
                disabled={itemId}
                {...register("closingStock", {
                  required: "Closing Stock is required",
                })}
              />
              {errors.closingStock && <p className="text-xs text-red-500 italic">{errors.closingStock.message}</p>}
            </li>
            <li className={itemId ? "opacity-50" : ""}>
              <label htmlFor="unit" className={formClassNames.label}>
                Unit
              </label>
              <select
                id="unit"
                className={formClassNames.input}
                disabled={itemId}
                {...register("unit", {
                  required: "Unit is required",
                })}
              >
                <option value="pieces">Pieces</option>
                <option value="box">Box</option>
                <option value="dozen">Dozen</option>
                <option value="kg">Kilogram (Kg)</option>
                <option value="meter">Meter (M)</option>
                <option value="liter">Liter (L)</option>
              </select>
              {errors.unit && <p className="text-xs text-red-500 italic">{errors.unit.message}</p>}
            </li>
          </ul>

          <p className={formClassNames.formSectionTitle}>Additional Information</p>
          <ul className="grid grid-cols-1 gap-4">
            <li className={itemId ? "opacity-50" : ""}>
              <label htmlFor="description" className={formClassNames.label}>
                Description
              </label>
              <textarea
                id="description"
                className={formClassNames.input}
                rows="3"
                placeholder="Description"
                disabled={itemId}
                {...register("description", {
                  required: "Description is required",
                })}
              ></textarea>
              {errors.description && <p className="text-xs text-red-500 italic">{errors.description.message}</p>}
            </li>
          </ul>

          <button type="submit" disabled={isLoading} className={formClassNames.button}>
            {isLoading ? "Processing..." : itemId ? "Update Item Name" : "Create Item"}
          </button>
        </form>

        </div>
      </section>
    </>
  )
}
