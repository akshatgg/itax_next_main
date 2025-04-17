"use client";
import React, { useRef, useState } from "react";
import axios from "axios";
// import useAuth from "@/hooks/useAuth";
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
import useAuth  from '../../../hooks/useAuth';
const MOM_ITAX_URL = process.env.NEXT_PUBLIC_MOM_ITAX_URL;
import ResultComponent from "../Components/ResultComponent";
import { aadharRegex, panRegex } from "@/components/regexPatterns";
import { useReactToPrint } from "react-to-print";
import SearchResult_section from "@/components/pagesComponents/pageLayout/SearchResult_section.js";

export default function CheckPanAadhaarStatus() {
  const {token}=useAuth();
  
  const panRef = useRef("");
  const aadhaarRef = useRef("");
  const [showdata, setShowData] = useState("");
  const [loading, setLoading] = useState("");
  const [errors, setErrors] = useState({});
  const pdf_ref = useRef();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let newErrors = {};
    if (!aadharRegex.test(aadhaarRef.current.value)) {
      newErrors.adhaar = "Invalid Adhaar number";
    }

    if (!panRegex.test(panRef.current.value)) {
      newErrors.pan = "Invalid PAN number";
    }

    setErrors(newErrors);

    try {
      if (Object.keys(newErrors).length === 0) {
        console.log("Form submitted successfully");
        const response = await axios.post(
          `${BACKEND_URL}/pan/pan-aadhaar-link-status/`,
           {
            pan: panRef.current.value,
            aadhaar: aadhaarRef.current.value,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(response.data.data.message); // Check the response data received from the server

        // Assuming the API response has the necessary data to display, update the state to show the result
        setShowData(response.data.data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const manageHandleClear = (e) => {
    e.preventDefault();
    panRef.current.value = "";
    aadhaarRef.current.value = "";
    setShowData("");
    setLoading(false);
  };
  const handleInputChange = (event) => {
    if (event.target.value) {
      event.target.value = event.target.value.toUpperCase();
    }
  };
    const generatePDF = useReactToPrint({
        content: () => pdf_ref.current,

        documentTitle: "Pan Aadhaar Status",
    });
    

  return (
    <>
      <SearchResult_section title="Check Pan Aadhaar Status">
        <li>
            <form action="" className="space-y-4">
                <div  className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 ">
                    <div className="mb-3 xl:w-75 mx-2">
                        <label
                        htmlFor="exampleFormControlInput1"
                        className="form-label inline-block mb-2 text-gray-700"
                        >
                        PAN No.
                        </label>
                        <div className="flex">
                        <input
                            type="text"
                            className="form-input w-full border p-2 rounded-l border-blue-500"
                            id="exampleFormControlInput1"
                            placeholder="Enter PAN No."
                            ref={panRef}
                            onChange={handleInputChange}
                            maxLength={10}
                        />
                        </div>
                        {errors.pan && (
                        <p className="text-xs text-red-700">{errors.pan}</p>
                        )}
                    </div>
                    <div className="mb-3 xl:w-75 mx-2">
                        <label
                        htmlFor="exampleFormControlInput2"
                        className="form-label inline-block mb-2 text-gray-700"
                        >
                        Aadhaar No.
                        </label>
                        <div className="flex">
                        <input
                            type="text"
                            className="form-input w-full border p-2 rounded-l border-blue-500"
                            id="exampleFormControlInput2"
                            placeholder="Enter Aadhaar No."
                            ref={aadhaarRef}
                        />
                        </div>
                        {errors.adhaar && (
                        <p className="text-xs text-red-700">{errors.adhaar}</p>
                        )}
                    </div>
                </div>
                <div  className="grid gap-4 p-4 place-content-center grid-cols-[repeat(auto-fill,_minmax(120px,_1fr))] xl:grid-cols-2 lg:grid-cols-[repeat(auto-fill,_minmax(120px,_1fr))]">
                    <button
                        disabled={loading}
                        onClick={handleSubmit}
                        onKeyDown={(event) =>
                            event.key === "Enter" ? handleSubmit() : ""
                        }
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
                    {showdata && (
                    <button type="button" className="btn-primary lg:col-span-2" onClick={generatePDF}>Download</button>
                    )}
                </div>
            </form>
        </li>
        <li className="lg:col-span-2 bg-gray-200 p-4">
            <div className="flex flex-col sm:items-center" ref={pdf_ref}>
                {showdata === "" ? (
                    <div className="bg-white mx-auto md:w-2/3 px-2 py-4 md:py-8">
                        <div className="text-center ">
                            <p className="paragraph-xl">Welcome to the verification page.</p>
                            <p className="paragraph-md">Use the search bar to find information about Aadhaar and Pan Link status.</p>
                        </div>
                    </div>
                ) : (
                  <div className="bg-white mx-auto md:w-2/3 px-2 py-4 md:py-8">
                  <div className="text-center ">
                      <p className="paragraph-md">{showdata}</p>
                  </div>
              </div>
                )}
            </div>
        </li>
      </SearchResult_section>
    </>
  );
};
