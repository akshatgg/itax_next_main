"use client";
import React, { useRef, useState, useContext } from "react";
import axios from "axios";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
import useAuth from '../../../hooks/useAuth';
const LARAVEL_ITAX_URL = process.env.NEXT_PUBLIC_LARAVEL_ITAX_URL;
import { StoreContext } from "../../../store/store-context";
import { RiFileDownloadFill } from "react-icons/ri";
import { PDF_DOC } from "../../../store/actions";
import ResultComponent from "../Components/ResultComponent";
import FormComponent from "../Components/FormComponent";
import { useRouter } from "next/navigation";
import { useReactToPrint } from "react-to-print";
import SearchResult_section from "@/components/pagesComponents/pageLayout/SearchResult_section.js";

const CompanyDetails = () => {
  const {token} = useAuth();
  const idRef = useRef("");
  const [showdata, setShowData] = useState("");
  const [loading, setLoading] = useState("");
  const [showhide, setShowHide] = useState(false);
  const [error, setError] = useState(false);

  // const [state, dispatch] = useContext(StoreContext);
  const navigate = useRouter();
  const pdf_ref = useRef();
  const generatePDF = useReactToPrint({
      content: () => pdf_ref.current,
      documentTitle: "Company Details",
  });
  const generateDataObject = () => ({
    title: "COMPANY DETAILS",
    column: ["Field", "Detail"],
    data: [
      {
        Field: "Company Name",
        Detail: showdata.company_name,
      },
      {
        Field: "Class",
        Detail: showdata.class_of_company,
      },
      {
        Field: "Company Category",
        Detail: showdata.company_category,
      },
      {
        Field: "Email Id",
        Detail: showdata.email_id,
      },
      {
        Field: "Number Of Member",
        Detail: showdata.number_of_members,
      },
      {
        Field: "Date Of The Last AGM",
        Detail: showdata.date_of_last_agm,
      },
      {
        Field: "Registered Address",
        Detail: showdata.registered_address,
      },
      {
        Field: "Address Other Then R/O",
        Detail:
          showdata[
            "address_other_than_r/o_where_all_or_any_books_of_account_and_papers_are_maintained"
          ],
      },
      {
        Field: "Active Compliance",
        Detail: showdata.active_compliance,
      },
      {
        Field: "Registration Number",
        Detail: showdata.registration_number,
      },
      {
        Field: "Paid Up Capital(rs)",
        Detail: showdata["paid_up_capital(rs)"],
      },

      {
        Field: "Whether Listed Or Not",
        Detail: showdata.whether_listed_or_not,
      },
      {
        Field: "Suspended At Stock Exchange",
        Detail: showdata.suspended_at_stock_exchange,
      },
      {
        Field: "Company Subcategory",
        Detail: showdata.company_subcategory,
      },
      {
        Field: "Authorised Capital(rs)",
        Detail: showdata["authorised_capital(rs)"],
      },
      {
        Field: "Company Status(For Efiling)",
        Detail: showdata["company_status(for_efiling)"],
      },
      {
        Field: "Roc Code",
        Detail: showdata.roc_code,
      },
      {
        Field: "Date Of Balance Sheet",
        Detail: showdata.date_of_balance_sheet,
      },
      {
        Field: "Date Of Incorporation",
        Detail: showdata.date_of_incorporation,
      },
    ],
  });

  const handleSubmit = async (e, inputValue) => {
    e.preventDefault();
    setLoading(true);

    await axios
      .get(`${BASE_URL}/mca/company-details?cin=${inputValue}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        console.log(response.data.data.company_master_data);
        setShowData(response.data.data.company_master_data);
        setError(false);
        setLoading(false);
        setShowHide(true);
      })
      .catch(function (error) {
        console.log(error);
        setError(true);
        setShowHide(false);
        setLoading(false);
      });
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

  const details = [
    {
      label: "Company Name",
      value: showdata.company_name,
    },
    {
      label: "Class",
      value: showdata.class_of_company,
    },
    {
      label: "Company Category",
      value: showdata.company_category,
    },
    {
      label: "Email Id",
      value: showdata.email_id,
    },
    {
      label: "Number Of Member",
      value: showdata.number_of_members,
    },
    {
      label: "Date Of The Last AGM",
      value: showdata.date_of_last_agm,
    },
    {
      label: "Registered Address",
      value: showdata.registered_address,
    },
    {
      label: "Address Other Then R/O",
      value:
        showdata[
          "address_other_than_r/o_where_all_or_any_books_of_account_and_papers_are_maintained"
        ],
    },
    {
      label: "Active Compliance",
      value: showdata.active_compliance,
    },
    {
      label: "Registration Number",
      value: showdata.registration_number,
    },
    {
      label: "Paid Up Capital(rs)",
      value: showdata["paid_up_capital(rs)"],
    },

    {
      label: "Whether Listed Or Not",
      value: showdata.whether_listed_or_not,
    },
    {
      label: "Suspended At Stock Exchange",
      value: showdata.suspended_at_stock_exchange,
    },
    {
      label: "Company Subcategory",
      value: showdata.company_subcategory,
    },
    {
      label: "Authorised Capital(rs)",
      value: showdata["authorised_capital(rs)"],
    },
    {
      label: "Company Status(For Efiling)",
      value: showdata["company_status(for_efiling)"],
    },
    {
      label: "Roc Code",
      value: showdata.roc_code,
    },
    {
      label: "Date Of Balance Sheet",
      value: showdata.date_of_balance_sheet,
    },
    {
      label: "Date Of Incorporation",
      value: showdata.date_of_incorporation,
    },
  ];

  return (
    <SearchResult_section title="Company Details">

        <li>
            <FormComponent
            onSubmit={handleSubmit}
            validateInput={(inputValue) => !!inputValue}
            inputLabel="Company ID"
            inputPlaceholder="Enter your CIN Number"
            buttonText="Search"
            handleClear={handleClear}
            showhide={showhide}
            generatePDF={generatePDF}
            />
            {error && <p className="text-red-400">Please Enter Valid ID</p>}
        </li>
        <li className="lg:col-span-2 bg-gray-200 p-4">
            {showhide ? (
                <div className="bg-white md:w-2/3 p-8" ref={pdf_ref}>
                <ResultComponent
                    details={details}
                    dispatch={payload}
                    title="COMPANY DETAIL"
                />
                </div>
            ) : (
                <div className="bg-white mx-auto md:w-2/3 px-2 py-8">
                <div className="text-center ">
                    <p className="paragraph-xl"> Welcome to the Company Details page.</p>
                    <p className="paragraph-md">Use the search bar to find information about companies and their details.</p>
                </div>
            </div>
            )}
        </li>
    </SearchResult_section>
  );
};

export default CompanyDetails;
