export default function page() {
    return (
        <div className="max-w-7xl mx-auto mb-4 p-2">
            <p className="bg-blue-100 text-blue-900 my-2 p-4 font-semibold text-xl">5.1 Values of exempt, nil-rated and not-GST inward Supplies</p>
            <div className="p-2">
                <ul className="font-semibold mb-4 grid grid-cols-[2fr,1fr,1fr] gap-2">
                    <li>Description (&#8377;)</li>
                    <li>Inter-State Supplies (&#8377;)</li>
                    <li>Inter-State Supplies (&#8377;)</li>
                </ul>
                <ul className="mb-4 grid grid-cols-[2fr,1fr,1fr] gap-2">
                    <li className="font-semibold ">From a supplier under composition scheme, exempt and nil rated Supply</li>
                    <li>
                        <input type="number" placeholder="0.00" className="block w-full rounded-sm px-4 min-h-8 mb-2 outline outline-1 outline-neutral-500/60 focus:outline-2 focus:outline-blue-500"/>
                    </li>
                    <li>
                        <input type="number" placeholder="0.00" className="block w-full rounded-sm px-4 min-h-8 mb-2 outline outline-1 outline-neutral-500/60 focus:outline-2 focus:outline-blue-500"/>
                    </li>
                </ul>
                <ul className="mb-4 grid grid-cols-[2fr,1fr,1fr] gap-2">
                    <li className="font-semibold ">Non GST Supply</li>
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
                    <button className="btn-primary">CANCEL</button>
                </div>
                <div className=" opacity-50">
                    <button className="btn-secondary">CONFIRM</button>
                </div>
            </div>
        </div>
    )
}
