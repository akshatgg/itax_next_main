"use client";
import React, { useContext, useRef, useState } from "react";
import axios from "axios";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
import useAuth from '../../../hooks/useAuth';
const LARAVEL_ITAX_URL = process.env.NEXT_PUBLIC_LARAVEL_ITAX_URL;
// import { StoreContext } from "../../../store/store-context";
import { RiFileDownloadFill } from "react-icons/ri";
import { PDF_DOC } from "../../../store/actions";
import { useRouter } from "next/navigation";
import { useReactToPrint } from "react-to-print";
import SearchResult_section from "@/components/pagesComponents/pageLayout/SearchResult_section.js";

const PincodeInfo = () => {
  const {token} = useAuth();
  const pincodeRef = useRef("");
  const [showdata, setShowData] = useState([]);
  const [loading, setLoading] = useState("");
  const [showhide, setShowHide] = useState(false);
  // const [state, dispatch] = useContext(StoreContext);

  const pdf_ref = useRef();
  const generatePDF = useReactToPrint({
      content: () => pdf_ref.current,
      documentTitle: "Pin code Info",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // console.log(pincodeRef.current.value);
    await axios
      .get(
        `${BASE_URL}/pincode/info-by-pincode?pincode=${pincodeRef.current.value}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(function (response) {
        // console.log(response.data.data);
        setShowData(response.data.data);

        setLoading(false);
        setShowHide(true);
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
      });
  };
  const manageHandleClear = (e) => {
    e.preventDefault();
    pincodeRef.current.value = "";
    setLoading(false);
    setShowData("");
    setShowHide(false);
  };

  return (
    <SearchResult_section title="Pincode Information">
        <li>
          <form action="" className="space-y-4">
            <div className="grid gap-4">
                <div className="w-full">
                    <label
                        htmlFor="exampleFormControlInput1"
                        className="form-label inline-block mb-2 text-gray-700"
                    >
                        Pin Code
                    </label>
                    <div className="w-full">
                        <input
                        type="text"
                        className="form-control
                                        block
                                        w-full
                                        px-3    
                                        py-1.5
                                        text-base
                                        font-normal
                                        text-gray-700
                                        bg-white bg-clip-padding
                                        border border-solid border-gray-300
                                        rounded-l
                                        transition
                                        ease-in-out
                                        m-0

                                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                    "
                        id="exampleFormControlInput1"
                        placeholder="Enter PinCode  "
                        ref={pincodeRef}
                        />
                    </div>
                </div>
            </div>
            <div className="grid gap-4 lg:p-4 place-content-center grid-cols-[repeat(auto-fill,_minmax(120px,_1fr))] xl:grid-cols-2 lg:grid-cols-[repeat(auto-fill,_minmax(120px,_1fr))]">
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
                {showhide && (
                <button type="button" className="btn-primary lg:col-span-2" onClick={generatePDF}>Download</button>
                )}
            </div>
          </form>
        </li>
        <li className="lg:col-span-2 bg-gray-200 p-4">
            {showhide === true ? (
              showdata.length > 0 ? (
                <div >
                  <table className="table border-collapse border border-gray-300 " ref={pdf_ref}>
                    <thead>
                      <tr className="bg-blue-300">
                        <th className="border border-gray-300 p-2 font-semibold">
                          District Name
                        </th>
                        <th className="border border-gray-300 p-2 font-semibold">
                          Office Name
                        </th>
                        <th className="border border-gray-300 p-2 font-semibold">
                          Pincode
                        </th>
                        <th className="border border-gray-300 p-2 font-semibold">
                          StateName
                        </th>
                        <th className="border border-gray-300 p-2 font-semibold">
                          Taluk
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {showdata.map((currdata, i) => (
                        <tr key={i} className="h-10 text-left">
                          <td className="border border-gray-300 p-2">
                            {currdata.districtName}
                          </td>
                          <td className="border border-gray-300 p-2">
                            {currdata.officeName}
                          </td>
                          <td className="border border-gray-300 p-2">
                            {currdata.pincode}
                          </td>
                          <td className="border border-gray-300 p-2">
                            {currdata.stateName}
                          </td>
                          <td className="border border-gray-300 p-2">
                            {currdata.taluk}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div>Please provide correct pincode.</div>
              )
            ) : null}
        </li>
    </SearchResult_section>
  );
};

export default PincodeInfo;
