"use client";
import React, { useRef, useState } from "react";
import useAuth  from "../../../hooks/useAuth";
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import SearchResult_section from "@/components/pagesComponents/pageLayout/SearchResult_section.js";
import { IoMdDownload } from "react-icons/io";
import handleExport from "@/helper/ExcelExport";
export default function Trackgstreturn() {
    const yearRef = useRef("");
    const gstinRef = useRef("");
  
    const [showdata, setShowData] = useState("");
    const [loading, setLoading] = useState("");
    const [error, setError] = useState(false);
    const [showhide, setShowHide] = useState(false);
    const pdf_ref = useRef();
    const { token } = useAuth();
  
    const handleInputChange = (event) => {
      if (event.target.value) {
        event.target.value = event.target.value.toUpperCase();
      }
    };
  
    const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		await axios
			.post(
				`${BACKEND_URL}/gst/return/track`,
				{
					gstin: gstinRef.current.value,
					financialYear: yearRef.current.value,
				},
                {
                    headers: {
                      Authorization: `Bearer ${token}`,
                      "Content-Type": "application/json",
                    },
                  }
			)
			.then(function (response) {
				//  console.log(response.data.data);
				setShowData(response.data.data);
                console.log(response.data)
				setLoading(false);
				setShowHide(true);
				setError(false);
			})
			.catch(function (error) {
				console.log(error);
				setError(true);
				setShowHide(false);

				setLoading(false);
			});

		// try {
		//     const response = await fetch(`${BASE_URL}/gst/return/track`, {
		//         method: 'POST',
		//         headers: {
		//             'Authorization': `Bearer ${token}`
		//           },
		//         body: JSON.stringify({
		//             // gstin: "23BNJPS3408M1ZP",
		//             // gst_portal_username: "newsethielectri"
		//             gstin: gstinRef.current.value,
		//             financialYear: yearRef.current.value,
		//         })
		//     });
		//     const data = await response.json();
		//     console.log(data)
		//     setShowData(data)

		// } catch (e) {
		//     console.error(e);
		//     setLoading(false);

		// } finally {
		//     setLoading(false);

		// }
	};
    const headers={
        "Return Type":'rtntype',
        "Arn Number":'arn',
        "Date of Filing":'dof',
        'Mode of Filing':'mof',
        'Return Period':'ret_prd',
        'Status':'status',
        'Valid':'valid',
    };
    const manageHandleClear = (e) => {
		e.preventDefault();
		gstinRef.current.value = "";
		setShowData("");
		setShowHide(false);
	};
	const generatePDF = useReactToPrint({
		content: () => pdf_ref.current,
		documentTitle: "track-gst-return",
	});
    const handleExcelExport= async()=>
    {
        const data={
           "Track Gst Return":{
            headers:headers,
            bodyData:showdata?.EFiledlist,
            bannerData: [
                {
                    text: "Blaze",
                    fontSize: 25,
                    fontItalic: false,
                    fontUnderline: false,
                    fontBold: true,
                    textColor: "fffffff",
                    backgroundColor: "FF3C7CDD",
                    startRow: 1,
                    endRow: 1,
                    startCol: 1,
                    endCol: 24,
                    height: 60,
                },
                {
                    text: "Track GST return",
                    fontSize: 11,
                    fontUnderline: false,
                    fontBold: false,
                    textColor: "2550000000",
                    backgroundColor: "fef9c3",
                    height: 25,
                    startRow: 2,
                    endRow: 2,
                    startCol: 1,
                    endCol: 24,
                    fontItalic: false,
                    height: 40,
                },
                {
                    text: "",
                    fontSize: 16,
                    fontUnderline: false,
                    fontBold: false,
                    textColor: "2550000000",
                    backgroundColor: "ffffff",
                    height: 25,
                    startRow: 3,
                    endRow: 3,
                    startCol: 1,
                    endCol: 24,
                    fontItalic: false,
                    height: 25,
                },
            ],
           }

        }
       await handleExport(data,"Track_GST_Return")
    }
    return (
        <SearchResult_section title="Track GST Return">
            <li className="">
                <form className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 ">
                        <div className="">
                            <label
                            htmlFor="gstin"
                            className="form-label inline-block mb-2 text-gray-700"
                            >
                            GSTN Of The Tax Payer
                            </label>
                            <div className="flex">
                            <input
                                type="text"
                                className="form-input w-full border p-2 border-blue-500 rounded-l"
                                id="gstin"
                                placeholder="Enter GSTN Of The Tax Payer"
                                ref={gstinRef}
                                onChange={handleInputChange}
                            />
                            </div>
                        </div>
                        <div className="">
                            <label
                            htmlFor="financialYear"
                            className="form-label inline-block mb-2 text-gray-700"
                            >
                            Financial Year
                            </label>
                            <select
                            ref={yearRef}
                            className="form-input w-full border p-2 border-blue-500 rounded-l"
                            aria-label="Default select example"
                            defaultValue={""}
                            >
                                <option>Choose..</option>
                                <option value="FY 2023-24">2023-24</option>
                                <option value="FY 2022-23">2022-23</option>
                                <option value="FY 2021-22">2021-22</option>
                            </select>
                        </div>
                    </div>
                    <div className="grid gap-4 lg:p-4 place-content-center grid-cols-[repeat(auto-fill,_minmax(120px,_1fr))] xl:grid-cols-2 lg:grid-cols-[repeat(auto-fill,_minmax(120px,_1fr))]">
                        <button
                            onClick={handleSubmit}
                            onKeyDown={(event) =>
                                event.key === "Enter" ? handleSubmit() : ""
                            }
                            disabled={loading}
                            className={`btn-primary ${loading?" cursor-not-allowed ":""}`}
                        >
                            {loading ? (<span className="spinner"></span>):("Search")}
                                
                        </button>
                        <button
                            disabled={loading}
                            onClick={(e) => manageHandleClear(e)}
                            className={`btn-warning ${loading?" cursor-not-allowed ":""}`}
                        >
                            clear
                        </button>
                        {showhide && (
                        <button onClick={handleExcelExport} type="button" className="flex w-full items-center gap-1 justify-center px-4 py-1 rounded-md text-white bg-green-500 hover:bg-green-600 hover:scale-105 transition-[transform,_colors] duration-300" ><IoMdDownload />
                        <span>Excel</span></button>
                        )}
                        {showhide && (
                        <button type="button" className="flex w-full items-center gap-1 justify-center px-4 py-1 rounded-md text-white bg-green-500 hover:bg-green-600 hover:scale-105 transition-[transform,_colors] duration-300" onClick={generatePDF}><IoMdDownload />
                        <span>PDF</span></button>
                        )}
                    </div>
                </form>
                <div className="py-4">
                {error && (
                    <h1 className="text-red-400 ml-4">Please Enter Valid GSTIN</h1>
                    )}
                </div>
            </li>
            <li className="lg:col-span-2 bg-gray-200 p-4">
                {showhide ? (
                    <div ref={pdf_ref} className="grid gap-4 place-content-center">
                        {showdata && showdata?.EFiledlist && (
                            <div className="mt-6 overflow-x-auto scrollbar-thin">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-blue-50  bg-primary dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                       {
                                        Object.keys(headers).map((col)=>{
                                            return <th className="px-6 py-3" key={col}>{col}</th>
                                        })
                                       } 
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        showdata?.EFiledlist?.map((row,i)=>{
                                            return <tr className={`${i % 2 !== 0 ? "bg-blue-50" : "bg-blue-100"}`} key={i}>
                                               <td className="px-6 py-3">
                                                 {row.rtntype}
                                               </td>
                                               <td className="px-6 py-3">
                                                 {row.arn}
                                               </td>
                                               <td className="px-6 py-3">
                                                 {row.dof}
                                               </td>
                                               <td className="px-6 py-3">
                                                 {row.mof}
                                               </td>
                                               <td className="px-6 py-3">
                                                 {row.ret_prd}
                                               </td>
                                               <td className="px-6 py-3 text-green-600">
                                                 {row.status}
                                               </td>
                                               <td className="px-6 py-3">
                                                 {row.valid}
                                               </td>
                                            </tr>
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                        )}
                    </div>
                    ):(
                    <div className="bg-white mx-auto md:w-2/3 px-2 py-8">
                        <div className="text-center ">
                            <p className="paragraph-xl"> Welcome to the Track GST Return page. </p>
                            <p className="paragraph-md"> Use the search bar to find information GST Returns and their financial records. </p>
                        </div>
                    </div>
                )}
            </li>
        </SearchResult_section>

    );
}
