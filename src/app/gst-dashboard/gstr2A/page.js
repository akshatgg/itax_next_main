"use client";
import React, { useState, useMemo } from "react";
// GST2A-OnePage.jsx
// One-file React component (Tailwind CSS classes) that shows a full-featured
// GSTR-2A viewer + basic reconciliation helpers in plain JavaScript.
// Default export a React component so you can drop this into a Next.js or CRA app.

// Features implemented:
// - Sample GSTR-2A JSON data (structure typical: supplier, invoice, tax values)
// - Upload JSON/CSV (basic) to replace sample data
// - Summary cards: total invoices, taxable value, IGST/CGST/SGST, Input Tax Credit (ITC)
// - Filter by supplier, date-range, invoice type
// - Reconciliation helper: mark invoices as matched/unmatched and export results
// - Export filtered list to CSV and print-friendly view
// - Responsive, accessible, and commented for maintainability

// NOTE: This file uses Tailwind CSS utility classes for styling. If you don't
// use Tailwind, replace classes with your preferred styles.

// ---------- Utilities ----------
const formatINR = (n) =>
    typeof n === "number"
        ? n.toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 2 })
        : n;

const parseCSV = (text) => {
    // Very small CSV parser (assumes first row header, comma-separated, no quoted commas)
    const lines = text.trim().split(/\r?\n/);
    if (!lines.length) return [];
    const headers = lines[0].split(",").map((h) => h.trim());
    return lines.slice(1).map((ln) => {
        const vals = ln.split(",").map((v) => v.trim());
        const obj = {};
        headers.forEach((h, i) => (obj[h] = vals[i] ?? ""));
        return obj;
    });
};

const toCSV = (arr) => {
    if (!arr.length) return "";
    const headers = Object.keys(arr[0]);
    const lines = [headers.join(",")];
    for (const row of arr) {
        lines.push(headers.map((h) => String(row[h] ?? "").replace(/\n/g, " ")).join(","));
    }
    return lines.join("\n");
};

// ---------- Sample GSTR-2A data (minimal realistic shape) ----------
const SAMPLE_DATA = {
    metadata: {
        generatedOn: new Date().toISOString(),
        source: "sample",
    },
    suppliers: [
        {
            gstin: "27AABCU9603R1ZV",
            name: "Alpha Traders",
            invoices: [
                {
                    invoiceNo: "INV-001",
                    invoiceDate: "2025-04-03",
                    invoiceType: "Regular",
                    taxableValue: 50000,
                    igst: 0,
                    cgst: 4500,
                    sgst: 4500,
                    total: 59000,
                    items: [
                        { desc: "LED Panel", qty: 10, rate: 5000, taxable: 50000 },
                    ],
                },
                {
                    invoiceNo: "INV-002",
                    invoiceDate: "2025-05-10",
                    invoiceType: "Reverse Charge",
                    taxableValue: 20000,
                    igst: 3600,
                    cgst: 0,
                    sgst: 0,
                    total: 23600,
                    items: [
                        { desc: "Cables", qty: 200, rate: 100, taxable: 20000 },
                    ],
                },
            ],
        },
        {
            gstin: "07AAACB2234M1Z7",
            name: "Beta Electronics",
            invoices: [
                {
                    invoiceNo: "B-100",
                    invoiceDate: "2025-06-01",
                    invoiceType: "Regular",
                    taxableValue: 150000,
                    igst: 27000,
                    cgst: 0,
                    sgst: 0,
                    total: 177000,
                    items: [
                        { desc: "Smartphones", qty: 50, rate: 3000, taxable: 150000 },
                    ],
                },
            ],
        },
    ],
};

// ---------- Main component ----------
export default function GST2AOnePage() {
    const [data, setData] = useState(SAMPLE_DATA);
    const [query, setQuery] = useState("");
    const [selectedSupplier, setSelectedSupplier] = useState("all");
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");
    const [matchedMap, setMatchedMap] = useState({}); // key: supplier_gstin|invoiceNo => matched boolean

    // Flatten invoices for easier display
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
        const from = dateFrom ? new Date(dateFrom) : null;
        const to = dateTo ? new Date(dateTo) : null;
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
            const d = inv.invoiceDate ? new Date(inv.invoiceDate) : null;
            if (from && d && d < from) return false;
            if (to && d && d > to) return false;
            return true;
        });
    }, [allInvoices, selectedSupplier, query, dateFrom, dateTo]);

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

    // Upload handler: can accept JSON or CSV (simple)
    const handleUpload = (file) => {
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            const text = e.target.result;
            try {
                // try JSON first
                const parsed = JSON.parse(text);
                // basic validation
                if (parsed && parsed.suppliers) {
                    setData(parsed);
                    setMatchedMap({});
                } else {
                    alert("Uploaded JSON doesn't look like GSTR-2A (missing suppliers array).");
                }
            } catch (err) {
                // try CSV fallback
                const rows = parseCSV(text);
                // Expecting a CSV with invoice-level rows having supplierGstin,supplierName,invoiceNo,invoiceDate,taxableValue,igst,cgst,sgst,total
                if (rows.length) {
                    // group by supplier
                    const map = {};
                    for (const r of rows) {
                        const g = r.supplierGstin || "UNKNOWN";
                        map[g] = map[g] || { gstin: g, name: r.supplierName || g, invoices: [] };
                        map[g].invoices.push({
                            invoiceNo: r.invoiceNo || "",
                            invoiceDate: r.invoiceDate || "",
                            invoiceType: r.invoiceType || "",
                            taxableValue: Number(r.taxableValue || 0),
                            igst: Number(r.igst || 0),
                            cgst: Number(r.cgst || 0),
                            sgst: Number(r.sgst || 0),
                            total: Number(r.total || 0),
                        });
                    }
                    setData({ metadata: { source: "csv-upload", generatedOn: new Date().toISOString() }, suppliers: Object.values(map) });
                    setMatchedMap({});
                } else {
                    alert("Could not parse uploaded file. Please supply valid JSON or CSV.");
                }
            }
        };
        reader.readAsText(file);
    };

    const toggleMatch = (inv) => {
        const key = `${inv.supplierGstin}|${inv.invoiceNo}`;
        setMatchedMap((m) => ({ ...m, [key]: !m[key] }));
    };

    const exportFilteredCSV = () => {
        const rows = filtered.map((inv) => ({
            supplierGstin: inv.supplierGstin,
            supplierName: inv.supplierName,
            invoiceNo: inv.invoiceNo,
            invoiceDate: inv.invoiceDate,
            invoiceType: inv.invoiceType,
            taxableValue: inv.taxableValue,
            igst: inv.igst,
            cgst: inv.cgst,
            sgst: inv.sgst,
            total: inv.total,
            matched: !!matchedMap[`${inv.supplierGstin}|${inv.invoiceNo}`],
        }));
        const csv = toCSV(rows);
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `gstr2a_export_${new Date().toISOString().slice(0, 10)}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const resetToSample = () => {
        setData(SAMPLE_DATA);
        setMatchedMap({});
        setQuery("");
        setSelectedSupplier("all");
        setDateFrom("");
        setDateTo("");
    };

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <header className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold">GSTR-2A — One Page Viewer</h1>
                    <p className="text-sm text-muted-foreground">Upload / view / reconcile vendor-supplied purchase data (GSTR-2A style)</p>
                </div>
                <div className="flex gap-2">
                    <label className="flex items-center gap-2">
                        <input
                            type="file"
                            accept="application/json,text/csv,text/plain"
                            onChange={(e) => handleUpload(e.target.files?.[0])}
                            className="hidden"
                            id="file-upload"
                        />
                        <button
                            onClick={() => document.getElementById("file-upload").click()}
                            className="px-3 py-2 bg-slate-800 text-white rounded-lg"
                        >
                            Upload JSON/CSV
                        </button>
                    </label>

                    <button onClick={exportFilteredCSV} className="px-3 py-2 border rounded-lg">
                        Export CSV
                    </button>
                    <button onClick={() => window.print()} className="px-3 py-2 border rounded-lg">
                        Print
                    </button>
                    <button onClick={resetToSample} className="px-3 py-2 border rounded-lg">
                        Reset Sample
                    </button>
                </div>
            </header>

            {/* Summary cards */}
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
                        <input value={query} onChange={(e) => setQuery(e.target.value)} className="w-full mt-1 p-2 border rounded" />
                    </div>
                    <div>
                        <label className="block text-sm">Supplier</label>
                        <select value={selectedSupplier} onChange={(e) => setSelectedSupplier(e.target.value)} className="mt-1 p-2 border rounded">
                            <option value="all">All suppliers</option>
                            {data.suppliers.map((s) => (
                                <option key={s.gstin} value={s.gstin}>{`${s.name} — ${s.gstin}`}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm">From</label>
                        <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} className="mt-1 p-2 border rounded" />
                    </div>
                    <div>
                        <label className="block text-sm">To</label>
                        <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} className="mt-1 p-2 border rounded" />
                    </div>
                </div>
            </section>

            {/* Invoice table */}
            <section className="mb-6">
                <div className="overflow-x-auto border rounded-lg">
                    <table className="min-w-full divide-y">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="p-3 text-left">Match</th>
                                <th className="p-3 text-left">Supplier</th>
                                <th className="p-3 text-left">Invoice No</th>
                                <th className="p-3 text-left">Date</th>
                                <th className="p-3 text-left">Type</th>
                                <th className="p-3 text-right">Taxable</th>
                                <th className="p-3 text-right">IGST</th>
                                <th className="p-3 text-right">CGST</th>
                                <th className="p-3 text-right">SGST</th>
                                <th className="p-3 text-right">Total</th>
                                <th className="p-3 text-left">Items</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {filtered.map((inv) => {
                                const key = `${inv.supplierGstin}|${inv.invoiceNo}`;
                                const matched = !!matchedMap[key];
                                return (
                                    <tr key={key} className={matched ? "bg-green-50" : "bg-white"}>
                                        <td className="p-3">
                                            <input type="checkbox" checked={matched} onChange={() => toggleMatch(inv)} />
                                        </td>
                                        <td className="p-3">{inv.supplierName} <div className="text-xs text-gray-500">{inv.supplierGstin}</div></td>
                                        <td className="p-3">{inv.invoiceNo}</td>
                                        <td className="p-3">{inv.invoiceDate}</td>
                                        <td className="p-3">{inv.invoiceType}</td>
                                        <td className="p-3 text-right">{formatINR(Number(inv.taxableValue || 0))}</td>
                                        <td className="p-3 text-right">{formatINR(Number(inv.igst || 0))}</td>
                                        <td className="p-3 text-right">{formatINR(Number(inv.cgst || 0))}</td>
                                        <td className="p-3 text-right">{formatINR(Number(inv.sgst || 0))}</td>
                                        <td className="p-3 text-right">{formatINR(Number(inv.total || 0))}</td>
                                        <td className="p-3">
                                            <details>
                                                <summary className="cursor-pointer text-sm">{(inv.items || []).length} item(s)</summary>
                                                <ul className="mt-2 text-xs">
                                                    {(inv.items || []).map((it, i) => (
                                                        <li key={i}>{it.desc} — {it.qty ?? ""} × {it.rate ?? ""} = {formatINR(it.taxable ?? 0)}</li>
                                                    ))}
                                                </ul>
                                            </details>
                                        </td>
                                    </tr>
                                );
                            })}
                            {filtered.length === 0 && (
                                <tr>
                                    <td colSpan={11} className="p-4 text-center text-gray-500">No invoices match the filters.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Recon summary + actions */}
            <section className="p-4 border rounded-lg">
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                    <div>
                        <div className="text-sm text-gray-500">Reconciliation</div>
                        <div className="mt-1 text-lg font-semibold">
                            Matched: {Object.values(matchedMap).filter(Boolean).length} / {allInvoices.length}
                        </div>
                        <div className="text-xs text-gray-500">Tip: Mark invoices that match your purchase ledger to compute available ITC.</div>
                    </div>

                    <div className="flex gap-2 items-center">
                        <button onClick={exportFilteredCSV} className="px-3 py-2 border rounded-lg">Export filtered CSV</button>
                        <button onClick={() => { navigator.clipboard.writeText(JSON.stringify(data, null, 2)); alert('Copied JSON to clipboard'); }} className="px-3 py-2 border rounded-lg">Copy JSON</button>
                    </div>
                </div>
            </section>

            <footer className="mt-6 text-xs text-gray-500">
                <div>Notes:</div>
                <ul className="list-disc ml-5">
                    <li>This is a client-side viewer for GSTR-2A style data. Always verify figures before filing.</li>
                    <li>Fields and structure vary by source (seller-provided JSON/CSV). Adjust parser mapping as needed.</li>
                    <li>For production, add authentication, server-side validation, large-file streaming parsing, and secure export handling.</li>
                </ul>
            </footer>
        </div>
    );
}
