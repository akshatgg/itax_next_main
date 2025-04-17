"use client";
import React, { useState, useRef } from "react";
import axios from "axios";
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
import useAuth from '../../../hooks/useAuth';
import FormComponent from "../Components/FormComponent.jsx";
import ResultComponent from "../Components/ResultComponent.jsx";
import { StoreContext } from "../../../store/store-context";
import { PDF_DOC } from "../../../store/actions";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import { useReactToPrint } from "react-to-print";
import SearchResult_section from "@/components/pagesComponents/pageLayout/SearchResult_section.js";


const DirectorDetails = () => {
  const {token} = useAuth();
  const navigate = useRouter();
  const [directorData, setDirectorData] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  // const [state, dispatch] = useContext(StoreContext);
  const pdf_ref = useRef();
  const generatePDF = useReactToPrint({
      content: () => pdf_ref.current,
      documentTitle: "Director Details",
  });

  const generateDataObject = () => ({
    title: "Director Details",
    column: ["Field", "Detail"],
    data: [
      {
        Field: "Company Name",
        Detail: directorData.company_name,
      },
      {
        Field: "Begin Date",
        Detail: directorData.begin_date,
      },
      {
        Field: "End Date",
        Detail: directorData.end_date,
      },
      {
        Field: "CIN/FCRN",
        Detail: directorData.cin_fcrn,
      },
      {
        Field: "Director Name",
        Detail: directorData.director_name,
      },
      {
        Field: "DIN No.",
        Detail: directorData.director_din,
      },
    ],
  });

  const handleSubmit = async (e, inputValue) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.get(
        `${BACKEND_URL}/mca/director-details?din=${inputValue}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const responseData = response.data.data;
      const companyData = responseData.company_data[0];

      const updatedDirectorData = {
        active_compliance: companyData.active_compliance,
        company_name: companyData.company_name,
        begin_date: companyData.begin_date,
        end_date: companyData.end_date,
        cin_fcrn: companyData["cin/fcrn"],
        director_name: responseData.director_data.name,
        director_din: responseData.director_data.din,
        llp_data: responseData.llp_data,
      };

      setDirectorData(updatedDirectorData);
      setShowResult(true);
      setError(false);
    } catch (error) {
      setError(true);
      setShowResult(false);
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
    setShowData("");
    setShowHide(false);
    setError(false);
  };

  const resultDetails = [
    {
      label: "Company Name",
      value: directorData.company_name,
    },
    {
      label: "Begin Date",
      value: directorData.begin_date,
    },
    {
      label: "End Date",
      value: directorData.end_date,
    },
    {
      label: "CIN/FCRN",
      value: directorData.cin_fcrn,
    },
    {
      label: "Director Name",
      value: directorData.director_name,
    },
    {
      label: "DIN No.",
      value: directorData.director_din,
    },
  ];

  return (
    <SearchResult_section title={"Director Details"} >
      <li>
        <div>
          <FormComponent
            onSubmit={handleSubmit}
            validateInput={(value) => value.trim() !== ""}
            inputLabel="DIN"
            inputPlaceholder="Enter DIN Number"
            buttonText={loading ? "Searching..." : "Search"}
            disabled={loading}
            handleClear={handleClear}
            showhide={showResult?true:false}
            generatePDF={generatePDF}
          />
        </div>
        {error && (
          <p className="text-red-400 ml-4">
            An error occurred while fetching data.
          </p>
        )}
      </li>
      <li className="lg:col-span-2 bg-gray-200 p-4">
        {showResult ? (
            <div ref={pdf_ref}>
                <ResultComponent
                  details={resultDetails}
                  dispatch={payload}
                  title="Director Details"
                />
            </div>
        ) : (
            <div className="bg-white mx-auto md:w-2/3 px-2 py-8">
                <div className="text-center ">
                    <p className="paragraph-xl">Welcome to the Company Director page.</p>
                    <p className="paragraph-md">Use the search bar to find information about companies director and their details.</p>
                </div>
            </div>
        )}
      </li>
    </SearchResult_section>
  );
};

export default DirectorDetails;
