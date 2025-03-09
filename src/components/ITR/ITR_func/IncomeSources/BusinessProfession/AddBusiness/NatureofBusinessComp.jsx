export default function NatureofBusinessComp({setSection}) {
    return (
        <>
            <h3 className="border-b font-semibold mb-5">
                Nature of Business Details
            </h3>
            <div className="grid grid-cols-3 gap-5">
                <div className="flex flex-col">
                    <label htmlFor="firstName" className="text-sm font-medium">
                        Nature of Business
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
                        Trade Name
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
                        Description
                    </label>
                    <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        className="h-12 px-3 mt-1 outline-none border border-gray-400 focus:border-primary rounded"
                    />
                </div>
            </div>
            <div className="flex gap-3 w-full items-center justify-center">
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
        </>
    );
}
