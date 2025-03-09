import NatureofBusinessComp from './NatureofBusinessComp';

export default function SpeculativeIncome({setSection}) {
    return (
        <div className="mx-auto max-w-4xl w-full">
            <NatureofBusinessComp />
            <div className="grid grid-cols-2 gap-5 mt-8">
                <label htmlFor="firstName" className="text-sm font-medium">
                    1i: Turnover from speculative activity
                </label>
                <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    className="h-12 px-3 mt-1 outline-none border border-gray-400 focus:border-primary rounded"
                />
                <label htmlFor="firstName" className="text-sm font-medium">
                    1ii: Gross Profit
                </label>
                <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    className="h-12 px-3 mt-1 outline-none border border-gray-400 focus:border-primary rounded"
                />
                <label htmlFor="firstName" className="text-sm font-medium">
                    1iii: Expenditure, if any
                </label>
                <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    className="h-12 px-3 mt-1 outline-none border border-gray-400 focus:border-primary rounded"
                />
            </div>
            <p className="mt-5">Net Speculative Income is 0</p>
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
