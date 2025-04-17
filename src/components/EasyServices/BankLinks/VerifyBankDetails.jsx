"use client";
import React, { useRef, useState } from "react";
import axios from "axios";
import useAuth from '../../../hooks/useAuth';
import { RiFileDownloadFill } from "react-icons/ri";
import ResultComponent from "../Components/ResultComponent";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useReactToPrint } from "react-to-print";
import SearchResult_section from "@/components/pagesComponents/pageLayout/SearchResult_section.js";

// Make sure this environment variable is properly set in your .env.local file
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const VerifyBankDetails = () => {
  const { token } = useAuth();
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
  const [errorMessage, setErrorMessage] = useState("");
  const pdf_ref = useRef();
  const generatePDF = useReactToPrint({
    content: () => pdf_ref.current,
    documentTitle: "Verify Bank Details",
  });
  
  // Modified regex patterns to be more accommodating
  const nameRegex = /^[A-Za-z\s.'-]{2,}$/i;
  const ifscRegex = /^[A-Z]{4}[0][A-Z0-9]{6}$/;
  const accountNumberRegex = /^\d{3,20}$/;
  const phoneNumberRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;

  const navigate = useRouter();

  const generateDataObject = () => ({
    title: "VERIFICATION DETAILS",
    column: ["Field", "Detail"],
    data: [
      {
        Field: "Account Status",
        Detail: showdata?.message || "N/A",
      },
      {
        Field: "Account Holder Name ",
        Detail: showdata?.name_at_bank || "N/A",
      },
      {
        Field: "Account Reference Id",
        Detail: showdata?.utr || "N/A",
      },
    ],
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields first
    if (!validAccountNumber || !validIfsc || !validName || !validPhone) {
      toast.error("Please fill all fields correctly");
      return;
    }
    
    setLoading(true);
    setError(false);
    setErrorMessage("");

    try {
      // Add debug logging
      console.log("Submitting to:", `${BACKEND_URL}/bank/verify-account`);
      console.log("With token:", token?.substring(0, 10) + "...");
      
      if (!BACKEND_URL) {
        throw new Error("BACKEND_URL is not configured");
      }
      
      if (!token) {
        throw new Error("Authentication token is missing");
      }

      const response = await axios.post(
        `${BACKEND_URL}/bank/verify-account`,
        {
          accountNumber: accountNumber,
          ifsc: ifscCode,
          name: accountHolderName,
          mobile: phone,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          timeout: 10000, // 10 second timeout
        }
      );

      console.log("API Response:", response);
      
      if (response.data && response.data.data) {
        setShowdata(response.data.data);
        setShowHide(true);
        toast.success("Bank details verified successfully");
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Error verifying bank details:", error);
      
      // Extract and display meaningful error messages
      let message = "Failed to verify bank details";
      
      if (error.response) {
        // The server responded with a status code outside the 2xx range
        message = error.response.data?.message || 
                 `Server error: ${error.response.status}`;
        console.log("Error response data:", error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        message = "No response from server. Please check your connection";
      } else {
        // Something happened in setting up the request
        message = error.message || "Unknown error occurred";
      }
      
      setErrorMessage(message);
      setError(true);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const validate = (e) => {
    const { name, value } = e.target;
    
    switch (name) {
      case "accountNumber":
        setAccountNumber(value);
        setValidAccountNumber(accountNumberRegex.test(value));
        break;
        
      case "ifscCode":
        const upperValue = value.toUpperCase();
        setIfscCode(upperValue);
        setValidIfsc(ifscRegex.test(upperValue));
        break;
        
      case "accountName":
        setAccountHolderName(value.toUpperCase());
        setValidName(nameRegex.test(value));
        break;
        
      case "phone":
        setPhone(value);
        setValidPhone(phoneNumberRegex.test(value));
        break;
        
      default:
        break;
    }
  };

  const manageHandleClear = (e) => {
    e.preventDefault();
    setAccountNumber("");
    setIfscCode("");
    setAccountHolderName("");
    setPhone("");
    setShowHide(false);
    setError(false);
    setErrorMessage("");
    setValidAccountNumber(false);
    setValidIfsc(false);
    setValidName(false);
    setValidPhone(false);
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
                htmlFor="accountNumber"
                className="form-label inline-block mb-2 text-gray-700"
              >
                Account Number
              </label>
              <div className="flex flex-col">
                <input
                  type="text" // Changed from number to text to handle longer account numbers better
                  name="accountNumber"
                  value={accountNumber}
                  className={`form-input w-full border p-2 ${validAccountNumber || !accountNumber ? "border-blue-500" : "border-red-600"} rounded-l`}
                  id="accountNumber"
                  placeholder="Enter Account Number"
                  onChange={validate}
                />
              </div>
              {!validAccountNumber && accountNumber && (
                <p className="text-red-600">Account number should be 3-20 digits</p>
              )}
            </div>
            <div>
              <label
                htmlFor="ifscCode"
                className="form-label inline-block mb-2 text-gray-700"
              >
                IFSC Code
              </label>
              <div className="flex flex-col">
                <input
                  type="text"
                  name="ifscCode"
                  value={ifscCode}
                  className={`form-input w-full border p-2 ${validIfsc || !ifscCode ? "border-blue-500" : "border-red-600"} rounded-l`}
                  id="ifscCode"
                  placeholder="Enter IFSC Code (e.g., HDFC0001234)"
                  onChange={validate}
                />
              </div>
              {!validIfsc && ifscCode && (
                <p className="text-red-600">IFSC should be 4 letters followed by 0 and 6 alphanumeric characters</p>
              )}
            </div>
            <div>
              <label
                htmlFor="accountName"
                className="form-label inline-block mb-2 text-gray-700"
              >
                Account Holder Name
              </label>
              <div className="flex flex-col">
                <input
                  type="text"
                  name="accountName"
                  value={accountHolderName}
                  className={`form-input w-full border p-2 ${validName || !accountHolderName ? "border-blue-500" : "border-red-600"} rounded-l`}
                  id="accountName"
                  placeholder="Enter Account Holder Name"
                  onChange={validate}
                />
              </div>
              {!validName && accountHolderName && (
                <p className="text-red-600">Please enter a valid name</p>
              )}
            </div>
            <div>
              <label
                htmlFor="phone"
                className="form-label inline-block mb-2 text-gray-700"
              >
                Mobile
              </label>
              <div className="flex flex-col">
                <input
                  type="tel"
                  name="phone"
                  value={phone}
                  className={`form-input w-full border p-2 ${validPhone || !phone ? "border-blue-500" : "border-red-600"} rounded-l`}
                  id="phone"
                  placeholder="Enter 10-digit Mobile Number"
                  onChange={validate}
                />
              </div>
              {!validPhone && phone && (
                <p className="text-red-600">Please enter a valid 10-digit mobile number</p>
              )}
            </div>
          </div>
          <div className="grid gap-4 lg:p-4 place-content-center grid-cols-[repeat(auto-fill,_minmax(120px,_1fr))] xl:grid-cols-2 lg:grid-cols-[repeat(auto-fill,_minmax(120px,_1fr))]">
            <button
              disabled={loading}
              onClick={onSubmit}
              type="submit"
              className={`btn-primary ${loading ? "cursor-not-allowed" : ""}`}
            >
              {loading ? (<span className="spinner"></span>) : ("Search")}
            </button>
            <button
              disabled={loading}
              onClick={manageHandleClear}
              className={`btn-warning ${loading ? "cursor-not-allowed" : ""}`}
            >
              Clear
            </button>
            {showdata && (
              <button type="button" className="btn-primary lg:col-span-2" onClick={generatePDF}>
                <RiFileDownloadFill className="inline mr-1" /> Download
              </button>
            )}
          </div>
        </form>
      </li>

      <li className="lg:col-span-2 bg-gray-200 p-4">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mx-auto md:w-2/3">
            <p className="font-bold">Verification Failed</p>
            <p>{errorMessage || "The details entered could not be verified. Please check and try again."}</p>
          </div>
        )}
        
        {showhide ? (
          <div className="bg-white md:w-2/3 p-8 mx-auto" ref={pdf_ref}>
            <ResultComponent
              details={details}
              title={"BANK VERIFICATION DETAILS"}
            />
          </div>
        ) : (
          <div className="bg-white mx-auto md:w-2/3 px-2 py-8">
            <div className="text-center">
              <p className="paragraph-xl">Welcome to the Bank Details Verification page.</p>
              <p className="paragraph-md">Enter account details above to verify bank information.</p>
            </div>
          </div>
        )}
      </li>
    </SearchResult_section>
  );
};

export default VerifyBankDetails;