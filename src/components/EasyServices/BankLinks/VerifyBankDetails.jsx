"use client";
import React, { useRef, useState, useContext } from "react";
import axios from "axios";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
import useAuth  from '../../../hooks/useAuth';
import { RiFileDownloadFill } from "react-icons/ri";
// import { StoreContext } from "../../../store/store-context";
import { PDF_DOC } from "../../../store/actions";
import ResultComponent from "../Components/ResultComponent";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useReactToPrint } from "react-to-print";
import SearchResult_section from "@/components/pagesComponents/pageLayout/SearchResult_section.js";

const VerifyBankDetails = () => {
  const {token} = useAuth();
  const [showdata, setShowdata] = useState(null);
  const [showhide, setShowHide] = useState(false);
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [accountHolderName, setAccountHolderName] = useState("");
  const [validAccountNumber, setValidAccountNumber] = useState(false);
  const [validIfsc, setValidIfsc] = useState(false);
  const [validName, setValidName] = useState(false);
  const [validPhone, setValidPhone] = useState(false);
  const [error, setError] = useState(false);
  const pdf_ref = useRef();
  const generatePDF = useReactToPrint({
      content: () => pdf_ref.current,
      documentTitle: "Verify Bank Details",
  });
  const nameRegex = /^[A-Za-z\s]{1,}[\.]{0,1}[A-Za-z\s]{0,}$/;
  const ifscRegex = /[A-Z]{4}0[A-Z0-9]{6}$/;
  const accountNumberRegex = /^(\d{3,12})$/;
  const phoneNumberRegex =
    /((\+*)((0[ -]*)*|((91 )*))((\d{12})+|(\d{10})+))|\d{5}([- ]*)\d{6}/;

  const generateDataObject = () => ({
    title: "VERIFICATION DETAILS",
    column: ["Field", "Detail"],
    data: [
      {
        Field: "Account Status",
        Detail: showdata.message,
      },
      {
        Field: "Account Holder Name ",
        Detail: showdata.name_at_bank,
      },
      {
        Field: "Account Reference Id",
        Detail: showdata.utr,
      },
    ],
  });

  const navigate = useRouter();
  // const [state, dispatch] = useContext(StoreContext);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validAccountNumber || !validIfsc || !validName || !validPhone) {
      return;
    }
    setLoading(true);

    try {
      const response = await axios.post(
        `${BASE_URL}/bank/verify-account`,
        {
          accountNumber: accountNumber,
          ifsc: ifscCode,
          name: accountHolderName,
          mobile: phone,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setShowdata(response.data.data);
      setError(false);
      setLoading(false);
      setShowHide(true);
    } catch (error) {
      console.error(error);
      toast.error(
        "The details entered are incorrect. Or the bank details are not available."
      );
      setError(true);
      setShowHide(false);
      setLoading(false);
    }
  };

  const validate = (e) => {
    switch (e.target.name) {
      case "accountNumber":
        setAccountNumber(e.target.value);
        if (accountNumberRegex.test(e.target.value)) {
          setValidAccountNumber(true);
        } else {
          setValidAccountNumber(false);
        }
        break;
      case "ifscCode":
        setIfscCode(e.target.value.toUpperCase());

        if (ifscRegex.test(e.target.value)) {
          setValidIfsc(true);
        } else {
          setValidIfsc(false);
        }
        break;
      case "accountName":
        setAccountHolderName(e.target.value.toUpperCase());
        if (nameRegex.test(e.target.value)) {
          setValidName(true);
        } else {
          setValidName(false);
        }
        break;
      case "phone":
        setPhone(e.target.value);
        if (phoneNumberRegex.test(e.target.value)) {
          setValidPhone(true);
        } else {
          setValidPhone(false);
        }
        break;
      default:
        break;
    }
  };

  const payload = () => {
    dispatch({ type: `${PDF_DOC}`, payload: generateDataObject() });
    navigate.push("/pdfViewer");
  };

  const manageHandleClear = (e) => {
    e.preventDefault();
    setAccountNumber("");
    setIfscCode("");
    setAccountHolderName("");
    setPhone("");
    // setShowData("");
    setShowHide(false);
  };

  const details = [
    {
      label: "Account Status",
      value: showdata ? showdata.message : "",
    },
    {
      label: "Account Holder Name ",
      value: showdata ? showdata.name_at_bank : "",
    },
    {
      label: "Account Reference Id",
      value: showdata ? showdata.utr : "",
    },
  ];

  return (
    <SearchResult_section title="Verify Bank Details">
      <li>
        <form className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <div>
              <label
                htmlFor="exampleFormControlInput1"
                className="form-label inline-block mb-2 text-gray-700"
              >
                Account Number
              </label>
              <div className="flex flex-col">
                <input
                  type="number"
                  name="accountNumber"
                  value={accountNumber}
                  className={`form-input w-full border p-2 border-blue-500 rounded-l
                      ${
                        !validAccountNumber && accountNumber
                          ? "border-red-600"
                          : ""
                      }
                    `}
                  id="exampleFormControlInput1"
                  placeholder="Enter Account Number"
                  onChange={(e) => validate(e)}
                />
              </div>
              {!validAccountNumber && accountNumber && (
                <p className="text-red-600">Invalid Account Number</p>
              )}
            </div>
            <div>
              <label
                htmlFor="exampleFormControlInput1"
                className="form-label inline-block mb-2 text-gray-700"
              >
                IFSC Code
              </label>
              <div className="flex flex-col">
                <input
                  type="text"
                  name="ifscCode"
                  value={ifscCode}
                  className={`form-input w-full border p-2 border-blue-500 rounded-l${
                    !validIfsc && ifscCode ? "border-red-600" : ""
                  }`}
                  id="exampleFormControlInput1"
                  placeholder="Enter IFSC Code"
                  onChange={(e) => validate(e)}
                />
              </div>
              {!validIfsc && ifscCode && (
                <p className="text-red-600">Invalid IFSC Code</p>
              )}
            </div>
            <div>
              <label
                htmlFor="exampleFormControlInput1"
                className="form-label inline-block mb-2 text-gray-700"
              >
                Account Holder Name
              </label>
              <div className="flex flex-col">
                <input
                  type="text"
                  name="accountName"
                  value={accountHolderName}
                  className={`form-input w-full border p-2 border-blue-500 rounded-l${
                    !validName && accountHolderName ? "border-red-600" : ""
                  }`}
                  id="exampleFormControlInput1"
                  placeholder="Enter Account Holder Name"
                  onChange={(e) => validate(e)}
                />
              </div>
              {!validName && accountHolderName && (
                <p className="text-red-600">Invalid Account Holder Name</p>
              )}
            </div>
            <div>
              <label
                htmlFor="exampleFormControlInput1"
                className="form-label inline-block mb-2 text-gray-700"
              >
                Mobile
              </label>
              <div className="flex flex-col">
                <input
                  type="number"
                  name="phone"
                  value={phone}
                  maxLength={10}
                  className={`form-input w-full border p-2 border-blue-500 rounded-l${
                    !validPhone && phone ? "border-red-600" : ""
                  }`}
                  id="exampleFormControlInput1"
                  placeholder="Enter Mobile Number"
                  onChange={(e) => validate(e)}
                />
              </div>
              {!validPhone && phone && (
                <p className="text-red-600">Invalid Mobile Number</p>
              )}
            </div>
          </div>
          <div className="grid gap-4 lg:p-4 place-content-center grid-cols-[repeat(auto-fill,_minmax(120px,_1fr))] xl:grid-cols-2 lg:grid-cols-[repeat(auto-fill,_minmax(120px,_1fr))]">
            <button
              disabled={loading}
              onClick={onSubmit}
              onKeyDown={(event) => (event.key === "Enter" ? onSubmit() : "")}
              type="submit"
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
        {showhide ? (
            <div className="bg-white md:w-2/3 p-8" ref={pdf_ref}>
            <ResultComponent
                details={details}
                dispatch={payload}
                title={"IFSC DETAILS"}
            />
            </div>
        ) : (
            <div className="bg-white mx-auto md:w-2/3 px-2 py-8">
                <div className="text-center ">
                    <p className="paragraph-xl">Welcome to the Bank Details Verification page.</p>
                    <p className="paragraph-md">Use the search bar to verify bank details.</p>
                </div>
            </div>
        )}
      </li>

    </SearchResult_section>
  );
};

export default VerifyBankDetails;
