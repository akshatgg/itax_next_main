"use client"
import { Icon } from "@iconify/react";
import { useState } from "react"
import { useForm } from "react-hook-form";

export default function Page() {
    const {register,watch} = useForm({
        defaultValues:{
            saleOrderDate: new Date().toISOString().split('T')[0]
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
                            <label htmlFor="saleOrderDate" className="label">
                                SALEORD-1
                            </label>
                            <input
                                id="saleOrderDate"
                                className=" shadow-md block w-full rounded-md pl-16 pr-20 py-2 outline outline-1 outline-neutral-500/60 focus:outline-2 focus:outline-blue-500"
                                type="date"
                                {...register("saleOrderDate")}
                            />
                        </li>
                    </ul>
                    {/* <ul className="
                         text-xs bg-white rounded-md p-4 shadow-md grid gap-2 sm:grid-cols-[repeat(auto-fill,minmax(280px,1fr))]
                         [&>li]:p-2 [&>li]:rounded-md [&>li]:shadow-md [&>li]:grid [&>li]:grid-cols-2 
                         "
                    >
                        <li>
                            <label htmlFor="invoiceDate" className="label">Invoice</label>
                            <input
                                id="invoiceDate"
                                className="input"
                                type="date"
                                {...register("invoiceDate")}
                            />
                        </li>
                        <li>
                            <label htmlFor="dueDate" className="label">Due Date</label>
                            <select
                                id="dueDate"
                                className="select"
                                {...register("dueDate")}
                            >
                                <option value="no-due-date">No Due Date</option>
                                <option value="immediately">Immediately</option>
                                <option value="customer-date">Customer Date</option>
                            </select>
                        </li>
                        {watch("dueDate")==="customer-date"&&
                        <li>
                            <label htmlFor="custom-dueDate" className="label">Custom Due Date</label>
                            <input
                                id="custom-dueDate"
                                className="input"
                                type="date"
                                />
                        </li>
                        }
                    </ul> */}
                    {/* <ul className="
                         text-xs bg-white rounded-md p-4 shadow-md grid gap-2 sm:grid-cols-[repeat(auto-fill,minmax(280px,1fr))]
                         [&>li]:p-2 [&>li]:rounded-md [&>li]:shadow-md [&>li]:grid [&>li]:grid-cols-2 
                         "
                    >
                        <li className=" flex items-center">
                            <input
                                id="doNotProvideLineItem"
                                className="w-4 h-4"
                                type="checkbox"
                                {...register("doNotProvideLineItem")}
                            />
                            <label htmlFor="doNotProvideLineItem" className="label">Do Not Provide Line Item</label>
                        </li>
                        <li>
                            <label htmlFor="recordPurchaseIn" className="label">Record Purchase In</label>
                            <select
                                id="recordPurchaseIn"
                                className="select"
                                {...register("recordPurchaseIn")}
                            >
                                <option value="no-due-date">Purchase Account</option>
                            </select>
                        </li>
                        <li>
                            <label htmlFor="poNumber" className="label">
                                PO Number
                            </label>
                            <input
                                id="poNumber"
                                className="input"
                                type="text"
                                {...register("poNumber")}
                            />
                        </li>
                        <li>
                            <label htmlFor="poDate" className="label">PO Date</label>
                            <input
                                id="poDate"
                                className="input"
                                type="date"
                                {...register("poDate")}
                            />
                        </li>
                        
                    </ul> */}
                    <ul className="
                        text-xs bg-white rounded-md p-4 shadow-md grid gap-3 sm:grid-cols-[repeat(auto-fill,minmax(280px,1fr))]
                        [&>li]:p-2 [&>li]:rounded-md [&>li]:shadow-md [&>li]:grid [&>li]:grid-cols-2 
                        "
                    >
                        <li>
                            <label htmlFor="supplierName" className="label">
                                Supplier Name
                            </label>
                            <input
                                id="supplierName"
                                className="input"
                                type="text"
                                {...register("supplierName")}
                            />
                        </li>
                        <li>
                            <label htmlFor="lineItems" className="label">Line Items</label>
                            <select
                                id="lineItems"
                                className="select"
                                {...register("lineItems")}
                            >
                                <option value="">&#8377; 0.00</option>
                            </select>
                        </li>
                        <li>
                            <label htmlFor="discountAndTax" className="label">Discount And Tax</label>
                            <select
                                id="discountAndTax"
                                className="select"
                                {...register("discountAndTax")}
                            >
                                <option value="">&#8377; 0.00</option>
                            </select>
                        </li>
                        <li>
                            <label htmlFor="otherCharges" className="label">Other Charges</label>
                            <select
                                id="otherCharges"
                                className="select"
                                {...register("otherCharges")}
                            >
                                <option value="">&#8377; 0.00</option>
                            </select>
                        </li>
                    </ul>
                    <ul className=" text-xs bg-white rounded-md p-4 shadow-md grid gap-2 grid-cols-[repeat(auto-fill,minmax(30rem,1fr))] ">
                        <li className="flex justify-between">
                            <div>
                                <button className=" btn-secondary flex gap-2 items-center text-lg">Amount Round Off <Icon icon="mdi:arrow-right"/></button>
                            </div>
                            <div className="grid grid-cols-2 gap-2 justify-between  ">
                                <div className="grid grid-cols-2 border border-blue-500 rounded-md">
                                    <button type="button" className="rounded-l py-2 px-4 bg-blue-100 text-blue-500 hover:bg-blue-300  flex gap-2 items-center text-lg">
                                        <Icon icon="material-symbols:add"/>
                                    </button>
                                    <button type="button" className="rounded-r py-2 px-4 bg-white text-blue-500 hover:bg-blue-300  flex gap-2 items-center text-lg">
                                        <Icon icon="material-symbols:add"/>
                                    </button>
                                </div>
                                <div className="text-lg grid place-content-center">
                                    &#8377; 0.00
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div className=" text-xs bg-blue-500 text-white rounded-md p-4 shadow-md flex justify-between ">
                        <div className="text-lg grid place-content-center">
                            Total
                        </div>
                        <div className="text-lg grid place-content-center">
                            &#8377; 0.00
                        </div>
                    </div>
                    <ul className="
                         text-xs bg-white rounded-md p-4 shadow-md grid gap-2 sm:grid-cols-[repeat(auto-fill,minmax(280px,1fr))]
                         [&>li]:p-2 [&>li]:rounded-md [&>li]:shadow-md [&>li]:grid [&>li]:grid-cols-2 
                         "
                    >
                        <li>
                            <label htmlFor="customField" className="label">Custom Field</label>
                            <select
                                id="customField"
                                className="select"
                                {...register("customField")}
                            >
                                <option value="">--</option>
                            </select>
                        </li>
                        <li>
                            <label htmlFor="termsAndCondition" className="label">Terms & Condition</label>
                            <select
                                id="termsAndCondition"
                                className="select"
                                {...register("termsAndCondition")}
                            >
                                <option value="">--</option>
                            </select>
                        </li>
                        <li>
                            <label htmlFor="header_footer_signature" className="label">Header/Footer,Signature</label>
                            <select
                                id="header_footer_signature"
                                className="select"
                                {...register("header_footer_signature")}
                            >
                                <option value="">--</option>
                            </select>
                        </li>
                        <li>
                            <label htmlFor="image" className="label">Image</label>
                            <button type="button" className="rounded-r py-2 px-4 bg-white text-blue-500 hover:bg-blue-300  flex gap-2 items-center justify-center rounded-md">
                                <Icon icon="material-symbols:add"/> add Image
                            </button>
                        </li>
                        <li>
                            <label htmlFor="noteForSale_notShownOnPDF" className="label">Note For Sale (Not Shown On PDF)</label>
                            <select
                                id="noteForSale_notShownOnPDF"
                                className="select"
                                {...register("noteForSale_notShownOnPDF")}
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
