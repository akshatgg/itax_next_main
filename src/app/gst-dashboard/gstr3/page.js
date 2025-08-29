"use client";
import React, { useState, useMemo } from "react";
import { Download, Printer } from "lucide-react";
export default function GSTR3() {
    // --- Sample GSTR-3 Data (normally fetched from backend/APIs) ---
    const [salesInvoices] = useState([
        { id: 1, customer: "Alpha Traders", date: "2025-07-05", taxable: 50000, igst: 0, cgst: 4500, sgst: 4500 },
        { id: 2, customer: "Beta Stores", date: "2025-07-12", taxable: 30000, igst: 5400, cgst: 0, sgst: 0 },
    ]);

    const [purchaseInvoices] = useState([
        { id: 1, supplier: "XYZ Suppliers", date: "2025-07-06", taxable: 20000, igst: 0, cgst: 1800, sgst: 1800, itcEligible: true },
        { id: 2, supplier: "LMN Distributors", date: "2025-07-20", taxable: 15000, igst: 2700, cgst: 0, sgst: 0, itcEligible: false },
    ]);

    // --- Compute totals ---
    const summary = useMemo(() => {
        const salesTax = salesInvoices.reduce(
            (acc, i) => ({
                taxable: acc.taxable + i.taxable,
                igst: acc.igst + i.igst,
                cgst: acc.cgst + i.cgst,
                sgst: acc.sgst + i.sgst,
            }),
            { taxable: 0, igst: 0, cgst: 0, sgst: 0 }
        );

        const purchaseTax = purchaseInvoices.reduce(
            (acc, i) => ({
                taxable: acc.taxable + i.taxable,
                igst: acc.igst + (i.itcEligible ? i.igst : 0),
                cgst: acc.cgst + (i.itcEligible ? i.cgst : 0),
                sgst: acc.sgst + (i.itcEligible ? i.sgst : 0),
            }),
            { taxable: 0, igst: 0, cgst: 0, sgst: 0 }
        );

        const totalOutput = salesTax.igst + salesTax.cgst + salesTax.sgst;
        const totalITC = purchaseTax.igst + purchaseTax.cgst + purchaseTax.sgst;
        const netPayable = totalOutput - totalITC;

        return { salesTax, purchaseTax, totalOutput, totalITC, netPayable };
    }, [salesInvoices, purchaseInvoices]);

    // --- Export CSV ---
    const exportCSV = () => {
        const headers = ["Type,Party,Date,Taxable,IGST,CGST,SGST,ITC Eligible"];
        const salesRows = salesInvoices.map(
            (i) => `Sales,${i.customer},${i.date},${i.taxable},${i.igst},${i.cgst},${i.sgst},-`
        );
        const purchaseRows = purchaseInvoices.map(
            (i) => `Purchase,${i.supplier},${i.date},${i.taxable},${i.igst},${i.cgst},${i.sgst},${i.itcEligible}`
        );
        const csv = [...headers, ...salesRows, ...purchaseRows].join("\n");
        const blob = new Blob([csv], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "GSTR3.csv";
        a.click();
    };

    return (
        <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
            <h1 className="text-2xl font-bold">GSTR-3 (Monthly Return)</h1>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-xl shadow">
                    <h2 className="font-semibold">Total Outward Tax</h2>
                    <p className="text-lg">₹ {summary.totalOutput}</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow">
                    <h2 className="font-semibold">Input Tax Credit (ITC)</h2>
                    <p className="text-lg">₹ {summary.totalITC}</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow">
                    <h2 className="font-semibold">Net GST Payable</h2>
                    <p className="text-lg">₹ {summary.netPayable}</p>
                </div>
            </div>

            {/* Sales Invoices */}
            <div className="bg-white p-4 rounded-xl shadow">
                <h2 className="text-xl font-semibold mb-2">Outward Supplies (Sales)</h2>
                <table className="w-full border text-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border p-2">Customer</th>
                            <th className="border p-2">Date</th>
                            <th className="border p-2">Taxable</th>
                            <th className="border p-2">IGST</th>
                            <th className="border p-2">CGST</th>
                            <th className="border p-2">SGST</th>
                        </tr>
                    </thead>
                    <tbody>
                        {salesInvoices.map((i) => (
                            <tr key={i.id}>
                                <td className="border p-2">{i.customer}</td>
                                <td className="border p-2">{i.date}</td>
                                <td className="border p-2">₹ {i.taxable}</td>
                                <td className="border p-2">₹ {i.igst}</td>
                                <td className="border p-2">₹ {i.cgst}</td>
                                <td className="border p-2">₹ {i.sgst}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Purchase Invoices */}
            <div className="bg-white p-4 rounded-xl shadow">
                <h2 className="text-xl font-semibold mb-2">Inward Supplies (Purchases)</h2>
                <table className="w-full border text-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border p-2">Supplier</th>
                            <th className="border p-2">Date</th>
                            <th className="border p-2">Taxable</th>
                            <th className="border p-2">IGST</th>
                            <th className="border p-2">CGST</th>
                            <th className="border p-2">SGST</th>
                            <th className="border p-2">ITC Eligible</th>
                        </tr>
                    </thead>
                    <tbody>
                        {purchaseInvoices.map((i) => (
                            <tr key={i.id}>
                                <td className="border p-2">{i.supplier}</td>
                                <td className="border p-2">{i.date}</td>
                                <td className="border p-2">₹ {i.taxable}</td>
                                <td className="border p-2">₹ {i.igst}</td>
                                <td className="border p-2">₹ {i.cgst}</td>
                                <td className="border p-2">₹ {i.sgst}</td>
                                <td className="border p-2">{i.itcEligible ? "Yes" : "No"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
                <button
                    onClick={exportCSV}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    <Download size={18} /> Export CSV
                </button>
                <button
                    onClick={() => window.print()}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                    <Printer size={18} /> Print
                </button>
            </div>
        </div>
    );
}
