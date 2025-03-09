"use client";
import React, { useRef, useState } from "react";
import axios from "axios";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
import useAuth  from '../../../hooks/useAuth';
import { useReactToPrint } from "react-to-print";
import SearchResult_section from "@/components/pagesComponents/pageLayout/SearchResult_section.js";

const AadhaarVerify = () => {
  const {token} = useAuth();
  const aadhaarRef = useRef("");
  const [showdata, setShowData] = useState("");
  const [loading, setLoading] = useState("");
  const [showhide, setShowHide] = useState(false);
  const pdf_ref = useRef();
  const generatePDF = useReactToPrint({
      content: () => pdf_ref.current,
      documentTitle: "Aadhaar Verify",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${BASE_URL}/aadhaar/verify?aadhaar_number=${aadhaarRef.current.value}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);
      setShowHide(true);
      setShowData(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const manageHandleClear = (e) => {
    e.preventDefault();
    aadhaarRef.current.value = "";

    setShowData("");
  };

  return (
<SearchResult_section title="Aadhaar Verification">
      <li>
          <form action="" className="space-y-4">
            <div className="flex flex-col">
                <div className="mb-3 xl:w-75 mx-2">
                <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label inline-block mb-2 text-gray-700"
                >
                    Aadhaar No.
                </label>
                <div className="flex">
                    <input
                    type="text"
                    className={`form-input
                            block
                            w-full
                            px-3    
                            py-1.5
                            text-base
                            font-normal
                            text-gray-700
                            bg-white bg-clip-padding
                            border border-solid
                            rounded-l
                            transition
                            ease-in-out
                            m-0

                            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                            ${
                            !aadhaarRef.current.value &&
                            aadhaarRef.current.value
                                ? "border border-red-600 focus:border-red-600 text-red-600"
                                : "border-gray-300 focus:border-blue-600"
                            }
                        `}
                    id="exampleFormControlInput1"
                    placeholder="Enter Aadhaar No."
                    ref={aadhaarRef}
                    />
                </div>
                </div>
                <div  className="grid gap-4 lg:p-4 place-content-center grid-cols-[repeat(auto-fill,_minmax(120px,_1fr))] xl:grid-cols-2 lg:grid-cols-[repeat(auto-fill,_minmax(120px,_1fr))]">
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
            </div>
          </form>
      </li>
      <li className="lg:col-span-2 bg-gray-200 p-4">
        {showdata?(
            <div>
              {showhide === true && (
                <>
                  <h6>Aadhaar Exists: {showdata.aadhaar_exists}</h6>
                  <h6>Aadhaar No.: {showdata.aadhaar_number}</h6>
                </>
              )}
            </div>
        ):(
            <div className="bg-white mx-auto md:w-2/3 px-2 py-8">
                <div className="text-center ">
                    <p className="paragraph-xl">Welcome to the Company Director page.</p>
                    <p className="paragraph-md">Use the search bar to find information about companies director and their details..</p>
                </div>
            </div>
        )}
      </li>
    </SearchResult_section>
  );
};

export default AadhaarVerify;
