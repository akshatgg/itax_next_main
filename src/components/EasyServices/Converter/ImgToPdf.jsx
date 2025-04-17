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
import { MdCloudUpload, MdDelete, MdFileDownload } from "react-icons/md";
import { AiFillFileImage } from "react-icons/ai";
import actions from "@/store/actions";
import { StoreContext } from "@/store/store-context";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useReactToPrint } from "react-to-print";
import { jsPDF } from "jspdf";

export default function ImgToPdf() {
  const [uploading, setUploading] = useState(false);
  const [pdfUrl, setPdfUrl] = useState("");
  const [pdfGenerated, setPdfGenerated] = useState(false);
  const [pdfBlob, setPdfBlob] = useState(null);
  const [store, dispatch] = useContext(StoreContext);

  const [files, setFiles] = useState([]);

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

      // Only accept image files
      if (!file.type.match('image.*')) {
        alert('Please upload only image files (.jpeg, .jpg, .png)');
        setUploading(false);
        return;
      }

      setFiles((prev) => [
        ...prev,
        {
          imageUrl: URL.createObjectURL(file),
          fileName: file.name,
          file: file, // Store the actual file for potential server upload
        },
      ]);
      setUploading(false);
    }, 1000);
  };

  const removeFileHandler = (e, i) => {
    e.stopPropagation();
    const newFiles = files.filter((item, index) => index !== i);
    setFiles(newFiles);
  };

  // Server-side PDF generation
  const generatePdfHandlerServer = async () => {
    try {
      setUploading(true);
      
      // Create form data to send files to server
      const formData = new FormData();
      files.forEach((fileObj, index) => {
        formData.append(`images`, fileObj.file);
      });
      
      // Replace with your actual API endpoint
      const response = await axios.post('/api/convert-to-pdf', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        responseType: 'blob', // Important for handling binary data
      });
      
      // Create a blob URL from the response
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      setPdfUrl(url);
      setPdfBlob(blob);
      setPdfGenerated(true);
      
      // Optionally update store with dispatch
      dispatch({
        type: actions.IMG_PDF,
        payload: url,
      });
      
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  // Client-side PDF generation using react-to-print
  const generatePDF = useReactToPrint({
    content: () => pdf_ref.current,
    documentTitle: "ImageToPdf",
    onBeforePrint: () => {
      // Add additional setup if needed
    },
    onAfterPrint: () => {
      // Create a PDF blob for download functionality
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });
      
      // Add images to PDF
      files.forEach((fileObj, index) => {
        if (index > 0) {
          doc.addPage();
        }
        
        // Add image title
        doc.setFontSize(12);
        doc.text(fileObj.fileName, 20, 20);
        
        // Create an image element to get dimensions
        const img = new Image();
        img.src = fileObj.imageUrl;
        
        // Add image with proper sizing
        const imgWidth = 170; // A4 width minus margins
        const imgHeight = (img.height * imgWidth) / img.width;
        
        doc.addImage(fileObj.imageUrl, 'JPEG', 20, 30, imgWidth, imgHeight);
      });
      
      // Create blob from PDF
      const pdfBlob = doc.output('blob');
      const url = URL.createObjectURL(pdfBlob);
      
      setPdfUrl(url);
      setPdfBlob(pdfBlob);
      setPdfGenerated(true);
    },
    removeAfterPrint: false,
  });

  // Function to download the PDF
  const downloadPDF = () => {
    if (pdfUrl) {
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = 'converted-images.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert("PDF not available for download. Please generate it first.");
    }
  };

  // Function to print the PDF
  const printPDF = () => {
    if (pdfUrl) {
      const printWindow = window.open(pdfUrl, '_blank');
      if (printWindow) {
        printWindow.addEventListener('load', () => {
          printWindow.print();
        });
      } else {
        alert("Please allow pop-ups to print the PDF.");
      }
    } else {
      alert("PDF not available for printing. Please generate it first.");
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col items-center">
        <h1 className="text-center mt-5 text-2xl font-semibold text-primary">
          Convert your Images to PDF
        </h1>
        
        {/* Upload Box */}
        <Card
          style={{ width: "80%", maxWidth: "600px", margin: "2rem auto" }}
          onClick={() => document.getElementById(`fileInput`).click()}
        >
          <input
            id="fileInput"
            type="file"
            accept=".jpeg, .jpg, .png"
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
                  <p>Click or drag images to upload</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Supported formats: JPEG, JPG, PNG
                  </p>
                </>
              )}
            </UploadBox>
          </>
        </Card>

        {/* File List */}
        <div className="w-full max-w-md">
          {files.length > 0 &&
            files.map((item, i) => (
              <div
                key={i}
                className="py-3 px-4 bg-primary text-white rounded-md w-full flex justify-between mb-3"
              >
                <div className="flex gap-2 items-center overflow-hidden">
                  <AiFillFileImage color="#fff" />
                  <p className="truncate">{item.fileName}</p>
                </div>
                <button
                  type="button"
                  className="ml-2 flex-shrink-0"
                  onClick={(e) => removeFileHandler(e, i)}
                >
                  <MdDelete color="#fff" size={20} />
                </button>
              </div>
            ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-4 mb-10">
          <button
            disabled={files.length === 0 || uploading}
            className="px-7 py-2 bg-primary text-white text-center rounded-lg disabled:opacity-50"
            onClick={generatePDF}
          >
            {uploading ? "Processing..." : "Generate PDF"}
          </button>
          
          {files.length > 0 && (
            <button
              className="px-7 py-2 bg-red-500 text-white text-center rounded-lg"
              onClick={() => setFiles([])}
            >
              Clear All
            </button>
          )}
        </div>

        {/* Preview Area (will be converted to PDF) */}
        <div className="hidden">
          <div 
            ref={pdf_ref} 
            className="bg-white p-8"
            style={{ width: "210mm", minHeight: "297mm" }} // A4 size
          >
            <h2 className="text-xl font-bold mb-6 text-center">Image Collection</h2>
            <div className="grid grid-cols-1 gap-6">
              {files.length > 0 && files.map((fileObj, i) => (
                <div key={i} className="flex flex-col items-center mb-4">
                  <img 
                    src={fileObj.imageUrl} 
                    alt={fileObj.fileName} 
                    className="max-w-full h-auto" 
                    style={{ maxHeight: "80vh" }}
                  />
                  <p className="mt-2 text-sm text-gray-600">{fileObj.fileName}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Visible Preview */}
        {files.length > 0 && (
          <div className="w-full max-w-2xl mb-10">
            <h3 className="text-lg font-medium mb-4">Preview</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {files.map((fileObj, i) => (
                <div key={i} className="border rounded-lg overflow-hidden">
                  <div className="aspect-w-16 aspect-h-9 relative h-48">
                    <Image 
                      src={fileObj.imageUrl} 
                      alt={fileObj.fileName} 
                      layout="fill" 
                      objectFit="contain"
                    />
                  </div>
                  <p className="p-2 text-sm truncate">{fileObj.fileName}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Success Message */}
      {pdfGenerated && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">PDF Generated Successfully!</h3>
            <p className="mb-6">Your PDF has been created and is ready to download or print.</p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={printPDF}
                className="px-4 py-2 bg-primary text-white rounded-lg flex items-center gap-2"
              >
                <span>Print PDF</span>
              </button>
              <button
                onClick={downloadPDF}
                className="px-4 py-2 bg-green-600 text-white rounded-lg flex items-center gap-2"
              >
                <MdFileDownload size={20} />
                <span>Download PDF</span>
              </button>
              <button
                onClick={() => setPdfGenerated(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}