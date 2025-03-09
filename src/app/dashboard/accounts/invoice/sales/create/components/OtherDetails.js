export default function OtherDetails(props) {
    const { register,errors } = props;
    return (
        <div className="md:col-span-2 p-2 rounded-md border shadow-sm shadow-blue-600">
            <div className="uppercase font-medium text-xl text-gray-800 pl-2 border-l-4 border-l-blue-600">
                Extra Details
            </div>
            <ul className="mt-2 grid gap-2 grid-cols-[repeat(auto-fit,_minmax(180px,_1fr))]">
                <li>
                    <label
                        htmlFor="details"
                        className="label"
                    >
                        Details
                    </label>
                    <textarea
                        id="details"
                        className="input max-h-20 "
                        rows="1"
                        placeholder="Details"
                        {...register("details", {
                            required: "details is required",
                        })}
                    ></textarea>
                    <p className=" text-xs text-red-500 h-4 px-2">
                        {errors.details && errors.details.message}
                    </p>
                </li>
                <li>
                    <label
                        htmlFor="extraDetails"
                        className="label"
                    >
                        Extra Details
                    </label>
                    <textarea
                        id="extraDetails"
                        className="input max-h-20 "
                        rows="1"
                        placeholder="Details"
                        {...register("extraDetails", {
                            required: "extraDetails is required",
                        })}
                    ></textarea>
                    <p className=" text-xs text-red-500 h-4 px-2">
                        {errors.extraDetails &&
                            errors.extraDetails.message}
                    </p>
                </li>
            </ul>
        </div>
    );
}