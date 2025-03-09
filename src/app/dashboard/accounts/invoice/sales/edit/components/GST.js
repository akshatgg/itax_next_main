export default function GST(props) {
    const { register, setError, clearErrors, errors, setValue,party_State } = props;
    return (
        <div className="md:col-span-2 p-2 rounded-md border shadow-sm shadow-blue-600">
            <div className="uppercase font-medium text-xl text-gray-800 pl-2 border-l-4 border-l-blue-600">
                GST Details
            </div>
            <ul className="mt-2 grid gap-2 grid-cols-[repeat(auto-fit,_minmax(180px,_1fr))]">
                {/* same State */}
                {party_State.isSameState &&
                <>
                    <li>
                        <label
                            htmlFor="cgst"
                            className="label"
                        >
                            CGST
                        </label>
                        <input
                            type="number"
                            id="cgst"
                            className="input"
                            placeholder="0.00"
                            {...register("cgst", {
                                required: "CGST is required",
                            })}
                        />
                        <p className=" text-xs text-red-500 h-4 px-2">
                            {errors.cgst && errors.cgst.message}
                        </p>
                    </li>
                    <li>
                        <label
                            htmlFor="sgst"
                            className="label"
                        >
                            SGST
                        </label>
                        <input
                            type="number"
                            id="sgst"
                            className="input"
                            placeholder="0.00"
                            {...register("sgst", {
                                required: "SGST is required",
                            })}
                        />
                        <p className=" text-xs text-red-500 h-4 px-2">
                            {errors.sgst && errors.sgst.message}
                        </p>
                    </li>
                </>
                }
                {party_State.isUnionTerritory &&
                <>
                    <li>
                        <label
                            htmlFor="cgst"
                            className="label"
                        >
                            CGST
                        </label>
                        <input
                            type="number"
                            id="cgst"
                            className="input"
                            placeholder="0.00"
                            {...register("cgst", {
                                required: "CGST is required",
                            })}
                        />
                        <p className=" text-xs text-red-500 h-4 px-2">
                            {errors.cgst && errors.cgst.message}
                        </p>
                    </li>
                    <li>
                        <label
                            htmlFor="utgst"
                            className="label"
                        >
                            UTGST
                        </label>
                        <input
                            type="number"
                            id="utgst"
                            className="input"
                            placeholder="0.00"
                            {...register("utgst", {
                                required: "UTGST is required",
                            })}
                        />
                        <p className=" text-xs text-red-500 h-4 px-2">
                            {errors.utgst && errors.utgst.message}
                        </p>
                    </li>
                </>
                }
                {!party_State.isSameState && !party_State.isUnionTerritory && 
                    <li>
                        <label
                            htmlFor="igst"
                            className="label"
                        >
                            IGST
                        </label>
                        <input
                            type="number"
                            id="igst"
                            className="input"
                            placeholder="0.00"
                            {...register("igst", {
                                required: "IGST is required",
                            })}
                        />
                        <p className=" text-xs text-red-500 h-4 px-2">
                            {errors.igst && errors.igst.message}
                        </p>
                    </li>
                }
            </ul>
        </div>
    );
}


'{isSameState: false, isOtherState: false, isUnionTerritory: false}'