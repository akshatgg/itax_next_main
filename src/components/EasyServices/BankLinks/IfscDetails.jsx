"use client";
import React, { useRef, useState, useContext } from "react";
import axios from "axios";
// import { RiFileDownloadFill } from "react-icons/ri";
// import { StoreContext } from "../../../store/store-context";
import { PDF_DOC } from "../../../store/actions";
import FormComponent from "../Components/FormComponent.jsx";
import ResultComponent from "../Components/ResultComponent.jsx";
import { useRouter } from "next/navigation";
import { useReactToPrint } from "react-to-print";
import SearchResult_section from "@/components/pagesComponents/pageLayout/SearchResult_section.js";
import { toast } from "react-toastify";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
import useAuth  from '../../../hooks/useAuth';

const IfscDetails = () => {
  const {token} = useAuth();
  const navigate = useRouter();
  const [showdata, setShowdata] = useState({});
  const [showhide, setShowHide] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  // const [state, dispatch] = useContext(StoreContext);
  const pdf_ref = useRef();

  const generatePDF = useReactToPrint({
      content: () => pdf_ref.current,
      documentTitle: "IFSC Details",
  });

  const validateIfsc = (ifsc) => {
    // Add your IFSC validation logic here
    // Example: You can use a regular expression to validate the IFSC
    return /[A-Z]{4}0[A-Z0-9]{6}$/.test(ifsc);
  };

  const generateDataObject = () => ({
    title: "IFSC DETAILS",
    column: ["Field", "Detail"],
    data: [
      {
        Field: "Bank Name",
        Detail: showdata.BANK,
      },
      {
        Field: "Address",
        Detail: showdata.ADDRESS,
      },
      {
        Field: "Bank Code",
        Detail: showdata.BANKCODE,
      },
      {
        Field: "Center",
        Detail: showdata.CENTRE,
      },
      {
        Field: "Branch",
        Detail: showdata.BRANCH,
      },
      {
        Field: "City",
        Detail: showdata.CITY,
      },
      {
        Field: "State",
        Detail: showdata.STATE,
      },
    ],
  });

  const handleSubmit = async (e, inputValue) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.get(
        `${BASE_URL}/bank/details?ifsc=${inputValue}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setShowdata(response.data.data);
      setShowHide(true);
      setError(false);
    } catch (error) {
      setError(true);
      setShowHide(false);
      toast.error(`Could not find any details!`);
    } finally {
      setLoading(false);
    }
  };

  const payload = () => {
    dispatch({ type: PDF_DOC, payload: generateDataObject() });
    navigate.push("/pdfViewer");
  };
  
  const handleClear = async (e) => {
    e.preventDefault();
    setShowData("");
    setShowHide(false);
    setError(false);
  };

  const details = [
    {
      label: "Bank Name",
      value: showdata.BANK,
    },
    {
      label: "Address",
      value: showdata.ADDRESS,
    },
    {
      label: "Bank Code",
      value: showdata.BANKCODE,
    },
    {
      label: "Center",
      value: showdata.CENTRE,
    },
    {
      label: "Branch",
      value: showdata.BRANCH,
    },
    {
      label: "City",
      value: showdata.CITY,
    },
    {
      label: "State",
      value: showdata.STATE,
    },
  ];

  return (
    <>
      <SearchResult_section title="IFSC Details">
        <li>
            <FormComponent
                onSubmit={handleSubmit}
                validateInput={validateIfsc}
                inputLabel="Search By IFSC"
                inputPlaceholder="Enter IFSC Code"
                buttonText="Search"
                handleClear={handleClear}
                inputmaxlength={"11"}
                showhide={showhide}
                generatePDF={generatePDF}
            />
            {error && <p className="text-red-400">{error}</p>}
        </li>
        <li className="lg:col-span-2 bg-gray-200 p-4">
            {showhide ? (
            <div ref={pdf_ref} className="bg-white md:w-2/3 p-8">
                <ResultComponent
                details={details}
                dispatch={payload}
                title={"IFSC DETAILS"}
                />
            </div>
            ) : (
                <div className="bg-white mx-auto md:w-2/3 px-2 py-8">
                    <div className="text-center ">
                        <p className="paragraph-xl">Welcome to the IFSC verification page.</p>
                        <p className="paragraph-md">Use the search bar to find information about Your IFSC.</p>
                    </div>
                </div>
            )}
        </li>
      </SearchResult_section>
    </>
  );
};

export default IfscDetails;
