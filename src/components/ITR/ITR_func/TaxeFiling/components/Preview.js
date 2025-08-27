import Link from "next/link";
export default function Preview({personalInfo,itrObj}) {
    return (
        <div className="mx-auto max-w-7xl p-2">
            <div className="[&>div]:p-2 divide-y-2 border border-gray-400 rounded-md">
                <div className="flex justify-between ">
                    <div>
                        <h4 className="text-md font-medium tracking-tighter">Personal Information</h4>
                        <p className="text-xs text-neutral-700">Includes your, InformationBank and DetailsAddress</p>
                    </div>
                    <div className="grid grid-rows-2">
                        <span>{personalInfo.panNumber}</span>
                        <Link href="/dashboard/itr/itr-filling/personal-info" className="text-blue-500 text-xs">Modify if Required</Link>
                    </div>
                </div>
                <div className="flex justify-between ">
                    <div>
                        <h4 className="text-md font-medium tracking-tighter">Gross Total Income</h4>
                        <p className="text-xs text-neutral-700">Includes your, SalaryHouse, PropertyOther, IncomeBusiness and ProfessionCapital Gain</p>
                    </div>
                    <div>
                        <div>&#x20B9;0</div>
                        <Link href="/dashboard/itr/itr-filling/income-sources" className="text-blue-500 text-xs">Modify if Required</Link>
                    </div>
                </div>
                <div className="flex justify-between ">
                    <div>
                        <h4 className="text-md font-medium tracking-tighter">Deductions</h4>
                        <p className="text-xs text-neutral-700">Includes your,Section 80, DeductionsMore, DeductionsOther, Deduction, </p>
                    </div>
                    <div>
                        <div>&#x20B9;0</div>
                        <Link href="/dashboard/itr/itr-filling/deductions" className="text-blue-500 text-xs">Modify if Required</Link>
                    </div>
                </div>

                {/* <div className="flex justify-between ">
                    <div>
                        <h4 className="text-md font-medium tracking-tighter">Tax Payable</h4>
                        <p className="text-xs text-neutral-700">Includes your, Gross Total Income, Deductions And Taxable Income</p>
                    </div>
                    <div>
                        <div>&#x20B9;0</div>
                        <Link href="/dashboard/itr/itr-filling/tax-payable" className="text-blue-500 text-xs">Modify if Required</Link>
                    </div>
                </div> */}
                
                <div className="flex justify-between ">
                    <div>
                        <h4 className="text-md font-medium tracking-tighter">Taxes Paid</h4>
                        <p className="text-xs text-neutral-700">TDS, Self Tax Payments</p>
                    </div>
                    <div>
                        <div>&#x20B9;0</div>
                        <Link href="/dashboard/itr/itr-filling/taxes-paid" className="text-blue-500 text-xs">Modify if Required</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}