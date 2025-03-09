"use client";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { useForm } from "react-hook-form";

// function ListItem(props) {
//     // const handleCurrentTab=(tab)=>{
//     //     if (tab===currentTab) {
//     //         setCurrentTab(0)
//     //         return
//     //     }
//     //     return setCurrentTab(tab)
//     // }
//     const {currentTab,handleCurrentTab,children,title} = props

//     return (
//         <li className={`grid ${currentTab === 1 ? "grid-rows-[auto,1fr]" : "grid-rows-[auto,0fr]"} transition-[grid-template-rows] duration-300`} >
//             <div
//                 className="cursor-pointer border-2  p-2 flex justify-between items-center text-sm"
//                 onClick={() => handleCurrentTab(1)}
//             >
//                 <span>{title}</span>
//                 {/* <span className="grid place-content-center text-xl"> */}
//                     <Icon

//                         icon={currentTab === 1 ? "fa-solid:sort-down" : "icon-park-solid:left-one"}
//                     />
//                 {/* </span> */}
//             </div>
//             <div className="overflow-hidden">{children}</div>
//         </li>
//     );
// }
export default function Page() {
    const {
        handleSubmit,
        register,
        watch,
        formState: { errors },
    } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(null);
    const [error, setError] = useState(null);
    const formClassNames = {
        label: "block mb-2 text-sm font-medium text-gray-950/90 dark:text-white",
        input: "bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
        button: "w-full text-center mt-4 focus:outline-none text-white bg-blue-400 hover:bg-blue-500 focus:ring-blue-300 font-medium rounded-lg text-sm px-10 py-4 ",
        gridUL: "grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4",
        formSectionTitle:
            "text-lg mt-4 font-semibold text-gray-600 dark:text-gray-300",
    };
    return (
        <section className="p-4 max-w-6xl mx-auto">
            <form onSubmit={handleSubmit()}>
                <ul className="grid grid-cols-12 gap-4">
                    <li className="md:col-span-6 col-span-12">
                        <label
                            htmlFor="itemName"
                            className={formClassNames.label}
                        >
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
                        {errors.itemName && (
                            <p className=" text-xs text-red-500 italic">
                                {errors.itemName.message}
                            </p>
                        )}
                    </li>
                    <li className="md:col-span-6 col-span-12">
                        <label
                            htmlFor="hsnCode"
                            className={formClassNames.label}
                        >
                            HSN Code
                        </label>
                        <input
                            type="text"
                            id="hsnCode"
                            className={formClassNames.input}
                            placeholder="HSN Code"
                            {...register("hsnCode", {
                                required: "HSN is required",
                            })}
                        />
                    </li>
                    {errors.hsnCode && (
                        <p className=" text-xs text-red-500 italic">
                            {errors.hsnCode.message}
                        </p>
                    )}

                    <li className="col-span-12 p-2 flex items-center space-x-3 bg-blue-50 dark:bg-blue-950">
                        <label htmlFor="taxExempted"> Tax Exempted</label>
                        <label
                            htmlFor="taxExempted"
                            className="relative inline-flex cursor-pointer items-center"
                        >
                            <input
                                type="checkbox"
                                id="taxExempted"
                                className="peer sr-only"
                                {...register("taxExempted", {
                                    required: "Tax Exempted is required",
                                })}
                            />
                            <div
                                className={` ${watch("taxExempted") ? "bg-blue-400" : "bg-gray-400"} h-6 w-11 rounded-full after:absolute after:top-0.5 after:left-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow after:transition-all after:content-[''] hover:bg-gray-200 peer-checked:bg-primary-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-4 peer-focus:ring-primary-200 peer-disabled:cursor-not-allowed peer-disabled:bg-gray-100 peer-disabled:after:bg-gray-50`}
                            ></div>
                            {errors.taxExempted && (
                                <p className=" text-xs text-red-500 italic">
                                    {errors.taxExempted.message}
                                </p>
                            )}
                        </label>
                    </li>
                    <li className="md:col-span-6 col-span-12 relative">
                        <label htmlFor="price" className={formClassNames.label}>
                            Price
                        </label>
                        <div className="relative">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-2.5 text-gray-500">
                                ₹
                            </div>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-gray-500">
                                Price
                            </div>
                            <input
                                type="number"
                                id="price"
                                className=" px-8 bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="0.00"
                                {...register("price", {
                                    required: "Selling Price is required",
                                })}
                            />
                            {errors.price && (
                                <p className=" text-xs text-red-500 italic">
                                    {errors.price.message}
                                </p>
                            )}
                        </div>
                    </li>
                    <li className="md:col-span-6 col-span-12 relative">
                        <label
                            htmlFor="purchasePrice"
                            className={formClassNames.label}
                        >
                            Purchase Price
                        </label>
                        <div className="relative">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-2.5 text-gray-500">
                                ₹
                            </div>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-gray-500">
                                Purchase Price
                            </div>
                            <input
                                type="number"
                                id="purchasePrice"
                                className=" px-8 bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="0.00"
                                {...register("purchasePrice", {
                                    required: "Purchase Price is required",
                                })}
                            />
                            {errors.purchasePrice && (
                                <p className=" text-xs text-red-500 italic">
                                    {errors.purchasePrice.message}
                                </p>
                            )}
                        </div>
                    </li>

                    {/* <li className="md:col-span-6 col-span-12">
                    <label
                        htmlFor="GST%"
                        className={formClassNames.label}>
                        GST %
                    </label>
                    <select
                        id="GST%"
                        className={`${watch("taxExempted")?"cursor-not-allowed ":" "} bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                        {...register("gst_percentage")}
                        disabled={watch("taxExempted")}
                        >
                        <option value="0">GST @ 0%</option>
                        <option value="0.1">GST @ 0.1%</option>
                        <option value="0.25">GST @ 0.25%</option>
                        <option value="3">GST @ 3%</option>
                        <option value="5">GST @ 5%</option>
                        <option value="6">GST @ 6%</option>
                        <option value="7.5">GST @ 7.5%</option>
                        <option value="12">GST @ 12%</option>
                        <option value="18">GST @ 18%</option>
                        <option value="28">GST @ 28%</option>
                    </select>
                </li> */}
                    <li className="md:col-span-6 col-span-12">
                        <label htmlFor="cgst" className={formClassNames.label}>
                            CGST
                        </label>
                        <input
                            type="number"
                            id="cgst"
                            className={formClassNames.input}
                            placeholder="0.00"
                            {...register("cgst", {
                                required: "CGST is required",
                            })}
                        />
                        {errors.cgst && (
                            <p className=" text-xs text-red-500 italic">
                                {errors.cgst.message}
                            </p>
                        )}
                    </li>
                    <li className="md:col-span-6 col-span-12">
                        <label htmlFor="sgst" className={formClassNames.label}>
                            SGST
                        </label>
                        <input
                            type="number"
                            id="sgst"
                            className={formClassNames.input}
                            placeholder="0.00"
                            {...register("sgst", {
                                required: "SGST is required",
                            })}
                        />
                        {errors.sgst && (
                            <p className=" text-xs text-red-500 italic">
                                {errors.sgst.message}
                            </p>
                        )}
                    </li>
                    <li className="md:col-span-6 col-span-12">
                        <label htmlFor="igst" className={formClassNames.label}>
                            IGST
                        </label>
                        <input
                            type="number"
                            id="igst"
                            className={formClassNames.input}
                            placeholder="0.00"
                            {...register("igst", {
                                required: "IGST is required",
                            })}
                        />
                        {errors.igst && (
                            <p className=" text-xs text-red-500 italic">
                                {errors.igst.message}
                            </p>
                        )}
                    </li>
                    <li className="md:col-span-6 col-span-12">
                        <label htmlFor="utgst" className={formClassNames.label}>
                            UTGST
                        </label>
                        <input
                            type="number"
                            id="utgst"
                            className={formClassNames.input}
                            placeholder="0.00"
                            {...register("utgst", {
                                required: "UTGST is required",
                            })}
                        />
                        {errors.utgst && (
                            <p className=" text-xs text-red-500 italic">
                                {errors.utgst.message}
                            </p>
                        )}
                    </li>

                    <li className="md:col-span-6 col-span-12">
                        <label
                            htmlFor="openingStock"
                            className={formClassNames.label}
                        >
                            Opening Stock
                        </label>
                        <input
                            type="number"
                            id="openingStock"
                            className={formClassNames.input}
                            placeholder="0.00"
                            {...register("openingStock", {
                                required: "Opening Stock is required",
                            })}
                        />
                        {errors.openingStock && (
                            <p className=" text-xs text-red-500 italic">
                                {errors.openingStock.message}
                            </p>
                        )}
                    </li>
                    <li className="md:col-span-6 col-span-12">
                        <label
                            htmlFor="closingStock"
                            className={formClassNames.label}
                        >
                            Closing Stock
                        </label>
                        <input
                            type="number"
                            id="closingStock"
                            className={formClassNames.input}
                            placeholder="0.00"
                            {...register("closingStock", {
                                required: "Closing Stock is required",
                            })}
                        />
                        {errors.closingStock && (
                            <p className=" text-xs text-red-500 italic">
                                {errors.closingStock.message}
                            </p>
                        )}
                    </li>
                    <li className="md:col-span-6 col-span-12">
                        <label htmlFor="unit" className={formClassNames.label}>
                            Unit
                        </label>
                        <select
                            id="unit"
                            className={formClassNames.input}
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
                        {errors.unit && (
                            <p className=" text-xs text-red-500 italic">
                                {errors.unit.message}
                            </p>
                        )}
                    </li>

                    <li className="col-span-12">
                        <label
                            htmlFor="Description"
                            className={formClassNames.label}
                        >
                            Description
                        </label>
                        <textarea
                            id="Description"
                            className={formClassNames.input}
                            rows="3"
                            placeholder="Description"
                            {...register("description", {
                                required: "Description is required",
                            })}
                        ></textarea>
                        {errors.description && (
                            <p className=" text-xs text-red-500 italic">
                                {errors.description.message}
                            </p>
                        )}
                    </li>

                    <li className="md:col-span-6 col-span-12">
                        <div className="flex justify-between md:justify-start items-center">
                            <button
                                type="submit"
                                className="focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900"
                            >
                                Submit
                            </button>
                        </div>
                    </li>
                </ul>
            </form>
        </section>
    );
}
