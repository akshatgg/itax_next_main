"use client";
import { useState, useEffect } from "react";
import Dropzone from "react-dropzone";
import { PDFDocument } from "pdf-lib";
import { MdDelete, MdDragIndicator } from "react-icons/md";
import { FaFilePdf } from "react-icons/fa";

// Valid file types for upload
const validMimeTypes = {
  "application/pdf": ".pdf",
};

export default function MergePdf() {
  const [files, setFiles] = useState([]);
  const [mergedPdf, setMergedPdf] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");

  // Cleanup URL object when component unmounts
  useEffect(() => {
    return () => {
      if (downloadUrl) {
        URL.revokeObjectURL(downloadUrl);
      }
    };
  }, [downloadUrl]);

  const handleDrop = async (acceptedFiles) => {
    setError("");
    
    // Validate files
    const invalidFiles = acceptedFiles.filter(file => !validMimeTypes[file.type]);
    if (invalidFiles.length > 0) {
      setError(`${invalidFiles.length} invalid file(s). Only PDF files are supported.`);
      return;
    }
    
    // Add new files with preview info
    const newFiles = acceptedFiles.map(file => ({
      file,
      name: file.name,
      size: formatFileSize(file.size),
      type: file.type,
      id: `${file.name}-${Date.now()}`
    }));
    
    setFiles(prev => [...prev, ...newFiles]);
    
    // Reset merged PDF if files change
    if (mergedPdf) {
      setMergedPdf(null);
      setDownloadUrl("");
    }
  };

  const removeFile = (id) => {
    setFiles(files.filter(file => file.id !== id));
    // Reset merged PDF if files change
    if (mergedPdf) {
      setMergedPdf(null);
      setDownloadUrl("");
    }
  };

  const mergePDFs = async () => {
    if (files.length === 0) {
      setError("Please add PDF files to merge");
      return;
    }
    
    setLoading(true);
    setError("");
    
    try {
      // Load all PDF files
      const loadedPdfs = await Promise.all(
        files.map(fileObj => {
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (event) => resolve({
              data: event.target.result,
              name: fileObj.name
            });
            reader.onerror = (error) => reject(new Error(`Failed to read ${fileObj.name}: ${error}`));
            reader.readAsArrayBuffer(fileObj.file);
          });
        })
      );
      
      // Create new PDF document
      const mergedPdfDoc = await PDFDocument.create();
      
      // Add pages from each PDF
      for (const pdfData of loadedPdfs) {
        try {
          const pdf = await PDFDocument.load(pdfData.data);
          const copiedPages = await mergedPdfDoc.copyPages(pdf, pdf.getPageIndices());
          copiedPages.forEach(page => {
            mergedPdfDoc.addPage(page);
          });
        } catch (err) {
          console.error(`Error processing ${pdfData.name}:`, err);
          setError(`Error processing ${pdfData.name}. File may be corrupted or password protected.`);
          setLoading(false);
          return;
        }
      }
      
      // Generate the merged PDF
      const mergedPdfBytes = await mergedPdfDoc.save();
      setMergedPdf(mergedPdfBytes);
      
      // Create download URL
      const url = URL.createObjectURL(
        new Blob([mergedPdfBytes], { type: "application/pdf" })
      );
      setDownloadUrl(url);
      
    } catch (error) {
      console.error("Error merging PDFs:", error);
      setError("Failed to merge PDFs. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Format file size to readable format
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="min-h-screen my-10 max-w-5xl mx-auto px-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-primary">Merge PDF Files</h1>
      
      {/* Dropzone */}
      <Dropzone 
        accept={validMimeTypes}
        onDrop={handleDrop}
        multiple={true}
      >
        {({ getRootProps, getInputProps, isDragActive }) => (
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg py-12 px-6 transition-all ${
              isDragActive 
                ? "border-primary bg-primary/5" 
                : "border-zinc-400 hover:border-primary/70"
            }`}
          >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center">
              <span className="block object-contain h-14 w-14 fill-primary">
                {uploadIcon}
              </span>
              <p className="text-center mt-5 leading-loose font-medium text-lg">
                {isDragActive 
                  ? "Drop your PDF files here" 
                  : "Drag & drop PDF files to upload"}
                <br /> Or
              </p>
              <button className="inline-block bg-primary mt-3 px-8 py-3 text-white rounded-md font-semibold text-sm hover:bg-primary/90 transition-colors">
                Browse Files
              </button>
              <p className="text-zinc-600 text-xs font-medium mt-3">
                Only PDF files are supported
              </p>
            </div>
          </div>
        )}
      </Dropzone>

      {/* Error message */}
      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md">
          {error}
        </div>
      )}

      {/* File list */}
      {files.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-2">Selected Files ({files.length})</h3>
          <div className="border rounded-md overflow-hidden">
            {files.map((file, index) => (
              <div 
                key={file.id} 
                className={`flex items-center p-3 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
              >
                <div className="mr-2">
                  <MdDragIndicator className="text-gray-400" size={20} />
                </div>
                <div className="flex-shrink-0 mr-3">
                  <FaFilePdf className="text-red-500" size={24} />
                </div>
                <div className="flex-grow min-w-0">
                  <p className="truncate font-medium">{file.name}</p>
                  <p className="text-xs text-gray-500">{file.size}</p>
                </div>
                <button 
                  onClick={() => removeFile(file.id)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors ml-2"
                  title="Remove file"
                >
                  <MdDelete className="text-gray-500 hover:text-red-500" size={20} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action buttons */}
      <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
        {files.length > 0 && (
          <>
            <button
              onClick={mergePDFs}
              disabled={loading || files.length === 0}
              className={`px-6 py-3 rounded-md font-semibold text-white flex items-center justify-center ${
                loading || files.length === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-primary hover:bg-primary/90"
              }`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                "Merge PDFs"
              )}
            </button>
            
            <button
              onClick={() => {
                setFiles([]);
                setMergedPdf(null);
                setDownloadUrl("");
                setError("");
              }}
              className="px-6 py-3 border border-gray-300 rounded-md font-semibold text-gray-700 hover:bg-gray-50"
            >
              Clear All
            </button>
          </>
        )}
      </div>

      {/* Download section */}
      {downloadUrl && (
        <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-lg text-center">
          <div className="flex flex-col items-center">
            <svg className="text-green-500 w-12 h-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <h3 className="text-xl font-bold text-gray-800 mb-2">PDF Successfully Merged!</h3>
            <p className="text-gray-600 mb-4">Your PDF is ready to download.</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={downloadUrl}
                download="merged.pdf"
                className="px-6 py-3 bg-primary text-white rounded-md font-semibold hover:bg-primary/90 inline-flex items-center justify-center"
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
                Download Merged PDF
              </a>
              <a
                href={downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md font-semibold hover:bg-gray-50 inline-flex items-center justify-center"
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path>
                  <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path>
                </svg>
                Preview PDF
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Instructions */}
      {!files.length && !downloadUrl && (
        <div className="mt-10 p-6 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-3">How to Merge PDF Files</h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Drag and drop PDF files into the upload area, or click "Browse Files" to select them.</li>
            <li>Arrange the files in the order you want them to appear in the merged PDF.</li>
            <li>Click "Merge PDFs" to combine all files into a single PDF document.</li>
            <li>Download or preview your merged PDF file.</li>
          </ol>
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