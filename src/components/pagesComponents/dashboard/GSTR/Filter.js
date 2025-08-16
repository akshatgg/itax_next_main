import React from "react";

export default function Filter({ label, value, onChange, options }) {
    return (
        <label className="flex flex-col text-sm">
            <span className="mb-1 font-semibold">{label}</span>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="rounded border px-2 py-1"
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
