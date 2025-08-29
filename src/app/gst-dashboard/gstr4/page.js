"use client";
import React, { useState } from "react";
const Gst4 = () => {
    const [filters, setFilters] = useState({ supplier: "", period: "2024-25" });

    // Sample GSTR-4 Data
    const outwardSupplies = [
        { id: 1, description: "Restaurant Sales", value: 250000, tax: 5000 },
        { id: 2, description: "Retail Sales", value: 150000, tax: 3000 },
    ];

    const inwardSupplies = [
        { id: 1, supplier: "ABC Traders", value: 80000, tax: 0 },
        { id: 2, supplier: "XYZ Wholesalers", value: 120000, tax: 0 },
    ];

    const reverseCharge = [
        { id: 1, description: "Legal Services", value: 20000, tax: 1000 },
    ];

    // Calculations
    const totalOutward = outwardSupplies.reduce((a, b) => a + b.value, 0);
    const outwardTax = outwardSupplies.reduce((a, b) => a + b.tax, 0);
    const totalInward = inwardSupplies.reduce((a, b) => a + b.value, 0);
    const reverseChargeTax = reverseCharge.reduce((a, b) => a + b.tax, 0);

    const netTaxPayable = outwardTax + reverseChargeTax;
    const lateFee = netTaxPayable > 0 ? 500 : 0;
    const totalPayable = netTaxPayable + lateFee;

    return (
        <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
            <h1 className="text-2xl font-bold text-gray-800">GSTR-4 (Composition Scheme Return)</h1>

            {/* Filters */}
            <div className="flex gap-4">
                <select
                    className="border p-2 rounded"
                    value={filters.period}
                    onChange={(e) => setFilters({ ...filters, period: e.target.value })}
                >
                    <option>2024-25</option>
                    <option>2023-24</option>
                    <option>2022-23</option>
                </select>

                <input
                    type="text"
                    placeholder="Filter by Supplier"
                    className="border p-2 rounded"
                    value={filters.supplier}
                    onChange={(e) => setFilters({ ...filters, supplier: e.target.value })}
                />
            </div>

            {/* Summary */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white shadow p-4 rounded">
                    <p className="text-gray-500">Total Outward Supplies</p>
                    <h2 className="text-lg font-bold">₹{totalOutward}</h2>
                </div>
                <div className="bg-white shadow p-4 rounded">
                    <p className="text-gray-500">Total Inward Supplies</p>
                    <h2 className="text-lg font-bold">₹{totalInward}</h2>
                </div>
                <div className="bg-white shadow p-4 rounded">
                    <p className="text-gray-500">Net Tax Payable</p>
                    <h2 className="text-lg font-bold">₹{netTaxPayable}</h2>
                </div>
                <div className="bg-white shadow p-4 rounded">
                    <p className="text-gray-500">Total Payable (with Late Fee)</p>
                    <h2 className="text-lg font-bold">₹{totalPayable}</h2>
                </div>
            </div>

            {/* Outward Supplies */}
            <div className="bg-white shadow p-4 rounded">
                <h2 className="text-xl font-semibold mb-2">Outward Supplies</h2>
                <table className="w-full border">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border p-2">Description</th>
                            <th className="border p-2">Value</th>
                            <th className="border p-2">Tax</th>
                        </tr>
                    </thead>
                    <tbody>
                        {outwardSupplies.map((item) => (
                            <tr key={item.id}>
                                <td className="border p-2">{item.description}</td>
                                <td className="border p-2">₹{item.value}</td>
                                <td className="border p-2">₹{item.tax}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Inward Supplies */}
            <div className="bg-white shadow p-4 rounded">
                <h2 className="text-xl font-semibold mb-2">Inward Supplies</h2>
                <table className="w-full border">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border p-2">Supplier</th>
                            <th className="border p-2">Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {inwardSupplies
                            .filter((i) =>
                                filters.supplier
                                    ? i.supplier
                                        .toLowerCase()
                                        .includes(filters.supplier.toLowerCase())
                                    : true
                            )
                            .map((item) => (
                                <tr key={item.id}>
                                    <td className="border p-2">{item.supplier}</td>
                                    <td className="border p-2">₹{item.value}</td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>

            {/* Reverse Charge */}
            <div className="bg-white shadow p-4 rounded">
                <h2 className="text-xl font-semibold mb-2">Reverse Charge</h2>
                <table className="w-full border">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border p-2">Description</th>
                            <th className="border p-2">Value</th>
                            <th className="border p-2">Tax</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reverseCharge.map((item) => (
                            <tr key={item.id}>
                                <td className="border p-2">{item.description}</td>
                                <td className="border p-2">₹{item.value}</td>
                                <td className="border p-2">₹{item.tax}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
                <button
                    onClick={() => window.print()}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Print
                </button>
                <button
                    onClick={() => alert("Export to CSV coming soon")}
                    className="bg-green-600 text-white px-4 py-2 rounded"
                >
                    Export CSV
                </button>
            </div>
        </div>
    );
};

export default Gst4;
