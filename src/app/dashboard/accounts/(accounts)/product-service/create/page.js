"use client"
import { Icon } from "@iconify/react";
import { useForm } from "react-hook-form";

export default function Page() {
    const {register,watch} = useForm({
        defaultValues:{
        }
    })

    return (
        <main className="bg-neutral-50 py-4 min-h-screen">
            <div className=" max-w-7xl w-[calc(100%-2rem)] mx-auto ">
                <form className=" space-y-4">
                    
                    <ul className=" 
                         text-xs bg-white rounded-md p-4 shadow-md grid gap-4 sm:grid-cols-[repeat(auto-fill,minmax(280px,1fr))]
                         [&>li]:p-2 [&>li]:rounded-md [&>li]:shadow-md [&>li]:grid [&>li]:grid-cols-2 
                    ">
                        <li>
                            <label htmlFor="product_service_Name" className="label">Product/Services name</label>
                            <input 
                                type="text"
                                className="input"
                                id="product_service_Name"
                                {...register("product_service_Name")}
                                placeholder="Product/Services name"
                                />
                        </li>
                        <li>
                            <label htmlFor="product_service_Code" className="label">Product/Services code</label>
                            <input 
                                type="text"
                                className="input"
                                id="product_service_Code"
                                {...register("product_service_Code")}
                                placeholder="Product/Services code"
                                />
                        </li>
                        <li>
                            <label htmlFor="measurementUnit" className="label">Measurement Unit</label>
                            <input 
                                type="text"
                                className="input"
                                id="measurementUnit"
                                {...register("measurementUnit")}
                                placeholder="e.g. Kg, Ltr, Pcs"
                            />
                        </li>
                        <li>
                            <label htmlFor="saleRate" className="label">Sale Rate</label>
                            <input 
                                type="text"
                                className="input"
                                id="saleRate"
                                {...register("saleRate")}
                                placeholder="Sale Rate"
                            />
                        </li>
                        <li>
                            <label htmlFor="purchaseRate" className="label">Purchase Rate</label>
                            <input 
                                type="text"
                                className="input"
                                id="purchaseRate"
                                {...register("purchaseRate")}
                                placeholder="Purchase Rate"
                            />
                        </li>
                        <li>
                            <label htmlFor="Description" className="label">Description</label>
                            <input 
                                type="text"
                                className="input"
                                id="Description"
                                {...register("Description")}
                                placeholder="Description"
                            />
                        </li>
                    </ul>
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
