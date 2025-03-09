"use client"
import { Icon } from "@iconify/react";
import { useForm } from "react-hook-form";

export default function Page() {
    const {register,watch} = useForm({
        defaultValues:{
            journalDate: new Date().toISOString().split('T')[0]
        }
    })

    return (
        <main className="bg-neutral-50 py-4 min-h-screen">
            <div className=" max-w-7xl w-[calc(100%-2rem)] mx-auto ">
                <form className=" space-y-4">
                    <ul className="
                        shadow-inner shadow-neutral-500/50 rounded-md p-2 bg-gray-200 flex justify-between
                    ">
                        <li className="label font-semibold">
                            Journal - 1
                        </li>
                        <li className="label font-semibold">
                            {new Date().toISOString().split('T')[0]}
                        </li>
                    </ul>
                    <ul className=" 
                        text-xs bg-white rounded-md p-4 shadow-md grid gap-2 sm:grid-cols-[repeat(auto-fill,minmax(280px,1fr))]
                         [&>li]:grid [&>li]:grid-cols-2 
                    ">
                        <li>
                            <div className=" grid grid-cols-2 border border-blue-500 rounded-md">
                                <button type="button" className="rounded-l py-2 px-4 bg-blue-100 text-blue-500 hover:bg-blue-300  flex gap-2 items-center text-lg">
                                    <Icon icon="material-symbols:add"/>
                                </button>
                                <button type="button" className="rounded-r py-2 px-4 bg-white text-blue-500 hover:bg-blue-300  flex gap-2 items-center text-lg">
                                    <Icon icon="material-symbols:add"/>
                                </button>
                            </div>
                        </li>
                        <li>
                            <label htmlFor="recordPurchaseIn" className="label">Select Account</label>
                            <select
                                id="recordPurchaseIn"
                                className="select"
                                {...register("recordPurchaseIn")}
                            >
                                <option value="">--</option>
                            </select>
                        </li>
                    </ul>
                    
                    <ul className="
                         text-xs bg-white rounded-md p-4 shadow-md grid gap-2 sm:grid-cols-[repeat(auto-fill,minmax(280px,1fr))]
                         [&>li]:p-2 [&>li]:rounded-md [&>li]:shadow-md [&>li]:grid [&>li]:grid-cols-2 
                         "
                    >
                        <li>
                            <label htmlFor="enterNarration" className="label">
                                Enter Narration
                            </label>
                            <input
                                id="enterNarration"
                                className="input"
                                type="text"
                                placeholder="Enter Note"
                                {...register("enterNarration")}
                            />
                        </li>
                        <li>
                            <label htmlFor="image" className="label">Image</label>
                            <button type="button" className="rounded-r py-2 px-4 bg-white text-blue-500 hover:bg-blue-300  flex gap-2 items-center justify-center rounded-md">
                                <Icon icon="material-symbols:add"/> add Image
                            </button>
                        </li>
                    </ul>
                    <div className=" text-xs bg-blue-500 text-white rounded-md p-4 shadow-md flex justify-between ">
                        <div className="text-lg grid place-content-center">
                            Total Credit
                        </div>
                        <div className="text-lg grid place-content-center">
                            &#8377; 0.00
                        </div>
                    </div>
                    <div className=" text-xs bg-blue-500 text-white rounded-md p-4 shadow-md flex justify-between ">
                        <div className="text-lg grid place-content-center">
                            Total Debit
                        </div>
                        <div className="text-lg grid place-content-center">
                            &#8377; 0.00
                        </div>
                    </div>
                    <div className=" divide-y text-xs bg-white text-neutral-900 rounded-md shadow-md text-center ">
                        <div className=" p-2 text-lg">Save</div>
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
