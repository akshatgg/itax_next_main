"use client";
import React, { useRef, useState, useContext, useEffect } from "react";
import axios from "axios";
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
import useAuth  from '../../../hooks/useAuth';
const MOM_ITAX_URL = process.env.NEXT_PUBLIC_MOM_ITAX_URL;
import { RiFileDownloadFill } from "react-icons/ri";
// import { StoreContext } from "../../../store/store-context";
import { PDF_DOC } from "../../../store/actions";
import ResultComponent from "../Components/ResultComponent";
import { useRouter } from "next/navigation";
import { useReactToPrint } from "react-to-print";
import SearchResult_section from "@/components/pagesComponents/pageLayout/SearchResult_section.js";

import gstStateCodes from "@/utils/gstStateCodes"; 
export default function Searchbypan() {
	const {token} = useAuth();
    const navigate = useRouter();

	const panRef = useRef("");

	const [selectStateCode, setSelectStateCode] = useState(0);
	const [showdata, setShowData] = useState("");
	const [loading, setLoading] = useState("");
	const [showHide, setShowHide] = useState(false);
	const [showPdf, setShowPdf] = useState(false);
	const [error, setError] = useState(false);
	// const [state, dispatch] = useContext(StoreContext);
	const [stateCode, setStateCode] = useState([]);
	const pdf_ref = useRef();
    const stateCodeRef=useRef();
	const generateDataObject = () => ({
		title: "TAX PAYER DETAIL",
		column: ["Field", "Detail"],
		data: [
			{ Field: "Legal Name Of Business", Detail: showdata.lgnm },
			{ Field: "Trade Name", Detail: showdata.tradeNam },
			{ Field: "Effective Date Of Registration", Detail: showdata.rgdt },
			{ Field: "Constitution of Business", Detail: showdata.ctb },
			{ Field: "GSTIN/UIN/Status", Detail: showdata.sts },
			{ Field: "Tax Payer Type", Detail: showdata.dty },
			{ Field: "State Juridication", Detail: showdata.stj },
			{
				Field: "Administrative Office",
				Detail: "GURUDWARA SANTAR  Gwalior MORAR  GWALIOR  474005 GWALIOR Madhya Pradesh",
			},
			{
				Field: "Principal place of Business",
				Detail: showdata.pradr.ntr,
			},
		],
	});

	
	const generatePDF = useReactToPrint({
		content: () => pdf_ref.current,
		documentTitle: "PAN Of Tax Payer",
	});


	const handleSubmit = async (e) => {
		e.preventDefault();

		const enteredPAN = panRef.current.value;
		// const enteredStateCode = statecodeRef.current.value;

		const enteredStateCode = selectStateCode;

		// Validate PAN before making the API request
		if (!validatePAN(enteredPAN)) {
			setError(true);
			setShowHide(false);
			setLoading(false);
			return; // Don't proceed with the API request
		}

		setLoading(true);

		// console.log(enteredPAN, enteredStateCode);

		await axios
			.post(
				`${BACKEND_URL}/gst/search/gstin-by-pan?pan=${enteredPAN}&gst_state_code=${+enteredStateCode}`,
				{ pan: enteredPAN, gst_state_code: enteredStateCode },
				{
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json'
					}
				}
			)
			.then(function (response) {
				 setShowData(response.data.data[0].data);
				setShowHide(true);
				setError(false);
				setLoading(false);
				// console.log("in",response)
			})
			.catch(function (error) {
				// console.log("out",error);

				setError(true);
				setShowHide(false);
				setLoading(false);
			});
	};
	const manageHandleClear = (e) => {
		e.preventDefault();
		panRef.current.value = "";
		setShowData("");
		setSelectStateCode(0);
		setShowHide(false);
	};
	const validatePAN = (pan) => {
		const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
		return panRegex.test(pan);
	};

	const payload = () => {
		dispatch({ type: `${PDF_DOC}`, payload: generateDataObject() });
		navigate.push("/pdfViewer");
	};

	const { bnm, bno, city, dst, flno, lg, loc, lt, pncd, st, stcd } =
		showdata.pradr?.addr || {};

	const details = [
		{ label: "Legal Name Of Business", value: showdata.lgnm },
		{ label: "Trade Name", value: showdata.tradeNam },
		{ label: "Effective Date Of Registration", value: showdata.rgdt },
		{ label: "Constitution of Business", value: showdata.ctb },
		{ label: "GSTIN/UIN/Status", value: showdata.sts },
		{ label: "Tax Payer Type", value: showdata.dty },
		{ label: "State Juridication", value: showdata.stj },
		{
			label: "Administrative Office:",
			value: `${bnm} ${bno} ${city} ${dst} ${flno} ${lg} ${loc} ${lt} ${pncd} ${st} ${stcd}`,
		},
		{
			label: "Principal place of Business:",
			value: `${dst} ${stcd} ${pncd}`,
		},
	];
    return (
        <SearchResult_section title="Search by PAN" className="min-h-screen flex flex-col md:flex-row justify-center">
            <li>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                        <div>
                            <label
                            htmlFor="pan"
                            className="form-label inline-block mb-2 text-gray-700"
                            >
                            PAN Of Tax Payer
                            </label>
                            <div className="flex">
                            <input
                                type="text"
                                className="form-input w-full border p-2 border-blue-500 rounded-l"
                                id="pan"
                                placeholder="Enter PAN Of The Tax Payer"
                                ref={panRef}
                            />
                            </div>
                        </div>
                        <div>
                            <label
                            htmlFor="stateCode"
                            className="form-label inline-block mb-2 text-gray-700"
                            >
                            GST State Code
                            </label>
                            <select
                            className="form-input w-full border border-blue-500 p-2 rounded-l"
                            id="stateCode"
                            placeholder="Select State"
							
                            onChange={(e) => {
                                setSelectStateCode(e.target.value);
                            }}
							value={selectStateCode}
                            >
                            <option value={0}  >
                                Select State
                            </option>
                            {gstStateCodes.map((state) => (
                                <option className=" capitalize" key={state.code} value={state.code}>
                                {state.code} - {state.state}
                                </option>
                            ))}
                            </select>
                        </div>
                    </div>
                    <div className="grid gap-4 lg:p-4 place-content-center grid-cols-[repeat(auto-fill,_minmax(120px,_1fr))] xl:grid-cols-2 lg:grid-cols-[repeat(auto-fill,_minmax(120px,_1fr))]">
                        <button
                        disabled={loading}
                        className={`btn-primary ${loading?" cursor-not-allowed ":""}`}
                        >
                        {loading ? (
                            <span className="inline-block w-4 h-4 border-white border-b-zinc-400 border-r-zinc-400 border-2 border-solid rounded-full animate-spin"></span>
                        ) : (
                            "Search"
                        )}
                        </button>
                        <button 
                            disabled={loading} 
                            onClick={(e) => manageHandleClear(e)}
                            onKeyDown={(event) =>event.key === "Enter" ? handleSubmit() : "" }
                            className={`btn-warning ${loading?" cursor-not-allowed ":""}`}
                        >
                        clear
                        </button>
                        {showHide && (<button type="button" className="btn-primary lg:col-span-2" onClick={generatePDF}>Download</button>)}
                    </div>
                </form>
                {error && (
                <h1 className="text-red-400 ml-4">Please Enter Valid Credentials</h1>
                )}
            </li>
            <li className="lg:col-span-2 bg-gray-200 p-4">
                {showHide ? (
                    <div className="bg-white mx-auto  p-8" ref={pdf_ref}>
						 <ResultComponent title="PAN CARD DETAILS" details={details}  />
                   	 </div>
                ) : (
                    <div className="bg-white mx-auto md:w-2/3 px-2 py-8">
                        <div className="text-center ">
                            <p className="paragraph-xl">Welcome to the TaxPayer search page.</p>
                            <p className="paragraph-md">Use the search bar to find information about taxpayers and their financial records.</p>
                        </div>
                    </div>
                )}
            </li>
        </SearchResult_section>
    );
}