import NatureofBusinessComp from './NatureofBusinessComp';

export default function IncomeUnder44AE({setSection}) {
    return (
        <div className="mx-auto max-w-4xl w-full">
            <NatureofBusinessComp />
            <table className="text-sm text-left my-5 w-full">
                <tr className="bg-zinc-100">
                    <th className="border">ID</th>
                    <th className="border">Number of months</th>
                    <th className="border">Number of tons</th>
                    <th className="border">Income Per Vehicle Per Month</th>
                    <th className="border">Registration Number</th>
                    <th className="border">Ownership Status</th>
                    <th className="border"></th>
                </tr>
                <tr>
                    <td className="border">1</td>
                    <td className="border">200</td>
                    <td className="border">500</td>
                    <td className="border">500</td>
                    <td className="border">200</td>
                    <td className="border">
                        <select name="" id="">
                            <option value="ExemptionUS54">Owned</option>
                            <option value="ExemptionUS54B">Leased</option>
                            <option value="ExemptionUS54F">Hired</option>
                        </select>
                    </td>
                    <td className="border">Remove</td>
                </tr>
            </table>
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
