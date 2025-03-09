"use client";
// import gstStateCodes from "@/utils/gstStateCodes";
export default function InvoiceDetails(props) {
	const { register, setError, clearErrors, errors, setValue } = props;
	return (
		<div className="p-2 rounded-md border shadow-sm shadow-blue-600">
			<div className="uppercase font-medium text-xl text-gray-800 pl-2 border-l-4 border-l-blue-600">
				invoice details
			</div>
			<ul className="mt-2 grid gap-2 grid-cols-[repeat(auto-fit,_minmax(180px,_1fr))]">
				<li>
					<label className="label" htmlFor="invoiceNumber">
						Invoice Number
					</label>
                    <div className="flex items-center gap-1">
                        {/* <div className=" text-gray-800 tracking-tighter font-medium text-xs">Prefix</div> */}
					    <input {...register("invoiceNumber")} className="input" type="text" id="invoiceNumber" />
                    </div>
				</li>
                {/* <li>
					<label className="label" htmlFor="stateOfSupply">
						State Of Supply
					</label>
					<select
						className="input"
						id="stateOfSupply"
						{...register("stateOfSupply", {
							required: "Item name is required",
						})}
						defaultValue={"same state"}
					>
						<option value="same state" className="text-sm">Same State</option>
						{gstStateCodes.map((state, index) => (
							<option
								className="text-sm"
								key={index}
								value={state.state}
							>
								{state.code}:{state.state}
							</option>
						))}
					</select>
					<p className=" text-sm text-red-500 h-4 px-2">
						{errors.stateOfSupply && errors.stateOfSupply.message}
					</p>
				</li> */}
                <li>
                    <div className="label">Credit</div>
                    <label htmlFor="toggleTwo" className="input mt-1 label flex justify-between gap-2 items-center cursor-pointer select-none text-dark dark:text-white" >
                        Credit
                        <div className="relative border border-blue-500 w-10 h-6 rounded-md">
                            <input
                                type="checkbox"
                                id="toggleTwo"
                                className="peer sr-only"
                                {...register("credit")}
                            />
                            <div className="absolute left-[4px] top-[4px] bg-blue-50 border border-inherit transition-transform duration-200 peer-checked:translate-x-4 peer-checked:bg-blue-500 h-4 w-4 rounded-full "></div>
                        </div>
                    </label>
                </li>
                <li>
                    <label className="label" htmlFor="dueDate">
                        Due Date
                    </label>
                    <input
                        className="input"
                        type="date"
                        id="dueDate"
                        {...register("dueDate")}
                    />
                </li>
			</ul>
		</div>
	);
}
