"use client";
import React, { useRef, useState, useContext } from "react";
// import { StoreContext } from "../../../store/store-context";
import axios from "axios";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
import useAuth  from '../../../hooks/useAuth';
import { PDF_DOC } from "../../../store/actions";
import FormComponent from "../Components/FormComponent";
import ResultComponent from "../Components/ResultComponent";
import { useRouter } from "next/navigation";
import { useReactToPrint } from "react-to-print";
import SearchResult_section from "@/components/pagesComponents/pageLayout/SearchResult_section.js";
import userAxios from "@/lib/userAxios";

export default function Searchbygstin() {
	const {token} = useAuth();
    const navigate = useRouter();
	const [showdata, setShowData] = useState("");
	const [showhide, setShowHide] = useState(false);
	// const [state, dispatch] = useContext(StoreContext);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const pdf_ref = useRef();

	const validateGSTIN = (gstin) => {
		const regex =
			/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/;
		return regex.test(gstin);
	};

	const generateDataObject = () => ({
		title: "TAX PAYER DETAIL",
		column: ["Field", "Detail"],
		data: [
			{ Field: "GSTIN", Detail: showdata.gstin },
			{ Field: "Registration Date", Detail: showdata.rgdt },
			{ Field: "Legal Name Of Business", Detail: showdata.lgnm },
			{ Field: "Trade Name", Detail: showdata.tradeNam },
			{ Field: "Effective Date Of Registration", Detail: showdata.rgdt },
			{ Field: "Constitution of Business", Detail: showdata.ctb },
			{ Field: "GSTIN/UIN/Status", Detail: showdata.sts },
			{ Field: "Tax Payer Type", Detail: showdata.dty },
			{ Field: "State Juridication", Detail: showdata.stj },
			{ Field: "City Juridication", Detail: showdata.ctj },
			{
				Field: "Administrative Office",
				Detail: "GURUDWARA SANTAR  Gwalior MORAR  GWALIOR  474005 GWALIOR Madhya Pradesh",
			},
			{
				Field: "Principal place of Business",
				Detail: `${showdata.pradr.addr.st} ${showdata.pradr.addr.stcd} ${showdata.pradr.addr.pncd}`,
			},
		],
	});

	const handleSubmit = async (e, inputValue) => {
		e.preventDefault();
		try {
			const response = await userAxios.get(
				`${BASE_URL}/gst/search/gstin/${inputValue}`
			);
			console.log(response)
			setShowData(response.data.data.data);
			setShowHide(true);
			setError(false);
		} catch (error) {
			setError(true);
			setShowHide(false);
			console.log(error);
		}
	};
	const handleClear = async (e) => {
		e.preventDefault();
		setShowData("");
		setShowHide(false);
		setError(false);
	};

	const payload = () => {
		dispatch({ type: `${PDF_DOC}`, payload: generateDataObject() });
		navigate.push("/pdfViewer");
	};

	const { bnm, bno, city, dst, flno, lg, loc, lt, pncd, st, stcd } =
		showdata.pradr?.addr || {};

	const details = [
		{ label: "GSTIN:", value: showdata.gstin },
		{ label: "Registration Date:", value: showdata.rgdt },
		{ label: "Trade Name:", value: showdata.tradeNam },
		{ label: "Effective Date Of Registration:", value: showdata.rgdt },
		{ label: "Constitution of Business:", value: showdata.ctb },
		{ label: "GSTIN/UIN/Status:", value: showdata.sts },
		{ label: "TaxPayer Type:", value: showdata.dty },
		{ label: "State Jurisdiction:", value: showdata.stj },
		{ label: "City Jurisdiction:", value: showdata.ctj },
		{
			label: "Administrative Office:",
			value: `${bnm} ${bno} ${city} ${dst} ${flno} ${lg} ${loc} ${lt} ${pncd} ${st} ${stcd}`,
		},
		{
			label: "Principal place of Business:",
			value: `${dst} ${stcd} ${pncd}`,
		},
	];
	const generatePDF = useReactToPrint({
		content: () => pdf_ref.current,
		documentTitle: "GSTIN Detail",
	});
    return (
        <SearchResult_section title="Search by GSTIN">
            <li>
                <FormComponent
                    onSubmit={handleSubmit}
                    validateInput={validateGSTIN}
                    inputLabel="Search By"
                    inputPlaceholder="Your GST Identification Number"
                    buttonText="Search"
                    handleClear={handleClear}
                    showhide={showhide}
                    generatePDF={generatePDF}
                />

                {error && <p className="text-red-400">Please Enter Valid Details</p>}
                {/* {!showhide && (
                    <div className=" flex flex-col mt-20 sm:items-center">
                        <button type="button" className="btn-primary lg:col-span-2"  onClick={generatePDF}>Download</button>
                    </div>
                )} */}
            </li>
            <li className="lg:col-span-2 bg-gray-200 p-4">
            {showhide ? (
                <div className="bg-white p-3 md:p-8" ref={pdf_ref}>
                    <ResultComponent
                        details={details}
                        dispatch={payload}
                        title="TAX PAYER DETAIL"
                    />
                </div>
                ):(
                <div className="bg-white mx-auto md:w-2/3 px-2 py-8">
                    <div className="text-center ">
                        <p className="paragraph-xl">Welcome to the TaxPayer search page.</p>
                        <p className="paragraph-md">Use the search bar to find information about taxpayers and their financial records.</p>
                    </div>
                </div>
                )}
            </li>

        </SearchResult_section>
    )
}
