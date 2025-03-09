export default function ScheduleBP({setSection}) {
    return (
        <div className="mx-auto max-w-4xl w-full">
            <div className="flex flex-col">
                <label htmlFor="firstName" className="text-sm font-medium">
                    Profit before tax as per P/L Account
                </label>
                <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    className="h-12 px-3 mt-1 outline-none border border-gray-400 focus:border-primary rounded"
                />
            </div>

            <h3 className="border-b font-semibold mb-5 mt-8">
                Income from other sources credited to P&L
            </h3>
            <div className="grid grid-cols-2 gap-5">
                <div className="flex flex-col">
                    <label htmlFor="firstName" className="text-sm font-medium">
                        Salaries
                    </label>
                    <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        className="h-12 px-3 mt-1 outline-none border border-gray-400 focus:border-primary rounded"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="middleName" className="text-sm font-medium">
                        House Properties
                    </label>
                    <input
                        type="text"
                        name="middleName"
                        id="middleName"
                        className="h-12 px-3 mt-1 outline-none border border-gray-400 focus:border-primary rounded"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="lastName" className="text-sm font-medium">
                        Capital Gains
                    </label>
                    <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        className="h-12 px-3 mt-1 outline-none border border-gray-400 focus:border-primary rounded"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="gender" className="text-sm font-medium">
                        Any Other Sources
                    </label>
                    <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        className="h-12 px-3 mt-1 outline-none border border-gray-400 focus:border-primary rounded"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="lastName" className="text-sm font-medium">
                        u/s 115BBF
                    </label>
                    <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        className="h-12 px-3 mt-1 outline-none border border-gray-400 focus:border-primary rounded"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="lastName" className="text-sm font-medium">
                        u/s 115BBG
                    </label>
                    <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        className="h-12 px-3 mt-1 outline-none border border-gray-400 focus:border-primary rounded"
                    />
                </div>
            </div>

            <h3 className="border-b font-semibold mb-5 mt-8">
                Expenses from other sources debited to P&L
            </h3>
            <div className="grid grid-cols-2 gap-5">
                <div className="flex flex-col">
                    <label htmlFor="firstName" className="text-sm font-medium">
                        Salaries
                    </label>
                    <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        className="h-12 px-3 mt-1 outline-none border border-gray-400 focus:border-primary rounded"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="middleName" className="text-sm font-medium">
                        House Properties
                    </label>
                    <input
                        type="text"
                        name="middleName"
                        id="middleName"
                        className="h-12 px-3 mt-1 outline-none border border-gray-400 focus:border-primary rounded"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="lastName" className="text-sm font-medium">
                        Capital Gains
                    </label>
                    <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        className="h-12 px-3 mt-1 outline-none border border-gray-400 focus:border-primary rounded"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="gender" className="text-sm font-medium">
                        Any Other Sources
                    </label>
                    <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        className="h-12 px-3 mt-1 outline-none border border-gray-400 focus:border-primary rounded"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="lastName" className="text-sm font-medium">
                        u/s 115BBF
                    </label>
                    <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        className="h-12 px-3 mt-1 outline-none border border-gray-400 focus:border-primary rounded"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="lastName" className="text-sm font-medium">
                        u/s 115BBG
                    </label>
                    <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        className="h-12 px-3 mt-1 outline-none border border-gray-400 focus:border-primary rounded"
                    />
                </div>
            </div>

            <h3 className="border-b font-semibold mb-5">
                Exempt Income credited to P&L
            </h3>
            <div className="grid grid-cols-2 gap-5">
                <div className="flex flex-col">
                    <label htmlFor="firstName" className="text-sm font-medium">
                        Amount
                    </label>
                    <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        className="h-12 px-3 mt-1 outline-none border border-gray-400 focus:border-primary rounded"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="middleName" className="text-sm font-medium">
                        Description
                    </label>
                    <input
                        type="text"
                        name="middleName"
                        id="middleName"
                        className="h-12 px-3 mt-1 outline-none border border-gray-400 focus:border-primary rounded"
                    />
                </div>
            </div>

            <h3 className="border-b font-semibold mb-5">Depreciation</h3>
            <div className="grid grid-cols-2 gap-5">
                <div className="flex flex-col">
                    <label htmlFor="firstName" className="text-sm font-medium">
                        Depreciation as per books (debited to P&L).
                    </label>
                    <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        className="h-12 px-3 mt-1 outline-none border border-gray-400 focus:border-primary rounded"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="middleName" className="text-sm font-medium">
                        Depreciation as per IT Act- Sec 32(1)(ii), 32(1)(iia)
                    </label>
                    <input
                        type="text"
                        name="middleName"
                        id="middleName"
                        className="h-12 px-3 mt-1 outline-none border border-gray-400 focus:border-primary rounded"
                    />
                </div>
            </div>

            <h3 className="border-b font-semibold mb-5">
                Any other amount allowable as deduction
            </h3>
            <div className="grid grid-cols-2 gap-5">
                <div className="flex flex-col">
                    <label htmlFor="firstName" className="text-sm font-medium">
                        Any other amount allowable as deduction
                    </label>
                    <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        className="h-12 px-3 mt-1 outline-none border border-gray-400 focus:border-primary rounded"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="middleName" className="text-sm font-medium">
                        Remuneration deduction
                    </label>
                    <input
                        type="text"
                        name="middleName"
                        id="middleName"
                        className="h-12 px-3 mt-1 outline-none border border-gray-400 focus:border-primary rounded"
                    />
                </div>
            </div>

            <div className="flex gap-3 items-center justify-center">
            <button
                onClick={() => {
                    setSection('Address');
                }}
                className="block bg-primary px-8 py-3 text-white rounded-md font-semibold text-sm cursor-pointer mt-5"
            >
                Save
            </button>
            <button
                onClick={() => {
                    setSection('Address');
                }}
                className="block bg-primary px-8 py-3 text-white rounded-md font-semibold text-sm cursor-pointer mt-5"
            >
                Back
            </button>
            </div>
        </div>
    );
}
