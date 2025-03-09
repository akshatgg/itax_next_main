"use client";
import React, { useRef, useState, useContext } from "react";
import axios from "axios";
//import { useAuth } from "../../../../hooks/useAuth";
// import { RiFileDownloadFill } from "react-icons/ri";
import { StoreContext } from "../../../store/store-context";
import { PDF_DOC } from "../../../store/actions";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
import useAuth from '../../../hooks/useAuth';
import FormComponent from "../Components/FormComponent.jsx";
import ResultComponent from "../Components/ResultComponent.jsx";
import { useRouter } from "next/navigation";
import { useReactToPrint } from "react-to-print";
import SearchResult_section from "@/components/pagesComponents/pageLayout/SearchResult_section.js";
import userAxios from "@/lib/userAxios";

export default function SearchTan() {
    const navigate = useRouter();
    const {token}=useAuth();

    const [showdata, setShowdata] = useState({});
    const [showhide, setShowHide] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const pdf_ref = useRef();

    // const [state, dispatch] = useContext(StoreContext);

    const validateTan = (tan) => {
            // Add your TAN validation logic here
            // Example: You can use a regular expression to validate the TAN
            return /^[A-Z]{4}[0-9]{5}[A-Z]$/.test(tan);
    };

    const generateDataObject = () => ({
		title: "TAN DETAILS",
		column: ["Field", "Detail"],
		data: [
			{
				Field: "Name",
				Detail: showdata.nameOrgn,
			},
			{
				Field: "Address",
				Detail: `${showdata.addLine1} ${showdata.addLine2} ${showdata.addLine3} ${showdata.addLine5}`,
			},
			{
				Field: "Pin Code",
				Detail: showdata.pin,
			},
			{
				Field: "Tan Allotment",
				Detail: showdata.dtTanAllotment,
			},
			{
				Field: "Email",
				Detail: showdata.emailId1,
			},
		],
    });

    const handleSubmit = async (e, inputValue) => {
		e.preventDefault();
		setLoading(true);

		try {
			const response = await userAxios.get(
				`${BASE_URL}/tan/search?tan=${inputValue}`
			);

			setShowdata(response.data.data);
			setShowHide(true);
			setError(false);
		} catch (error) {
			setError(true);
			setShowHide(false);
			console.error(error);
		} finally {
			setLoading(false);
		}
    };

    const payload = () => {
        dispatch({ type: `${PDF_DOC}`, payload: generateDataObject() });
        navigate.push("/pdfViewer");
    };
    const handleClear = async (e) => {
        e.preventDefault();
        setShowdata("");
        setShowHide(false);
        setError(false);
    };

    const details = [
        {
            label: "Name",
            value: showdata.nameOrgn,
        },
        {
            label: "Address",
            value: `${showdata.addLine1} ${showdata.addLine2} ${showdata.addLine3} ${showdata.addLine5}`,
        },
        {
            label: "Pin Code",
            value: showdata.pin,
        },
        {
            label: "Tan Allotment",
            value: showdata.dtTanAllotment,
        },
        {
            label: "Email",
            value: showdata.emailId1,
        },
    ];
    const generatePDF = useReactToPrint({
        content: () => pdf_ref.current,

        documentTitle: "Tan Details",
    });
    return (
        <SearchResult_section title="Search Tan Details">
            <li>
                <FormComponent
                    onSubmit={handleSubmit}
                    validateInput={validateTan}
                    inputLabel="Search By TAN"
                    inputPlaceholder="Enter TAN Number"
                    buttonText="Search"
                    handleClear={handleClear}
                    inputmaxlength={"10"}
                    generatePDF={generatePDF}
                    showhide={showhide}
                />
                {error && <p className="text-red-400">{error}</p>}
                
            </li>
            <li className="lg:col-span-2 bg-gray-200 p-4">
                {showhide ? (
                <div className="bg-white p-8" ref={pdf_ref}>
                    <ResultComponent
                    details={details}
                    dispatch={payload}
                    title={"TAN DETAILS"}
                    />
                </div>
                ) : (
                    <div className="bg-white mx-auto md:w-2/3 px-2 py-8">
                        <div className="text-center ">
                            <p className="paragraph-xl">Welcome to the Tan verification page. </p>
                            <p className="paragraph-md">Use the search bar to find information about Tan Number.</p>
                        </div>
                    </div>
                )}

            </li>
        </SearchResult_section>
    );
};
