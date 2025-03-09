export default function page() {
    return (
        <div className="max-w-7xl mx-auto mb-4 p-2">
            <p className="bg-blue-100 text-blue-900 my-2 p-4 font-semibold text-xl">5.1 interest and Late free for previous tax period</p>
            <div className="p-2">
                <div className="text-xs mb-4">
                    <input id="interestLiabilities" type="checkbox" className="h-4 w-4"/>
                    <label htmlFor="interestLiabilities">Please select the checkbox if you wish to declare any Interest Liabilities. Please note Interest amounts declared here under respective heads need to be paid in cash in addition to tax Liabilities for the month. GSTR 3B can be filed only after complete payment of all Liabilities.</label>
                </div>
                <ul className="font-semibold mb-4 grid grid-cols-[2fr,1fr,1fr,1fr,1fr,1fr] gap-2">
                    <li>Description (&#8377;)</li>
                    <li>Integrated tax (&#8377;)</li>
                    <li>Central tax (&#8377;)</li>
                    <li>State/UT Tax (&#8377;)</li>
                    <li>CESS (&#8377;)</li>
                </ul>
                <ul className="mb-4 grid grid-cols-[2fr,1fr,1fr,1fr,1fr,1fr] gap-2">
                    <li className="font-semibold ">interest</li>
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
                <ul className="mb-4 grid grid-cols-[2fr,1fr,1fr,1fr,1fr,1fr] gap-2">
                    <li className="font-semibold ">Late fees</li>
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
                
            </div>
            <div className="flex gap-2 justify-end">
                <div>
                    <button className="btn-danger">SYSTEM GERERATED GSTR-3B</button>
                </div>
                <div>
                    <button className="btn-primary">CANCEL</button>
                </div>
                <div className=" opacity-50">
                    <button className="btn-secondary">CONFIRM</button>
                </div>
                <div className=" opacity-50">
                    <button className="btn-secondary">RE-COMPUTE INTEREST</button>
                </div>
            </div>
        </div>
    )
}
