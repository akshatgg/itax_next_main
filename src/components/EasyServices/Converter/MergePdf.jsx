"use client";
import { useState } from "react";
import Dropzone from "react-dropzone";
import { PDFDocument } from "pdf-lib";
const validMimeTypes = ["image/jpeg", "image/png", "application/pdf"];

export default function MergePdf() {
  const [mergedPdf, setMergedPdf] = useState(null);
  const [active, setActive] = useState(false);

  const handleDrop = async (acceptedFiles) => {
    // console.log("acceptedFiles :", acceptedFiles)
    if (acceptedFiles.length > 0) {
      const loadedPdfs = await Promise.all(
        acceptedFiles.map((pdfFile) => {
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (event) => resolve(event.target.result);
            reader.onerror = reject;
            reader.readAsArrayBuffer(pdfFile);
          });
        })
      );

      const mergedPdf = await mergePDFs(loadedPdfs);
      setMergedPdf(mergedPdf);
    }
  };

  const mergePDFs = async (pdfs) => {
    const mergedPdf = await PDFDocument.create();
    for (const pdfData of pdfs) {
      const pdf = await PDFDocument.load(pdfData);
      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      copiedPages.forEach((page) => {
        mergedPdf.addPage(page);
      });
    }
    setActive(true);
    return mergedPdf.save();
  };

  return (
    <div className="min-h-screen my-10">
      <Dropzone accept={validMimeTypes} onDrop={handleDrop}>
        {({ getRootProps, getInputProps }) => (
          <div
            {...getRootProps()}
            className="max-w-3xl md:mx-auto border-2 border-dashed border-zinc-400 rounded-md py-20 mx-8"
          >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center">
              <span className="block object-contain h-10 w-10 fill-primary">
                {uploadIcon}
              </span>
              <p className="text-center mt-5 leading-loose font-semibold">
                Drag & drop files to upload <br /> Or
              </p>
              <button className="inline-block bg-primary mt-3 px-8 py-3 text-white rounded-md font-semibold text-sm">
                Browse
              </button>
              <p className="text-zinc-600 text-xs font-semibold mt-3">
                Only PDF Files are supported
              </p>
            </div>
          </div>
        )}
      </Dropzone>

      {mergedPdf && active && (
        <div className="flex justify-center p-5 gap-2 ">
          <p>PDF is ready:</p>
          <a
            className="underline"
            href={URL.createObjectURL(
              new Blob([mergedPdf], { type: "application/pdf" })
            )}
            download="merged.pdf"
          >
            Download Merged PDF
          </a>
        </div>
      )}
    </div>
  );
}

const uploadIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
    <path d="M246.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 109.3V320c0 17.7 14.3 32 32 32s32-14.3 32-32V109.3l73.4 73.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-128-128zM64 352c0-17.7-14.3-32-32-32s-32 14.3-32 32v64c0 53 43 96 96 96H352c53 0 96-43 96-96V352c0-17.7-14.3-32-32-32s-32 14.3-32 32v64c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V352z" />
  </svg>
);

// import React, { useCallback, useState } from 'react'
// import { useDropzone } from 'react-dropzone'
// import Navbar from '../../../Components/Header/Navbar'
// import Footer from '../../../Components/Footer/Footer'
// import axios from 'axios'
// import { useEffect } from 'react'
// import { ImUpload } from "react-icons/im";

// const ImgToPdf = () => {
//   const [forDownload, setForDonwload] = useState("")

//   const [tokendata, setTokenData] = useState("")
//   useEffect(() => {
//     setTokenData(localStorage.getItem("token"))
//   }, [])
//   const onDrop = useCallback(acceptedFiles  => {
//     // Do something with the files
//     let formData = new FormData()
//     formData.append('images[]', acceptedFiles[0])

//     const url = 'https://mom.itaxeasy.com/api/merge';

//     axios.post(url, formData, { responseType: 'arraybuffer' }).then(res => {

//       const url = window.URL.createObjectURL(new Blob([res.data]
//         , { type: "application/pdf" }))
//       var link = document.createElement('a');
//       link.href = url;
//       link.setAttribute('download', 'imgtopdf.pdf');
//       document.body.appendChild(link);
//       // link.click();

//     })
//       .catch(error => {
//         alert('service error')
//         console.log(error)
//       });

//   }, [])
//   const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
//   return (
//     <>
//       <Navbar />
//       <div className="container-fluid d-flex justify-content-center bgblack" style={{ paddingTop: "8rem" }}>

//         <div {...getRootProps()} className="dragzone shadow-sm  ">
//           <input {...getInputProps()} />
//           {
//             isDragActive ?
//               <p>Drop the files here ...</p> :
//               <>

//                 <div className="dragzoneboreder">
//                   <ImUpload size={48} style={{ color: "#1e0558" }} />
//                   <h4>Drag & Drop </h4>
//                   <h6>Or Click To Select File</h6>
//                 </div>
//               </>
//           }
//         </div>
//       </div>
//       <Footer />
//     </>
//   )
// }

// export default ImgToPdf
