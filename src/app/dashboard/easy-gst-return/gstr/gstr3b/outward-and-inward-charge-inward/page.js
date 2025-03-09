export default function page() {
    return (
        <div className="max-w-7xl mx-auto mb-4 p-2">
            <p className="bg-blue-100 text-blue-900 my-2 p-4 font-semibold text-xl">3.1 Details of Outward Supply and inward Supply liable to reverse charge (other then those covered by Table 3.1.1)</p>
            <div className="p-2">
                <ul className="font-semibold mb-4 grid grid-cols-[2fr,1fr,1fr,1fr,1fr,1fr] gap-2">
                    <li>Nature of supplies (&#8377;)</li>
                    <li>Total taxable tax (&#8377;)</li>
                    <li>Integrated tax (&#8377;)</li>
                    <li>Central tax (&#8377;)</li>
                    <li>State/UT Tax (&#8377;)</li>
                    <li>CESS (&#8377;)</li>
                </ul>
                <ul className="mb-4 grid grid-cols-[2fr,1fr,1fr,1fr,1fr,1fr] gap-2">
                    <li className="font-semibold ">(a) Outward Taxable supplies (other then zero rated, nill rated and exempted)</li>
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
                    <li className="font-semibold ">(b) Outward Taxable supplies (zero rated)</li>
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
                </ul>
                <ul className="mb-4 grid grid-cols-[2fr,1fr,1fr,1fr,1fr,1fr] gap-2">
                    <li className="font-semibold ">(c) Other outward Taxable supplies (Nill rated, exempted)</li>
                    <li>
                        <input type="number" placeholder="0.00" className="block w-full rounded-sm px-4 min-h-8 mb-2 outline outline-1 outline-neutral-500/60 focus:outline-2 focus:outline-blue-500"/>
                    </li>
                </ul>
                <ul className="mb-4 grid grid-cols-[2fr,1fr,1fr,1fr,1fr,1fr] gap-2">
                    <li className="font-semibold ">(d) Inward supplies (liable to reverse charge)</li>
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
                    <li className="font-semibold ">(e) Non-Gst outward supplies</li>
                    <li>
                        <input type="number" placeholder="0.00" className="block w-full rounded-sm px-4 min-h-8 mb-2 outline outline-1 outline-neutral-500/60 focus:outline-2 focus:outline-blue-500"/>
                    </li>
                </ul>
            </div>
            <div className="flex gap-2 justify-end">
                <div>
                    <button className="btn-primary">CANCEL</button>
                </div>
                <div>
                    {"isFilled"==="isFilled"?
                    <button className="btn-secondary">CONFIRM</button>
                    :
                    <button className="btn-primary">CONFIRM</button>
                    }
                </div>
            </div>
        </div>
    )
}
