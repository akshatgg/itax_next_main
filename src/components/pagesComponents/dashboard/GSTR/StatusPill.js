import React from "react";

export default function StatusPill({ label, dot }) {
    return (
        <div className="flex items-center gap-2 rounded-lg bg-white px-3 py-1 shadow-sm">
            {dot && <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>}
            <span>{label}</span>
        </div>
    );
}
