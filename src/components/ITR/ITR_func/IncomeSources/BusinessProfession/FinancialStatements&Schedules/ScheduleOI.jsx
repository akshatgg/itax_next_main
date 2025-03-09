export default function ScheduleOI({setSection}) {
    return <div className="mx-auto max-w-4xl w-full">
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
    </div>;
}
