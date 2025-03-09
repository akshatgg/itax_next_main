import NatureofBusinessComp from './NatureofBusinessComp';

export default function IncomeUnder44ADA({setSection}) {
    return (
        <div className="mx-auto max-w-4xl w-full">
            <NatureofBusinessComp />
            <h3 className="border-b font-semibold mb-5 mt-8">
                Section 44 ADA Details
            </h3>
            <div className="grid grid-cols-2 gap-5">
                <label
                    htmlFor="firstName"
                    className="text-sm font-medium flex items-center"
                >
                    Nature of BusinessGross turnover or Gross ReceiptsGross
                    turnover or Gross Receipts
                </label>
                <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    className="h-12 px-3 mt-1 outline-none border border-gray-400 focus:border-primary rounded"
                />
                <label
                    htmlFor="firstName"
                    className="text-sm font-medium flex items-center"
                >
                    Total Income as per your calculation
                </label>
                <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    className="h-12 px-3 mt-1 outline-none border border-gray-400 focus:border-primary rounded"
                />
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
