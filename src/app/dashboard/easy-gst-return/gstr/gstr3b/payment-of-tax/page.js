function Form_1() {

    return(
        <div className="p-2">
            <ul className="[&>li]:px-2 [&>li]:bg-neutral-100 font-semibold mb-1 grid grid-cols-[2fr,1fr,1fr,1fr,1fr,1fr,1fr,1fr,1fr,1fr] gap-2">
                <li>
                    Description
                </li>
                <li className="col-span-4 text-center">
                    Cash Ledger Balance
                </li>
                <li className="col-span-5 text-center">
                    Credited Ledger Balance (Including current {"month's"} credit)
                </li>
            </ul>
            <ul className=" [&>li]:px-2 [&>li]:bg-neutral-100 font-semibold mb-4 grid grid-cols-[2fr,1fr,1fr,1fr,1fr,1fr,1fr,1fr,1fr,1fr] gap-2">
                <li>Integrated tax (&#8377;)</li>
                <li>Central tax (&#8377;)</li>
                <li>State/UT Tax (&#8377;)</li>
                <li>CESS (&#8377;)</li>
                <li>Total(&#8377;)</li>

                <li>Integrated tax (&#8377;)</li>
                <li>Central tax (&#8377;)</li>
                <li>State/UT Tax (&#8377;)</li>
                <li>CESS (&#8377;)</li>
                <li>Total(&#8377;)</li>
            </ul>
            <ul className="mb-4 grid grid-cols-[2fr,1fr,1fr,1fr,1fr,1fr,1fr,1fr,1fr,1fr] gap-2">
                <li className="font-semibold px-2 bg-neutral-100">Tax</li>
                <li>
                    <input type="number" placeholder="0.00" className="block w-full rounded-sm px-4 min-h-8 mb-2 outline outline-1 outline-neutral-500/60 focus:outline-2 focus:outline-blue-500"/>
                </li>
                <li>
                    <input type="number" placeholder="0.00" className="block w-full rounded-sm px-4 min-h-8 mb-2 outline outline-1 outline-neutral-500/60 focus:outline-2 focus:outline-blue-500"/>
                </li>
                <li>
                    <input type="number" placeholder="0.00" className="block w-full rounded-sm px-4 min-h-8 mb-2 outline outline-1 outline-neutral-500/60 focus:outline-2 focus:outline-blue-500"/>
                </li>
                <li>
                    <input type="number" placeholder="0.00" className="block w-full rounded-sm px-4 min-h-8 mb-2 outline outline-1 outline-neutral-500/60 focus:outline-2 focus:outline-blue-500"/>
                </li>
                <li>
                    <input type="number" placeholder="0.00" className="block w-full rounded-sm px-4 min-h-8 mb-2 outline outline-1 outline-neutral-500/60 focus:outline-2 focus:outline-blue-500"/>
                </li>
                <li>
                    <input type="number" placeholder="0.00" className="block w-full rounded-sm px-4 min-h-8 mb-2 outline outline-1 outline-neutral-500/60 focus:outline-2 focus:outline-blue-500"/>
                </li>
                <li>
                    <input type="number" placeholder="0.00" className="block w-full rounded-sm px-4 min-h-8 mb-2 outline outline-1 outline-neutral-500/60 focus:outline-2 focus:outline-blue-500"/>
                </li>
                <li>
                    <input type="number" placeholder="0.00" className="block w-full rounded-sm px-4 min-h-8 mb-2 outline outline-1 outline-neutral-500/60 focus:outline-2 focus:outline-blue-500"/>
                </li>
                <li>
                    <input type="number" placeholder="0.00" className="block w-full rounded-sm px-4 min-h-8 mb-2 outline outline-1 outline-neutral-500/60 focus:outline-2 focus:outline-blue-500"/>
                </li>
            </ul>
            <ul className="mb-4 grid grid-cols-[2fr,1fr,1fr,1fr,1fr,1fr,1fr,1fr,1fr,1fr] gap-2">
                <li className="font-semibold px-2 bg-neutral-100">Interest</li>
                <li>
                    <input type="number" placeholder="0.00" className="block w-full rounded-sm px-4 min-h-8 mb-2 outline outline-1 outline-neutral-500/60 focus:outline-2 focus:outline-blue-500"/>
                </li>
                <li>
                    <input type="number" placeholder="0.00" className="block w-full rounded-sm px-4 min-h-8 mb-2 outline outline-1 outline-neutral-500/60 focus:outline-2 focus:outline-blue-500"/>
                </li>
                <li>
                    <input type="number" placeholder="0.00" className="block w-full rounded-sm px-4 min-h-8 mb-2 outline outline-1 outline-neutral-500/60 focus:outline-2 focus:outline-blue-500"/>
                </li>
                <li>
                    <input type="number" placeholder="0.00" className="block w-full rounded-sm px-4 min-h-8 mb-2 outline outline-1 outline-neutral-500/60 focus:outline-2 focus:outline-blue-500"/>
                </li>
                <li>
                    <input type="number" placeholder="0.00" className="block w-full rounded-sm px-4 min-h-8 mb-2 outline outline-1 outline-neutral-500/60 focus:outline-2 focus:outline-blue-500"/>
                </li>
            </ul>
            <ul className="mb-4 grid grid-cols-[2fr,1fr,1fr,1fr,1fr,1fr,1fr,1fr,1fr,1fr] gap-2">
                <li className="font-semibold px-2 bg-neutral-100">Late Fees</li>
                <li></li>
                <li>
                    <input type="number" placeholder="0.00" className="block w-full rounded-sm px-4 min-h-8 mb-2 outline outline-1 outline-neutral-500/60 focus:outline-2 focus:outline-blue-500"/>
                </li>
                <li>
                    <input type="number" placeholder="0.00" className="block w-full rounded-sm px-4 min-h-8 mb-2 outline outline-1 outline-neutral-500/60 focus:outline-2 focus:outline-blue-500"/>
                </li>
                <li></li>
                <li>
                    <input type="number" placeholder="0.00" className="block w-full rounded-sm px-4 min-h-8 mb-2 outline outline-1 outline-neutral-500/60 focus:outline-2 focus:outline-blue-500"/>
                </li>
            </ul>
        </div>
    )
}
function Form_2() {

    return(
        <div className="p-2">
            <ul className="[&>li]:px-2 [&>li]:bg-neutral-100 font-semibold mb-1 grid grid-cols-[2fr,1fr,1fr,1fr,1fr,1fr,1fr,1fr,1fr,1fr] gap-2">
                <li>
                    Description
                </li>
                <li>
                    Other then reverse charge Tax payable (&#8377;)
                </li>
                <li className="col-span-4 text-center grid grid-rows-[auto,1fr]">
                    <div>Paid through ITC</div>
                    <ul className=" [&>li]:px-2 [&>li]:border my-2 [&>li]:bg-neutral-100 font-semibold mb-4 grid grid-cols-[1fr,1fr,1fr,1fr,1fr] gap-2">
                        <li>Integrated tax (&#8377;)</li>
                        <li>Central tax (&#8377;)</li>
                        <li>State/UT Tax (&#8377;)</li>
                        <li>CESS (&#8377;)</li>
                        <li>Total(&#8377;)</li>
                    </ul>
                </li>
                <li>
                    Other then reverse charge Tax to paid in Cash (&#8377;)
                </li>
                <li>Reverse charge Tax payable (&#8377;)</li>
                <li>Reverse charge Tax to be paid in cash (&#8377;)</li>
                <li>Interest payable (&#8377;)</li>
                <li>Interest to be paid in cash(&#8377;)</li>
                <li>Late Fee payable (&#8377;)</li>
                <li>Late Fee to be paid in Cash (&#8377;)</li>
                <li>Utilizable Cash be (&#8377;)</li>
                <li>Additional Cash required (&#8377;)</li>
            </ul>
            <ul className="[&>li]:p-4 [&>li]:border [&>li]:grid [&>li]:place-content-center  my-2 grid grid-cols-[2fr,1fr,1fr,1fr,1fr,1fr,1fr,1fr,1fr,1fr,1fr,1fr,1fr,1fr,1fr] gap-2">
                <li>1</li>
                <li>2</li>
                <li>3</li>
                <li>4</li>
                <li>5</li>
                <li>6</li>
                <li>
                    7(2-3-4-5-6)
                </li>
                <li>8</li>
                <li>9</li>
                <li>10</li>
                <li>11</li>
                <li>12</li>
                <li>13</li>
                <li>14</li>
                <li>15</li>
            </ul>
            <ul className="mb-4 grid grid-cols-[2fr,1fr,1fr,1fr,1fr,1fr,1fr,1fr,1fr,1fr,1fr,1fr,1fr,1fr,1fr] gap-2">
                <li className="font-semibold px-2 bg-neutral-100">Integrated Tax (&#8377;)</li>
                <li>
                    <input type="number" placeholder="0.00" className="block w-full rounded-sm px-4 min-h-8 mb-2 outline outline-1 outline-neutral-500/60 focus:outline-2 focus:outline-blue-500"/>
                </li>
                <li>
                    <input type="number" placeholder="0.00" className="block w-full rounded-sm px-4 min-h-8 mb-2 outline outline-1 outline-neutral-500/60 focus:outline-2 focus:outline-blue-500"/>
                </li>
                <li>
                    <input type="number" placeholder="0.00" className="block w-full rounded-sm px-4 min-h-8 mb-2 outline outline-1 outline-neutral-500/60 focus:outline-2 focus:outline-blue-500"/>
                </li>
                <li>
                    <input type="number" placeholder="0.00" className="block w-full rounded-sm px-4 min-h-8 mb-2 outline outline-1 outline-neutral-500/60 focus:outline-2 focus:outline-blue-500"/>
                </li>
                <li>
                    <input type="number" placeholder="0.00" className="block w-full rounded-sm px-4 min-h-8 mb-2 outline outline-1 outline-neutral-500/60 focus:outline-2 focus:outline-blue-500"/>
                </li>
                <li></li>
                <li>
                    <input type="number" placeholder="0.00" className="block w-full rounded-sm px-4 min-h-8 mb-2 outline outline-1 outline-neutral-500/60 focus:outline-2 focus:outline-blue-500"/>
                </li>
                <li>
                    <input type="number" placeholder="0.00" className="block w-full rounded-sm px-4 min-h-8 mb-2 outline outline-1 outline-neutral-500/60 focus:outline-2 focus:outline-blue-500"/>
                </li>
                <li>
                    <input type="number" placeholder="0.00" className="block w-full rounded-sm px-4 min-h-8 mb-2 outline outline-1 outline-neutral-500/60 focus:outline-2 focus:outline-blue-500"/>
                </li>
                <li>
                    <input type="number" placeholder="0.00" className="block w-full rounded-sm px-4 min-h-8 mb-2 outline outline-1 outline-neutral-500/60 focus:outline-2 focus:outline-blue-500"/>
                </li>
                <li></li>
                <li></li>
                <li>
                    <input type="number" placeholder="0.00" className="block w-full rounded-sm px-4 min-h-8 mb-2 outline outline-1 outline-neutral-500/60 focus:outline-2 focus:outline-blue-500"/>
                </li>
                <li>
                    <input type="number" placeholder="0.00" className="block w-full rounded-sm px-4 min-h-8 mb-2 outline outline-1 outline-neutral-500/60 focus:outline-2 focus:outline-blue-500"/>
                </li>
            </ul>
            <ul className="mb-4 grid grid-cols-[2fr,1fr,1fr,1fr,1fr,1fr,1fr,1fr,1fr,1fr,1fr,1fr,1fr,1fr,1fr] gap-2">
                <li className="font-semibold px-2 bg-neutral-100">Central tax (&#8377;)</li>
                <li>
                    <input type="number" placeholder="0.00" className="block w-full rounded-sm px-4 min-h-8 mb-2 outline outline-1 outline-neutral-500/60 focus:outline-2 focus:outline-blue-500"/>
                </li>
                <li>
                    <input type="number" placeholder="0.00" className="block w-full rounded-sm px-4 min-h-8 mb-2 outline outline-1 outline-neutral-500/60 focus:outline-2 focus:outline-blue-500"/>
                </li>
                <li>
                    <input type="number" placeholder="0.00" className="block w-full rounded-sm px-4 min-h-8 mb-2 outline outline-1 outline-neutral-500/60 focus:outline-2 focus:outline-blue-500"/>
                </li>
                <li></li>
                <li></li>
                <li>
                    <input type="number" placeholder="0.00" className="block w-full rounded-sm px-4 min-h-8 mb-2 outline outline-1 outline-neutral-500/60 focus:outline-2 focus:outline-blue-500"/>
                </li>
                <li>
                    <input type="number" placeholder="0.00" className="block w-full rounded-sm px-4 min-h-8 mb-2 outline outline-1 outline-neutral-500/60 focus:outline-2 focus:outline-blue-500"/>
                </li>
                <li>
                    <input type="number" placeholder="0.00" className="block w-full rounded-sm px-4 min-h-8 mb-2 outline outline-1 outline-neutral-500/60 focus:outline-2 focus:outline-blue-500"/>
                </li>
                <li>
                    <input type="number" placeholder="0.00" className="block w-full rounded-sm px-4 min-h-8 mb-2 outline outline-1 outline-neutral-500/60 focus:outline-2 focus:outline-blue-500"/>
                </li>
                <li>
                    <input type="number" placeholder="0.00" className="block w-full rounded-sm px-4 min-h-8 mb-2 outline outline-1 outline-neutral-500/60 focus:outline-2 focus:outline-blue-500"/>
                </li>
                <li>
                    <input type="number" placeholder="0.00" className="block w-full rounded-sm px-4 min-h-8 mb-2 outline outline-1 outline-neutral-500/60 focus:outline-2 focus:outline-blue-500"/>
                </li>
                <li>
                    <input type="number" placeholder="0.00" className="block w-full rounded-sm px-4 min-h-8 mb-2 outline outline-1 outline-neutral-500/60 focus:outline-2 focus:outline-blue-500"/>
                </li>
                <li>
                    <input type="number" placeholder="0.00" className="block w-full rounded-sm px-4 min-h-8 mb-2 outline outline-1 outline-neutral-500/60 focus:outline-2 focus:outline-blue-500"/>
                </li>
                <li>
                    <input type="number" placeholder="0.00" className="block w-full rounded-sm px-4 min-h-8 mb-2 outline outline-1 outline-neutral-500/60 focus:outline-2 focus:outline-blue-500"/>
                </li>
            </ul>
            <ul className="mb-4 grid grid-cols-[2fr,1fr,1fr,1fr,1fr,1fr,1fr,1fr,1fr,1fr,1fr,1fr,1fr,1fr,1fr] gap-2">
                <li className="font-semibold px-2 bg-neutral-100">State/UT Tax (&#8377;)</li>
                <li>
                    <input type="number" placeholder="0.00" className="block w-full rounded-sm px-4 min-h-8 mb-2 outline outline-1 outline-neutral-500/60 focus:outline-2 focus:outline-blue-500"/>
                </li>
                <li>
                    <input type="number" placeholder="0.00" className="block w-full rounded-sm px-4 min-h-8 mb-2 outline outline-1 outline-neutral-500/60 focus:outline-2 focus:outline-blue-500"/>
                </li>
                <li></li>
                <li>
                    <input type="number" placeholder="0.00" className="block w-full rounded-sm px-4 min-h-8 mb-2 outline outline-1 outline-neutral-500/60 focus:outline-2 focus:outline-blue-500"/>
                </li>
                <li></li>
                <li>
                    <input type="number" placeholder="0.00" className="block w-full rounded-sm px-4 min-h-8 mb-2 outline outline-1 outline-neutral-500/60 focus:outline-2 focus:outline-blue-500"/>
                </li>
                <li>
                    <input type="number" placeholder="0.00" className="block w-full rounded-sm px-4 min-h-8 mb-2 outline outline-1 outline-neutral-500/60 focus:outline-2 focus:outline-blue-500"/>
                </li>
                <li>
                    <input type="number" placeholder="0.00" className="block w-full rounded-sm px-4 min-h-8 mb-2 outline outline-1 outline-neutral-500/60 focus:outline-2 focus:outline-blue-500"/>
                </li>
                <li>
                    <input type="number" placeholder="0.00" className="block w-full rounded-sm px-4 min-h-8 mb-2 outline outline-1 outline-neutral-500/60 focus:outline-2 focus:outline-blue-500"/>
                </li>
                <li>
                    <input type="number" placeholder="0.00" className="block w-full rounded-sm px-4 min-h-8 mb-2 outline outline-1 outline-neutral-500/60 focus:outline-2 focus:outline-blue-500"/>
                </li>
                <li>
                    <input type="number" placeholder="0.00" className="block w-full rounded-sm px-4 min-h-8 mb-2 outline outline-1 outline-neutral-500/60 focus:outline-2 focus:outline-blue-500"/>
                </li>
                <li>
                    <input type="number" placeholder="0.00" className="block w-full rounded-sm px-4 min-h-8 mb-2 outline outline-1 outline-neutral-500/60 focus:outline-2 focus:outline-blue-500"/>
                </li>
                <li>
                    <input type="number" placeholder="0.00" className="block w-full rounded-sm px-4 min-h-8 mb-2 outline outline-1 outline-neutral-500/60 focus:outline-2 focus:outline-blue-500"/>
                </li>
                <li>
                    <input type="number" placeholder="0.00" className="block w-full rounded-sm px-4 min-h-8 mb-2 outline outline-1 outline-neutral-500/60 focus:outline-2 focus:outline-blue-500"/>
                </li>
            </ul>
            <ul className="mb-4 grid grid-cols-[2fr,1fr,1fr,1fr,1fr,1fr,1fr,1fr,1fr,1fr,1fr,1fr,1fr,1fr,1fr] gap-2">
                <li className="font-semibold px-2 bg-neutral-100">CESS (&#8377;)</li>
                <li>
                    <input type="number" placeholder="0.00" className="block w-full rounded-sm px-4 min-h-8 mb-2 outline outline-1 outline-neutral-500/60 focus:outline-2 focus:outline-blue-500"/>
                </li>
                <li></li>
                <li></li>
                <li></li>
                <li>
                    <input type="number" placeholder="0.00" className="block w-full rounded-sm px-4 min-h-8 mb-2 outline outline-1 outline-neutral-500/60 focus:outline-2 focus:outline-blue-500"/>
                </li>
                <li>
                    <input type="number" placeholder="0.00" className="block w-full rounded-sm px-4 min-h-8 mb-2 outline outline-1 outline-neutral-500/60 focus:outline-2 focus:outline-blue-500"/>
                </li>
                <li>
                    <input type="number" placeholder="0.00" className="block w-full rounded-sm px-4 min-h-8 mb-2 outline outline-1 outline-neutral-500/60 focus:outline-2 focus:outline-blue-500"/>
                </li>
                <li>
                    <input type="number" placeholder="0.00" className="block w-full rounded-sm px-4 min-h-8 mb-2 outline outline-1 outline-neutral-500/60 focus:outline-2 focus:outline-blue-500"/>
                </li>
                <li>
                    <input type="number" placeholder="0.00" className="block w-full rounded-sm px-4 min-h-8 mb-2 outline outline-1 outline-neutral-500/60 focus:outline-2 focus:outline-blue-500"/>
                </li>
                <li>
                    <input type="number" placeholder="0.00" className="block w-full rounded-sm px-4 min-h-8 mb-2 outline outline-1 outline-neutral-500/60 focus:outline-2 focus:outline-blue-500"/>
                </li>
                <li></li>
                <li></li>
                <li>
                    <input type="number" placeholder="0.00" className="block w-full rounded-sm px-4 min-h-8 mb-2 outline outline-1 outline-neutral-500/60 focus:outline-2 focus:outline-blue-500"/>
                </li>
                <li>
                    <input type="number" placeholder="0.00" className="block w-full rounded-sm px-4 min-h-8 mb-2 outline outline-1 outline-neutral-500/60 focus:outline-2 focus:outline-blue-500"/>
                </li>
            </ul>
        </div>
    )
}

export default function page() {
    return (
        <div className="max-w-7xl mx-auto mb-4 p-2">
            <p className=" bg-blue-100 text-blue-900 my-2 p-4 font-semibold text-xl">3.1 Details of Outward Supply and inward Supply liable to reverse charge (other then those covered by Table 3.1.1)</p>
            <div className="space-y-20">
                <Form_1/>
                <Form_2/>
            </div>
            <div className="flex gap-2 justify-end mt-4">
                <div>
                    <button className="btn-primary">Back</button>
                </div>
                <div className="opacity-50">
                    <button className="btn-secondary">-------</button>
                </div>
                <div className="opacity-50">
                    <button className="btn-secondary">-------</button>
                </div>
                <div className="opacity-50">
                    <button className="btn-secondary">-------</button>
                </div>
            </div>
            <div className="flex gap-2 justify-end mt-4">
                <div>
                    <button className="btn-primary">Tax LIABILITY BREAKUP, AS APPLICABLE</button>
                </div>
            </div>
        </div>
    )
}
