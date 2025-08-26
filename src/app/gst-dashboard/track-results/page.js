"use client";
import React, { useEffect, useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import handleExport from "@/helper/ExcelExport";
import BackButton from "@/components/pagesComponents/dashboard/BackButton";
// import userAxios from "@/lib/userAxios";

/* ----------------------- Helpers ----------------------- */
const formatReturnPeriod = (period) => {
    if (!period || period.length !== 6) return period;
    const month = period.substring(0, 2);
    const year = period.substring(2);
    const monthNames = {
        "01": "Jan",
        "02": "Feb",
        "03": "Mar",
        "04": "Apr",
        "05": "May",
        "06": "Jun",
        "07": "Jul",
        "08": "Aug",
        "09": "Sep",
        "10": "Oct",
        "11": "Nov",
        "12": "Dec"
    };
    return `${monthNames[month] || month} 20${year}`;
};

const getStatusColor = (status) => {
    if (!status) return "bg-blue-500 text-white";
    if (status.toLowerCase().includes("filed") || status.toLowerCase().includes("success")) return "bg-green-500 text-white";
    if (status.toLowerCase().includes("pending") || status.toLowerCase().includes("processing")) return "bg-yellow-500 text-white";
    if (status.toLowerCase().includes("error") || status.toLowerCase().includes("failed")) return "bg-red-500 text-white";
    return "bg-blue-500 text-white";
};

/* ------------------- TrackResults page/component ------------------- */
export default function TrackResults() {
    const [raw, setRaw] = useState(null);
    const [items, setItems] = useState([]);
    const [query, setQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [validFilter, setValidFilter] = useState("");
    const pdf_ref = useRef(null);

    useEffect(() => {
        const stored = sessionStorage.getItem("gstTrackData");
        if (stored) {
            const parsed = JSON.parse(stored);
            setRaw(parsed);
            const list = parsed?.data?.data?.data?.EFiledlist || parsed?.EFiledlist || [];
            setItems(Array.isArray(list) ? list : []);
        }
    }, []);

    // simple client-side filtering
    const filtered = items.filter((r) => {
        if (query && !JSON.stringify(r).toLowerCase().includes(query.toLowerCase())) return false;
        if (statusFilter && (!r.status || r.status.toLowerCase() !== statusFilter.toLowerCase())) return false;
        if (validFilter && (!r.valid || r.valid !== validFilter)) return false;
        return true;
    });

    const handleExcelExport = async () => {
        const excelData = {
            "Track Gst Return": {
                headers: {
                    "Return Type": "rtntype",
                    "Arn Number": "arn",
                    "Date of Filing": "dof",
                    "Mode of Filing": "mof",
                    "Return Period": "ret_prd",
                    Status: "status",
                    Valid: "valid"
                },
                bodyData: filtered
            }
        };
        await handleExport(excelData, "Track_GST_Return_filtered");
    };

    const generatePDF = useReactToPrint({ content: () => pdf_ref.current, documentTitle: "track-gst-return-results" });

    return (
        <>
            <BackButton />
            <div className="p-4">
                <h1 className="text-xl font-bold mb-4">Track GST Return - Results</h1>

                <div className="flex gap-2 items-center mb-4">
                    <input className="border rounded px-2 py-1" placeholder="Search..." value={query} onChange={(e) => setQuery(e.target.value)} />
                    <select className="border rounded px-2 py-1" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                        <option value="">All Status</option>
                        <option value="Filed">Filed</option>
                        <option value="Pending">Pending</option>
                        <option value="Error">Error</option>
                    </select>
                    <select className="border rounded px-2 py-1" value={validFilter} onChange={(e) => setValidFilter(e.target.value)}>
                        <option value="">All Validity</option>
                        <option value="Y">Valid (Y)</option>
                        <option value="N">Invalid (N)</option>
                    </select>
                    <button className="px-3 py-1 rounded bg-gray-100" onClick={handleExcelExport}>Export Excel</button>
                    <button className="px-3 py-1 rounded bg-gray-100" onClick={generatePDF}>Export PDF</button>
                </div>

                <div ref={pdf_ref}>
                    <table className="min-w-full border-collapse border">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border px-2 py-1">Return Type</th>
                                <th className="border px-2 py-1">Arn</th>
                                <th className="border px-2 py-1">Date of Filing</th>
                                <th className="border px-2 py-1">Mode</th>
                                <th className="border px-2 py-1">Return Period</th>
                                <th className="border px-2 py-1">Status</th>
                                <th className="border px-2 py-1">Valid</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.length === 0 ? (
                                <tr><td colSpan={7} className="p-4 text-center">No records found</td></tr>
                            ) : (
                                filtered.map((row, idx) => (
                                    <tr key={idx} className="hover:bg-gray-50">
                                        <td className="border px-2 py-1">{row.rtntype || row.returnType}</td>
                                        <td className="border px-2 py-1">{row.arn}</td>
                                        <td className="border px-2 py-1">{row.dof}</td>
                                        <td className="border px-2 py-1">{row.mof}</td>
                                        <td className="border px-2 py-1">{formatReturnPeriod(row.ret_prd)}</td>
                                        <td className="border px-2 py-1"><span className={`px-2 py-1 rounded ${getStatusColor(row.status)}`}>{row.status}</span></td>
                                        <td className="border px-2 py-1"><span className={`${row.valid === 'Y' ? 'bg-green-500 text-white px-2 py-1 rounded' : 'bg-red-500 text-white px-2 py-1 rounded'}`}>{row.valid}</span></td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
