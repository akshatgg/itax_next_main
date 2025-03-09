"use client";
import React, { useRef, useState, useContext } from "react";
// import { PDF_DOC } from "../../../store/actions";
// import { useNavigate } from "react-router-dom";
import { useRouter } from "next/navigation";

import ResultComponent from "../Components/ResultComponent.jsx";
import FormComponent from "../Components/FormComponent.jsx";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
import useAuth from '../../../hooks/useAuth';
import userAxios from "@/lib/userAxios.js";
import { useReactToPrint } from "react-to-print";
import SearchResult_section from "@/components/pagesComponents/pageLayout/SearchResult_section.js";

export default function VerifyPanDetails() {
    const navigate = useRouter();
	const panRef = useRef("");
	const [showdata, setShowData] = useState("");
	const [showhide, setShowHide] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const pdf_ref = useRef();
	const {token} = useAuth();
	// const [state, dispatch] = useContext(StoreContext);

	const validatePAN = (pan) => {
		const regex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
		return regex.test(pan);
	};

	const handleSubmit = async (e, inputValue) => {
		// Corrected parameter order
		e.preventDefault();
		setLoading(true);
		try {
			const response = await userAxios.get(
				`${BASE_URL}/pan/get-pan-details?pan=${inputValue}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			setShowData(response.data.data);
			setShowHide(true);
			setError("");
		} catch (error) {
			console.error(error);
			setShowHide(false);
			setError("An error occurred while fetching PAN details.");
		} finally {
			setLoading(false);
		}
	};
	const handleClear = async (e) => {
		e.preventDefault();
		setShowData("");
		setShowHide(false);
		setError(false);
	};

	const generateDataObject = () => ({
		title: "PAN DETAILS",
		column: ["Field", "Detail"],
		data: [
			{
				Field: "Aadhaar Seeding Status",
				Detail: showdata.aadhaar_seeding_status === "Y" ? "Yes" : "No",
			},
			{ Field: "Category", Detail: showdata.category },
			{ Field: "First Name", Detail: showdata.first_name },
			{ Field: "Middle Name", Detail: showdata.middle_name },
			{ Field: "Last Name", Detail: showdata.last_name },
			{ Field: "Last Updated", Detail: showdata.last_updated },
			{ Field: "Status", Detail: showdata.status },
		],
	});

	const payload = () => {
		// dispatch({ type: `${PDF_DOC}`, payload: generateDataObject() });
		navigate.push("/pdfViewer");
	};

	const details = [
		{
			label: "Aadhaar Seeding Status",
			value: showdata.aadhaar_seeding_status === "Y" ? "Yes" : "No",
		},
		{ label: "Category", value: showdata.category },
		{ label: "First Name", value: showdata.first_name },
		{ label: "Middle Name", value: showdata.middle_name },
		{ label: "Last Name", value: showdata.last_name },
		{ label: "Last Updated", value: showdata.last_updated },
		{ label: "Status", value: showdata.status },
	];
	const generatePDF = useReactToPrint({
		content: () => pdf_ref.current,

		documentTitle: "PAN DETAILS",
	});
    return (
        <SearchResult_section title={"PAN DETAILS"}>
            <li>
                <FormComponent
                    onSubmit={handleSubmit}
                    validateInput={validatePAN}
                    inputLabel="Pan"
                    inputPlaceholder="Your PAN Number"
                    buttonText="Search"
                    handleClear={handleClear}
                    inputmaxlength="10"
                    generatePDF={generatePDF}
                    showhide={showhide}
                />
                {error && <p className="text-red-400">{error}</p>}
            </li>
            <li className="lg:col-span-2 bg-gray-200 p-4">
                {showhide ? (
                <div className="bg-white md:w-2/3 p-8" ref={pdf_ref} >
                    <ResultComponent
                    details={details}
                    dispatch={payload}
                    title={"PAN DETAILS"}
                    />
                </div>
                ) : (
                <div className="bg-white mx-auto md:w-2/3 px-2 py-8">
                    <div className="text-center ">
                        <p className="paragraph-xl">Welcome to the PAN verification page. </p>
                        <p className="paragraph-md">Use the search bar to find information about PAN.</p>
                    </div>
                </div>
                )}
            </li>
        </SearchResult_section>
    )
}