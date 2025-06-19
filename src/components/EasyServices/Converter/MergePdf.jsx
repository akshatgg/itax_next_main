"use client"
import { useState, useEffect, useRef } from "react"
import { PDFDocument } from "pdf-lib"
import { useDropzone } from "react-dropzone"
import {
  Upload,
  Trash2,
  FileText,
  Download,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  GripVertical,
  RefreshCw,
  FilePlus,
  ArrowDownUp,
} from "lucide-react"
import { DndProvider, useDrag, useDrop } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"

// Valid file types for upload
const validMimeTypes = {
  "application/pdf": ".pdf",
}

// Draggable file item component
const DraggableFileItem = ({ file, index, moveFile, removeFile }) => {
  const ref = useRef(null)

  const [{ isDragging }, drag] = useDrag({
    type: "FILE_ITEM",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const [, drop] = useDrop({
    accept: "FILE_ITEM",
    hover: (item, monitor) => {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }

      moveFile(dragIndex, hoverIndex)
      item.index = hoverIndex
    },
  })

  drag(drop(ref))

  return (
    <div
      ref={ref}
      className={`flex items-center p-4 ${
        index % 2 === 0 ? "bg-gray-50" : "bg-white"
      } border-b last:border-b-0 transition-opacity ${isDragging ? "opacity-50" : "opacity-100"}`}
    >
      <div className="mr-2 cursor-move text-gray-400 hover:text-gray-600 touch-none">
        <GripVertical className="h-5 w-5" />
      </div>
      <div className="flex-shrink-0 mr-3">
        <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
          <FileText className="h-5 w-5 text-red-600" />
        </div>
      </div>
      <div className="flex-grow min-w-0">
        <p className="truncate font-medium text-gray-800">{file.name}</p>
        <p className="text-xs text-gray-500">{file.size}</p>
      </div>
      <button
        onClick={() => removeFile(file.id)}
        className="p-2 hover:bg-gray-100 rounded-full transition-colors ml-2"
        title="Remove file"
      >
        <Trash2 className="h-4 w-4 text-gray-500 hover:text-red-500" />
      </button>
    </div>
  )
}

export default function MergePdf() {
  const [files, setFiles] = useState([])
  const [mergedPdf, setMergedPdf] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [downloadUrl, setDownloadUrl] = useState("")
  const [dragActive, setDragActive] = useState(false)

  // Cleanup URL object when component unmounts
  useEffect(() => {
    return () => {
      if (downloadUrl) {
        URL.revokeObjectURL(downloadUrl)
      }
    }
  }, [downloadUrl])

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    accept: validMimeTypes,
    onDrop: handleDrop,
    onDragEnter: () => setDragActive(true),
    onDragLeave: () => setDragActive(false),
    noClick: true,
    noKeyboard: true,
  })

  async function handleDrop(acceptedFiles) {
    setError("")
    setDragActive(false)

    // Validate files
    const invalidFiles = acceptedFiles.filter((file) => !validMimeTypes[file.type])
    if (invalidFiles.length > 0) {
      setError(`${invalidFiles.length} invalid file(s). Only PDF files are supported.`)
      return
    }

    // Add new files with preview info
    const newFiles = acceptedFiles.map((file) => ({
      file,
      name: file.name,
      size: formatFileSize(file.size),
      type: file.type,
      id: `${file.name}-${Date.now()}`,
    }))

    setFiles((prev) => [...prev, ...newFiles])

    // Reset merged PDF if files change
    if (mergedPdf) {
      setMergedPdf(null)
      setDownloadUrl("")
    }
  }

  const removeFile = (id) => {
    setFiles(files.filter((file) => file.id !== id))
    // Reset merged PDF if files change
    if (mergedPdf) {
      setMergedPdf(null)
      setDownloadUrl("")
    }
  }

  const moveFile = (dragIndex, hoverIndex) => {
    const draggedFile = files[dragIndex]
    const newFiles = [...files]
    newFiles.splice(dragIndex, 1)
    newFiles.splice(hoverIndex, 0, draggedFile)
    setFiles(newFiles)

    // Reset merged PDF if files change
    if (mergedPdf) {
      setMergedPdf(null)
      setDownloadUrl("")
    }
  }

  const mergePDFs = async () => {
    if (files.length === 0) {
      setError("Please add PDF files to merge")
      return
    }

    setLoading(true)
    setError("")

    try {
      // Load all PDF files
      const loadedPdfs = await Promise.all(
        files.map((fileObj) => {
          return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.onload = (event) =>
              resolve({
                data: event.target.result,
                name: fileObj.name,
              })
            reader.onerror = (error) => reject(new Error(`Failed to read ${fileObj.name}: ${error}`))
            reader.readAsArrayBuffer(fileObj.file)
          })
        }),
      )

      // Create new PDF document
      const mergedPdfDoc = await PDFDocument.create()

      // Add pages from each PDF
      for (const pdfData of loadedPdfs) {
        try {
          const pdf = await PDFDocument.load(pdfData.data)
          const copiedPages = await mergedPdfDoc.copyPages(pdf, pdf.getPageIndices())
          copiedPages.forEach((page) => {
            mergedPdfDoc.addPage(page)
          })
        } catch (err) {
          console.error(`Error processing ${pdfData.name}:`, err)
          setError(`Error processing ${pdfData.name}. File may be corrupted or password protected.`)
          setLoading(false)
          return
        }
      }

      // Generate the merged PDF
      const mergedPdfBytes = await mergedPdfDoc.save()
      setMergedPdf(mergedPdfBytes)

      // Create download URL
      const url = URL.createObjectURL(new Blob([mergedPdfBytes], { type: "application/pdf" }))
      setDownloadUrl(url)
    } catch (error) {
      console.error("Error merging PDFs:", error)
      setError("Failed to merge PDFs. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  // Format file size to readable format
  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const clearAll = () => {
    setFiles([])
    setMergedPdf(null)
    setDownloadUrl("")
    setError("")
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-700 mb-2">PDF Merger</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Combine multiple PDF files into a single document. Drag and drop your files, arrange them in the desired
            order, and merge them with a single click.
          </p>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
            <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 mr-2 flex-shrink-0" />
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Dropzone */}
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 mb-6 text-center transition-all duration-200 ${
            dragActive || isDragActive
              ? "bg-blue-50 border-blue-300"
              : "bg-white border-gray-300 hover:border-blue-400 hover:bg-blue-50"
          }`}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center">
            <Upload className="h-16 w-16 text-blue-600 mb-4" />
            <p className="text-lg font-medium text-gray-800 mb-1">
              {dragActive || isDragActive ? "Drop your PDF files here" : "Drag & drop PDF files to upload"}
            </p>
            <p className="text-gray-500 mb-4">Or</p>
            <button
              type="button"
              onClick={open}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Browse Files
            </button>
            <p className="text-xs text-gray-500 mt-4">Only PDF files are supported</p>
          </div>
        </div>

        {/* File list */}
        {files.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
            <div className="p-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">Selected Files ({files.length})</h3>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setFiles([...files].sort((a, b) => a.name.localeCompare(b.name)))}
                    className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors flex items-center text-sm"
                    title="Sort alphabetically"
                  >
                    <ArrowDownUp className="h-4 w-4 mr-1" />
                    <span className="hidden sm:inline">Sort</span>
                  </button>
                  <button
                    onClick={clearAll}
                    className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors flex items-center text-sm"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    <span className="hidden sm:inline">Clear All</span>
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-1">Drag files to reorder them</p>
            </div>

            <DndProvider backend={HTML5Backend}>
              <div className="max-h-80 overflow-y-auto">
                {files.map((file, index) => (
                  <DraggableFileItem
                    key={file.id}
                    file={file}
                    index={index}
                    moveFile={moveFile}
                    removeFile={removeFile}
                  />
                ))}
              </div>
            </DndProvider>

            <div className="p-4 border-t border-gray-200">
              <button
                onClick={open}
                className="w-full py-2 border border-blue-300 text-blue-600 rounded-md flex items-center justify-center hover:bg-blue-50 transition-colors"
              >
                <FilePlus className="h-4 w-4 mr-2" />
                Add More PDFs
              </button>
            </div>
          </div>
        )}

        {/* Action buttons */}
        {files.length > 0 && (
          <div className="flex flex-wrap gap-4 justify-center mb-8">
            <button
              onClick={mergePDFs}
              disabled={loading || files.length === 0}
              className={`px-6 py-3 rounded-lg font-medium text-white flex items-center ${
                loading || files.length === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? (
                <>
                  <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
                  Merging PDFs...
                </>
              ) : (
                <>
                  <FileText className="h-5 w-5 mr-2" />
                  Merge PDFs
                </>
              )}
            </button>
          </div>
        )}

        {/* Download section */}
        {downloadUrl && (
          <div className="mb-10 bg-white rounded-lg shadow-sm border border-green-200 overflow-hidden">
            <div className="bg-green-50 p-4 border-b border-green-200">
              <div className="flex items-center">
                <CheckCircle className="h-6 w-6 text-green-500 mr-3" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">PDF Successfully Merged!</h3>
                  <p className="text-sm text-gray-600">Your PDF is ready to download or preview.</p>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={downloadUrl}
                  download="merged.pdf"
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
                >
                  <Download className="h-5 w-5 mr-2" />
                  Download Merged PDF
                </a>
                <a
                  href={downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center"
                >
                  <ExternalLink className="h-5 w-5 mr-2" />
                  Preview PDF
                </a>
                <button
                  onClick={clearAll}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center sm:ml-auto"
                >
                  <RefreshCw className="h-5 w-5 mr-2" />
                  Start Over
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Instructions */}
        {!files.length && !downloadUrl && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-10">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">How to Merge PDF Files</h3>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="flex">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                  <span className="text-blue-600 font-semibold">1</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 mb-1">Upload Your PDFs</h4>
                  <p className="text-gray-600 text-sm">

      Drag and drop PDF files into the upload area, or click &quot;Browse Files&quot; to select them from your


                    device.
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                  <span className="text-blue-600 font-semibold">2</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 mb-1">Arrange Your Files</h4>
                  <p className="text-gray-600 text-sm">
                    Drag and drop the files to reorder them. The PDFs will be merged in the order they appear in the
                    list.
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                  <span className="text-blue-600 font-semibold">3</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 mb-1">Merge Your PDFs</h4>
                  <p className="text-gray-600 text-sm">

Click the &quot;Merge PDFs&quot; button to combine all your files into a single PDF document.

                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                  <span className="text-blue-600 font-semibold">4</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 mb-1">Download or Preview</h4>
                  <p className="text-gray-600 text-sm">
                    Once merged, you can download the combined PDF file or preview it in your browser.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
