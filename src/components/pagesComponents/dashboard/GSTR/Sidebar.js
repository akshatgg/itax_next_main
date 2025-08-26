
"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    NotebookPen,
    User,
    FileText,
    CreditCard,
    BarChart,
    ReceiptIndianRupee
} from "lucide-react";

const menuItems = [
    { label: "MyAccount", href: "/myaccount", icon: User, color: "text-green-400" },
    { label: "GSTR 1", href: "/gst-dashboard/gstr1", icon: NotebookPen, color: "text-red-300" },
    { label: "GSTR 2A", href: "/gst-dashboard/gstr2A", icon: NotebookPen, color: "text-green-300" },
    { label: "GSTR 2B", href: "/gst-dashboard/gstr2B", icon: NotebookPen, color: "text-purple-400" },
    { label: "GSTR 3", href: "/gst-dashboard/gstr3", icon: NotebookPen, color: "text-orange-400" },
    { label: "GSTR 4", href: "/gst-dashboard/gstr4", icon: NotebookPen, color: "text-yellow-400" },
    { label: "Transaction", href: "/gst-dashboard/transaction", icon: CreditCard, color: "text-teal-400" },
    { label: "Report", href: "/gst-dashboard/report", icon: BarChart, color: "text-cyan-300" },
    { label: "Bill Payment", href: "/gst-dashboard/billpayment", icon: ReceiptIndianRupee, color: "text-white-400" },
];

export default function Sidebar({ isOpen, toggleSidebar }) {
    const pathname = usePathname();

    return (
        <aside
            className={`${isOpen ? "w-[200px]" : "w-16"
                } bg-gradient-to-b from-blue-800 to-blue-700 text-white border-r border-blue-700 rounded-r-3xl flex flex-col transition-all duration-300 min-h-screen`}
        >
            {/* Header */}
            <div className="flex items-center gap-2 border-b border-blue-800 p-2">
                <button
                    onClick={toggleSidebar}
                    className="rounded-md border border-blue-600 bg-blue-800 px-2 mx-1 hover:bg-blue-600 text-white text-lg"
                    aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
                >
                    {isOpen ? "×" : "≡"}
                </button>
                {isOpen && (
                    <span className="text-sm font-semibold tracking-wide text-blue-100">
                        GST Dashboard
                    </span>
                )}
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-1 text-sm overflow-y-auto">
                {menuItems.map(({ label, href, icon: Icon, color }) => {
                    const isActive =
                        pathname === href || pathname.startsWith(href + "/");

                    return (
                        <Link
                            key={href}
                            href={href}
                            className={`mb-1 flex items-center gap-1 rounded-lg px-2 py-1 w-full transition ${isActive
                                ? "bg-blue-500 text-white shadow-lg"
                                : "hover:bg-blue-600 text-blue-100"
                                }`}
                            title={label}
                        >
                            <span
                                className={`flex h-7 w-7 items-center justify-center rounded-md ${isActive ? "bg-white text-blue-700" : "bg-blue-800"
                                    }`}
                            >
                                <Icon size={16} className={color} />
                            </span>
                            {isOpen && <span className="font-medium">{label}</span>}
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}
