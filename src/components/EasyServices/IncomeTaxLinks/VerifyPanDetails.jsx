"use client";
import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import axios from 'axios';
import ResultComponent from "../Components/ResultComponent.jsx";
import FormComponent from "../Components/FormComponent.jsx";
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
import useAuth from '../../../hooks/useAuth';
import { useReactToPrint } from "react-to-print";
import SearchResult_section from "@/components/pagesComponents/pageLayout/SearchResult_section.js";

export default function VerifyPanDetails() {
    const navigate = useRouter();
    const [showdata, setShowData] = useState("");
    const [showhide, setShowHide] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const pdf_ref = useRef();
    const {token} = useAuth();

    // Added form state for name and DOB
    const [formValues, setFormValues] = useState({
        pan: "",
        name_as_per_pan: "",
        date_of_birth: ""
    });

    const validatePAN = (pan) => {
        const regex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
        return regex.test(pan);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        
        // For PAN, convert to uppercase
        if (name === "pan") {
            setFormValues({
                ...formValues,
                [name]: value.toUpperCase()
            });
        } 
        // Format date of birth (DD/MM/YYYY)
        else if (name === "date_of_birth") {
            let formattedValue = value.replace(/[^\d]/g, '');
            if (formattedValue.length > 2 && formattedValue.length <= 4) {
                formattedValue = `${formattedValue.slice(0, 2)}/${formattedValue.slice(2)}`;
            } else if (formattedValue.length > 4) {
                formattedValue = `${formattedValue.slice(0, 2)}/${formattedValue.slice(2, 4)}/${formattedValue.slice(4, 8)}`;
            }
            setFormValues({
                ...formValues,
                [name]: formattedValue
            });
        } else {
            setFormValues({
                ...formValues,
                [name]: value
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {    
            const response = await axios.post(
                `${BACKEND_URL}/pan/get-pan-details`,
                {
                    pan: formValues.pan,
                    name_as_per_pan: formValues.name_as_per_pan,
                    date_of_birth: formValues.date_of_birth
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(response.data.data);
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
        setFormValues({
            pan: "",
            name_as_per_pan: "",
            date_of_birth: ""
        });
    };

    const generateDataObject = () => ({
        title: "PAN DETAILS",
        column: ["Field", "Detail"],
        data: [
            {
                Field: "Aadhaar Seeding Status",
                Detail: showdata.aadhaar_seeding_status === "y" ? "Yes" : "No",
            },
            { Field: "Category", Detail: showdata.category },
       
            { Field: "Last Updated", Detail: showdata.last_updated },
            { Field: "Status", Detail: showdata.status },
        ],
    });

    const payload = () => {
        navigate.push("/pdfViewer");
    };

    const details = [
        {
            label: "Aadhaar Seeding Status",
            value: showdata.aadhaar_seeding_status === "Y" ? "Yes" : "No",
        },
        { label: "Category", value: showdata.category },
      
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
                <div className="bg-white p-6 rounded-lg">
                    <h3 className="text-xl font-bold text-blue-600 mb-4">PAN Verification</h3>
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                PAN Number
                            </label>
                            <input
                                name="pan"
                                type="text"
                                value={formValues.pan}
                                onChange={handleInputChange}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Your PAN Number"
                                maxLength="10"
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Name as per PAN
                            </label>
                            <input
                                name="name_as_per_pan"
                                type="text"
                                value={formValues.name_as_per_pan}
                                onChange={handleInputChange}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Name as shown on PAN card"
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Date of Birth (DD/MM/YYYY)
                            </label>
                            <input
                                name="date_of_birth"
                                type="text"
                                value={formValues.date_of_birth}
                                onChange={handleInputChange}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                placeholder="DD/MM/YYYY"
                                maxLength="10"
                            />
                        </div>
                        
                        <div className="flex space-x-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex-1"
                            >
                                {loading ? 'Searching...' : 'Search'}
                            </button>
                            
                            <button
                                onClick={handleClear}
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Clear
                            </button>
                            
                            {showhide && (
                                <button
                                    onClick={generatePDF}
                                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Generate PDF
                                </button>
                            )}
                        </div>
                    </form>
                    
                    {error && <p className="text-red-400 mt-4">{error}</p>}
                </div>
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
                        <p className="paragraph-md">Please enter your PAN number, name as per PAN, and date of birth to verify your details.</p>
                    </div>
                </div>
                )}
            </li>
        </SearchResult_section>
    );
}