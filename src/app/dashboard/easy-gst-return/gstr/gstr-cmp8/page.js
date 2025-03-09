import Link from "next/link";

export default function page() {
    return (
        <main className="bg-neutral-100 min-h-screen  py-2 ">
            <div className="max-w-7xl w-[calc(100%-2rem)] mx-auto space-y-4">
                <div className="bg-white flex justify-between p-2 ">
                    <p className=" font-medium text-blue-900">Statement for payment of self assess tax</p>
                    <Link className="underline hover:text-blue-800" href="#">View your Turnover</Link>
                </div>
                <ul className="bg-white p-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    <li>
                        <span>GSTIN :</span>
                        --
                    </li>
                    <li>
                        <span>Legal Name :</span>
                        --
                    </li>
                    <li>
                        <span>Trade Name :</span>
                        --
                    </li>
                    <li>
                        <span>FY :</span>
                        --
                    </li>
                    <li>
                        <span>Period :</span>
                        --
                    </li>
                    <li>
                        <span>Due Date :</span>
                        --
                    </li>
                    <li>
                        <span>Status :</span>
                        --
                    </li>
                </ul>
                <div className="bg-white">
                    <p className=" px-2">[ ] File Nil GSTR CMP-8</p>
                    <div className="bg-blue-100 text-blue-900 my-2 p-4 font-semibold text-xl">
                        <h1>3.0 summary of self-assessed liability</h1>
                        <p className="text-lg">(Net of advances, credit and debit notes and any other adjustment due to amendments etc.)</p>
                    </div>
                </div>
                <div className="grid p-2 bg-white [&>ul>li]:border [&>ul>li]:grid [&>ul>li]:place-content-center">
                    <ul className="font-semibold mb-4 grid grid-cols-[1fr,2fr,1fr,1fr,1fr,1fr,1fr] gap-2">
                        <li className="grid place-content-center">Sr. No.</li>
                        <li>Description</li>
                        <li>Value (&#8377;)</li>
                        <li>Integrated tax (&#8377;)</li>
                        <li>Central tax (&#8377;)</li>
                        <li>State/UT Tax (&#8377;)</li>
                        <li>CESS (&#8377;)</li>
                    </ul>
                    <ul className="mb-4 grid grid-cols-[1fr,2fr,1fr,1fr,1fr,1fr,1fr] gap-2">
                        <li className="grid place-content-center">1</li>
                        <li className="font-semibold ">Outward supplies (Including exempted supplies)</li>
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
                        <li></li>
                    </ul>
                    <ul className="mb-4 grid grid-cols-[1fr,2fr,1fr,1fr,1fr,1fr,1fr] gap-2">
                        <li className="grid place-content-center">2</li>
                        <li className="font-semibold ">Inward supplies attracting reverse charge Including import of services</li>
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
                    <ul className="mb-4 grid grid-cols-[1fr,2fr,1fr,1fr,1fr,1fr,1fr] gap-2">
                        <li className="grid place-content-center">3</li>
                        <li className="font-semibold ">tax payable (1 + 2)</li>
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
                    <ul className="mb-4 grid grid-cols-[1fr,2fr,1fr,1fr,1fr,1fr,1fr] gap-2">
                        <li className="grid place-content-center">4</li>
                        <li className="font-semibold ">Interest payable, if any</li>
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
                    </ul>
                </div>
                <div className="flex gap-2 justify-end">
                    <div>
                        <button className="btn-secondary">CANCEL</button>
                    </div>
                    <div>
                        <button className="btn-primary">CANCEL</button>
                    </div>
                    <div className="opacity-50">
                        <button className="btn-primary">---------</button>
                    </div>
                    <div className="opacity-50">
                        <button className="btn-primary">---------</button>
                    </div>
                </div>
            </div>
        </main>
    );
}
