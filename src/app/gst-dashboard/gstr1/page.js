
"use client"
import React from "react";

export default function GSTR1Page() {
    // ------- App State -------
    const [taxpayer, setTaxpayer] = React.useState({
        gstin: "23DNNPS19100QZG",
        legalName: "AAR PHARMACY",
        fy: "2024-25",
        period: "Apr-2025",
        pos: "23-Madhya Pradesh",
    });

    // B2B Invoices (4A,4B,4C,6B,6C)
    const [b2b, setB2b] = React.useState([
        {
            id: uid(),
            invoiceNo: "A-1001",
            invoiceDate: today(),
            recipientGSTIN: "27ABCDE1234F1Z5",
            placeOfSupply: "27-Maharashtra",
            isReverseCharge: false,
            isSEZ: false,
            invoiceValue: 10000,
            taxableValue: 10000,
            taxRate: 18,
            isIntra: false, // inter-state => IGST
        },
    ]);

    // B2C Large (>2.5L inter-state) (5A,5B)
    const [b2cLarge, setB2cLarge] = React.useState([
        {
            id: uid(),
            placeOfSupply: "29-Karnataka",
            invoiceNo: "B-5001",
            invoiceDate: today(),
            invoiceValue: 300000,
            taxableValue: 300000,
            taxRate: 12,
        },
    ]);

    // B2C Others (7)
    const [b2cOthers, setB2cOthers] = React.useState([
        {
            id: uid(),
            type: "Intra", // Intra => CGST+SGST; Inter => IGST
            placeOfSupply: "23-Madhya Pradesh",
            taxableValue: 5000,
            taxRate: 5,
        },
    ]);

    // Exports (6A) — with/without payment of tax
    const [exportsRows, setExportsRows] = React.useState([
        {
            id: uid(),
            exportType: "WPAY", // WPAY / WOPAY
            portCode: "INNSA1",
            shippingBillNo: "SB12345",
            shippingBillDate: today(),
            invoiceNo: "EXP-01",
            invoiceDate: today(),
            invoiceValue: 75000,
            taxableValue: 75000,
            taxRate: 0,
        },
    ]);

    // HSN Summary (12)
    const [hsnSummary, setHsnSummary] = React.useState([
        {
            id: uid(),
            hsn: "3004",
            description: "Medicaments",
            uqc: "NOS",
            qty: 120,
            taxableValue: 150000,
            taxRate: 12,
        },
    ]);

    // Nil/Exempt/Non-GST (8)
    const [nilRated, setNilRated] = React.useState({
        intrastate: 0,
        interstate: 0,
    });

    // Documents Issued (13)
    const [docsIssued, setDocsIssued] = React.useState([
        { id: uid(), docType: "Invoice", series: "A", from: 1, to: 120, cancelled: 2 },
    ]);

    // ------- Derived Totals -------
    const totals = React.useMemo(() => {
        const t = {
            taxable: 0,
            igst: 0,
            cgst: 0,
            sgst: 0,
            cess: 0,
            invoiceValue: 0,
        };

        // B2B
        b2b.forEach((r) => {
            const { igst, cgst, sgst } = splitTax(r.taxableValue, r.taxRate, !r.isIntra);
            t.taxable += num(r.taxableValue);
            t.invoiceValue += num(r.invoiceValue || r.taxableValue);
            t.igst += igst; t.cgst += cgst; t.sgst += sgst;
        });

        // B2C Large => inter-state; all IGST
        b2cLarge.forEach((r) => {
            const { igst } = splitTax(r.taxableValue, r.taxRate, true);
            t.taxable += num(r.taxableValue);
            t.invoiceValue += num(r.invoiceValue || r.taxableValue);
            t.igst += igst;
        });

        // B2C Others (could be intra or inter)
        b2cOthers.forEach((r) => {
            const isInter = r.type !== "Intra";
            const { igst, cgst, sgst } = splitTax(r.taxableValue, r.taxRate, isInter);
            t.taxable += num(r.taxableValue);
            t.invoiceValue += num(r.taxableValue);
            t.igst += igst; t.cgst += cgst; t.sgst += sgst;
        });

        // Exports: usually 0%/ LUT (WOPAY) or IGST (WPAY)
        exportsRows.forEach((r) => {
            const isInter = true;
            const { igst } = splitTax(r.taxableValue, r.taxRate, isInter);
            t.taxable += num(r.taxableValue);
            t.invoiceValue += num(r.invoiceValue || r.taxableValue);
            t.igst += igst;
        });

        // HSN Summary taxes (informative — don’t double count into invoiceValue)
        hsnSummary.forEach((r) => {
            // skip — already captured in invoices; keep this for UI display only
        });

        return mapFixed(t);
    }, [b2b, b2cLarge, b2cOthers, exportsRows, hsnSummary]);

    // ------- Handlers -------
    function addRow(setter, sample) { setter((s) => [...s, { id: uid(), ...sample }]); }
    function removeRow(setter, id) { setter((s) => s.filter((x) => x.id !== id)); }
    function updateRow(setter, id, patch) {
        setter((s) => s.map((row) => (row.id === id ? { ...row, ...patch } : row)));
    }

    function downloadJSON() {
        const payload = buildGSTR1Payload({ taxpayer, b2b, b2cLarge, b2cOthers, exportsRows, hsnSummary, nilRated, docsIssued, totals });
        const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `GSTR1_${taxpayer.gstin}_${taxpayer.period.replace(/\s+/g, "_")}.json`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
    }

    function validate() {
        const errors = [];
        if (!/^[0-9A-Z]{15}$/.test(taxpayer.gstin)) errors.push("Invalid GSTIN format");
        if (!taxpayer.legalName) errors.push("Legal Name required");

        b2b.forEach((r, i) => {
            if (!/^[0-9A-Z]{15}$/.test(r.recipientGSTIN)) errors.push(`B2B row ${i + 1}: invalid Recipient GSTIN`);
            if (!r.invoiceNo) errors.push(`B2B row ${i + 1}: invoice no required`);
        });

        if (errors.length) {
            alert("Please fix the following issues:\n" + errors.map((e) => `• ${e}`).join("\n"));
            return false;
        }
        alert("Basic validation passed ✔️");
        return true;
    }

    // ------- UI -------
    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-violet-900 text-white">
                <div className="mx-auto max-w-7xl px-4 py-4 flex flex-wrap items-center justify-between gap-4">
                    <div className="text-lg font-semibold">GSTR-1 — Return for Outward Supplies</div>
                    <div className="flex items-center gap-2 text-sm">
                        <span className="opacity-90">FY</span>
                        <select className="rounded-md bg-white/10 px-2 py-1" value={taxpayer.fy} onChange={(e) => setTaxpayer({ ...taxpayer, fy: e.target.value })}>
                            {FY_OPTIONS.map((x) => (<option key={x} value={x}>{x}</option>))}
                        </select>
                        <span className="opacity-90">Period</span>
                        <select className="rounded-md bg-white/10 px-2 py-1" value={taxpayer.period} onChange={(e) => setTaxpayer({ ...taxpayer, period: e.target.value })}>
                            {PERIODS.map((x) => (<option key={x} value={x}>{x}</option>))}
                        </select>
                        <button className="ml-3 rounded-lg bg-green-400/90 hover:bg-green-400 px-3 py-1.5 text-sm font-medium" onClick={() => alert('Exit action here')}>Exit</button>
                    </div>
                </div>
            </header>

            <main className="mx-auto max-w-7xl p-4 md:p-6">
                {/* Taxpayer Block */}
                <section className="rounded-2xl border bg-white shadow-sm p-4 md:p-6 mb-6">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        <Field label="GSTIN" value={taxpayer.gstin} onChange={(v) => setTaxpayer({ ...taxpayer, gstin: v })} readOnly={false} />
                        <Field label="Legal Name" value={taxpayer.legalName} onChange={(v) => setTaxpayer({ ...taxpayer, legalName: v })} />
                        <SelectField label="Place of Business (POS)" value={taxpayer.pos} onChange={(v) => setTaxpayer({ ...taxpayer, pos: v })} options={POS_OPTIONS} />
                    </div>
                </section>

                {/* Grid: Left content + right summary */}
                <div className="grid lg:grid-cols-[1fr_320px] gap-6">
                    <div className="space-y-6">
                        {/* B2B */}
                        <Card title="B2B Invoices (4A,4B,4C,6B,6C)" subtitle="Registered recipients — inter/intra, with tax breakup">
                            <RowTable
                                columns={[
                                    { key: 'invoiceNo', label: 'Invoice No', w: 'w-32' },
                                    { key: 'invoiceDate', label: 'Date', type: 'date', w: 'w-36' },
                                    { key: 'recipientGSTIN', label: 'Recipient GSTIN', w: 'w-48' },
                                    { key: 'placeOfSupply', label: 'POS', type: 'select', options: POS_OPTIONS },
                                    { key: 'isIntra', label: 'Intra?', type: 'checkbox' },
                                    { key: 'taxableValue', label: 'Taxable', type: 'number', w: 'w-28' },
                                    { key: 'taxRate', label: 'Rate %', type: 'number', w: 'w-24' },
                                ]}
                                rows={b2b}
                                onAdd={() => addRow(setB2b, { invoiceNo: '', invoiceDate: today(), recipientGSTIN: '', placeOfSupply: taxpayer.pos, isReverseCharge: false, isSEZ: false, invoiceValue: 0, taxableValue: 0, taxRate: 18, isIntra: true })}
                                onRemove={(id) => removeRow(setB2b, id)}
                                onChange={(id, patch) => updateRow(setB2b, id, patch)}
                                footer={(rows) =>
                                    <TotalsFoot cells={[
                                        'Totals', '', '', '', '',
                                        fmt(sum(rows, 'taxableValue')),
                                        fmt(sum(rows, 'taxRate', 'avg')),
                                    ]} />
                                }
                            />
                        </Card>

                        {/* B2C Large */}
                        <Card title="B2C Large (5A,5B)" subtitle="> ₹2.5 lakh inter-state invoices to unregistered persons">
                            <RowTable
                                columns={[
                                    { key: 'invoiceNo', label: 'Invoice No', w: 'w-32' },
                                    { key: 'invoiceDate', label: 'Date', type: 'date', w: 'w-36' },
                                    { key: 'placeOfSupply', label: 'POS', type: 'select', options: POS_OPTIONS },
                                    { key: 'invoiceValue', label: 'Invoice Value', type: 'number', w: 'w-32' },
                                    { key: 'taxableValue', label: 'Taxable', type: 'number', w: 'w-28' },
                                    { key: 'taxRate', label: 'Rate %', type: 'number', w: 'w-24' },
                                ]}
                                rows={b2cLarge}
                                onAdd={() => addRow(setB2cLarge, { placeOfSupply: taxpayer.pos, invoiceNo: '', invoiceDate: today(), invoiceValue: 0, taxableValue: 0, taxRate: 12 })}
                                onRemove={(id) => removeRow(setB2cLarge, id)}
                                onChange={(id, patch) => updateRow(setB2cLarge, id, patch)}
                                footer={(rows) =>
                                    <TotalsFoot cells={['Totals', '', '', fmt(sum(rows, 'invoiceValue')), fmt(sum(rows, 'taxableValue')), fmt(sum(rows, 'taxRate', 'avg'))]} />
                                }
                            />
                        </Card>

                        {/* B2C Others */}
                        <Card title="B2C Others (7)" subtitle="Other supplies to unregistered — intra/inter">
                            <RowTable
                                columns={[
                                    { key: 'type', label: 'Type', type: 'select', options: ['Intra', 'Inter'] },
                                    { key: 'placeOfSupply', label: 'POS', type: 'select', options: POS_OPTIONS },
                                    { key: 'taxableValue', label: 'Taxable', type: 'number', w: 'w-28' },
                                    { key: 'taxRate', label: 'Rate %', type: 'number', w: 'w-24' },
                                ]}
                                rows={b2cOthers}
                                onAdd={() => addRow(setB2cOthers, { type: 'Intra', placeOfSupply: taxpayer.pos, taxableValue: 0, taxRate: 5 })}
                                onRemove={(id) => removeRow(setB2cOthers, id)}
                                onChange={(id, patch) => updateRow(setB2cOthers, id, patch)}
                                footer={(rows) =>
                                    <TotalsFoot cells={['Totals', '', fmt(sum(rows, 'taxableValue')), fmt(sum(rows, 'taxRate', 'avg'))]} />
                                }
                            />
                        </Card>

                        {/* Exports */}
                        {/* <Card title="Exports (6A)" subtitle="With/Without payment of tax">
                            <RowTable
                                columns=[
                            {key: 'exportType', label: 'Type', type: 'select', options: ['WPAY','WOPAY'] },
                            {key: 'portCode', label: 'Port Code', w: 'w-32' },
                            {key: 'shippingBillNo', label: 'SB No', w: 'w-32' },
                            {key: 'shippingBillDate', label: 'SB Date', type: 'date', w: 'w-36' },
                            {key: 'invoiceNo', label: 'Invoice No', w: 'w-32' },
                            {key: 'invoiceDate', label: 'Inv Date', type: 'date', w: 'w-36' },
                            {key: 'invoiceValue', label: 'Inv Value', type: 'number', w: 'w-28' },
                            {key: 'taxableValue', label: 'Taxable', type: 'number', w: 'w-28' },
                            {key: 'taxRate', label: 'Rate %', type: 'number', w: 'w-24' },
                            ]
                            rows={exportsRows}
                            onAdd={() => addRow(setExportsRows, { exportType: 'WOPAY', portCode: '', shippingBillNo: '', shippingBillDate: today(), invoiceNo: '', invoiceDate: today(), invoiceValue: 0, taxableValue: 0, taxRate: 0 })}
                            onRemove={(id) => removeRow(setExportsRows, id)}
                            onChange={(id, patch) => updateRow(setExportsRows, id, patch)}
                            footer={(rows) =>
                                <TotalsFoot cells={['Totals', '', '', '', '', '', fmt(sum(rows, 'invoiceValue')), fmt(sum(rows, 'taxableValue')), fmt(sum(rows, 'taxRate', 'avg'))]} />
                            }
              />
                        </Card> */}
                        {/* Exports */}
                        <Card title="Exports (6A)" subtitle="With/Without payment of tax">
                            <RowTable
                                columns={[
                                    { key: 'exportType', label: 'Type', type: 'select', options: ['WPAY', 'WOPAY'] },
                                    { key: 'portCode', label: 'Port Code', w: 'w-32' },
                                    { key: 'shippingBillNo', label: 'SB No', w: 'w-32' },
                                    { key: 'shippingBillDate', label: 'SB Date', type: 'date', w: 'w-36' },
                                    { key: 'invoiceNo', label: 'Invoice No', w: 'w-32' },
                                    { key: 'invoiceDate', label: 'Inv Date', type: 'date', w: 'w-36' },
                                    { key: 'invoiceValue', label: 'Inv Value', type: 'number', w: 'w-28' },
                                    { key: 'taxableValue', label: 'Taxable', type: 'number', w: 'w-28' },
                                    { key: 'taxRate', label: 'Rate %', type: 'number', w: 'w-24' },
                                ]}
                                rows={exportsRows}
                                onAdd={() =>
                                    addRow(setExportsRows, {
                                        exportType: 'WOPAY',
                                        portCode: '',
                                        shippingBillNo: '',
                                        shippingBillDate: today(),
                                        invoiceNo: '',
                                        invoiceDate: today(),
                                        invoiceValue: 0,
                                        taxableValue: 0,
                                        taxRate: 0,
                                    })
                                }
                                onRemove={(id) => removeRow(setExportsRows, id)}
                                onChange={(id, patch) => updateRow(setExportsRows, id, patch)}
                                footer={(rows) => (
                                    <TotalsFoot
                                        cells={[
                                            'Totals',
                                            '',
                                            '',
                                            '',
                                            '',
                                            '',
                                            fmt(sum(rows, 'invoiceValue')),
                                            fmt(sum(rows, 'taxableValue')),
                                            fmt(sum(rows, 'taxRate', 'avg')),
                                        ]}
                                    />
                                )}
                            />
                        </Card>


                        {/* Nil/Exempt */}
                        <Card title="Nil Rated / Exempt / Non-GST (8)" subtitle="Supplies attracting nil/exempt/non-GST">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <NumberField label="Intrastate" value={nilRated.intrastate} onChange={(v) => setNilRated({ ...nilRated, intrastate: v })} />
                                <NumberField label="Interstate" value={nilRated.interstate} onChange={(v) => setNilRated({ ...nilRated, interstate: v })} />
                            </div>
                        </Card>

                        {/* HSN Summary */}
                        <Card title="HSN-wise Summary (12)" subtitle="Summary of outward supplies by HSN">
                            <RowTable
                                columns={[
                                    { key: 'hsn', label: 'HSN', w: 'w-24' },
                                    { key: 'description', label: 'Description', w: 'w-56' },
                                    { key: 'uqc', label: 'UQC', w: 'w-24' },
                                    { key: 'qty', label: 'Qty', type: 'number', w: 'w-24' },
                                    { key: 'taxableValue', label: 'Taxable', type: 'number', w: 'w-28' },
                                    { key: 'taxRate', label: 'Rate %', type: 'number', w: 'w-24' },
                                ]}
                                rows={hsnSummary}
                                onAdd={() => addRow(setHsnSummary, { hsn: '', description: '', uqc: 'NOS', qty: 0, taxableValue: 0, taxRate: 0 })}
                                onRemove={(id) => removeRow(setHsnSummary, id)}
                                onChange={(id, patch) => updateRow(setHsnSummary, id, patch)}
                                footer={(rows) =>
                                    <TotalsFoot cells={['Totals', '', '', fmt(sum(rows, 'qty')), fmt(sum(rows, 'taxableValue')), fmt(sum(rows, 'taxRate', 'avg'))]} />
                                }
                            />
                        </Card>

                        {/* Documents Issued */}
                        <Card title="Documents Issued (13)" subtitle="Invoices/credit notes issued during the period">
                            <RowTable
                                columns={[
                                    { key: 'docType', label: 'Type', type: 'select', options: ['Invoice', 'Credit Note', 'Debit Note', 'Delivery Challan'] },
                                    { key: 'series', label: 'Series', w: 'w-20' },
                                    { key: 'from', label: 'From', type: 'number', w: 'w-24' },
                                    { key: 'to', label: 'To', type: 'number', w: 'w-24' },
                                    { key: 'cancelled', label: 'Cancelled', type: 'number', w: 'w-28' },
                                ]}
                                rows={docsIssued}
                                onAdd={() => addRow(setDocsIssued, { docType: 'Invoice', series: '', from: 0, to: 0, cancelled: 0 })}
                                onRemove={(id) => removeRow(setDocsIssued, id)}
                                onChange={(id, patch) => updateRow(setDocsIssued, id, patch)}
                                footer={(rows) =>
                                    <TotalsFoot cells={['Totals', '', '', '', fmt(sum(rows, 'cancelled'))]} />
                                }
                            />
                        </Card>
                    </div>

                    {/* Summary Panel */}
                    <aside className="rounded-2xl border bg-white shadow-sm p-4 h-fit sticky top-4">
                        <div className="text-base font-semibold mb-3">Summary</div>
                        <SummaryLine label="Taxable Value" value={totals.taxable} />
                        <SummaryLine label="IGST" value={totals.igst} />
                        <SummaryLine label="CGST" value={totals.cgst} />
                        <SummaryLine label="SGST" value={totals.sgst} />
                        <SummaryLine label="Cess" value={totals.cess} />
                        <div className="mt-3 h-px bg-gray-200" />
                        <SummaryLine label="Invoice Value" value={totals.invoiceValue} bold />

                        <div className="mt-5 flex flex-col gap-2">
                            <button className="rounded-lg bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 text-sm" onClick={() => alert('Saved as draft')}>Save as Draft</button>
                            <button className="rounded-lg bg-amber-500 hover:bg-amber-600 text-white px-3 py-2 text-sm" onClick={validate}>Validate</button>
                            <button className="rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-2 text-sm" onClick={downloadJSON}>Download JSON</button>
                            <button className="rounded-lg bg-violet-700 hover:bg-violet-800 text-white px-3 py-2 text-sm" onClick={() => alert('Upload to GSTN flow here')}>Upload to GSTN</button>
                        </div>
                    </aside>
                </div>
            </main>
        </div>
    );
}

// -------------- UI Building Blocks --------------
function Card({ title, subtitle, children }) {
    return (
        <section className="rounded-2xl border bg-white shadow-sm">
            <div className="border-b px-4 md:px-6 py-3">
                <div className="text-base font-semibold">{title}</div>
                {subtitle && <div className="text-xs text-gray-500 mt-0.5">{subtitle}</div>}
            </div>
            <div className="p-4 md:p-6">{children}</div>
        </section>
    );
}

function Field({ label, value, onChange, readOnly }) {
    return (
        <div>
            <label className="text-xs text-gray-600">{label}</label>
            <input
                value={value}
                readOnly={readOnly}
                onChange={(e) => onChange && onChange(e.target.value)}
                className="mt-1 w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400"
                placeholder={label}
            />
        </div>
    );
}

function NumberField({ label, value, onChange }) {
    return (
        <div>
            <label className="text-xs text-gray-600">{label}</label>
            <input
                type="number"
                value={value}
                onChange={(e) => onChange(num(e.target.value))}
                className="mt-1 w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400"
                placeholder={label}
            />
        </div>
    );
}

function SelectField({ label, value, onChange, options }) {
    return (
        <div>
            <label className="text-xs text-gray-600">{label}</label>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="mt-1 w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400 bg-white"
            >
                {options.map((o) => (
                    <option key={o} value={o}>{o}</option>
                ))}
            </select>
        </div>
    );
}

function TotalsFoot({ cells }) {
    return (
        <tr className="bg-gray-100 font-medium">
            {cells.map((c, i) => (
                <td key={i} className="border px-2 py-2 text-right">{typeof c === 'string' && i === 0 ? <span className="float-left">{c}</span> : c}</td>
            ))}
            <td className="px-2 py-2" />
        </tr>
    );
}

function SummaryLine({ label, value, bold }) {
    return (
        <div className={`flex items-center justify-between text-sm ${bold ? 'font-semibold' : ''}`}>
            <span className="text-gray-600">{label}</span>
            <span>₹ {fmt(value)}</span>
        </div>
    );
}

function RowTable({ columns, rows, onAdd, onRemove, onChange, footer }) {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                <thead>
                    <tr className="bg-gray-100 text-gray-700">
                        {columns.map((c) => (
                            <th key={c.key} className="border px-2 py-2 text-left whitespace-nowrap">{c.label}</th>
                        ))}
                        <th className="border px-2 py-2 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row) => (
                        <tr key={row.id} className="odd:bg-white even:bg-gray-50">
                            {columns.map((c) => (
                                <td key={c.key} className="border px-2 py-1 whitespace-nowrap">
                                    <Cell
                                        column={c}
                                        value={row[c.key]}
                                        onChange={(v) => onChange(row.id, { [c.key]: v })}
                                    />
                                </td>
                            ))}
                            <td className="border px-2 py-1 text-center">
                                <button className="text-red-600 hover:underline" onClick={() => onRemove(row.id)}>Remove</button>
                            </td>
                        </tr>
                    ))}
                    {footer && (
                        <tfoot>
                            {footer(rows)}
                        </tfoot>
                    )}
                </tbody>
            </table>

            <div className="mt-3">
                <button className="rounded-lg bg-violet-600 hover:bg-violet-700 text-white px-3 py-2 text-sm" onClick={onAdd}>+ Add Row</button>
            </div>
        </div>
    );
}

function Cell({ column, value, onChange }) {
    const base = "w-full rounded-md border px-2 py-1 focus:outline-none focus:ring-2 focus:ring-violet-300";
    if (column.type === 'number') {
        return (
            <input type="number" className={base} value={value ?? ''} onChange={(e) => onChange(num(e.target.value))} />
        );
    }
    if (column.type === 'date') {
        return (
            <input type="date" className={base} value={toDateInput(value)} onChange={(e) => onChange(e.target.value)} />
        );
    }
    if (column.type === 'checkbox') {
        return (
            <input type="checkbox" className="h-4 w-4" checked={!!value} onChange={(e) => onChange(e.target.checked)} />
        );
    }
    if (column.type === 'select') {
        const opts = column.options || [];
        return (
            <select className={base} value={value || ''} onChange={(e) => onChange(e.target.value)}>
                {opts.map((o) => <option key={String(o)} value={o}>{o}</option>)}
            </select>
        );
    }
    return (
        <input className={base} value={value ?? ''} onChange={(e) => onChange(e.target.value)} />
    );
}

// -------------- Helpers --------------
function today() {
    const d = new Date();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${d.getFullYear()}-${mm}-${dd}`;
}

function toDateInput(v) {
    if (!v) return '';
    return String(v).slice(0, 10);
}

function uid() { return Math.random().toString(36).slice(2, 10); }
function num(x) { const n = parseFloat(x); return Number.isFinite(n) ? n : 0; }
function fmt(n) { return (num(n)).toLocaleString('en-IN', { maximumFractionDigits: 2 }); }
function mapFixed(obj) { const out = {}; for (const k in obj) out[k] = +num(obj[k]).toFixed(2); return out; }

function sum(rows, key, mode) {
    if (mode === 'avg') {
        const arr = rows.map((r) => num(r[key])).filter((x) => x > 0);
        return arr.length ? (arr.reduce((a, b) => a + b, 0) / arr.length) : 0;
    }
    return rows.reduce((acc, r) => acc + num(r[key]), 0);
}

function splitTax(taxable, rate, isInter) {
    const tax = (num(taxable) * num(rate)) / 100;
    if (isInter) return { igst: round2(tax), cgst: 0, sgst: 0 };
    return { igst: 0, cgst: round2(tax / 2), sgst: round2(tax / 2) };
}
function round2(x) { return Math.round(num(x) * 100) / 100; }

const FY_OPTIONS = [
    '2023-24', '2024-25', '2025-26'
];

const PERIODS = [
    'Apr-2025', 'May-2025', 'Jun-2025', 'Jul-2025', 'Aug-2025', 'Sep-2025', 'Oct-2025', 'Nov-2025', 'Dec-2025', 'Jan-2026', 'Feb-2026', 'Mar-2026'
];

const POS_OPTIONS = [
    '01-Jammu & Kashmir', '02-Himachal Pradesh', '03-Punjab', '04-Chandigarh', '05-Uttarakhand', '06-Haryana', '07-Delhi', '08-Rajasthan', '09-Uttar Pradesh', '10-Bihar', '11-Sikkim', '12-Arunachal Pradesh', '13-Nagaland', '14-Manipur', '15-Mizoram', '16-Tripura', '17-Meghalaya', '18-Assam', '19-West Bengal', '20-Jharkhand', '21-Odisha', '22-Chhattisgarh', '23-Madhya Pradesh', '24-Gujarat', '25-Daman & Diu', '26-Dadra & Nagar Haveli', '27-Maharashtra', '28-Andhra Pradesh', '29-Karnataka', '30-Goa', '31-Lakshadweep', '32-Kerala', '33-Tamil Nadu', '34-Puducherry', '35-Andaman & Nicobar', '36-Telangana', '37-Andhra Pradesh (New)'
];

function buildGSTR1Payload({ taxpayer, b2b, b2cLarge, b2cOthers, exportsRows, hsnSummary, nilRated, docsIssued, totals }) {
    return {
        gstin: taxpayer.gstin,
        fp: taxpayer.period,
        fy: taxpayer.fy,
        taxpayer,
        b2b,
        b2cl: b2cLarge,
        b2cs: b2cOthers,
        exp: exportsRows,
        hsn: hsnSummary,
        nil: nilRated,
        docs: docsIssued,
        totals,
        generatedAt: new Date().toISOString(),
        note: 'This is a user-side draft JSON for GSTR-1 prepared in-app; verify schema with GSTN before upload.'
    };
}
