export default function AuditorDetails({setSection}) {
    return (
        <div className="mx-auto max-w-4xl w-full">
            <div className="grid grid-cols-2 gap-5">
                <div className="flex">
                    <input type="checkbox" name="shortTerm" id="shortTerm" />
                    <label
                        htmlFor="shortTerm"
                        className="text-sm font-medium ml-2"
                    >
                        Are you liable to maintain accounts as per section 44AA?
                    </label>
                </div>
                <div className="flex">
                    <input type="checkbox" name="shortTerm" id="shortTerm" />
                    <label
                        htmlFor="shortTerm"
                        className="text-sm font-medium ml-2"
                    >
                        Are you declaring income only under section
                        44AE/44AD/44ADA?
                    </label>
                </div>
                <div className="flex">
                    <input type="checkbox" name="shortTerm" id="shortTerm" />
                    <label
                        htmlFor="shortTerm"
                        className="text-sm font-medium ml-2"
                    >
                        Does your total sales/turnover/gross receipts of
                        business, not profession, is between 1 to 5 Crore
                        Rupees?
                    </label>
                </div>
                <div className="flex">
                    <input type="checkbox" name="shortTerm" id="shortTerm" />
                    <label
                        htmlFor="shortTerm"
                        className="text-sm font-medium ml-2"
                    >
                        Are you liable for audit under section 44AB?
                    </label>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="firstName" className="text-sm font-medium">
                        Name of the auditor (proprietorship/ firm)
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
                        Auditor Name
                    </label>
                    <input
                        type="text"
                        name="middleName"
                        id="middleName"
                        className="h-12 px-3 mt-1 outline-none border border-gray-400 focus:border-primary rounded"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="middleName" className="text-sm font-medium">
                        Membership Number of Auditor
                    </label>
                    <input
                        type="text"
                        name="middleName"
                        id="middleName"
                        className="h-12 px-3 mt-1 outline-none border border-gray-400 focus:border-primary rounded"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="middleName" className="text-sm font-medium">
                        Auditor Registration Number
                    </label>
                    <input
                        type="text"
                        name="middleName"
                        id="middleName"
                        className="h-12 px-3 mt-1 outline-none border border-gray-400 focus:border-primary rounded"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="middleName" className="text-sm font-medium">
                        Audit Firm PAN
                    </label>
                    <input
                        type="text"
                        name="middleName"
                        id="middleName"
                        className="h-12 px-3 mt-1 outline-none border border-gray-400 focus:border-primary rounded"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="middleName" className="text-sm font-medium">
                        Aadhar of Auditor (Optional)
                    </label>
                    <input
                        type="text"
                        name="middleName"
                        id="middleName"
                        className="h-12 px-3 mt-1 outline-none border border-gray-400 focus:border-primary rounded"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="middleName" className="text-sm font-medium">
                        Date of report of the Audit
                    </label>
                    <input
                        type="text"
                        name="middleName"
                        id="middleName"
                        className="h-12 px-3 mt-1 outline-none border border-gray-400 focus:border-primary rounded"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="middleName" className="text-sm font-medium">
                        Date of furnishing the Audit Report
                    </label>
                    <input
                        type="text"
                        name="middleName"
                        id="middleName"
                        className="h-12 px-3 mt-1 outline-none border border-gray-400 focus:border-primary rounded"
                    />
                </div>
                <div className="flex">
                    <input type="checkbox" name="shortTerm" id="shortTerm" />
                    <label
                        htmlFor="shortTerm"
                        className="text-sm font-medium ml-2"
                    >
                        Is Taxpayer liable to furnish a report under Section
                        92E?
                    </label>
                </div>
                <div className="flex">
                    <input type="checkbox" name="shortTerm" id="shortTerm" />
                    <label
                        htmlFor="shortTerm"
                        className="text-sm font-medium ml-2"
                    >
                        In the case of non-resident, is there a permanent
                        establishment (PE) in India?
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
