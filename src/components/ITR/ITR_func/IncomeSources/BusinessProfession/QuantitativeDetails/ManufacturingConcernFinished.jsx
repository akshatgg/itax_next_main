export default function ManufacturingConcernFinished({setSection}) {
    return (
        <div className="mx-auto max-w-4xl w-full">
            <table className="text-sm text-left my-5 w-full">
                <tr className="bg-zinc-100">
                    <th className="border">ID</th>
                    <th className="border">Name</th>
                    <th className="border">Unit</th>
                    <th className="border">Opening</th>
                    <th className="border">Purchase</th>
                    <th className="border">Quantity Manufactured</th>
                    <th className="border">Sales</th>
                    <th className="border">Closing</th>
                    <th className="border">Shortage / Excess</th>
                    <th className="border"></th>
                </tr>
                <tr>
                    <td className="border">1</td>
                    <td className="border">XYZ</td>
                    <td className="border">
                        <select>
                            <option value="Acre">Acre</option>
                            <option value="Carat">Carat</option>
                            <option value="Cubicft">Cubic Ft.</option>
                            <option value="CubicMeter">Cubic Meter</option>
                            <option value="Feet">Feet</option>
                            <option value="Grams">Grams</option>
                            <option value="Inch">Inch</option>
                            <option value="Kilograms">Kg</option>
                            <option value="Kiloletre">Kl</option>
                            <option value="Kilometer">Km</option>
                            <option value="KWatt">KWatt</option>
                            <option value="Litre">lt</option>
                            <option value="Meter">meter</option>
                            <option value="Milligrams">mg</option>
                            <option value="MWatt">MWatt</option>
                            <option value="Number">Number</option>
                            <option value="NumbersInThousands">
                                Number (in thousands)
                            </option>
                            <option value="Pound">Pound</option>
                            <option value="Quintal">Quintal</option>
                            <option value="Residual">Residual</option>
                            <option value="Sqft">Sqft</option>
                            <option value="Sqmeter">Sqmt</option>
                            <option value="Ton">Ton</option>
                        </select>
                    </td>
                    <td className="border">500</td>
                    <td className="border">500</td>
                    <td className="border">200</td>
                    <td className="border">200</td>
                    <td className="border">200</td>
                    <td className="border">200</td>
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
