import React from "react";

export function Th({ children, className = "" }) {
    return (
        <th
            className={`border-b border-slate-200 px-3 py-2 text-left font-semibold text-slate-700 ${className}`}
        >
            {children}
        </th>
    );
}

export function Td({ children, align = "left", className = "" }) {
    return (
        <td
            className={`border-b border-slate-100 px-3 py-2 text-${align} text-slate-600 ${className}`}
        >
            {children}
        </td>
    );
}
