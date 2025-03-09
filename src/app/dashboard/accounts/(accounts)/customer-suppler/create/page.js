"use client"
import { Icon } from "@iconify/react";
import { useState } from "react"
import { useForm } from "react-hook-form";

export default function Page() {
    const {register,watch} = useForm({
        defaultValues:{
            dateOfOpeningAccount: new Date().toISOString().split('T')[0]
        }
    })
    const [currentTab,setCurrentTab] = useState(0)

    return (
        <main className="bg-neutral-50 py-4 min-h-screen">
            <div className=" max-w-7xl w-[calc(100%-2rem)] mx-auto ">
                <form className=" space-y-4">
                    <ul className=" text-xs bg-white rounded-md p-4 shadow-md grid gap-2 grid-cols-[repeat(auto-fill,minmax(30rem,1fr))] 
                            [&>li]:p-2 [&>li]:rounded-md [&>li]:shadow-md [&>li]:grid [&>li]:grid-cols-2 [&>li]:items-center
                         "
                    >
                        <li>
                            <label htmlFor="type" className="label">
                                Type
                            </label>
                            <select
                                id="type"
                                className="select"
                                {...register("type")}
                            >
                                <option value="customer">Customer</option>
                                <option value="supplier">Supplier</option>
                            </select>
                        </li>
                    </ul>
                    <ul className="
                         text-xs bg-white rounded-md p-4 shadow-md grid gap-2 sm:grid-cols-[repeat(auto-fill,minmax(280px,1fr))]
                         [&>li]:p-2 [&>li]:rounded-md [&>li]:shadow-md [&>li]:grid [&>li]:grid-cols-2 
                         "
                    >
                        <li>
                            <label htmlFor="email" className="label">Email</label>
                            <input
                                id="email"
                                className="input"
                                type="email"
                                {...register("email")}
                            />
                        </li>
                        <li>
                            <label htmlFor="address" className="label">Address</label>
                            <input
                                id="address"
                                className="input"
                                type="text"
                                {...register("address")}
                            />
                        </li>
                        <li>
                            <label htmlFor="contactNumber" className="label">Contact Number</label>
                            <input
                                id="contactNumber"
                                className="input"
                                type="tell"
                                {...register("contactNumber")}
                            />
                        </li>
                        <li>
                            <label htmlFor="contactPerson" className="label">Contact Person</label>
                            <input
                                id="contactPerson"
                                className="input"
                                type="tell"
                                {...register("contactPerson")}
                            />
                        </li>
                    </ul>
                    <ul className="
                         text-xs bg-white rounded-md p-4 shadow-md grid gap-2 sm:grid-cols-[repeat(auto-fill,minmax(280px,1fr))]
                         [&>li]:p-2 [&>li]:rounded-md [&>li]:shadow-md [&>li]:grid [&>li]:grid-cols-2 
                         "
                    >
                        <li>
                            <label htmlFor="shippingAddress" className="label">Shipping Address</label>
                            <input
                                id="shippingAddress"
                                className="input"
                                type="text"
                                {...register("shippingAddress")}
                            />
                        </li>
                        <li>
                            <label htmlFor="taxId" className="label">Tax Id</label>
                            <input
                                id="taxId"
                                className="input"
                                type="text"
                                {...register("taxId")}
                            />
                        </li>
                        <li>
                            <label htmlFor="businessDetails" className="label">Business Details</label>
                            <input
                                id="businessDetails"
                                className="input"
                                type="text"
                                {...register("businessDetails")}
                            />
                        </li>
                        <li>
                            <label htmlFor="openingBalance" className="label">Opening Balance</label>
                            <input
                                id="openingBalance"
                                className="input"
                                type="text"
                                {...register("openingBalance")}
                            />
                        </li>
                        <li>
                            <label htmlFor="openingBalanceType" className="label">Opening Balance Type</label>
                            <select
                                id="openingBalanceType"
                                className="input"
                                {...register("openingBalanceType")}
                            >
                                <option value="dr">Dr</option>
                                <option value="cr">Cr</option>
                            </select>
                        </li>
                        <li>
                            <label htmlFor="dateOfOpeningAccount" className="label">Date Of Opening Account</label>
                            <input
                                id="dateOfOpeningAccount"
                                className="input"
                                type="date"
                                {...register("dateOfOpeningAccount")}
                            />
                        </li>
                        <li>
                            <label htmlFor="note" className="label">Enter Note</label>
                            <select
                                id="note"
                                className="select"
                                {...register("note")}
                            >
                                <option value="">--</option>
                            </select>
                        </li>
                    </ul>
                    
                    <div className=" divide-y text-xs bg-white text-neutral-900 rounded-md shadow-md text-center ">
                        <div className=" p-2 text-lg">Enter Payment Details</div>
                        <div className=" p-2 text-lg">Save as Credit</div>
                        <div className=" p-2 text-lg text-red-500">Cancel</div>
                    </div>
                </form>
            </div>
            <div className="grid justify-end p-2">
                <button className="btn-primary flex items-center gap-2">
                    <Icon className="text-2xl" icon="basil:add-solid"/>
                    Create
                </button>
            </div>
        </main>
    )
}
