export default function Remuneration({setSection}) {
    return (
        <div className="mx-auto max-w-4xl w-full">
            <h3 className="border-b font-semibold mb-5">
                Remuneration Details
            </h3>
            <div className="grid grid-cols-2 gap-5">
                <div className="flex flex-col">
                    <label htmlFor="firstName" className="text-sm font-medium">
                        Name of Partnership Firm
                    </label>
                    <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        className="h-12 px-3 mt-1 outline-none border border-gray-400 focus:border-primary rounded"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="firstName" className="text-sm font-medium">
                        Share percentage in Partnership Firm
                    </label>
                    <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        className="h-12 px-3 mt-1 outline-none border border-gray-400 focus:border-primary rounded"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="firstName" className="text-sm font-medium">
                        PAN of Partnership Firm
                    </label>
                    <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        className="h-12 px-3 mt-1 outline-none border border-gray-400 focus:border-primary rounded"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="firstName" className="text-sm font-medium">
                        Remuneration from Firm
                    </label>
                    <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        className="h-12 px-3 mt-1 outline-none border border-gray-400 focus:border-primary rounded"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="firstName" className="text-sm font-medium">
                        Interest Received
                    </label>
                    <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        className="h-12 px-3 mt-1 outline-none border border-gray-400 focus:border-primary rounded"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="firstName" className="text-sm font-medium">
                        Profit amount received from Firm (Rs.)
                    </label>
                    <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        className="h-12 px-3 mt-1 outline-none border border-gray-400 focus:border-primary rounded"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="firstName" className="text-sm font-medium">
                        Capital Balance of Firm as of 31st March 2020
                    </label>
                    <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        className="h-12 px-3 mt-1 outline-none border border-gray-400 focus:border-primary rounded"
                    />
                </div>
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
                <div className="flex">
                    <input type="checkbox" name="shortTerm" id="shortTerm" />
                    <label
                        htmlFor="shortTerm"
                        className="text-sm font-medium ml-2"
                    >
                        Is the firm liable for Audit?
                    </label>
                </div>
                <div className="flex">
                    <input type="checkbox" name="shortTerm" id="shortTerm" />
                    <label
                        htmlFor="shortTerm"
                        className="text-sm font-medium ml-2"
                    >
                        Is the firm liable to furnish report under 92E?
                    </label>
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
