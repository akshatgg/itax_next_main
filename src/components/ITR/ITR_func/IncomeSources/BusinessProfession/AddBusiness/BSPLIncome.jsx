import NatureofBusinessComp from './NatureofBusinessComp';

export default function BSPLIncome({setSection}) {
    return (
        <div className="mx-auto max-w-4xl w-full">
            <NatureofBusinessComp />
            <div className="grid grid-cols-3 gap-10 mt-8">
                <div className="col-span-2">
                    <p className="font-semibold">Balance Sheet + P&L Account</p>
                    <small>
                        This section contains details about sources of funds,
                        applications, credits and debits to your P&L account and
                        more details
                    </small>
                </div>
                <div className="flex items-center">
                    <button
                        onClick={() => setSection('Remuneration')}
                        className="bg-primary px-8 py-3 text-white rounded-md font-semibold text-sm cursor-pointer w-96 block col-span-1"
                    >
                        Fill BSPL
                    </button>
                </div>

                <div className="col-span-2">
                    <p className="font-semibold">Depreciation</p>
                    <small>
                        Summary of depreciation on all assets under the
                        Income-Tax Act.
                    </small>
                </div>
                <div className="flex items-center">
                    <button
                        onClick={() => setSection('Remuneration')}
                        className="bg-primary px-8 py-3 text-white rounded-md font-semibold text-sm cursor-pointer w-96 block col-span-1"
                    >
                        Fill Depreciation
                    </button>
                </div>

                <div className="col-span-2">
                    <p className="font-semibold">Schedule ICDS</p>
                    <small>
                        Effect of Income Computation and Disclosure Standards on
                        Profit
                    </small>
                </div>
                <div className="flex items-center">
                    <button
                        onClick={() => setSection('Remuneration')}
                        className="bg-primary px-8 py-3 text-white rounded-md font-semibold text-sm cursor-pointer w-96 block col-span-1"
                    >
                        Fill ICDS
                    </button>
                </div>

                <div className="col-span-2">
                    <p className="font-semibold">Schedule ESR</p>
                    <small>
                        Deduction under section 35 (expenditure on scientific
                        research)
                    </small>
                </div>
                <div className="flex items-center">
                    <button
                        onClick={() => setSection('Remuneration')}
                        className="bg-primary px-8 py-3 text-white rounded-md font-semibold text-sm cursor-pointer w-96 block col-span-1"
                    >
                        Fill ESR
                    </button>
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
