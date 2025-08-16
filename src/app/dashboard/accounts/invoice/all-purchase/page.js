"use client";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useState, useMemo } from "react";

// Static purchase data
const purchaseData = {
    titles: ["Item Name", "HSN Code", "Price", "GST %", "Opening Stock", "Unit"],
    body: [], // dynamic purchase data goes here
};

// Reusable button classes
const buttonClasses =
    "capitalize flex items-center justify-center focus:outline-none font-medium rounded-lg text-sm px-5 py-2 transition-colors duration-150";

export default function AllPurchase() {
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState("Last week");
    const linkToCreatePurchase = "/dashboard/accounts/invoice/all-purchase/create-purchase";

    // Memoize filtered purchases for performance
    const filteredPurchases = useMemo(() => {
        if (!searchTerm) return purchaseData.body;
        const term = searchTerm.toLowerCase();
        return purchaseData.body.filter((item) => item.item_name.toLowerCase().includes(term));
    }, [searchTerm]);

    return (
        <section className="p-4 max-w-7xl mx-auto">
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2 justify-end mb-6">
                <Link href="/dashboard/accounts/invoice/all-purchase/return-purchase">
                    <button className={`${buttonClasses} bg-orange-400 text-white hover:bg-orange-500`}>
                        Return Purchase
                    </button>
                </Link>
                <Link href={linkToCreatePurchase}>
                    <button className={`${buttonClasses} bg-blue-600 text-white hover:bg-blue-500`}>
                        Create Purchase
                    </button>
                </Link>
            </div>

            {/* Search & Filter */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-6">
                <div className="relative flex-1">
                    <input
                        type="search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search by item name..."
                        className="w-full py-2 px-4 pr-10 text-sm border rounded-lg bg-neutral-50 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:bg-neutral-700 dark:border-neutral-600 dark:text-white dark:placeholder-neutral-400"
                    />
                    <Icon
                        icon="zondicons:search"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400"
                    />
                </div>
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="w-40 p-2 rounded-lg border dark:border-none dark:bg-neutral-600 text-sm focus:ring-1 focus:ring-blue-400"
                >
                    <option>Last week</option>
                    <option>Last month</option>
                    <option>Yesterday</option>
                    <option>Last 7 days</option>
                    <option>Last 30 days</option>
                </select>
            </div>

            {/* Table */}
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg max-h-[500px]">
                <table className="w-full text-sm text-left text-neutral-500 dark:text-neutral-400">
                    <thead className="sticky top-0 bg-neutral-50 dark:bg-neutral-700 dark:text-neutral-400 shadow-md uppercase">
                        <tr className="border-b-2 dark:border-neutral-900">
                            {purchaseData.titles.map((title, i) => (
                                <th key={i} className="px-6 py-3 font-bold text-gray-900 whitespace-nowrap">
                                    {title}
                                </th>
                            ))}
                            <th className="px-6 py-3 font-bold text-gray-900">Action</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                        {filteredPurchases.length > 0 ? (
                            filteredPurchases.map((item, i) => (
                                <tr
                                    key={i}
                                    className="odd:bg-white odd:dark:bg-neutral-900 even:bg-neutral-50 even:dark:bg-neutral-800 hover:bg-blue-50 dark:hover:bg-neutral-800 transition-colors"
                                >
                                    <td className="px-6 py-4 font-semibold text-gray-900">{item.item_name}</td>
                                    <td className="px-6 py-4">{item.HSN_code}</td>
                                    <td className="px-6 py-4">{item.Price}</td>
                                    <td className="px-6 py-4">{item.gst_percentage}</td>
                                    <td className="px-6 py-4">{item.opening_stock}</td>
                                    <td className="px-6 py-4">{item.unit}</td>
                                    <td className="px-6 py-4 flex gap-3">
                                        <Icon icon="bxs:edit" className="cursor-pointer hover:text-blue-700 text-xl" />
                                        <Icon
                                            icon="material-symbols:delete"
                                            className="cursor-pointer hover:text-red-700 text-xl"
                                        />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={7} className="py-16 text-center opacity-50">
                                    <Icon className="w-36 h-24 mx-auto mb-2" icon="ph:files-light" />
                                    <p className="mb-4">No Record Found</p>

                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    );
}
