import React from "react";

export default function Filter({ label, value, onChange, options }) {
    return (
        <label className="flex flex-nowrap text-xs">
            <span className="mb-1 font-semibold flex items-center justify-center flex-nowrap px-2">{label}</span>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="rounded border px-2 py-1 min-w-max"
            >
                {options.map((opt) => (
                    <option key={opt} value={opt}>
                        {opt}
                    </option>
                ))}
            </select>
        </label>
    );
}
