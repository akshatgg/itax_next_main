// // import GSTR from "@/components/pagesComponents/dashboard/GSTR/GSTR.Component"

// // const page = () => {
// //     return (
// //         <GSTR />
// //     )
// // }

// // export default page


// // components/GSTRDashboard.jsx

// "use client"
// import { useState, useEffect } from "react";
// import GSTR from "@/components/pagesComponents/dashboard/GSTR/GSTR.Component"
// import Sidebar from "@/components/pagesComponents/dashboard/GSTR/Sidebar";

// export default function GSTRDashboard() {
//     const [activeMenu, setActiveMenu] = useState("Easy GST Return");
//     const [activeTab, setActiveTab] = useState("outward");

//     // Filters
//     const [fy, setFy] = useState("2024-25");
//     const [period, setPeriod] = useState("Q1");
//     const [month, setMonth] = useState("April");
//     const [regType, setRegType] = useState("regular");
//     const [retType, setRetType] = useState("GSTR-1");

//     // Remote data
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const [data, setData] = useState(null);

//     async function load() {
//         setLoading(true);
//         setError(null);
//         try {
//             const d = await fetchReturns({ fy, period, month, regType, retType });
//             setData(d);
//         } catch (e) {
//             setError(e?.message ?? "Failed to load");
//         } finally {
//             setLoading(false);
//         }
//     }

//     useEffect(() => {
//         load();
//     }, [fy, period, month, regType, retType]);

//     return (
//         <div className="min-h-screen w-full bg-slate-50 text-slate-800">
//             <div className="mx-auto grid max-w-7xl grid-cols-1 md:grid-cols-[260px,1fr]">
//                 {/* Sidebar */}
//                 <Sidebar />
//                 {/* <aside className="border-r bg-white">
//                     <div className="flex items-center gap-2 border-b p-3">
//                         <button className="rounded-md border p-2 hover:bg-slate-50" aria-label="Collapse sidebar">≡</button>
//                         <span className="text-sm font-medium text-slate-600">Menu</span>
//                     </div>
//                     <nav className="p-3 text-sm">
//                         {[
//                             "Dashboard",
//                             "MyAccount",
//                             "Easy GST Return",
//                             "Easy ITR",
//                             "Easy Investment",
//                             "Invoice",
//                             "Finance",
//                             "Transaction",
//                             "Report",
//                             "Billpayment",
//                             "Manage Cart",
//                         ].map((item) => (
//                             <button
//                                 key={item}
//                                 onClick={() => setActiveMenu(item)}
//                                 className={`mb-1 flex w-full items-center gap-3 rounded-lg px-3 py-2 transition ${activeMenu === item
//                                     ? "bg-blue-600 text-white shadow"
//                                     : "hover:bg-slate-100"
//                                     }`}
//                             >
//                                 <span className="inline-flex h-5 w-5 items-center justify-center rounded bg-slate-200 text-[11px] font-bold">{item[0]}</span>
//                                 <span>{item}</span>
//                             </button>
//                         ))}
//                     </nav>
//                 </aside> */}

//                 {/* Main content */}
//                 <main className="p-4 md:p-6">
//                     {/* Filters Card */}
//                     <section className="rounded-2xl border bg-white p-4 shadow-sm">
//                         <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-5">
//                             <Filter label="F.Y:" value={fy} onChange={setFy} options={["2024-25", "2023-24", "2022-23"]} />
//                             <Filter label="Period Range:" value={period} onChange={setPeriod} options={["Q1", "Q2", "Q3", "Q4"]} />
//                             <Filter label="Month:" value={month} onChange={setMonth} options={["April", "May", "June", "July"]} />
//                             <Filter label="Registration Type:" value={regType} onChange={setRegType} options={["regular", "composition"]} />
//                             <Filter label="Return:" value={retType} onChange={setRetType} options={["GSTR-1", "GSTR-3B", "GSTR-9"]} />
//                         </div>

//                         <div className="mt-4 flex flex-wrap gap-3">
//                             <ActionBtn onClick={load}>Check Return Status</ActionBtn>
//                             <ActionBtn variant="secondary">Payment Information</ActionBtn>
//                             <ActionBtn variant="secondary">Registration Details</ActionBtn>
//                             <ActionBtn variant="primary">Login</ActionBtn>
//                         </div>
//                     </section>

//                     {/* Status bar */}
//                     <section className="mt-4 rounded-xl border bg-slate-100 p-2 text-sm md:text-[13px]">
//                         <div className="flex flex-wrap items-center gap-x-8 gap-y-2 px-2">
//                             <StatusPill label={`GSTR - 1 filing is ${data?.statuses.gstr1Pending ? "pending" : "up to date"}`} />
//                             <StatusPill label={`GSTR - 3B filing is ${data?.statuses.gstr3bPending ? "pending" : "up to date"}`} dot={data?.statuses.gstr3bPending} />
//                             <StatusPill label={`GSTR - 9 filing is ${data?.statuses.gstr9Pending ? "pending" : "up to date"}`} dot={data?.statuses.gstr9Pending} />
//                             <StatusPill label="EasyInvoice" />
//                         </div>
//                     </section>

//                     {/* Content grid */}
//                     <section className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-[1fr,320px]">
//                         {/* Left: tabs + table */}
//                         <div className="rounded-2xl border bg-white p-4 shadow-sm">
//                             {/* Tabs */}
//                             <div className="flex items-center gap-3">
//                                 <button
//                                     onClick={() => setActiveTab("outward")}
//                                     className={`rounded-md border px-3 py-1.5 text-sm font-medium ${activeTab === "outward" ? "bg-blue-600 text-white" : "bg-slate-50 hover:bg-slate-100"
//                                         }`}
//                                 >
//                                     Outward Supplies
//                                 </button>
//                                 <button
//                                     onClick={() => setActiveTab("inward")}
//                                     className={`rounded-md border px-3 py-1.5 text-sm font-medium ${activeTab === "inward" ? "bg-blue-600 text-white" : "bg-slate-50 hover:bg-slate-100"
//                                         }`}
//                                 >
//                                     Inward Supplies
//                                 </button>
//                             </div>

//                             {loading && <div className="mt-4 text-sm text-slate-500">Loading…</div>}
//                             {error && <div className="mt-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>}

//                             {data && (
//                                 <div className="mt-4 overflow-x-auto">
//                                     <table className="min-w-full border-separate border-spacing-0 text-sm">
//                                         <thead>
//                                             <tr>
//                                                 <Th className="w-10">&nbsp;</Th>
//                                                 <Th className="w-[45%] text-left">Supply Value</Th>
//                                                 <Th>IGST</Th>
//                                                 <Th>CGST</Th>
//                                                 <Th>SGST</Th>
//                                                 <Th>CESS</Th>
//                                             </tr>
//                                         </thead>
//                                         <tbody>
//                                             {data.rows.map((r, idx) => (
//                                                 <tr key={idx} className="hover:bg-slate-50">
//                                                     <Td className="text-center font-medium">{r.code}</Td>
//                                                     <Td className="text-left">{r.label}</Td>
//                                                     <Td align="right">{fmt(r.igst)}</Td>
//                                                     <Td align="right">{fmt(r.cgst)}</Td>
//                                                     <Td align="right">{fmt(r.sgst)}</Td>
//                                                     <Td align="right">{fmt(r.cess)}</Td>
//                                                 </tr>
//                                             ))}
//                                         </tbody>
//                                     </table>
//                                 </div>
//                             )}
//                         </div>

//                         {/* Right: Ledger */}
//                         <div className="space-y-3">
//                             <div className="rounded-2xl border bg-white p-4 shadow-sm">
//                                 <div className="mb-3 flex items-center justify-between">
//                                     <h3 className="text-sm font-semibold">Ledger Balances</h3>
//                                     <button className="rounded-md border px-2 py-1 text-xs hover:bg-slate-50">Ledger Details</button>
//                                 </div>

//                                 {data ? (
//                                     <dl className="grid grid-cols-2 gap-3 text-sm">
//                                         <LedgerItem label="Balance" value={fmt(data.ledger.balance)} />
//                                         <LedgerItem label="Liability Ledger" value={fmt(data.ledger.liability)} />
//                                         <LedgerItem label="Cash Ledger" value={fmt(data.ledger.cash)} />
//                                         <LedgerItem label="Credit Ledger" value={fmt(data.ledger.credit)} />
//                                     </dl>
//                                 ) : (
//                                     <div className="text-sm text-slate-500">No data</div>
//                                 )}

//                                 <div className="mt-3 space-y-2">
//                                     <button className="w-full rounded-md border px-3 py-2 text-sm hover:bg-slate-50">PMT09</button>
//                                     <button className="w-full rounded-md border px-3 py-2 text-sm hover:bg-slate-50">Late Fees +</button>
//                                     <div className="grid grid-cols-2 gap-2">
//                                         <button className="rounded-md border px-3 py-2 text-sm hover:bg-slate-50">Annual Return (GSTR-9)</button>
//                                         <button className="rounded-md border px-3 py-2 text-sm hover:bg-slate-50">GSTR-4C</button>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </section>
//                 </main>
//             </div>
//         </div>
//     );
// }

// // --- Helpers ---
// function fmt(n) {
//     const num = typeof n === "string" ? Number(n) : n;
//     return num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
// }

// async function fetchReturns(filters) {
//     await new Promise((r) => setTimeout(r, 300));

//     const seed = (filters.fy + filters.period + filters.month + filters.regType + filters.retType)
//         .split("")
//         .reduce((a, c) => a + c.charCodeAt(0), 0);

//     function n(mult = 1) {
//         return Math.round(((seed % 97) + 13) * mult * 10) / 10;
//     }

//     const base = n(1000);
//     const outward = [
//         { code: "A", label: "Utilized ITC Balance", igst: n(1.2), cgst: n(1.1), sgst: n(1.05), cess: n(0.2) },
//         { code: "B", label: "Net Tax Liability on Outward Supply (A-C)", igst: n(1.6), cgst: n(1.4), sgst: n(1.3), cess: n(0.3) },
//         { code: "C", label: "Add: Tax Liability from Inward Supply", igst: n(0.9), cgst: n(0.8), sgst: n(0.7), cess: n(0.2) },
//         { code: "D", label: "Total Tax Payable in Cash (D+E)", igst: n(1.1), cgst: n(1.0), sgst: n(0.95), cess: n(0.25) },
//         { code: "E", label: "Less: Utilized Cash Balance", igst: n(0.7), cgst: n(0.6), sgst: n(0.6), cess: n(0.15) },
//         { code: "F", label: "Balance GST Due (F-D)", igst: n(0.5), cgst: n(0.5), sgst: n(0.45), cess: n(0.1) },
//         { code: "G", label: "—", igst: 0, cgst: 0, sgst: 0, cess: 0 },
//         { code: "H", label: "—", igst: 0, cgst: 0, sgst: 0, cess: 0 },
//     ];

//     const inward = outward.map((r) => ({
//         ...r,
//         igst: r.igst * 0.6,
//         cgst: r.cgst * 0.6,
//         sgst: r.sgst * 0.6,
//         cess: r.cess * 0.6
//     }));

//     const rows = filters.retType === "GSTR-1" ? outward : inward;

//     const ledger = {
//         balance: base - n(120),
//         liability: n(220),
//         cash: n(180),
//         credit: n(140),
//     };

//     return {
//         statuses: {
//             gstr1Pending: n() % 2 > 1,
//             gstr3bPending: n() % 3 > 1,
//             gstr9Pending: n() % 5 > 1,
//         },
//         rows,
//         ledger,
//     };
// }

// function Filter({ label, options, value, onChange }) {
//     return (
//         <label className="flex flex-col gap-1">
//             <span className="text-xs font-medium text-slate-600">{label}</span>
//             <select value={value} onChange={(e) => onChange(e.target.value)} className="rounded-lg border bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500">
//                 {options.map((opt) => (
//                     <option key={opt} value={opt}>
//                         {opt}
//                     </option>
//                 ))}
//             </select>
//         </label>
//     );
// }

// function ActionBtn({ children, variant = "ghost", onClick }) {
//     const styles = {
//         ghost: "border bg-white hover:bg-slate-50",
//         secondary: "border bg-white hover:bg-slate-50",
//         primary: "bg-blue-600 text-white hover:bg-blue-700 border border-blue-600",
//     };
//     return (
//         <button onClick={onClick} className={`rounded - lg px-4 py-2 text-sm font-medium ${styles[variant]}`}>
//             {children}
//         </button >
//     );
// }

// function StatusPill({ label, dot = false }) {
//     return (
//         <span className="inline-flex items-center gap-2 rounded-md bg-white px-3 py-1.5 text-xs font-medium text-slate-700">
//             {dot && <span className="h-2 w-2 rounded-full bg-red-500" />}
//             {label}
//         </span>
//     );
// }

// function Th({ children, className = "" }) {
//     return (
//         <th className={`sticky top-0 z-10 border-b bg-slate-50 px-3 py-2 text-center font-semibold ${className}`}> {children}</th >
//     );
// }

// function Td({ children, align = "left", className = "" }) {
//     return <td className={`border - b px-3 py-2 text-${align} ${className}`}> {children}</td >;
// }

// function LedgerItem({ label, value }) {
//     return (
//         <div className="flex items-center justify-between rounded-md border px-3 py-2">
//             <dt className="text-slate-600">{label}</dt>
//             <dd className="font-semibold">{value}</dd>
//         </div>
//     );
// }

"use client"
import React, { useState } from "react";

import Sidebar from "../../components/pagesComponents/dashboard/GSTR/Sidebar";
import Filter from "../../components/pagesComponents/dashboard/GSTR/Filter";
import ActionBtn from "../../components/pagesComponents/dashboard/GSTR/Button";
import StatusPill from "../../components/pagesComponents/dashboard/GSTR/StatusPill";
import LedgerItem from "../../components/pagesComponents/dashboard/GSTR/LadgerItem";
import { Th, Td } from "../../components/pagesComponents/dashboard/GSTR/TableParts";

function fmt(value) {
    return value?.toLocaleString?.() ?? value ?? "-";
}

export default function App() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [activeMenu, setActiveMenu] = useState("Dashboard");

    // Filters state
    const [fy, setFy] = React.useState("2024-25");
    const [period, setPeriod] = React.useState("Q1");
    const [month, setMonth] = React.useState("April");
    const [regType, setRegType] = React.useState("regular");
    const [retType, setRetType] = React.useState("GSTR-1");

    // Tabs & loading states
    const [activeTab, setActiveTab] = React.useState("outward");
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);

    // Dummy data
    const data = {
        statuses: {
            gstr1Pending: false,
            gstr3bPending: true,
            gstr9Pending: false,
        },
        rows: [
            { code: 1, label: "Supply A", igst: 1000, cgst: 500, sgst: 500, cess: 0 },
            { code: 2, label: "Supply B", igst: 2000, cgst: 1000, sgst: 1000, cess: 0 },
        ],
        ledger: {
            balance: 5000,
            liability: 2000,
            cash: 1000,
            credit: 2000,
        },
    };

    // Dummy load function
    const load = () => {
        setLoading(true);
        setError(null);
        setTimeout(() => {
            setLoading(false);
        }, 1500);
    };

    // Sidebar toggle handler
    const toggleSidebar = () => setIsSidebarOpen((open) => !open);

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 flex">
            {/* Sidebar */}
            <Sidebar
                isOpen={isSidebarOpen}
                activeMenu={activeMenu}
                setActiveMenu={setActiveMenu}
                toggleSidebar={toggleSidebar}
            />

            {/* Main content */}
            <main
                className={`flex-1 p-4 md:p-6 transition-all duration-300 ${isSidebarOpen ? "" : "ml-2"
                    }`}
                style={{ minHeight: "100vh" }}
            >
                {/* Filters Card */}
                <section className="rounded-2xl border bg-white p-4 shadow-sm">
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-5">
                        <Filter label="F.Y:" value={fy} onChange={setFy} options={["2024-25", "2023-24", "2022-23"]} />
                        <Filter label="Period Range:" value={period} onChange={setPeriod} options={["Q1", "Q2", "Q3", "Q4"]} />
                        <Filter label="Month:" value={month} onChange={setMonth} options={["April", "May", "June", "July"]} />
                        <Filter label="Registration Type:" value={regType} onChange={setRegType} options={["regular", "composition"]} />
                        <Filter label="Return:" value={retType} onChange={setRetType} options={["GSTR-1", "GSTR-3B", "GSTR-9"]} />
                    </div>

                    <div className="mt-4 flex flex-wrap gap-3">
                        <ActionBtn onClick={load}>Check Return Status</ActionBtn>
                        <ActionBtn variant="secondary">Payment Information</ActionBtn>
                        <ActionBtn variant="secondary">Registration Details</ActionBtn>
                        <ActionBtn variant="primary">Login</ActionBtn>
                    </div>
                </section>

                {/* Status bar */}
                <section className="mt-4 rounded-xl border bg-slate-100 p-2 text-sm md:text-[13px]">
                    <div className="flex flex-wrap items-center gap-x-8 gap-y-2 px-2">
                        <StatusPill label={`GSTR - 1 filing is ${data.statuses.gstr1Pending ? "pending" : "up to date"}`} />
                        <StatusPill label={`GSTR - 3B filing is ${data.statuses.gstr3bPending ? "pending" : "up to date"}`} dot={data.statuses.gstr3bPending} />
                        <StatusPill label={`GSTR - 9 filing is ${data.statuses.gstr9Pending ? "pending" : "up to date"}`} dot={data.statuses.gstr9Pending} />
                        <StatusPill label="EasyInvoice" />
                    </div>
                </section>

                {/* Content grid */}
                <section className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-[1fr,320px]">
                    {/* Left: tabs + table */}
                    <div className="rounded-2xl border bg-white p-4 shadow-sm">
                        {/* Tabs */}
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setActiveTab("outward")}
                                className={`rounded-md border px-3 py-1.5 text-sm font-medium ${activeTab === "outward"
                                    ? "bg-blue-600 text-white"
                                    : "bg-slate-50 hover:bg-slate-100"
                                    }`}
                            >
                                Outward Supplies
                            </button>
                            <button
                                onClick={() => setActiveTab("inward")}
                                className={`rounded-md border px-3 py-1.5 text-sm font-medium ${activeTab === "inward"
                                    ? "bg-blue-600 text-white"
                                    : "bg-slate-50 hover:bg-slate-100"
                                    }`}
                            >
                                Inward Supplies
                            </button>
                        </div>

                        {loading && <div className="mt-4 text-sm text-slate-500">Loading…</div>}
                        {error && (
                            <div className="mt-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                                {error}
                            </div>
                        )}
                        {data && (
                            <div className="mt-4 overflow-x-auto">
                                <table className="min-w-full border-collapse border border-slate-300 text-sm">
                                    <thead>
                                        <tr className="bg-slate-100">
                                            <Th className="w-10 border border-slate-300">SN</Th>
                                            <Th className="w-[45%] text-left border border-slate-300">
                                                Supply Value
                                            </Th>
                                            <Th className="text-center border border-slate-300">IGST</Th>
                                            <Th className="text-center border border-slate-300">CGST</Th>
                                            <Th className="text-center border border-slate-300">SGST</Th>
                                            <Th className="text-center border border-slate-300">CESS</Th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.rows.map((r, idx) => (
                                            <tr key={idx} className="hover:bg-slate-50">
                                                <Td className="text-center font-medium border border-slate-300">
                                                    {r.code}
                                                </Td>
                                                <Td className="text-left border border-slate-300">{r.label}</Td>
                                                <Td className="text-center border border-slate-300">
                                                    {fmt(r.igst)}
                                                </Td>
                                                <Td className="text-center border border-slate-300">
                                                    {fmt(r.cgst)}
                                                </Td>
                                                <Td className="text-center border border-slate-300">
                                                    {fmt(r.sgst)}
                                                </Td>
                                                <Td className="text-center border border-slate-300">
                                                    {fmt(r.cess)}
                                                </Td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>

                    {/* Right: Ledger */}
                    <div className="space-y-3">
                        <div className="rounded-2xl border bg-white p-4 shadow-sm">
                            <div className="mb-3 flex items-center justify-between">
                                <h3 className="text-sm font-semibold">Ledger Balances</h3>
                                <button className="rounded-md border px-2 py-1 text-xs hover:bg-slate-50">
                                    Ledger Details
                                </button>
                            </div>

                            {data ? (
                                <dl className="grid grid-cols-2 gap-3 text-sm">
                                    <LedgerItem label="Balance" value={fmt(data.ledger.balance)} />
                                    <LedgerItem label="Liability Ledger" value={fmt(data.ledger.liability)} />
                                    <LedgerItem label="Cash Ledger" value={fmt(data.ledger.cash)} />
                                    <LedgerItem label="Credit Ledger" value={fmt(data.ledger.credit)} />
                                </dl>
                            ) : (
                                <div className="text-sm text-slate-500">No data</div>
                            )}

                            <div className="mt-3 space-y-2">
                                <button className="w-full rounded-md border px-3 py-2 text-sm hover:bg-slate-50">PMT09</button>
                                <button className="w-full rounded-md border px-3 py-2 text-sm hover:bg-slate-50">Late Fees +</button>
                                <div className="grid grid-cols-2 gap-2">
                                    <button className="rounded-md border px-3 py-2 text-sm hover:bg-slate-50">Annual Return (GSTR-9)</button>
                                    <button className="rounded-md border px-3 py-2 text-sm hover:bg-slate-50">GSTR-4C</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
