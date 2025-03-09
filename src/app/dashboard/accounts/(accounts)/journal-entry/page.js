import DashSection from "@/components/pagesComponents/pageLayout/DashSection";
import React from "react";

const page = () => {
    return (
        <>
            <DashSection title="Journal Entry " className="max-w-screen-lg">
                <div className="relative overflow-x-auto my-2 ">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Account
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Debit
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Credit
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <td className="px-6 py-4">Silver</td>
                                <td className="px-6 py-4">Laptop</td>
                                <td className="px-6 py-4">Laptop</td>
                            </tr>
                        </tbody>
                    </table>

                    <div class="mb-6 px-6">
                        <label
                            for="default-input"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Narration
                        </label>
                        <input
                            type="text"
                            id="default-input"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div>

                    <div className="flex justify-between md:justify-start items-center">
                        <button
                            type="submit"
                            className="focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </DashSection>
        </>
    );
};

export default page;
