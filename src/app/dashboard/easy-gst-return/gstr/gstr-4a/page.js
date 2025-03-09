import Link from "next/link";
const CardData = [
    {
        id:"1",
        href:"b2b",
        title:"3A,3b-B2B Invoices",
    },
    {
        id:"2",
        href:"cdn",
        title:"4 - Credit/Debit Notes",
    },
    {
        id:"3",
        href:"b2ba",
        title:"4 - Amendments to B2B invoices",
    },
    {
        id:"4",
        href:"cdna",
        title:"4 - Amendments Credit/Debit Notes",
    },
]
export default function page() {
    return (
        <main className="bg-neutral-100 min-h-screen  py-2 ">
            <div className="max-w-7xl w-[calc(100%-2rem)] mx-auto space-y-4">
                <div className="bg-blue-100 text-blue-900 my-2 p-4 font-semibold text-xl">
                    <h1>GSTR-4A Auto drafted details for register persons opting composition levy</h1>
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
                        <span>Return Period :</span>
                        --
                    </li>
                </ul>
                <div className="bg-neutral-100">
                    <ul className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                        {CardData.map(item=>(
                            <li key={item.id} className="bg-white text-neutral-950 text-sm ">
                                <Link href={`gstr-4a/${item.href}`} className={`&#8377; ${item.title==="4.1 Eligible ITC"?"bg-red-800":"bg-blue-800"} text-white font-medium p-2 min-h-20 grid place-content-center`}>
                                    {item.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                
                <div className="flex gap-2 justify-end">
                    <div>
                        <button className="btn-secondary">Back</button>
                    </div>
                </div>
            </div>
        </main>
    );
}

