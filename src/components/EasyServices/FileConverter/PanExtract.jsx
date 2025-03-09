import { Footer } from "antd/lib/layout/layout";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import Navbar from "../../../Components/Header/Navbar";
import { useDropzone } from "react-dropzone";

const AadhaarComvertor = () => {
  const [data, setData] = useState("");
  useEffect(() => {
    setData(localStorage.getItem("token"));
  }, []);
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    let formData = new FormData();
    formData.append("uploadedFiles", acceptedFiles);
    axios
      .post(
        "https://mom.itaxeasy.com/api/upload?requestType=student&docType=pan",
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          data: formData,
        }
      )
      .then(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <>
      <Navbar />
      <div
        className="container d-flex justify-content-center"
        style={{ paddingTop: "6rem" }}
      >
        <div {...getRootProps()} className="dragzone ">
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>
              Drag &apos;n&apos; drop some files here, or click to select files
            </p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AadhaarComvertor;
