/* eslint-disable @next/next/no-img-element */
"use client"
import React, { useContext, useEffect, useState } from "react";
import {
  Card,
  NameSection,
  UploadBox,
  Image,
  ProgressBox,
  ProgressBar,
} from "@/app/styles/UploadFileStyles";
import Dropzone from "react-dropzone";
import { MdCloudUpload, MdDelete } from "react-icons/md";
import { AiFillFileImage } from "react-icons/ai";
import { StoreContext } from "@/store/store-context";
import Actions from "@/store/actions";

const UploadForm16 = () => {
  const [files, setFiles] = useState([]);
  const [fileName, setFileName] = useState([]);
  const [hasFile, setHasFile] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingPDF, setIsLoadingPDF] = useState(true);
  const [image, setImage] = useState([{}]);
  const [pdf, setPdf] = useState([]);
  const [fileType, setFileType] = useState("");
  const [form16Json, setForm16Json] = useState();

  const [_, dispatch] = useContext(StoreContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const formData = new FormData();
      const file = files[0];

      formData.append("file", file);

      const res = await fetch(`https://ocr.itaxeasy.com/ocr`, {
        method: "POST",
        body: formData,
      });
      const form16Obj = await res.json();

      setHasFile(true);
      setForm16Json({ ...form16Obj });
      setIsLoading(false);
      setData();
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };

  useEffect(() => {
    const setData = () => {
      dispatch({
        type: Actions.FORM_16_IMPORT,
        payload: {
          formData: {
            nameOfEmployer:
              form16Json?.data["PART A Name and Address of Employer/Bank"],
            employerStatus: {
              employerType: "",
              centerGovEmployee: false,
            },
            salaryAsPerSection17_1: {
              salary:
                form16Json?.data[
                  "SALARY AS PER PROVISIONS CONTAINED IN SECTION 17(1)"
                ] || 0,
              pensioner: false,
            },
            valueOfPerquisitesUnderSection17_2:
              form16Json?.data[
                "VALUE OF PERQUISITES UNDER SECTION 17(2)(AS PER FORM NO 12BA, WHEREVER APPLICABLE)"
              ] || 0,
            profitsInLieuOfSalaryUnderSection17_3:
              form16Json?.data[
                "PROFITS IN LIEU OF SALARY UNDER SECTION 17(3)(AS PER FORM NO 12BA, WHEREVER APPLICABLE)"
              ] || 0,
            grossSalary: form16Json?.data["GROSS SALARY (d) TOTAL"] || 0,
            exemptAllowancesUnderSection_10:
              form16Json?.data[
                "TOTAL AMOUNT OF EXEMPTION CLAIMED UNDER SECTION 10"
              ] || 0,
            houseRentAllowance:
              form16Json?.data["HOUSE RENT ALLOWANCE UNDER SECTION 10(13A)"] ||
              0,
            leaveTravelConcessionAssistance:
              form16Json?.data[
                "TRAVEL CONCESSION OR ASSITANCE UNDER SECTION 10(5)"
              ] || 0,
            taxPaidByEmployerOnNonMonetaryPerks: 0,
            gratuity:
              form16Json?.data[
                "DEATH-CUM-RETIREMENT GRATUITY UNDER SECTION 10(10)"
              ] || 0,
            pension:
              form16Json?.data[
                "COMMUTED VALUE OF PENSION UNDER SECTION 10(10A)"
              ] || 0,
            leaveEncashmentOnRetirement:
              form16Json?.data[
                "CASH EQUIVALENT OF LEAVE SALARY ENCASHMENT UNDER SECTION 10(10AA)"
              ] || 0,
            retrechmentCompensation_SchemeNotApprove: 0,
            retrechmentCompensation_SchemeApprove: 0,
            voluntaryRetirement: 0,
            otherAllowance: 0,
            netSalary:
              form16Json?.data[
                "TOTAL AMOUNT OF SALARY RECEIVED FROM CURRENT EMPLOYER"
              ] || 0,
            entertainmentAllowanceUnderSection16ii:
              form16Json?.data[
                "ENTERTAINMENT ALLOWANCE UNDER SECTION 16(ii)"
              ] || 0,
            professionalTaxUnderSection16iii: 0,
            totalIncome: form16Json?.data["GROSS TOTAL INCOME"] || 0,
          },
        },
      });
    };

    if (form16Json) {
      setData();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form16Json]);

  const removeFileHandler = () => {
    setFileType("");
    setFileName([]);
    setFiles([]);
    setImage([]);
    setPdf([]);
    setIsLoadingPDF(true);
    setHasFile(false);
    return;
  };

  const handleFile = (e) => {
    if (e[0].type === "image/jpeg" || "image/jpg" || "image/png") {
      setFileType("image");
      image[0] = { url: "", loading: true };
      setImage([...image]);
    }
    if (e[0].type === "application/pdf") {
      setFileType("pdf");
      pdf[0] = { url: "", loading: true };
      setPdf([...pdf]);
    }

    setTimeout(() => {
      const file = e[0];
      fileName[0] = file?.name;
      setFileName([...fileName]);
      if (!file) {
        return;
      }
      files[0] = file;
      setFiles([...files]);
      if (file.type === "application/pdf") {
        pdf[0] = { url: URL.createObjectURL(file), loading: false };
        setIsLoadingPDF(false);
      }
      if (file.type === "image/jpeg" || "image/jpg" || "image/png") {
        image[0] = { url: URL.createObjectURL(file), loading: false };
        console.log("image");
        setImage([...image]);
      }
    }, 2000);
    return;
  };

  const downloadJson = (form16Json) => {
    const data = JSON.stringify(form16Json);
    const blob = new Blob([data], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "FORM_16.json";
    link.href = url;
    link.click();
  };

  return (
    <div className="md:px-8">
      {!hasFile ? (
        <div 
        // className="flex flex-col md:px-16 px-2 md:flex-row [&>div]:w-full [&>form]:w-full"
        className="flex flex-col container mx-auto px-2 lg:flex-row [&>div]:w-full [&>form]:w-full"
        >
          <form className="" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-8">
              <h2 className="text-2xl font-semibold text-center py-5 border-b">
                Upload Form 16
              </h2>
              <Card>
                <Dropzone onDrop={(acceptedFiles) => handleFile(acceptedFiles)}>
                  {({ getRootProps, getInputProps }) => (
                    <div
                      className="absolute w-full h-full flex justify-center items-center"
                      {...getRootProps()}
                    >
                      <input
                        {...getInputProps()}
                        accept=".pdf, .jpeg, .jpg, .png "
                      />
                    </div>
                  )}
                </Dropzone>

                <UploadBox className="pointer-events-none">
                  {image[0]?.loading || pdf[0]?.loading ? (
                    <>
                      <ProgressBox>Uploading</ProgressBox>
                      <ProgressBar />
                    </>
                  ) : (
                    <>
                      <MdCloudUpload color="#0055d4" size={40} />
                      <p>Browse files to Upload</p>
                    </>
                  )}
                </UploadBox>
                <NameSection>
                  <div className="flex items-center gap-2">
                    <AiFillFileImage color="#fff" />
                    {fileName && fileName[0] ? fileName[0] : "No File selected"}
                  </div>
                  <button
                    type="button"
                    onClick={(e) => removeFileHandler(e)}
                    disabled={isLoading}
                  >
                    <MdDelete color="#fff" />
                  </button>
                </NameSection>
              </Card>
              <button
                type="submit"
                disabled={isLoadingPDF}
                className="inline-block mx-auto bg-primary px-8 py-2 text-white rounded-md font-semibold cursor-pointer disabled:opacity-25"
              >
                {isLoading ? (
                  <span className="inline-block w-4 h-4 border-white border-b-zinc-400 border-r-zinc-400 border-2 border-solid rounded-full animate-spin"></span>
                ) : (
                  "Upload"
                )}
              </button>
            </div>
          </form>
          <div className="flex justify-center flex-col gap-3 md:px-8 items-center">
            {fileType === "image" && (
              <div className="max-w-sm text-center">
                <h3 className="text-2xl font-semibold text-slate-900 py-6">Preview</h3>
                {/* <Image src={image[0].url} alt="Uploaded File" /> */}
                <img src={image[0].url} alt="Uploaded File"  />
              </div>
            )}

            {fileType === "pdf" && (
              // <div>
              //   {/* <ReactPDF file={{ url: pdf[0].url }} /> */}
              //   {/* {pdf[0].url} */}
              //   {/* <iframe src={pdf[0].url} frameborder="0" height="500px" width="100%"></iframe> */}
              // </div>
            <div className=" flex-shrink-0 w-full text-center">
              <h3 className="text-2xl font-semibold text-slate-900 py-6">Preview</h3>
              <iframe src={image[0]?.url}frameborder="0" height="500px" width="100%"></iframe> 
            </div>
            )}
          </div>
        </div>
      ) : (
        <div className="w-2/3 mx-auto px-12 pt-12 [&>div]:mb-9 shadow-slate-300 shadow-xl">
          <div className="flex font-bold justify-between text-sm gap-4 text-center">
            <span>
              PAN of Deductor:{" "}
              <span className="font-normal">
                {form16Json?.data["PART A Pan of Employee"]}
              </span>
            </span>
            {/* <span>
              {form16Json?.data["PART A Name and Address of Employer/Bank"]}
            </span> */}
            <span>
              Assessment Year:{" "}
              <span className="font-normal">
                {form16Json?.data["PART A Assessment Year"]}
              </span>
            </span>
          </div>
          <div className="text-center text-xl">
            Summary of Incomes, Deductions and Taxes
          </div>
          <div className="[&>div]:flex [&>div]:font-bold [&>div]:justify-between [&>div]:p-3 [&>div]:rounded-md">
            <div>
              <div>
                <span>Total Income From Salary From Current Employer</span>
              </div>
              <div>
                <span className="font-normal">
                  {form16Json?.data["GROSS TOTAL INCOME"]}
                </span>
              </div>
            </div>
            <div>
              <div>
                <span>Deductible Amount Under Chapter VI-A</span>
              </div>
              <div>
                <span className="font-normal">
                  {
                    form16Json?.data[
                      "AGGREGATE OF DEDUCTIBLE AMOUNT UNDER CHAPTER VI-A"
                    ]
                  }
                </span>
              </div>
            </div>
            <div>
              <div>
                <span>Deductible Amount Under Section 16</span>
              </div>
              <div>
                <span className="font-normal">
                  {
                    form16Json?.data[
                      "TOTAL AMOUNT OF DEDUCTIONS UNDER SECTION 16"
                    ]
                  }
                </span>
              </div>
            </div>

            <div>
              <div>
                <span>Total Taxable Income</span>
              </div>
              <div>
                <span className="font-normal">
                  {form16Json?.data["TOTAL TAXABLE INCOME"]}
                </span>
              </div>
            </div>
            <div>
              <div>
                <span>NET TAX PAYABLE</span>
              </div>
              <div>
                <span className="font-normal">
                  {form16Json?.data["TAX ON TOTAL INCOME"]}
                </span>
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-3 py-3">
            <button
              onClick={downloadJson}
              className="bg-primary px-8 py-3 text-white rounded-md font-semibold text-sm cursor-pointer col-span-2"
            >
              Download JSON
            </button>
            <button
              onClick={removeFileHandler}
              className="bg-primary px-8 py-3 text-white rounded-md font-semibold text-sm cursor-pointer col-span-2"
            >
              Go Back
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadForm16;