"use client";

import { useForm, useWatch } from "react-hook-form";
import { useState, memo, useCallback } from "react";
import { Icon } from "@iconify/react";
import { indianStates } from "../return-sale/page";

const ItemRow = memo(({ item, register, onDelete }) => {
    return (
        <ul className="mt-2 grid grid-cols-7 gap-4 min-w-[40rem] items-center">
            <li>
                <input type="text" placeholder="Item Name" className="bg-neutral-50 border p-2 rounded w-full" {...register(`item_${item.id}_name`)} />
            </li>
            <li className="border grid place-items-center">{item.price}</li>
            <li className="border grid place-items-center">{item.quantity}</li>
            <li className="border grid place-items-center">{item.discount}</li>
            <li className="border grid place-items-center">{item.gst}</li>
            <li className="border grid place-items-center">{item.total}</li>
            <li>
                <button type="button" onClick={() => onDelete(item.id)} className="flex items-center justify-center text-red-500 border border-red-500 rounded-lg p-2">
                    <Icon icon="material-symbols:delete-outline" />
                </button>
            </li>
        </ul>
    );
});

export default function CreateSale() {
    const { handleSubmit, register, control } = useForm();
    const isCredit = useWatch({ control, name: "credit" });
    const [items, setItems] = useState([]);
    const [itemCounter, setItemCounter] = useState(0);

    const onCreateSale = (data) => {
        console.log("Form Data:", data, items);
    };

    const addItem = useCallback(() => {
        setItems(prev => [
            ...prev,
            { id: itemCounter, itemName: "", price: 0, quantity: 0, discount: 0, gst: 0, total: 0 }
        ]);
        setItemCounter(prev => prev + 1);
    }, [itemCounter]);

    const deleteItem = useCallback((id) => {
        setItems(prev => prev.filter(item => item.id !== id));
    }, []);

    const formClasses = {
        label: "block mb-2 text-sm font-medium text-gray-950/90 dark:text-white",
        input: "bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
        button: "w-full text-center mt-4 focus:outline-none text-white bg-blue-400 hover:bg-blue-500 focus:ring-blue-300 font-medium rounded-lg text-sm px-10 py-4",
        gridUL: "grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4",
        formSectionTitle: "text-lg mt-4 font-semibold text-gray-600 dark:text-gray-300",
    };

    return (
        <section className="p-4 max-w-6xl mx-auto">
            <form onSubmit={handleSubmit(onCreateSale)} className="space-y-6">
                {/* Party Details */}
                <p className={formClasses.formSectionTitle}>Party Details</p>
                <ul className={formClasses.gridUL}>
                    <li>
                        <label htmlFor="partyType" className={formClasses.label}>Party Type</label>
                        <select {...register("partyType")} id="partyType" defaultValue="supplier" className={formClasses.input}>
                            <option value="supplier">Supplier</option>
                            <option value="customer">Customer</option>
                        </select>
                    </li>
                </ul>

                {/* Sales Details */}
                <p className={formClasses.formSectionTitle}>Sales Details</p>
                <ul className={formClasses.gridUL}>
                    <li>
                        <label htmlFor="sales_date" className={formClasses.label}>Sales Date</label>
                        <input type="date" {...register("sales_date")} id="sales_date" className={formClasses.input} />
                    </li>
                </ul>

                {/* Credit Toggle */}
                <div className="my-4 flex items-center space-x-3 bg-blue-50 dark:bg-blue-950 p-2 rounded">
                    <label htmlFor="credit">Credit</label>
                    <label className="relative inline-flex cursor-pointer items-center">
                        <input type="checkbox" id="credit" className="sr-only peer" {...register("credit")} />
                        <div className={`h-6 w-11 rounded-full transition-all ${isCredit ? "bg-blue-400 after:translate-x-full" : "bg-gray-400"} relative after:absolute after:top-0.5 after:left-0.5 after:h-5 after:w-5 after:bg-white after:rounded-full after:shadow after:transition-transform`}></div>
                    </label>
                </div>

                {/* Payment & Supplier Info */}
                <ul className={formClasses.gridUL}>
                    {!isCredit && (
                        <li>
                            <label htmlFor="mode_of_payment" className={formClasses.label}>Mode of Payment</label>
                            <select {...register("mode_of_payment")} id="mode_of_payment" className={formClasses.input}>
                                <option value="cash">Cash</option>
                                <option value="bank">Bank</option>
                            </select>
                        </li>
                    )}
                    <li>
                        <label htmlFor="State" className={formClasses.label}>State</label>
                        <select {...register("State")} id="State" className={formClasses.input}>
                            {indianStates.map((state, idx) => <option key={idx} value={state}>{state}</option>)}
                        </select>
                    </li>
                    <li>
                        <label htmlFor="supplier" className={formClasses.label}>Supplier</label>
                        <input type="text" id="supplier" placeholder="Supplier" className={formClasses.input} {...register("supplier")} />
                    </li>
                </ul>

                {/* Items Section */}
                <p className={formClasses.formSectionTitle}>Items</p>
                <div className="overflow-auto">
                    {items.length === 0 ? <div>No Items added</div> : (
                        <>
                            <ul className="mt-4 grid grid-cols-7 gap-4 min-w-[40rem] font-semibold">
                                <li>Item</li><li>Price/Unit</li><li>Qty</li><li>Discount %</li><li>GST %</li><li>Total</li><li></li>
                            </ul>
                            {items.map(item => (
                                <ItemRow key={item.id} item={item} register={register} onDelete={deleteItem} />
                            ))}
                        </>
                    )}
                    <button type="button" onClick={addItem} className="mt-4 flex items-center text-blue-500 border border-blue-500 rounded-lg px-4 py-2">Add Items</button>
                </div>

                {/* Description */}
                <div>
                    <label htmlFor="description" className={formClasses.label}>Description</label>
                    <textarea id="description" rows={3} placeholder="Description" className={formClasses.input} {...register("description")}></textarea>
                </div>

                {/* Submit */}
                <button type="submit" className={formClasses.button}>Create</button>
            </form>
        </section>
    );
}
