"use client";
import React, { useState, useMemo } from "react";
// GST2B-OnePage.jsx
// One-file React component (Tailwind CSS classes) for GSTR-2B viewer with reconciliation helpers.
// Similar to GST2A but for 2B: auto-drafted input tax credit (ITC) statement.

// ---------- Utilities ----------
const formatINR = (n) =>
    typeof n === "number"
        ? n.toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 2 })
        : n;

// ---------- Sample GSTR-2B Data ----------
const SAMPLE_DATA = {
    metadata: {
        generatedOn: new Date().toISOString(),
        returnPeriod: "2025-07",
        source: "sample",
    },
    suppliers: [
        {
            gstin: "27AABCU9603R1ZV",
            name: "Alpha Traders",
            invoices: [
                {
                    invoiceNo: "2B-001",
                    invoiceDate: "2025-07-05",
                    invoiceType: "B2B",
                    taxableValue: 40000,
                    igst: 0,
                    cgst: 3600,
                    sgst: 3600,
                    total: 47200,
                    itcEligibility: "ITC Available",
                    items: [
                        { desc: "Laptops", qty: 5, rate: 8000, taxable: 40000 },
                    ],
                },
            ],
        },
        {
            gstin: "07AAACB2234M1Z7",
            name: "Beta Electronics",
            invoices: [
                {
                    invoiceNo: "2B-002",
                    invoiceDate: "2025-07-12",
                    invoiceType: "B2B",
                    taxableValue: 100000,
                    igst: 18000,
                    cgst: 0,
                    sgst: 0,
                    total: 118000,
                    itcEligibility: "ITC Available",
                    items: [
                        { desc: "Smartphones", qty: 40, rate: 2500, taxable: 100000 },
                    ],
                },
                {
                    invoiceNo: "2B-003",
                    invoiceDate: "2025-07-18",
                    invoiceType: "ISD Credit",
                    taxableValue: 20000,
                    igst: 3600,
                    cgst: 0,
                    sgst: 0,
                    total: 23600,
                    itcEligibility: "ITC Not Available",
                    items: [
                        { desc: "Services", qty: 1, rate: 20000, taxable: 20000 },
                    ],
                },
            ],
        },
    ],
};

// ---------- Main Component ----------
export default function GST2BOnePage() {
    const [data, setData] = useState(SAMPLE_DATA);
    const [query, setQuery] = useState("");
    const [selectedSupplier, setSelectedSupplier] = useState("all");
    const [showAvailableOnly, setShowAvailableOnly] = useState(false);

    // Flatten invoices
    const allInvoices = useMemo(() => {
        const out = [];
        for (const sup of data.suppliers || []) {
            for (const inv of sup.invoices || []) {
                out.push({
                    supplierGstin: sup.gstin,
                    supplierName: sup.name,
                    ...inv,
                });
            }
        }
        return out;
    }, [data]);

    const filtered = useMemo(() => {
        return allInvoices.filter((inv) => {
            if (selectedSupplier !== "all" && inv.supplierGstin !== selectedSupplier) return false;
            if (query) {
                const q = query.toLowerCase();
                if (
                    !inv.invoiceNo.toLowerCase().includes(q) &&
                    !inv.supplierName.toLowerCase().includes(q) &&
                    !(inv.items || []).some((it) => String(it.desc).toLowerCase().includes(q))
                )
                    return false;
            }
            if (showAvailableOnly && inv.itcEligibility !== "ITC Available") return false;
            return true;
        });
    }, [allInvoices, selectedSupplier, query, showAvailableOnly]);

    const summary = useMemo(() => {
        let taxable = 0,
            igst = 0,
            cgst = 0,
            sgst = 0,
            total = 0;
        for (const inv of filtered) {
            taxable += Number(inv.taxableValue || 0);
            igst += Number(inv.igst || 0);
            cgst += Number(inv.cgst || 0);
            sgst += Number(inv.sgst || 0);
            total += Number(inv.total || 0);
        }
        return { taxable, igst, cgst, sgst, total, invoices: filtered.length };
    }, [filtered]);

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <header className="mb-6">
                <h1 className="text-2xl font-bold">GSTR-2B — One Page Viewer</h1>
                <p className="text-sm text-muted-foreground">
                    Auto-drafted ITC statement for return period {data.metadata.returnPeriod}
                </p>
            </header>

            {/* Summary */}
            <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="p-4 border rounded-lg">
                    <div className="text-sm text-gray-500">Invoices (shown)</div>
                    <div className="text-2xl font-semibold">{summary.invoices}</div>
                </div>
                <div className="p-4 border rounded-lg">
                    <div className="text-sm text-gray-500">Taxable Value</div>
                    <div className="text-2xl font-semibold">{formatINR(summary.taxable)}</div>
                </div>
                <div className="p-4 border rounded-lg">
                    <div className="text-sm text-gray-500">Total Tax (IGST+CGST+SGST)</div>
                    <div className="text-2xl font-semibold">{formatINR(summary.igst + summary.cgst + summary.sgst)}</div>
                </div>
            </section>

            {/* Filters */}
            <section className="mb-6 p-4 border rounded-lg">
                <div className="flex flex-col sm:flex-row gap-3 items-end">
                    <div className="flex-1">
                        <label className="block text-sm">Search (invoice, supplier, item)</label>
                        <input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="w-full mt-1 p-2 border rounded"
                        />
                    </div>
                    <div>
                        <label className="block text-sm">Supplier</label>
                        <select
                            value={selectedSupplier}
                            onChange={(e) => setSelectedSupplier(e.target.value)}
                            className="mt-1 p-2 border rounded"
                        >
                            <option value="all">All suppliers</option>
                            {data.suppliers.map((s) => (
                                <option key={s.gstin} value={s.gstin}>{`${s.name} — ${s.gstin}`}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="flex items-center gap-2 text-sm">
                            <input
                                type="checkbox"
                                checked={showAvailableOnly}
                                onChange={(e) => setShowAvailableOnly(e.target.checked)}
                            />
                            Show only ITC Available
                        </label>
                    </div>
                </div>
            </section>

            {/* Table */}
            <section className="mb-6">
                <div className="overflow-x-auto border rounded-lg">
                    <table className="min-w-full divide-y">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="p-3 text-left">Supplier</th>
                                <th className="p-3 text-left">Invoice No</th>
                                <th className="p-3 text-left">Date</th>
                                <th className="p-3 text-left">Type</th>
                                <th className="p-3 text-right">Taxable</th>
                                <th className="p-3 text-right">IGST</th>
                                <th className="p-3 text-right">CGST</th>
                                <th className="p-3 text-right">SGST</th>
                                <th className="p-3 text-right">Total</th>
                                <th className="p-3 text-left">ITC Eligibility</th>
                                <th className="p-3 text-left">Items</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {filtered.map((inv) => (
                                <tr key={`${inv.supplierGstin}|${inv.invoiceNo}`}>
                                    <td className="p-3">
                                        {inv.supplierName}
                                        <div className="text-xs text-gray-500">{inv.supplierGstin}</div>
                                    </td>
                                    <td className="p-3">{inv.invoiceNo}</td>
                                    <td className="p-3">{inv.invoiceDate}</td>
                                    <td className="p-3">{inv.invoiceType}</td>
                                    <td className="p-3 text-right">{formatINR(Number(inv.taxableValue || 0))}</td>
                                    <td className="p-3 text-right">{formatINR(Number(inv.igst || 0))}</td>
                                    <td className="p-3 text-right">{formatINR(Number(inv.cgst || 0))}</td>
                                    <td className="p-3 text-right">{formatINR(Number(inv.sgst || 0))}</td>
                                    <td className="p-3 text-right">{formatINR(Number(inv.total || 0))}</td>
                                    <td className="p-3">{inv.itcEligibility}</td>
                                    <td className="p-3">
                                        <details>
                                            <summary className="cursor-pointer text-sm">{(inv.items || []).length} item(s)</summary>
                                            <ul className="mt-2 text-xs">
                                                {(inv.items || []).map((it, i) => (
                                                    <li key={i}>
                                                        {it.desc} — {it.qty ?? ""} × {it.rate ?? ""} = {formatINR(it.taxable ?? 0)}
                                                    </li>
                                                ))}
                                            </ul>
                                        </details>
                                    </td>
                                </tr>
                            ))}
                            {filtered.length === 0 && (
                                <tr>
                                    <td colSpan={11} className="p-4 text-center text-gray-500">
                                        No invoices match the filters.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>

            <footer className="mt-6 text-xs text-gray-500">
                <div>Notes:</div>
                <ul className="list-disc ml-5">
                    <li>GSTR-2B is a static auto-drafted ITC statement generated for a tax period.</li>
                    <li>Use it for ITC claims but reconcile with books before filing GSTR-3B.</li>
                    <li>Parser and filters here are simplified; adapt as needed for real GSTN data structure.</li>
                </ul>
            </footer>
        </div>
    );
}
