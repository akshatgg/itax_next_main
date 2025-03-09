"use client";
import React, { useRef, useState } from "react";
import axios from "axios";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
import useAuth  from '../../../hooks/useAuth';
import { toast } from "react-toastify";
import { useReactToPrint } from "react-to-print";
import SearchResult_section from "@/components/pagesComponents/pageLayout/SearchResult_section.js";

const UpiVerify = () => {
  const {token} = useAuth();
  const upiRef = useRef("");
  const nameRef = useRef("");
  const [showdata, setShowData] = useState("");
  const [loading, setLoading] = useState("");
    const pdf_ref = useRef();
    const generatePDF = useReactToPrint({
        content: () => pdf_ref.current,
        documentTitle: "UPI Verify",
    });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.get(`${BASE_URL}/bank/upi-verify`, {
        params: {
          virtual_payment_address: upiRef.current.value,
          name: nameRef.current.value,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data.data.account_exists);
      setShowData(response.data.data.account_exists);
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Details Entered are incorrect or not found");
      setLoading(false);
    }
  };
  const manageHandleClear = (e) => {
    e.preventDefault();
    nameRef.current.value = "";
    upiRef.current.value = "";
    setShowData("");
  };

  return (
    <SearchResult_section title="UPI Verification">
      <li >
        <form className="space-y-4">
            <div  className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 ">
                <div>
                    <label
                    htmlFor="upiInput"
                    className="form-label inline-block mb-2 text-gray-700"
                    >
                    UPI Address
                    </label>
                    <div className="flex flex-col">
                    <input
                        type="text"
                        name="upi"
                        id="upiInput"
                        className={`form-input
                            w-full
                            border
                            p-2
                            border-blue-500
                            rounded-l
                            ${
                            !upiRef.current.value && upiRef.current.value
                                ? "border-red-600"
                                : "border-gray-300"
                            }
                        `}
                        placeholder="Enter UPI address"
                        ref={upiRef}
                    />
                    </div>
                </div>
                <div>
                    <label
                    htmlFor="nameInput"
                    className="form-label inline-block mb-2 text-gray-700"
                    >
                    Name
                    </label>
                    <div className="flex flex-col">
                    <input
                        type="text"
                        name="name"
                        id="nameInput"
                        className={`form-input
                            w-full
                            border
                            p-2
                            border-blue-500
                            rounded-l
                            ${
                            !nameRef.current.value && nameRef.current.value
                                ? "border-red-600"
                                : "border-gray-300"
                            }
                        `}
                        placeholder="Enter Name"
                        ref={nameRef}
                    />
                    </div>
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
        </form>
      </li>

      <li className="lg:col-span-2 bg-gray-200 p-4">
        {showdata ?(
            <div ref={pdf_ref} className="grid grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))] gap-4 place-content-center">
                <h1 className={`text-center pt-10 text-xl font-semibold ${ showdata ? "block" : "hidden" }`} >
                {showdata ? `UPI ID, ${upiRef.current.value} is valid.` : ""}
                </h1>
            </div>
            ):(
            
            <div className="bg-white mx-auto md:w-2/3 px-2 py-8">
                <div className="text-center ">
                    <p className="paragraph-xl">Welcome to the UPI varification search page.</p>
                    <p className="paragraph-md">Use the search bar to find information about UPI details.</p>
                </div>
            </div>
        )}
      </li>
    </SearchResult_section>
  );
};

export default UpiVerify;
