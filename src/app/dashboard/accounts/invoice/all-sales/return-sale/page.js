"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { Icon } from "@iconify/react";

export const indianStates = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat",
    "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra",
    "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim",
    "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

export default function ReturnSales() {
    const { handleSubmit, register, watch } = useForm();
    const [items, setItems] = useState([]);

    const onCreateSales = (data) => {
        console.log("Form submitted:", { ...data, items });
    };

    const handleAddItem = () => {
        setItems((prev) => [
            ...prev,
            { id: Date.now(), name: "", price: 0, qty: 0, discount: 0, gst: 0, total: 0 },
        ]);
    };

    const handleDelete = (id) => setItems((prev) => prev.filter((i) => i.id !== id));

    return (
        <>
            <section className="p-4 max-w-6xl mx-auto">
                <form onSubmit={handleSubmit(onCreateSales)} className="space-y-6">
                    {/* Invoice + Date */}
                    <div className="grid grid-cols-12 gap-4">
                        <Input label="Original Invoice Number" name="original_invoice_number" register={register} />
                        <Input label="Sales Date" name="sales_date" register={register} type="date" />
                    </div>

                    {/* Credit Toggle */}
                    <div className="flex items-center gap-3 bg-blue-50 dark:bg-blue-950 p-2 rounded">
                        <span>Credit</span>
                        <label className="relative inline-flex cursor-pointer items-center">
                            <input type="checkbox" {...register("credit")} className="peer sr-only" />
                            <div className="h-6 w-11 rounded-full bg-gray-400 peer-checked:bg-blue-500 after:absolute after:top-0.5 after:left-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:after:translate-x-full" />
                        </label>
                    </div>

                    {/* Mode of Payment */}
                    {!watch("credit") && (
                        <Select
                            label="Mode of Payment"
                            name="mode_of_payment"
                            register={register}
                            options={["cash", "bank"]}
                        />
                    )}

                    {/* State + Supplier */}
                    <div className="grid grid-cols-12 gap-4">
                        <Select label="State" name="state" register={register} options={indianStates} />
                        <Input label="Supplier" name="supplier" register={register} />
                    </div>

                    {/* Items Table */}
                    <div className="overflow-x-auto">
                        {items.length === 0 ? (
                            <p className="text-sm text-gray-500">No items added</p>
                        ) : (
                            <div className="mt-4 min-w-[40rem]">
                                <div className="grid grid-cols-7 font-medium text-sm text-gray-700 dark:text-gray-300">
                                    <span>Item</span><span>Price/Unit</span><span>Qty</span>
                                    <span>Discount %</span><span>GST %</span><span>Total</span><span />
                                </div>
                                {items.map((item) => (
                                    <ItemRow key={item.id} item={item} onDelete={() => handleDelete(item.id)} register={register} />
                                ))}
                            </div>
                        )}
                        <button type="button" onClick={handleAddItem}
                            className="mt-4 flex items-center text-blue-500 border border-blue-500 rounded-lg px-6 py-2 hover:bg-blue-50">
                            <Icon icon="mdi:plus" className="mr-1" /> Add Item
                        </button>
                    </div>

                    {/* Description + Submit */}
                    <div>
                        <label htmlFor="description" className="block mb-1 text-sm font-medium">Description</label>
                        <textarea id="description" rows="3"
                            {...register("description")}
                            className="w-full rounded-lg border p-2.5 text-sm dark:bg-neutral-700 dark:text-white"
                            placeholder="Description"
                        />
                    </div>

                    <button
                        className="w-full py-3 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600">
                        Create
                    </button>
                </form>
            </section>
        </>
    );
}

/* --- Reusable Components --- */
function Input({ label, name, register, type = "text" }) {
    return (
        <div className="col-span-12 md:col-span-6">
            <label htmlFor={name} className="block mb-1 text-sm font-medium">{label}</label>
            <input
                type={type} id={name} {...register(name)}
                className="w-full rounded-lg border p-2.5 text-sm dark:bg-neutral-700 dark:text-white"
                placeholder={label}
            />
        </div>
    );
}

function Select({ label, name, register, options }) {
    return (
        <div className="col-span-12 md:col-span-6">
            <label htmlFor={name} className="block mb-1 text-sm font-medium">{label}</label>
            <select id={name} {...register(name)}
                className="w-full rounded-lg border p-2.5 text-sm dark:bg-neutral-700 dark:text-white">
                {options.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
            </select>
        </div>
    );
}

function ItemRow({ item, register, onDelete }) {
    return (
        <div className="grid grid-cols-7 gap-2 items-center mt-2 text-sm">
            <input {...register(`item_${item.id}_name`)} placeholder="Item name"
                className="rounded border p-1" />
            <span className="text-center">{item.price}</span>
            <span className="text-center">{item.qty}</span>
            <span className="text-center">%{item.discount}</span>
            <span className="text-center">{item.gst || "-"}</span>
            <span className="text-center">{item.total}</span>
            <button type="button" onClick={onDelete}
                className="text-red-500 hover:text-red-700">
                <Icon icon="material-symbols:delete-outline" />
            </button>
        </div>
    );
}
