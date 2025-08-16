// import React from "react";

// const menuItems = [
//     "Dashboard",
//     "MyAccount",
//     "Easy GST Return",
//     "Easy ITR",
//     "Easy Investment",
//     "Invoice",
//     "Finance",
//     "Transaction",
//     "Report",
//     "Billpayment",
//     "Manage Cart",
// ];

// export default function Sidebar({ isOpen, activeMenu, setActiveMenu, toggleSidebar }) {
//     return (
//         <aside
//             className={`bg-white border-r flex flex-col transition-width duration-300 ${isOpen ? "w-[260px]" : "w-16"
//                 } min-h-screen`}
//         >
//             <div className="flex items-center gap-2 border-b p-3">
//                 <button
//                     onClick={toggleSidebar}
//                     className="rounded-md border p-2 hover:bg-slate-50"
//                     aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
//                 >
//                     ≡
//                 </button>
//                 {isOpen && (
//                     <span className="text-sm font-medium text-slate-600">Menu</span>
//                 )}
//             </div>

//             <nav className="flex-1 p-3 text-sm overflow-y-auto">
//                 {menuItems.map((item) => (
//                     <button
//                         key={item}
//                         onClick={() => setActiveMenu(item)}
//                         className={`mb-1 flex items-center gap-3 rounded-lg px-3 py-2 w-full transition
//               ${activeMenu === item
//                                 ? "bg-blue-600 text-white shadow"
//                                 : "hover:bg-slate-100 text-slate-800"
//                             }
//             `}
//                         title={item} // Tooltip on collapsed
//                     >
//                         <span
//                             className={`inline-flex h-5 w-5 items-center justify-center rounded bg-slate-200 text-[11px] font-bold flex-shrink-0
//                 ${activeMenu === item ? "bg-white text-blue-600" : ""}
//               `}
//                         >
//                             {item[0]}
//                         </span>
//                         {isOpen && <span>{item}</span>}
//                     </button>
//                 ))}
//             </nav>
//         </aside>
//     );
// }

"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "MyAccount", href: "/myaccount" },
    { label: "Easy GST Return", href: "/gst-return" },
    { label: "Easy ITR", href: "/easy-itr" },
    { label: "Easy Investment", href: "/investment" },
    { label: "Invoice", href: "/invoice" },
    { label: "Finance", href: "/finance" },
    { label: "Transaction", href: "/transaction" },
    { label: "Report", href: "/report" },
    { label: "Billpayment", href: "/billpayment" },
    { label: "Manage Cart", href: "/cart" },
];

export default function Sidebar({ isOpen, toggleSidebar }) {
    const pathname = usePathname();

    return (
        <aside
            className={`bg-white border-r flex flex-col transition-all duration-300 ${isOpen ? "w-[260px]" : "w-16"
                } min-h-screen`}
        >
            {/* Header */}
            <div className="flex items-center gap-2 border-b p-3">
                <button
                    onClick={toggleSidebar}
                    className="rounded-md border p-2 hover:bg-slate-50"
                    aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
                >
                    ≡
                </button>
                {isOpen && (
                    <span className="text-sm font-medium text-slate-600">Menu</span>
                )}
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-3 text-sm overflow-y-auto">
                {menuItems.map(({ label, href }) => {
                    const isActive = pathname === href;

                    return (
                        <Link
                            key={href}
                            href={href}
                            className={`mb-1 flex items-center gap-3 rounded-lg px-3 py-2 w-full transition ${isActive
                                    ? "bg-blue-600 text-white shadow"
                                    : "hover:bg-slate-100 text-slate-800"
                                }`}
                            title={label}
                        >
                            <span
                                className={`inline-flex h-5 w-5 items-center justify-center rounded bg-slate-200 text-[11px] font-bold flex-shrink-0 ${isActive ? "bg-white text-blue-600" : ""
                                    }`}
                            >
                                {label[0]}
                            </span>
                            {isOpen && <span>{label}</span>}
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}
