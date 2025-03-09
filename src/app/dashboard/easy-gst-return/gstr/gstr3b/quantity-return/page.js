export default function page() {
    return (
        <div className="max-w-7xl mx-auto mb-4 p-2">
            <p className="bg-blue-100 text-blue-900 my-2 p-4 font-semibold text-xl">GSTR-3BQ Quantity return</p>
            <div className="p-2">
                <ul className="bg-white mb-4 grid grid-cols-[1fr,1fr,1fr] p-2 gap-2 text-center">
                    <li>
                        <div>GSTIN -</div>
                        <div>FY -</div>
                    </li>
                    <li>
                        <div>Legal Name -</div>
                        <div>Return Period -</div>
                    </li>
                    <li>
                        <div>Status -</div>
                        <div>Due date -</div>
                    </li>
                </ul>
            </div>
            <div className="flex gap-2 justify-end">
                <div>
                    <button className="btn-light">BACK</button>
                </div>
                <div>
                    <button className="btn-primary">SAVE GSTR-3B</button>
                </div>
                <div>
                    <button className="btn-primary">PREVIEW DRAFT GSTR-3B</button>
                </div>
                <div className=" opacity-50">
                    <button className="btn-secondary">------------------</button>
                </div>
            </div>
        </div>
    )
}
