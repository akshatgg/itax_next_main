"use client";
import React, { useRef, useState } from "react";
import axios from "axios";
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
import useAuth from '../../../hooks/useAuth';
import { useReactToPrint } from "react-to-print";
import SearchResult_section from "@/components/pagesComponents/pageLayout/SearchResult_section.js";

const AadhaarVerify = () => {
  const { token } = useAuth();
  const aadhaarRef = useRef("");
  const otpRef = useRef("");
  const [referenceId, setReferenceId] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [showdata, setShowData] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState({ message: "", type: "" });
  const [verificationComplete, setVerificationComplete] = useState(false);
  
  const pdf_ref = useRef();
  const generatePDF = useReactToPrint({
    content: () => pdf_ref.current,
    documentTitle: "Aadhaar Verify",
  });

  // Step 1: Generate OTP
  const handleGenerateOTP = async (e) => {
    e.preventDefault();
    
    // Simple validation
    if (!aadhaarRef.current.value || aadhaarRef.current.value.length !== 12 || !/^\d+$/.test(aadhaarRef.current.value)) {
      setResponse({
        message: "Please enter a valid 12-digit Aadhaar number",
        type: "error"
      });
      return;
    }
    
    setLoading(true);
    setResponse({ message: "", type: "" });

    try {
      const response = await axios.post(
        `${BACKEND_URL}/aadhaar/aadhaar-generate-otp`,
        { aadhaar: aadhaarRef.current.value },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setReferenceId(response.data.data.reference_id);
        setResponse({
          message: "OTP sent successfully to your registered mobile number",
          type: "success",
        });
        setCurrentStep(2);
      } else {
        setResponse({
          message: response.data.message || "Failed to send OTP. Please try again.",
          type: "error",
        });
      }
    } catch (error) {
      console.error("Error generating OTP:", error);
      setResponse({
        message: error.response?.data?.message || "Failed to send OTP. Please try again.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    
    // Simple validation
    if (!otpRef.current.value || otpRef.current.value.length !== 6 || !/^\d+$/.test(otpRef.current.value)) {
      setResponse({
        message: "Please enter a valid 6-digit OTP",
        type: "error"
      });
      return;
    }
    
    setLoading(true);
    setResponse({ message: "", type: "" });

    try {
      const response = await axios.post(
        `${BACKEND_URL}/aadhaar/aadhaar-verify-otp`,
        {
          otp: otpRef.current.value,
          reference_id: referenceId
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setResponse({
          message: "Aadhaar verification successful!",
          type: "success",
        });
        setVerificationComplete(true);
        setShowData(response.data.data);
      } else {
        setResponse({
          message: response.data.message || "OTP verification failed. Please try again.",
          type: "error",
        });
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setResponse({
        message: error.response?.data?.message || "OTP verification failed. Please try again.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const manageHandleClear = (e) => {
    e.preventDefault();
    aadhaarRef.current.value = "";
    if (otpRef.current) otpRef.current.value = "";
    setCurrentStep(1);
    setReferenceId("");
    setShowData("");
    setResponse({ message: "", type: "" });
    setVerificationComplete(false);
  };

  const renderStepIndicator = () => {
    return (
      <div className="flex items-center justify-center mb-6">
        <div className="flex items-center">
          <div className={`rounded-full h-8 w-8 flex items-center justify-center ${currentStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}>
            1
          </div>
          <div className={`h-1 w-12 ${currentStep >= 2 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
          <div className={`rounded-full h-8 w-8 flex items-center justify-center ${currentStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}>
            2
          </div>
        </div>
      </div>
    );
  };

  return (
    <SearchResult_section title="Aadhaar Verification">
      <li>
        <form action="" className="space-y-4">
          {!verificationComplete && renderStepIndicator()}
          
          {currentStep === 1 && (
            <div className="flex flex-col">
              <div className="mb-3 xl:w-75 mx-2">
                <label
                  htmlFor="aadhaarInput"
                  className="form-label inline-block mb-2 text-gray-700"
                >
                  Aadhaar No.
                </label>
                <div className="flex">
                  <input
                    type="text"
                    className="form-input block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-l transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="aadhaarInput"
                    placeholder="Enter 12-digit Aadhaar No."
                    ref={aadhaarRef}
                  />
                </div>
              </div>
              <div className="grid gap-4 lg:p-4 place-content-center grid-cols-[repeat(auto-fill,_minmax(120px,_1fr))] xl:grid-cols-2 lg:grid-cols-[repeat(auto-fill,_minmax(120px,_1fr))]">
                <button
                  disabled={loading}
                  onClick={handleGenerateOTP}
                  className={`btn-primary ${loading ? " cursor-not-allowed " : ""}`}
                >
                  {loading ? (<span className="spinner"></span>) : ("Generate OTP")}
                </button>
                <button
                  disabled={loading}
                  onClick={(e) => manageHandleClear(e)}
                  className={`btn-warning ${loading ? " cursor-not-allowed " : ""}`}
                >
                  Clear
                </button>
              </div>
            </div>
          )}
          
          {currentStep === 2 && (
            <div className="flex flex-col">
              <div className="mb-3 xl:w-75 mx-2">
                <label
                  htmlFor="otpInput"
                  className="form-label inline-block mb-2 text-gray-700"
                >
                  Enter OTP
                </label>
                <div className="flex">
                  <input
                    type="text"
                    className="form-input block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-l transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="otpInput"
                    placeholder="Enter 6-digit OTP"
                    ref={otpRef}
                  />
                </div>
              </div>
              <div className="grid gap-4 lg:p-4 place-content-center grid-cols-[repeat(auto-fill,_minmax(120px,_1fr))] xl:grid-cols-2 lg:grid-cols-[repeat(auto-fill,_minmax(120px,_1fr))]">
                <button
                  disabled={loading}
                  onClick={handleVerifyOTP}
                  className={`btn-primary ${loading ? " cursor-not-allowed " : ""}`}
                >
                  {loading ? (<span className="spinner"></span>) : ("Verify OTP")}
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="btn-warning"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleGenerateOTP}
                  className="btn-info lg:col-span-2"
                >
                  Resend OTP
                </button>
              </div>
            </div>
          )}
          
          {response.message && (
            <div
              className={`p-3 text-white text-center rounded-md my-4 ${
                response.type === "success" ? "bg-green-500" : "bg-red-500"
              }`}
            >
              {response.message}
            </div>
          )}

          {verificationComplete && showdata && (
            <div className="mt-4">
              <div className="flex justify-center mb-4">
                <svg className="h-16 w-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold mb-4 text-center">Verification Complete</h2>
              <button type="button" className="btn-primary w-full" onClick={generatePDF}>Download</button>
              <button
                onClick={manageHandleClear}
                className="btn-warning w-full mt-2"
              >
                Verify Another Aadhaar
              </button>
            </div>
          )}
        </form>
      </li>
      <li className="lg:col-span-2 bg-gray-200 p-4">
        <div ref={pdf_ref}>
          {verificationComplete && showdata ? (
            <div>
              <h6>Aadhaar Verification Status: Verified</h6>
              <h6>Aadhaar Exists: {showdata.aadhaar_exists}</h6>
              <h6>Aadhaar No.: {showdata.aadhaar_number}</h6>
              {showdata.name && <h6>Name: {showdata.name}</h6>}
              {showdata.gender && <h6>Gender: {showdata.gender}</h6>}
              {showdata.dob && <h6>Date of Birth: {showdata.dob}</h6>}
              {showdata.address && <h6>Address: {showdata.address}</h6>}
            </div>
          ) : (
            <div className="bg-white mx-auto md:w-2/3 px-2 py-8">
              <div className="text-center ">
                <p className="paragraph-xl">Welcome to the Aadhaar Verification page.</p>
                <p className="paragraph-md">Use the form to verify your Aadhaar details securely through OTP verification.</p>
              </div>
            </div>
          )}
        </div>
      </li>
    </SearchResult_section>
  );
};

export default AadhaarVerify;