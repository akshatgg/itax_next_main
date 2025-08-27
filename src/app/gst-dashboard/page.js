// import GSTR from "@/components/pagesComponents/dashboard/GSTR/GSTR.Component"

// const page = () => {
//     return (
//         <>
//         <GSTR />
//         </>
//     )
// }

// export default page



// "use client";
// import { useState } from "react";

// export default function GSTRDashboard() {
//   const [activeMenu, setActiveMenu] = useState("Easy GST Return");
//   const [activeTab, setActiveTab] = useState("outward");

//   return (
//     <div className="min-h-screen w-full bg-slate-50 text-slate-800">
//       {/* Top bar */}
//       <header className="sticky top-0 z-30 border-b bg-white/80 backdrop-blur">
//         <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
//           <div className="flex items-center gap-3">
//             <div className="h-8 w-8 rounded bg-blue-600" />
//             <div className="text-lg font-semibold tracking-tight">iTax Easy</div>
//           </div>
//           <nav className="hidden items-center gap-6 md:flex">
//             <a className="text-sm text-slate-600 hover:text-slate-900" href="#">Our Products</a>
//             <a className="text-sm text-slate-600 hover:text-slate-900" href="#">Easy Services</a>
//             <a className="text-sm text-slate-600 hover:text-slate-900" href="#">Financial Calculators</a>
//             <a className="text-sm text-slate-600 hover:text-slate-900" href="#">Blog</a>
//             <a className="text-sm text-slate-600 hover:text-slate-900" href="#">Register a Startup</a>
//             <a className="text-sm text-slate-600 hover:text-slate-900" href="#">APIs</a>
//             <a className="text-sm text-slate-600 hover:text-slate-900" href="#">Downloads</a>
//           </nav>
//           <div className="flex items-center gap-3">
//             <button className="rounded-full border px-3 py-1.5 text-sm">Help</button>
//             <div className="h-8 w-8 rounded-full bg-slate-200" />
//           </div>
//         </div>
//       </header>

//       <div className="mx-auto grid max-w-7xl grid-cols-1 md:grid-cols-[260px,1fr]">
//         {/* Sidebar */}
//         <aside className="border-r bg-white">
//           <div className="flex items-center gap-2 border-b p-3">
//             <button className="rounded-md border p-2 hover:bg-slate-50" aria-label="Collapse sidebar">≡</button>
//             <span className="text-sm font-medium text-slate-600">Menu</span>
//           </div>
//           <nav className="p-3 text-sm">
//             {[
//               "Dashboard",
//               "MyAccount",
//               "Easy GST Return",
//               "Easy ITR",
//               "Easy Investment",
//               "Invoice",
//               "Finance",
//               "Transaction",
//               "Report",
//               "Billpayment",
//               "Manage Cart",
//             ].map((item) => (
//               <button
//                 key={item}
//                 onClick={() => setActiveMenu(item)}
//                 className={`mb-1 flex w-full items-center gap-3 rounded-lg px-3 py-2 transition ${
//                   activeMenu === item
//                     ? "bg-blue-600 text-white shadow"
//                     : "hover:bg-slate-100"
//                 }`}
//               >
//                 <span className="inline-flex h-5 w-5 items-center justify-center rounded bg-slate-200 text-[11px] font-bold">{item[0]}</span>
//                 <span>{item}</span>
//               </button>
//             ))}
//           </nav>
//         </aside>

//         {/* Main content */}
//         <main className="p-4 md:p-6">
//           {/* Filters Card */}
//           <section className="rounded-2xl border bg-white p-4 shadow-sm">
//             <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-5">
//               <Filter label="F.Y:" options={["Select Year","2024-25","2023-24","2022-23"]} />
//               <Filter label="Period Range:" options={["Select Period Range","Q1","Q2","Q3","Q4"]} />
//               <Filter label="Month:" options={["Select Month","April","May","June","July"]} />
//               <Filter label="Registration Type:" options={["regular","composition"]} />
//               <Filter label="Return:" options={["GSTR-1","GSTR-3B","GSTR-9"]} />
//             </div>

//             <div className="mt-4 flex flex-wrap gap-3">
//               <ActionBtn>Check Return Status</ActionBtn>
//               <ActionBtn variant="secondary">Payment Information</ActionBtn>
//               <ActionBtn variant="secondary">Registration Details</ActionBtn>
//               <ActionBtn variant="primary">Login</ActionBtn>
//             </div>
//           </section>

//           {/* Status bar */}
//           <section className="mt-4 rounded-xl border bg-slate-100 p-2 text-sm md:text-[13px]">
//             <div className="flex flex-wrap items-center gap-x-8 gap-y-2 px-2">
//               <StatusPill label="GSTR-1 filing is pending" />
//               <StatusPill label="GSTR-3B filing is pending" dot />
//               <StatusPill label="GSTR-9 filing is pending" dot />
//               <StatusPill label="EasyInvoice" />
//             </div>
//           </section>

//           {/* Content grid */}
//           <section className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-[1fr,320px]">
//             {/* Left: tabs + table */}
//             <div className="rounded-2xl border bg-white p-4 shadow-sm">
//               {/* Tabs */}
//               <div className="flex items-center gap-3">
//                 <button
//                   onClick={() => setActiveTab("outward")}
//                   className={`rounded-md border px-3 py-1.5 text-sm font-medium ${
//                     activeTab === "outward" ? "bg-blue-600 text-white" : "bg-slate-50 hover:bg-slate-100"
//                   }`}
//                 >
//                   Outward Supplies
//                 </button>
//                 <button
//                   onClick={() => setActiveTab("inward")}
//                   className={`rounded-md border px-3 py-1.5 text-sm font-medium ${
//                     activeTab === "inward" ? "bg-blue-600 text-white" : "bg-slate-50 hover:bg-slate-100"
//                   }`}
//                 >
//                   Inward Supplies
//                 </button>
//               </div>

//               {/* Table */}
//               <div className="mt-4 overflow-x-auto">
//                 <table className="min-w-full border-separate border-spacing-0 text-sm">
//                   <thead>
//                     <tr>
//                       <Th className="w-10">&nbsp;</Th>
//                       <Th className="w-[45%] text-left">Supply Value</Th>
//                       <Th>IIIIIII</Th>
//                       <Th>CGST</Th>
//                       <Th>SGST</Th>
//                       <Th>CESS</Th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {"ABCDEFGH".split("").map((ch, idx) => (
//                       <tr key={ch} className="hover:bg-slate-50">
//                         <Td className="text-center font-medium">{ch}</Td>
//                         <Td className="text-left">{rowLabel(idx)}</Td>
//                         <Td align="right">003500</Td>
//                         <Td align="right">0.00</Td>
//                         <Td align="right">0.00</Td>
//                         <Td align="right">0.00</Td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>

//             {/* Right: Ledger */}
//             <div className="space-y-3">
//               <div className="rounded-2xl border bg-white p-4 shadow-sm">
//                 <div className="mb-3 flex items-center justify-between">
//                   <h3 className="text-sm font-semibold">Ledger Balances</h3>
//                   <button className="rounded-md border px-2 py-1 text-xs hover:bg-slate-50">Ledger Details</button>
//                 </div>
//                 <dl className="grid grid-cols-2 gap-3 text-sm">
//                   <LedgerItem label="Balance" value="0" />
//                   <LedgerItem label="Liability Ledger" value="0" />
//                   <LedgerItem label="Cash Ledger" value="0" />
//                   <LedgerItem label="Credit Ledger" value="0" />
//                 </dl>

//                 <div className="mt-3 space-y-2">
//                   <button className="w-full rounded-md border px-3 py-2 text-sm hover:bg-slate-50">PMT09</button>
//                   <button className="w-full rounded-md border px-3 py-2 text-sm hover:bg-slate-50">Late Fees +</button>
//                   <div className="grid grid-cols-2 gap-2">
//                     <button className="rounded-md border px-3 py-2 text-sm hover:bg-slate-50">Annual Return (GSTR-9)</button>
//                     <button className="rounded-md border px-3 py-2 text-sm hover:bg-slate-50">GSTR-4C</button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </section>
//         </main>
//       </div>
//     </div>
//   );
// }

// function Filter({ label, options }) {
//   return (
//     <label className="flex flex-col gap-1">
//       <span className="text-xs font-medium text-slate-600">{label}</span>
//       <select className="rounded-lg border bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500">
//         {options.map((opt) => (
//           <option key={opt}>{opt}</option>
//         ))}
//       </select>
//     </label>
//   );
// }

// function ActionBtn({ children, variant = "ghost" }) {
//   const styles = {
//     ghost: "border bg-white hover:bg-slate-50",
//     secondary: "border bg-white hover:bg-slate-50",
//     primary: "bg-blue-600 text-white hover:bg-blue-700 border border-blue-600",
//   } ;

//   return (
//     <button className={`rounded-lg px-4 py-2 text-sm font-medium ${styles[variant]}`}>{children}</button>
//   );
// }

// function StatusPill({ label, dot = false }) {
//   return (
//     <span className="inline-flex items-center gap-2 rounded-md bg-white px-3 py-1.5 text-xs font-medium text-slate-700">
//       {dot && <span className="h-2 w-2 rounded-full bg-red-500" />}
//       {label}
//     </span>
//   );
// }

// function Th({ children, className = "" }) {
//   return (
//     <th className={`sticky top-0 z-10 border-b bg-slate-50 px-3 py-2 text-center font-semibold ${className}`}>{children}</th>
//   );
// }

// function Td({ children, align = "left", className = "" }) {
//   return (
//     <td className={`border-b px-3 py-2 text-${align} ${className}`}>{children}</td>
//   );
// }

// function LedgerItem({ label, value }) {
//   return (
//     <div className="flex items-center justify-between rounded-md border px-3 py-2">
//       <dt className="text-slate-600">{label}</dt>
//       <dd className="font-semibold">{value}</dd>
//     </div>
//   );
// }

// function rowLabel(i) {
//   const labels = [
//     "Utilized ITC Balance",
//     "Net Tax Liability on Outward Supply (A-C)",
//     "Add: Tax Liability from Inward Supply",
//     "Total Tax Payable in Cash (D+E)",
//     "Less: Utilized Cash Balance",
//     "Balance GST Due (F-D)",
//     "—",
//     "—",
//   ];
//   return labels[i] ?? "";
// }

"use client"
import GSTR from "@/components/pagesComponents/dashboard/GSTR/GSTR.Component";
import { useState, useEffect } from "react";

export default function GSTRDashboard() {
  const [activeMenu, setActiveMenu] = useState("Easy GST Return");
  const [activeTab, setActiveTab] = useState("outward");

  // Filters
  const [fy, setFy] = useState("2024-25");
  const [period, setPeriod] = useState("Q1");
  const [month, setMonth] = useState("April");
  const [regType, setRegType] = useState("regular");
  const [retType, setRetType] = useState("GSTR-1");

  // Remote data
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const d = await fetchReturns({ fy, period, month, regType, retType });
      setData(d);
    } catch (e) {
      setError(e?.message ?? "Failed to load");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, [fy, period, month, regType, retType]);

  // return (
  //   <div className="min-h-screen w-full bg-slate-50 text-slate-800">
  //     {/* Top bar */}
  //     <header className="sticky top-0 z-30 border-b bg-white/80 backdrop-blur">
  //       <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
  //         <div className="flex items-center gap-3">
  //           <div className="h-8 w-8 rounded bg-blue-600" />
  //           <div className="text-lg font-semibold tracking-tight">iTax Easy</div>
  //         </div>
  //         <nav className="hidden items-center gap-6 md:flex">
  //           {[
  //             "Our Products",
  //             "Easy Services",
  //             "Financial Calculators",
  //             "Blog",
  //             "Register a Startup",
  //             "APIs",
  //             "Downloads",
  //           ].map((item) => (
  //             <a key={item} className="text-sm text-slate-600 hover:text-slate-900" href="#">
  //               {item}
  //             </a>
  //           ))}
  //         </nav>
  //         <div className="flex items-center gap-3">
  //           <button className="rounded-full border px-3 py-1.5 text-sm">Help</button>
  //           <div className="h-8 w-8 rounded-full bg-slate-200" />
  //         </div>
  //       </div>
  //     </header>

  //     <div className="mx-auto grid max-w-7xl grid-cols-1 md:grid-cols-[260px,1fr]">
  //       {/* Sidebar */}
  //       <aside className="border-r bg-white">
  //         <div className="flex items-center gap-2 border-b p-3">
  //           <button className="rounded-md border p-2 hover:bg-slate-50" aria-label="Collapse sidebar">≡</button>
  //           <span className="text-sm font-medium text-slate-600">Menu</span>
  //         </div>
  //         <nav className="p-3 text-sm">
  //           {[
  //             "Dashboard",
  //             "MyAccount",
  //             "Easy GST Return",
  //             "Easy ITR",
  //             "Easy Investment",
  //             "Invoice",
  //             "Finance",
  //             "Transaction",
  //             "Report",
  //             "Billpayment",
  //             "Manage Cart",
  //           ].map((item) => (
  //             <button
  //               key={item}
  //               onClick={() => setActiveMenu(item)}
  //               className={`mb-1 flex w-full items-center gap-3 rounded-lg px-3 py-2 transition ${
  //                 activeMenu === item
  //                   ? "bg-blue-600 text-white shadow"
  //                   : "hover:bg-slate-100"
  //               }`}
  //             >
  //               <span className="inline-flex h-5 w-5 items-center justify-center rounded bg-slate-200 text-[11px] font-bold">{item[0]}</span>
  //               <span>{item}</span>
  //             </button>
  //           ))}
  //         </nav>
  //       </aside>

  //       {/* Main content */}
  //       <main className="p-4 md:p-6">
  //         {/* Filters Card */}
  //         <section className="rounded-2xl border bg-white p-4 shadow-sm">
  //           <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-5">
  //             <Filter label="F.Y:" value={fy} onChange={setFy} options={["2024-25","2023-24","2022-23"]} />
  //             <Filter label="Period Range:" value={period} onChange={setPeriod} options={["Q1","Q2","Q3","Q4"]} />
  //             <Filter label="Month:" value={month} onChange={setMonth} options={["April","May","June","July"]} />
  //             <Filter label="Registration Type:" value={regType} onChange={setRegType} options={["regular","composition"]} />
  //             <Filter label="Return:" value={retType} onChange={setRetType} options={["GSTR-1","GSTR-3B","GSTR-9"]} />
  //           </div>

  //           <div className="mt-4 flex flex-wrap gap-3">
  //             <ActionBtn onClick={load}>Check Return Status</ActionBtn>
  //             <ActionBtn variant="secondary">Payment Information</ActionBtn>
  //             <ActionBtn variant="secondary">Registration Details</ActionBtn>
  //             <ActionBtn variant="primary">Login</ActionBtn>
  //           </div>
  //         </section>

  //         {/* Status bar */}
  //         <section className="mt-4 rounded-xl border bg-slate-100 p-2 text-sm md:text-[13px]">
  //           <div className="flex flex-wrap items-center gap-x-8 gap-y-2 px-2">
  //             <StatusPill label={`GSTR-1 filing is ${data?.statuses.gstr1Pending ? "pending" : "up to date"}`} />
  //             <StatusPill label={`GSTR-3B filing is ${data?.statuses.gstr3bPending ? "pending" : "up to date"}`} dot={data?.statuses.gstr3bPending} />
  //             <StatusPill label={`GSTR-9 filing is ${data?.statuses.gstr9Pending ? "pending" : "up to date"}`} dot={data?.statuses.gstr9Pending} />
  //             <StatusPill label="EasyInvoice" />
  //           </div>
  //         </section>

  //         {/* Content grid */}
  //         <section className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-[1fr,320px]">
  //           {/* Left: tabs + table */}
  //           <div className="rounded-2xl border bg-white p-4 shadow-sm">
  //             {/* Tabs */}
  //             <div className="flex items-center gap-3">
  //               <button
  //                 onClick={() => setActiveTab("outward")}
  //                 className={`rounded-md border px-3 py-1.5 text-sm font-medium ${
  //                   activeTab === "outward" ? "bg-blue-600 text-white" : "bg-slate-50 hover:bg-slate-100"
  //                 }`}
  //               >
  //                 Outward Supplies
  //               </button>
  //               <button
  //                 onClick={() => setActiveTab("inward")}
  //                 className={`rounded-md border px-3 py-1.5 text-sm font-medium ${
  //                   activeTab === "inward" ? "bg-blue-600 text-white" : "bg-slate-50 hover:bg-slate-100"
  //                 }`}
  //               >
  //                 Inward Supplies
  //               </button>
  //             </div>

  //             {loading && <div className="mt-4 text-sm text-slate-500">Loading…</div>}
  //             {error && <div className="mt-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>}

  //             {data && (
  //               <div className="mt-4 overflow-x-auto">
  //                 <table className="min-w-full border-separate border-spacing-0 text-sm">
  //                   <thead>
  //                     <tr>
  //                       <Th className="w-10">&nbsp;</Th>
  //                       <Th className="w-[45%] text-left">Supply Value</Th>
  //                       <Th>IGST</Th>
  //                       <Th>CGST</Th>
  //                       <Th>SGST</Th>
  //                       <Th>CESS</Th>
  //                     </tr>
  //                   </thead>
  //                   <tbody>
  //                     {data.rows.map((r, idx) => (
  //                       <tr key={idx} className="hover:bg-slate-50">
  //                         <Td className="text-center font-medium">{r.code}</Td>
  //                         <Td className="text-left">{r.label}</Td>
  //                         <Td align="right">{fmt(r.igst)}</Td>
  //                         <Td align="right">{fmt(r.cgst)}</Td>
  //                         <Td align="right">{fmt(r.sgst)}</Td>
  //                         <Td align="right">{fmt(r.cess)}</Td>
  //                       </tr>
  //                     ))}
  //                   </tbody>
  //                 </table>
  //               </div>
  //             )}
  //           </div>

  //           {/* Right: Ledger */}
  //           <div className="space-y-3">
  //             <div className="rounded-2xl border bg-white p-4 shadow-sm">
  //               <div className="mb-3 flex items-center justify-between">
  //                 <h3 className="text-sm font-semibold">Ledger Balances</h3>
  //                 <button className="rounded-md border px-2 py-1 text-xs hover:bg-slate-50">Ledger Details</button>
  //               </div>

  //               {data ? (
  //                 <dl className="grid grid-cols-2 gap-3 text-sm">
  //                   <LedgerItem label="Balance" value={fmt(data.ledger.balance)} />
  //                   <LedgerItem label="Liability Ledger" value={fmt(data.ledger.liability)} />
  //                   <LedgerItem label="Cash Ledger" value={fmt(data.ledger.cash)} />
  //                   <LedgerItem label="Credit Ledger" value={fmt(data.ledger.credit)} />
  //                 </dl>
  //               ) : (
  //                 <div className="text-sm text-slate-500">No data</div>
  //               )}

  //               <div className="mt-3 space-y-2">
  //                 <button className="w-full rounded-md border px-3 py-2 text-sm hover:bg-slate-50">PMT09</button>
  //                 <button className="w-full rounded-md border px-3 py-2 text-sm hover:bg-slate-50">Late Fees +</button>
  //                 <div className="grid grid-cols-2 gap-2">
  //                   <button className="rounded-md border px-3 py-2 text-sm hover:bg-slate-50">Annual Return (GSTR-9)</button>
  //                   <button className="rounded-md border px-3 py-2 text-sm hover:bg-slate-50">GSTR-4C</button>
  //                 </div>
  //               </div>
  //             </div>
  //           </div>
  //         </section>
  //       </main>
  //     </div>
  //   </div>
  // );

  return <GSTR />
}



// --- Helpers ---
function fmt(n) {
  const num = typeof n === "string" ? Number(n) : n;
  return num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

async function fetchReturns(filters) {
  await new Promise((r) => setTimeout(r, 300));

  const seed = (filters.fy + filters.period + filters.month + filters.regType + filters.retType)
    .split("")
    .reduce((a, c) => a + c.charCodeAt(0), 0);

  function n(mult = 1) {
    return Math.round(((seed % 97) + 13) * mult * 10) / 10;
  }

  const base = n(1000);
  const outward = [
    { code: "A", label: "Utilized ITC Balance", igst: n(1.2), cgst: n(1.1), sgst: n(1.05), cess: n(0.2) },
    { code: "B", label: "Net Tax Liability on Outward Supply (A-C)", igst: n(1.6), cgst: n(1.4), sgst: n(1.3), cess: n(0.3) },
    { code: "C", label: "Add: Tax Liability from Inward Supply", igst: n(0.9), cgst: n(0.8), sgst: n(0.7), cess: n(0.2) },
    { code: "D", label: "Total Tax Payable in Cash (D+E)", igst: n(1.1), cgst: n(1.0), sgst: n(0.95), cess: n(0.25) },
    { code: "E", label: "Less: Utilized Cash Balance", igst: n(0.7), cgst: n(0.6), sgst: n(0.6), cess: n(0.15) },
    { code: "F", label: "Balance GST Due (F-D)", igst: n(0.5), cgst: n(0.5), sgst: n(0.45), cess: n(0.1) },
    { code: "G", label: "—", igst: 0, cgst: 0, sgst: 0, cess: 0 },
    { code: "H", label: "—", igst: 0, cgst: 0, sgst: 0, cess: 0 },
  ];

  const inward = outward.map((r) => ({
    ...r,
    igst: r.igst * 0.6,
    cgst: r.cgst * 0.6,
    sgst: r.sgst * 0.6,
    cess: r.cess * 0.6
  }));

  const rows = filters.retType === "GSTR-1" ? outward : inward;

  const ledger = {
    balance: base - n(120),
    liability: n(220),
    cash: n(180),
    credit: n(140),
  };

  return {
    statuses: {
      gstr1Pending: n() % 2 > 1,
      gstr3bPending: n() % 3 > 1,
      gstr9Pending: n() % 5 > 1,
    },
    rows,
    ledger,
  };
}

function Filter({ label, options, value, onChange }) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-xs font-medium text-slate-600">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="rounded-lg border bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500">
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </label>
  );
}

function ActionBtn({ children, variant = "ghost", onClick }) {
  const styles = {
    ghost: "border bg-white hover:bg-slate-50",
    secondary: "border bg-white hover:bg-slate-50",
    primary: "bg-blue-600 text-white hover:bg-blue-700 border border-blue-600",
  };
  return (
    <button onClick={onClick} className={`rounded-lg px-4 py-2 text-sm font-medium ${styles[variant]}`}>
      {children}
    </button>
  );
}

function StatusPill({ label, dot = false }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-md bg-white px-3 py-1.5 text-xs font-medium text-slate-700">
      {dot && <span className="h-2 w-2 rounded-full bg-red-500" />}
      {label}
    </span>
  );
}

function Th({ children, className = "" }) {
  return (
    <th className={`sticky top-0 z-10 border-b bg-slate-50 px-3 py-2 text-center font-semibold ${className}`}>{children}</th>
  );
}

function Td({ children, align = "left", className = "" }) {
  return <td className={`border-b px-3 py-2 text-${align} ${className}`}>{children}</td>;
}

function LedgerItem({ label, value }) {
  return (
    <div className="flex items-center justify-between rounded-md border px-3 py-2">
      <dt className="text-slate-600">{label}</dt>
      <dd className="font-semibold">{value}</dd>
    </div>
  );
}