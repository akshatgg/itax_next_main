"use client";

import { useState } from 'react';
import NonSalaryTDS from './TDS/NonSalaryTDS';
import TDSonSale from './TDS/TDSonSale';
import TCS from './TDS/TCS';

export default function TDS() {
    const [section, setSection] = useState();

    return (
        <>
            {section === 'Non Salary TDS' ? (
                <NonSalaryTDS setSection={setSection} />
            ) : section === 'TDS on Sale' ? (
                <TDSonSale setSection={setSection} />
            ) : section === 'TCS' ? (
                <TCS setSection={setSection} />
            ) : (
                <div className="mx-auto max-w-4xl w-full">
                    <div className='overflow-hidden'>
                    <h3 className="border-b font-semibold mb-5">
                        TDS on Salary Income
                    </h3>
                    <table className="text-sm text-left my-5 w-full">
                        <thead>
                            <tr className="bg-zinc-100">
                                <th className="border">Status</th>
                                <th className="border">S.No.</th>
                                <th className="border">Name of Employer</th>
                                <th className="border">TDS Deducted</th>
                                <th className="border">Salary Income</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border">1</td>
                                <td className="border">200</td>
                                <td className="border">200</td>
                                <td className="border">200</td>
                                <td className="border">200</td>
                            </tr>
                        </tbody>
                    </table>
                    </div>

                    <div className="md:grid md:grid-cols-3 flex flex-col items-center gap-10 mt-10 md:px-2 px-4">
                        <div className="col-span-2">
                            <p className="font-semibold">Non Salary TDS</p>
                            <small>
                                Non Salary TDS In this section, add TDS entries
                                on interest income, professional or consulting
                                income, etc. (Other than TDS on Salary and Sale
                                of Immovable Property).
                            </small>
                        </div>
                        <div className="w-full">
                            <button
                                onClick={() => setSection('Non Salary TDS')}
                                className="bg-primary px-4 py-3 text-white w-full rounded-md font-semibold text-sm cursor-pointer block col-span-1"
                            >
                                Add Entry
                            </button>
                        </div>

                        <div className="col-span-2">
                            <p className="font-semibold">
                                TDS on Sale/Rent of Immovable Property
                            </p>
                            <small>
                                If you sell/rent land, house, property or
                                building etc (immovable property) etc, the
                                buyer/tenant may have deducted TDS at the rate
                                of 1% on the sale price of the property/rental
                                and issued you a TDS certificate.You need to
                                specify those TDS deduction details here.
                            </small>
                        </div>
                        <div className="flex w-full">
                            <button
                                onClick={() => setSection('TDS on Sale')}
                                className="bg-primary px-8 py-3 text-white rounded-md font-semibold text-sm cursor-pointer w-full block col-span-1"
                            >
                                Add Entry
                            </button>
                        </div>

                        <div className="col-span-2">
                            <p className="font-semibold">
                                Taxes Collected at Source (TCS)
                            </p>
                            <small>
                                In this section, you can add TCS entries (For
                                example - on purchase of cars).
                            </small>
                        </div>
                        <div className="flex w-full">
                            <button
                                onClick={() => setSection('TCS')}
                                className="bg-primary px-8 py-3 text-white rounded-md font-semibold text-sm cursor-pointer w-full block col-span-1"
                            >
                                Add Entry
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
