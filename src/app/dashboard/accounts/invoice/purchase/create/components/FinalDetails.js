export default function FinalDetails(props) {
    const { register,errors} = props;
    return (
        <div className="md:col-span-2 p-2 rounded-md border shadow-sm shadow-blue-600">
            <div className="uppercase font-medium text-xl text-gray-800 pl-2 border-l-4 border-l-blue-600">
                Total
            </div>
            <ul>
                <li>
                    <label
                        htmlFor="totalAmount"
                        className="label"
                    >
                        Total Amount
                    </label>
                    <input
                        type="number"
                        id="totalAmount"
                        className="input"
                        placeholder="00"
                        {...register("totalAmount", {
                            required: "total Amount is required",
                        })}
                    />
                    <p className=" text-xs text-red-500 h-4 px-2">
                        {errors.totalAmount &&
                            errors.totalAmount.message}
                    </p>
                </li>
                <li>
                    <label htmlFor="modeOfPayment" className="label">
                        Mode Of Payment
                    </label>
                    <select
                        id="modeOfPayment"
                        className="input"
                        placeholder="00"
                        {...register("modeOfPayment", {
                            required: "made of payment is required",
                        })}
                        defaultValue={"cash"}
                    >
                        <option value="cash">Cash</option>
                        <option value="bank">bank</option>
                        <option value="upi">upi</option>
                        <option value="credit">credit</option>
                    </select>
                    <p className=" text-xs text-red-500 h-4 px-2">{errors.modeOfPayment && errors.modeOfPayment.message}</p>
                </li>
            </ul>
        </div>
    );
}

