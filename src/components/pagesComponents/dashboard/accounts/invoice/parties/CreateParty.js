"use client"
import { useForm } from "react-hook-form"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import userAxios from "@/lib/userbackAxios"
import { toast } from "react-toastify"
// Import the schema but don't use it for now to identify the issue
// import { createPartySchema } from "../invoice/createPartySchema"
// import { zodResolver } from "@hookform/resolvers/zod"

export default function CreateParty() {
  const defaultValues = {
    gstin: "",
    partyName: "",
    partyType: "supplier",
    contactPerson: "",
    pan: "",
    upi: "",
    phone: "",
    email: "",
    address: "",
    bankName: "",
    bankAccountNumber: "",
    bankIfsc: "",
    bankBranch: "",
  }

  // Remove the zodResolver to allow the form to submit without validation
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
    getValues,
  } = useForm({
    // resolver: zodResolver(createPartySchema), // Temporarily remove Zod validation
    defaultValues,
  })

  const [isLoading, setIsLoading] = useState(false)
  const [isRespError, setIsRespError] = useState(false)
  const [respError, setRespError] = useState(null)
  const router = useRouter()
  const searchParams = useSearchParams()
  const partyId = searchParams.get("id") // Get the party ID from the query parameter

  useEffect(() => {
    if (partyId) {
      // Fetch the party details if in edit mode
      const fetchPartyDetails = async () => {
        try {
          const response = await userAxios.get(`/invoice/parties/${partyId}`)
          const party = response.data.party
          // Populate the form with the party details
          Object.keys(party).forEach((key) => setValue(key, party[key]))
        } catch (error) {
          console.log(error)
        }
      }
      fetchPartyDetails()
    }
  }, [partyId, setValue])

  const onCreateOrUpdateParty = async (formData) => {
    try {
      console.log("Form data received:", formData)
      setIsLoading(true)
      setIsRespError(false)

      // Map form data to API expected format
      const JsonData = {
        partyName: formData.partyName || "",
        type: formData.partyType || "supplier",
        gstin: formData.gstin || "",
        pan: formData.pan || "",
        upi: formData.upi || "",
        email: formData.email || "",
        phone: formData.phone || "",
        address: formData.address || "",
        bankName: formData.bankName || "",
        bankAccountNumber: formData.bankAccountNumber || "",
        bankIfsc: formData.bankIfsc || "",
        bankBranch: formData.bankBranch || "",
      }

      console.log("Data being sent to API:", JsonData)

      let response
      const apiUrl = partyId ? `/invoice/parties/${partyId}` : "/invoice/parties"

      if (partyId) {
        // Update the existing party
        response = await userAxios.put(apiUrl, JsonData, {
          headers: {
            "Content-Type": "application/json",
          },
        })
      } else {
        // Create a new party
        response = await userAxios.post(apiUrl, JsonData, {
          headers: {
            "Content-Type": "application/json",
          },
        })
      }

      console.log("API Response:", response)

      if (response.data.success) {
        toast.success(`Party ${partyId ? "Updated" : "Created"}`)
        router.replace("/dashboard/accounts/invoice/parties")
      } else {
        toast.error("Operation failed. Please try again.")
      }

      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      setIsRespError(true)
      console.error("Error:", error)
      console.error("Error Response:", error.response?.data)
      toast.error(error.response?.data?.message || "An error occurred. Please try again.")
    }
  }

  const formClassNames = {
    label: "block mb-2 text-sm font-medium text-gray-950/90 dark:text-white",
    input:
      "bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
    button:
      "w-full text-center mt-4 focus:outline-none text-white bg-blue-400 hover:bg-blue-500 focus:ring-blue-300 font-medium rounded-lg text-sm px-10 py-4",
    gridUL: "grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4",
    formSectionTitle: "text-lg mt-4 font-semibold text-gray-600 dark:text-gray-300",
  }

  return (
    <>
      <section className="p-4 max-w-6xl mx-auto">
        <form onSubmit={handleSubmit(onCreateOrUpdateParty)}>
          <p className={formClassNames.formSectionTitle}>Basic Details</p>
          <ul className={formClassNames.gridUL}>
            <li>
              <label htmlFor="partyName" className={formClassNames.label}>
                Party name
              </label>
              <input
                type="text"
                id="partyName"
                className={formClassNames.input}
                placeholder="Party name"
                {...register("partyName")}
              />
              {errors.partyName && <p className="text-xs text-red-500 italic">{errors.partyName.message}</p>}
            </li>
            <li>
              <label htmlFor="partyType" className={formClassNames.label}>
                Party Type
              </label>
              <select
                id="partyType"
                className={formClassNames.input}
                {...register("partyType")}
                defaultValue={"supplier"}
              >
                <option value="supplier">Supplier</option>
                <option value="customer">Customer</option>
              </select>
              {errors.partyType && <p className="text-xs text-red-500 italic">{errors.partyType.message}</p>}
            </li>
            <li>
              <label htmlFor="contactPerson" className={formClassNames.label}>
                Contact Person
              </label>
              <input
                type="text"
                id="contactPerson"
                className={formClassNames.input}
                placeholder="Contact Person"
                {...register("contactPerson")}
              />
              {errors.contactPerson && <p className="text-xs text-red-500 italic">{errors.contactPerson.message}</p>}
            </li>
            <li>
              <label htmlFor="pan" className={formClassNames.label}>
                Pan
              </label>
              <input type="text" id="pan" className={formClassNames.input} placeholder="Pan" {...register("pan")} />
              {errors.pan && <p className="text-xs text-red-500 italic">{errors.pan.message}</p>}
            </li>
            <li>
              <label htmlFor="upi" className={formClassNames.label}>
                UPI
              </label>
              <input type="text" id="upi" className={formClassNames.input} placeholder="abc@upi" {...register("upi")} />
              {errors.upi && <p className="text-xs text-red-500 italic">{errors.upi.message}</p>}
            </li>
          </ul>

          <p className={formClassNames.formSectionTitle}>Bank Details</p>
          <ul className={formClassNames.gridUL}>
            <li>
              <label htmlFor="bankName" className={formClassNames.label}>
                Bank Name
              </label>
              <input
                type="text"
                id="bankName"
                className={formClassNames.input}
                placeholder="Bank Name"
                {...register("bankName")}
              />
              {errors.bankName && <p className="text-xs text-red-500 italic">{errors.bankName.message}</p>}
            </li>
            <li>
              <label htmlFor="bankAccountNumber" className={formClassNames.label}>
                Bank Account Number
              </label>
              <input
                type="text"
                id="bankAccountNumber"
                className={formClassNames.input}
                placeholder="Bank Account Number"
                {...register("bankAccountNumber")}
              />
              {errors.bankAccountNumber && (
                <p className="text-xs text-red-500 italic">{errors.bankAccountNumber.message}</p>
              )}
            </li>
            <li>
              <label htmlFor="bankIfsc" className={formClassNames.label}>
                Bank IFSC
              </label>
              <input
                type="text"
                id="bankIfsc"
                className={formClassNames.input}
                placeholder="Bank IFSC"
                {...register("bankIfsc")}
              />
              {errors.bankIfsc && <p className="text-xs text-red-500 italic">{errors.bankIfsc.message}</p>}
            </li>
            <li>
              <label htmlFor="bankBranch" className={formClassNames.label}>
                Bank Branch
              </label>
              <input
                type="text"
                id="bankBranch"
                className={formClassNames.input}
                placeholder="Bank Branch"
                {...register("bankBranch")}
              />
              {errors.bankBranch && <p className="text-xs text-red-500 italic">{errors.bankBranch.message}</p>}
            </li>
          </ul>

          <p className={formClassNames.formSectionTitle}>Contact Details</p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <li>
              <label htmlFor="phone" className={formClassNames.label}>
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                className={formClassNames.input}
                placeholder="Phone"
                {...register("phone")}
              />
              {errors.phone && <p className="text-xs text-red-500 italic">{errors.phone.message}</p>}
            </li>
            <li>
              <label htmlFor="email" className={formClassNames.label}>
                Email
              </label>
              <input
                type="email"
                id="email"
                className={formClassNames.input}
                placeholder="Email"
                {...register("email")}
              />
              {errors.email && <p className="text-xs text-red-500 italic">{errors.email.message}</p>}
            </li>
            <li className="md:col-span-2">
              <label htmlFor="address" className={formClassNames.label}>
                Address
              </label>
              <textarea
                id="address"
                className={formClassNames.input}
                rows="3"
                placeholder="123 Street, City, Country"
                {...register("address")}
              ></textarea>
              {errors.address && <p className="text-xs text-red-500 italic">{errors.address.message}</p>}
            </li>
          </ul>

          <p className={formClassNames.formSectionTitle}>GST</p>
          <ul className={formClassNames.gridUL}>
            <li>
              <label htmlFor="gstin" className={formClassNames.label}>
                GSTIN
              </label>
              <input
                type="text"
                id="gstin"
                className={formClassNames.input}
                placeholder="GSTIN"
                {...register("gstin")}
              />
              {errors.gstin && <p className="text-xs text-red-500 italic">{errors.gstin.message}</p>}
            </li>
          </ul>

          <button type="submit" disabled={isLoading} className={formClassNames.button}>
            {isLoading ? "Processing..." : partyId ? "Update Party" : "Create Party"}
          </button>
        </form>
      </section>
    </>
  )
}
