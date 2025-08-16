import React from "react";

export default function LedgerItem({ label, value }) {
    return (
        <>
            <dt className="font-semibold">{label}</dt>
            <dd>{value}</dd>
        </>
    );
}
