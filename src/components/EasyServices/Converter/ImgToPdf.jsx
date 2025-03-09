"use client";
import axios from "axios";
import { useContext, useState, useRef } from "react";
import {
  Card,
  NameSection,
  UploadBox,
  ProgressBox,
  ProgressBar,
} from "@/app/styles/UploadFileStyles";
import { MdCloudUpload, MdDelete } from "react-icons/md";
import { AiFillFileImage } from "react-icons/ai";
import actions from "@/store/actions";
import { StoreContext } from "@/store/store-context";
import Link from "next/link";
import {useRouter} from "next/navigation"
import Image from "next/image";
import { useReactToPrint } from "react-to-print";
export default function ImgToPdf() {
  const [uploading, setUploading] = useState(false);
  const [pdfUrl, setPdfUrl] = useState("");

  const [_, dispatch] = useContext(StoreContext);

  const [file, setFile] = useState([]);

  const router = useRouter();
  const pdf_ref = useRef();

  const handleFile = (e) => {
    if (!e.target.files[0]) {
      setUploading(false);
      return;
    }
    setUploading(true);
    setTimeout(() => {
      const file = e.target.files[0];
      if (!file) {
        setUploading(false);
        return;
      }
      setFile((prev) => [
        ...prev,
        {
          imageUrl: URL.createObjectURL(file),
          fileName: file.name,
        },
      ]);
      setUploading(false);
    }, 2000);
  };

  const removeFileHandler = (e, i) => {
    e.stopPropagation();
    const newFile = file.filter((item, index) => index !== i);
    setFile(newFile);
  };

//   const generatePdfHandler = async () => {
//     // Assuming your IMG_PDF action returns the PDF URL after generating it
//     const pdfUrl = await dispatch({
//       type: actions.IMG_PDF,
//       payload: file,
//     });
//     setPdfUrl(pdfUrl); // Save the PDF URL to the state
//     router.replace("/easyservice/image-to-pdf/pdf");
//   };
  const generatePDF = useReactToPrint({
    content: () => pdf_ref.current,
    documentTitle: "ImageToPdf",
  });
  return (
    <>
      <div className="min-h-screen flex flex-col items-center">
        <h1 className="text-center mt-5 text-2xl font-semibold text-primary">
          Convert your Images to PDF
        </h1>
        <Card
          style={{ width: "50%", margin: " 4rem auto" }}
          onClick={() => document.getElementById(`doc`).click()}
        >
          <input
            id="doc"
            type="file"
            accept=" .jpeg, .jpg, .png "
            hidden
            onChange={(e) => handleFile(e)}
          />
          <>
            <UploadBox>
              {uploading ? (
                <>
                  <ProgressBox>Uploading</ProgressBox>
                  <ProgressBar />
                </>
              ) : (
                <>
                  <MdCloudUpload color="#2a275d" size={40} />
                  <p>Browse Image to Upload</p>
                </>
              )}
            </UploadBox>
          </>
        </Card>

        {file.length > 0 &&
          file?.map((item, i) => {
            return (
              <div
                key={i}
                className="py-3 px-10 bg-primary text-white rounded-md w-6/12 flex justify-between mb-5"
              >
                <div className="flex gap-2 items-center">
                  <AiFillFileImage color="#fff" />
                  <p>{item.fileName}</p>
                </div>
                <button
                  type="button"
                  className="justify-self-end"
                  onClick={(e) => removeFileHandler(e, i)}
                >
                  <MdDelete color="#fff" />
                </button>
              </div>
            );
          })}

        <button
          disabled={file.length === 0}
          className="px-7 py-2 bg-primary text-white text-center mb-10 rounded-lg disabled:opacity-25"
          onClick={generatePDF}
        >
          Generate PDF
        </button>
        <div className="grid grid-cols-2 gap-4 p-8 size" ref={pdf_ref}>
            {file.length > 0 && file.map((url, i) => (
                <Image key={i} src={url.imageUrl} alt={url.fileName} width={200} height={200} />
            ))}
        </div>
      </div>

      {pdfUrl && (
        <div>
            <div className="mt-5">
            <Link href={pdfUrl} target="_blank" download>
                <button className="px-7 py-2 bg-primary text-white rounded-lg">
                Download PDF
                </button>
            </Link>
            </div>
        </div>
      )}

    </>
  );
}
