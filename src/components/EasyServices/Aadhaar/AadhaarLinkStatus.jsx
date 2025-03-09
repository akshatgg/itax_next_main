"use client";
import React, { useState,useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { panRegex, aadharRegex } from "../../../components/regexPatterns";
import axios from "axios";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
import { useReactToPrint } from "react-to-print";
import SearchResult_section from "@/components/pagesComponents/pageLayout/SearchResult_section.js";
import useAuth  from '../../../hooks/useAuth';

const AadhaarLinkStatus = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [data, setData] = useState("");
  const pdf_ref = useRef();
  const {token} = useAuth();
  const generatePDF = useReactToPrint({
      content: () => pdf_ref.current,
      documentTitle: "Aadhaar Link Status",
  });
  const handleSubmit = async (data) => {
    console.log(data);
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/pan/pan-aadhaar-link-status/?`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        params: { pan: data.pan, aadhaar: data.aadhaar },
      });
      setSuccess(true);
      setData(res.data.data.message);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      pan: "",
      aadhaar: "",
    },

    validationSchema: new Yup.ObjectSchema({
      pan: Yup.string()
        .required("Enter your PAN card number")
        .matches(panRegex, "Invalid PAN card number"),
      aadhaar: Yup.string()
        .required("Enter your Aadhar card number")
        .matches(aadharRegex, "Invalid Aadhar card number"),
    }),

    onSubmit: (values) => handleSubmit(values),
  });

  const manageHandleClear = (e) => {
    e.preventDefault();
    console.log("hi");
    formik.resetForm({});
    setData("");
  };

  return (
    <SearchResult_section title="Check Aadhaar Link Status">
        <li>
            <form className="space-y-4" onSubmit={formik.handleSubmit}>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                    <div>
                    <label className="form-label inline-block mb-2 text-gray-700" htmlFor="aadhaar">Aadhaar No.</label>
                    <input
                        type="text"
                        name="aadhaar"
                        id="aadhaar"
                        className={`w-full border focus:border-primary border-blue-500 rounded-l px-2 py-1  ${
                        formik.touched.aadhaar && formik.errors.aadhaar
                            ? "border-red-600 focus:border-red-600 text-red-600"
                            : ""
                        }`}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.aadhaar}
                    />
                    {formik.touched.aadhaar && formik.errors.aadhaar ? (
                        <div className="text-red-600 text-xs">{formik.errors?.aadhaar}</div>
                    ) : null}
                    </div>

                    <div>
                    <label className="form-label inline-block mb-2 text-gray-700" htmlFor="pan">PAN No.</label>
                    <input
                        type="text"
                        name="pan"
                        id="pan"
                        className={`w-full border focus:border-primary border-blue-500 rounded-l px-2 py-1  ${
                        formik.touched?.pan && formik.errors?.pan
                            ? "border-red-600 focus:border-red-600 text-red-600"
                            : ""
                        }`}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.pan}
                    />
                    {formik.touched?.pan && formik.errors?.pan ? (
                        <div className="text-red-600 text-xs">{formik.errors?.pan}</div>
                    ) : null}
                    </div>
                </div>
                <div className="grid gap-4 lg:p-4 place-content-center grid-cols-[repeat(auto-fill,_minmax(120px,_1fr))] xl:grid-cols-2 lg:grid-cols-[repeat(auto-fill,_minmax(120px,_1fr))]">
                    <button
                    disabled={loading}
                    onKeyDown={(event) =>
                        event.key === "Enter" ? handleSubmit() : ""
                    }
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
                    {data != "" && (
                    <button type="button" className="btn-primary lg:col-span-2" onClick={generatePDF}>Download</button>
                    )}
                </div>
            </form>
        </li>
      <li className="lg:col-span-2 bg-gray-200 p-4" ref={pdf_ref}>
        {data == "" ? (
            <div className="bg-white mx-auto md:w-2/3 px-2 py-8">
                <div className="text-center ">
                    <p className="paragraph-xl">Welcome to the Tan verification page.</p>
                    <p className="paragraph-md">Use the search bar to find information about Tan Number.</p>
                </div>
            </div>
        ) : (
          <h1 className="text-lg p-5">{data}</h1>
        )}
      </li>
    </SearchResult_section>
  );
};

export default AadhaarLinkStatus;
