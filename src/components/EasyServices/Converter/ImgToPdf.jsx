"use client"
import { useState, useRef, useCallback, useEffect } from "react"
import Image from "next/image"
import { jsPDF } from "jspdf"
import { useDropzone } from "react-dropzone"
import {
  Upload,
  Trash2,
  FileDown,
  Printer,
  X,
  AlertCircle,
  CheckCircle,
  RefreshCw,
  Plus,
  FileText,
  ArrowUpDown,
  ImageIcon,
  GripVertical,
  Settings,
  Maximize,
  Eye,
} from "lucide-react"
import { DndProvider, useDrag, useDrop } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"

// Valid file types for upload
const VALID_MIME_TYPES = {
  "image/jpeg": [".jpg", ".jpeg"],
  "image/png": [".png"],
  "image/webp": [".webp"],
  "image/heic": [".heic"],
  "image/heif": [".heif"],
}

// PDF quality options
const QUALITY_OPTIONS = [
  { value: "low", label: "Low (faster)", dpi: 72 },
  { value: "medium", label: "Medium", dpi: 150 },
  { value: "high", label: "High (larger file)", dpi: 300 },
]

// PDF page size options
const PAGE_SIZE_OPTIONS = [
  { value: "a4", label: "A4", width: 210, height: 297 },
  { value: "letter", label: "Letter", width: 215.9, height: 279.4 },
  { value: "legal", label: "Legal", width: 215.9, height: 355.6 },
]

// Draggable file item component
const DraggableFileItem = ({ file, index, moveFile, removeFile, onPreview }) => {
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
      className={`flex items-center p-3 ${
        index % 2 === 0 ? "bg-gray-50" : "bg-white"
      } border-b last:border-b-0 transition-opacity ${isDragging ? "opacity-50" : "opacity-100"}`}
    >
      <div className="mr-2 cursor-move text-gray-400 hover:text-gray-600 touch-none">
        <GripVertical className="h-5 w-5" />
      </div>
      <div className="flex-shrink-0 mr-3">
        <div className="w-12 h-12 bg-gray-100 rounded-md flex-shrink-0 overflow-hidden relative">
          <Image
            src={file.imageUrl || "/placeholder.svg"}
            alt={file.fileName}
            fill
            className="object-cover"
            sizes="48px"
          />
        </div>
      </div>
      <div className="flex-grow min-w-0">
        <p className="font-medium text-gray-800 truncate">{file.fileName}</p>
        <p className="text-xs text-gray-500">{file.size}</p>
      </div>
      <div className="flex items-center space-x-1">
        <button
          type="button"
          onClick={() => onPreview(file)}
          className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
          title="Preview image"
        >
          <Eye className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => removeFile(file.id)}
          className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
          title="Remove image"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

export default function ImgToPdf() {
  const [files, setFiles] = useState([])
  const [pdfUrl, setPdfUrl] = useState("")
  const [pdfGenerated, setPdfGenerated] = useState(false)
  const [pdfBlob, setPdfBlob] = useState(null)
  const [error, setError] = useState("")
  const [generating, setGenerating] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const [previewImage, setPreviewImage] = useState(null)
  const [settings, setSettings] = useState({
    quality: "medium",
    pageSize: "a4",
    includeFilenames: true,
    fitToPage: true,
  })
  const [showSettings, setShowSettings] = useState(false)

  const fileInputRef = useRef(null)

  // Cleanup URL objects when component unmounts or files change
  useEffect(() => {
    return () => {
      // Clean up object URLs to avoid memory leaks
      files.forEach((file) => {
        if (file.imageUrl) {
          URL.revokeObjectURL(file.imageUrl)
        }
      })
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl)
      }
    }
  }, [files, pdfUrl])

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    accept: VALID_MIME_TYPES,
    onDrop: handleDrop,
    onDragEnter: () => setDragActive(true),
    onDragLeave: () => setDragActive(false),
    noClick: true,
    noKeyboard: true,
    multiple: true,
  })

  async function handleDrop(acceptedFiles) {
    setError("")
    setDragActive(false)

    if (acceptedFiles.length === 0) {
      return
    }

    setUploading(true)

    try {
      // Process files in batches to avoid UI freezing
      const processedFiles = await Promise.all(
        acceptedFiles.map(async (file) => {
          // Validate file type
          if (!Object.keys(VALID_MIME_TYPES).some((type) => file.type.includes(type))) {
            throw new Error(`Unsupported file type: ${file.type}. Please upload only image files.`)
          }

          // Create object URL for preview
          const imageUrl = URL.createObjectURL(file)

          return {
            file,
            imageUrl,
            fileName: file.name,
            size: formatFileSize(file.size),
            id: `${file.name}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
          }
        }),
      )

      setFiles((prev) => [...prev, ...processedFiles])

      // Reset PDF if files change
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl)
        setPdfUrl("")
        setPdfBlob(null)
        setPdfGenerated(false)
      }
    } catch (error) {
      console.error("Error processing files:", error)
      setError(error.message || "Error processing files. Please try again.")
    } finally {
      setUploading(false)
      // Reset the file input to allow selecting the same file again
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  const removeFile = useCallback(
    (id) => {
      const fileToRemove = files.find((file) => file.id === id)
      if (fileToRemove && fileToRemove.imageUrl) {
        URL.revokeObjectURL(fileToRemove.imageUrl)
      }

      setFiles(files.filter((file) => file.id !== id))

      // Reset PDF if files change
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl)
        setPdfUrl("")
        setPdfBlob(null)
        setPdfGenerated(false)
      }
    },
    [files, pdfUrl],
  )

  const moveFile = useCallback(
    (dragIndex, hoverIndex) => {
      const draggedFile = files[dragIndex]
      const newFiles = [...files]
      newFiles.splice(dragIndex, 1)
      newFiles.splice(hoverIndex, 0, draggedFile)
      setFiles(newFiles)

      // Reset PDF if files change
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl)
        setPdfUrl("")
        setPdfBlob(null)
        setPdfGenerated(false)
      }
    },
    [files, pdfUrl],
  )

  const clearAll = useCallback(() => {
    // Clean up object URLs
    files.forEach((file) => {
      if (file.imageUrl) {
        URL.revokeObjectURL(file.imageUrl)
      }
    })
    if (pdfUrl) {
      URL.revokeObjectURL(pdfUrl)
    }

    setFiles([])
    setPdfUrl("")
    setPdfBlob(null)
    setPdfGenerated(false)
    setError("")
  }, [files, pdfUrl])

  const handlePreview = useCallback((file) => {
    setPreviewImage(file)
  }, [])

  // Client-side PDF generation using jsPDF
  const generatePDF = async () => {
    if (files.length === 0) {
      setError("Please upload at least one image to convert")
      return
    }

    setGenerating(true)
    setError("")

    try {
      // Get selected page size
      const pageSize = PAGE_SIZE_OPTIONS.find((option) => option.value === settings.pageSize)
      const quality = QUALITY_OPTIONS.find((option) => option.value === settings.quality)

      // Create a new PDF document
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: settings.pageSize,
      })

      // Process each image sequentially
      for (let i = 0; i < files.length; i++) {
        const fileObj = files[i]

        // Add a new page for each image after the first one
        if (i > 0) {
          doc.addPage()
        }

        try {
          // Create an image element to get dimensions
          const img = new Image()
          img.crossOrigin = "anonymous" // Prevent CORS issues

          // Wait for the image to load or fail
          await new Promise((resolve, reject) => {
            img.onload = resolve
            img.onerror = (error) => {
              console.error("Error loading image:", error)
              reject(new Error(`Failed to load image: ${fileObj.fileName}`))
            }
            // Set the source after attaching event handlers
            img.src = fileObj.imageUrl
          })

          // Calculate dimensions to fit on page with margins
          const pageWidth = pageSize.width
          const pageHeight = pageSize.height
          const margin = 10 // margin in mm
          const maxWidth = pageWidth - 2 * margin
          const maxHeight = pageHeight - 2 * margin - (settings.includeFilenames ? 10 : 0) // 10mm for filename if enabled

          // Calculate aspect ratio
          const aspectRatio = img.width / img.height
          let imgWidth, imgHeight

          if (settings.fitToPage) {
            // Fit to page while maintaining aspect ratio
            imgWidth = maxWidth
            imgHeight = imgWidth / aspectRatio

            // If height exceeds max height, adjust dimensions
            if (imgHeight > maxHeight) {
              imgHeight = maxHeight
              imgWidth = imgHeight * aspectRatio
            }
          } else {
            // Use original dimensions but scale down if needed
            const scale = Math.min(1, maxWidth / img.width, maxHeight / img.height)
            imgWidth = img.width * scale * 0.264583 // Convert px to mm (1px = 0.264583mm)
            imgHeight = img.height * scale * 0.264583
          }

          // Center the image horizontally
          const xOffset = margin + (maxWidth - imgWidth) / 2

          // Add filename at the top if enabled
          if (settings.includeFilenames) {
            doc.setFontSize(10)
            doc.setTextColor(100, 100, 100)
            doc.text(fileObj.fileName, margin, margin)
          }

          // Add image with selected quality
          doc.addImage(
            fileObj.imageUrl,
            "JPEG",
            xOffset,
            settings.includeFilenames ? margin + 5 : margin,
            imgWidth,
            imgHeight,
            undefined,
            "MEDIUM",
            quality.dpi,
          )
        } catch (imageError) {
          console.error(`Error processing image ${fileObj.fileName}:`, imageError)
          // Continue with next image instead of failing the entire process
          setError(`Warning: Failed to process image "${fileObj.fileName}". It will be skipped.`)
          // Skip to next iteration
          continue
        }
      }

      // Create blob from PDF
      const pdfBlob = doc.output("blob")
      const url = URL.createObjectURL(pdfBlob)

      setPdfUrl(url)
      setPdfBlob(pdfBlob)
      setPdfGenerated(true)
    } catch (error) {
      console.error("Error generating PDF:", error)
      setError("Failed to generate PDF. Please try again.")
    } finally {
      setGenerating(false)
    }
  }

  // Function to download the PDF
  const downloadPDF = () => {
    if (pdfUrl) {
      const link = document.createElement("a")
      link.href = pdfUrl
      link.download = "converted-images.pdf"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } else {
      setError("PDF not available for download. Please generate it first.")
    }
  }

  // Function to print the PDF
  const printPDF = () => {
    if (pdfUrl) {
      const printWindow = window.open(pdfUrl, "_blank")
      if (printWindow) {
        printWindow.addEventListener("load", () => {
          printWindow.print()
        })
      } else {
        setError("Please allow pop-ups to print the PDF.")
      }
    } else {
      setError("PDF not available for printing. Please generate it first.")
    }
  }

  // Function to format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  // Sort files by name
  const sortFilesByName = () => {
    setFiles([...files].sort((a, b) => a.fileName.localeCompare(b.fileName)))

    // Reset PDF if files change
    if (pdfUrl) {
      URL.revokeObjectURL(pdfUrl)
      setPdfUrl("")
      setPdfBlob(null)
      setPdfGenerated(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-700 mb-2">Image to PDF Converter</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Convert your images to PDF documents with ease. Upload multiple images and combine them into a single PDF
            file.
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
            <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 mr-2 flex-shrink-0" />
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Upload Box */}
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 mb-6 text-center transition-all duration-200 ${
            dragActive || isDragActive
              ? "bg-blue-50 border-blue-300"
              : "bg-white border-gray-300 hover:border-blue-400 hover:bg-blue-50"
          }`}
        >
          <input {...getInputProps()} />

          {uploading ? (
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 mb-4 relative">
                <div className="absolute inset-0 rounded-full border-4 border-blue-200"></div>
                <div className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></div>
              </div>
              <p className="text-blue-700 font-medium">Uploading images...</p>
              <p className="text-sm text-blue-500 mt-1">Please wait while we process your files</p>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <Upload className="h-16 w-16 text-blue-600 mb-4" />
              <p className="text-lg font-medium text-gray-800 mb-1">
                {dragActive || isDragActive ? "Drop your images here" : "Drag & drop images to upload"}
              </p>
              <p className="text-gray-500 mb-4">Or</p>
              <button
                type="button"
                onClick={() => open()}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Browse Images
              </button>
              <p className="mt-4 text-xs text-gray-500">
                Supported formats: {Object.values(VALID_MIME_TYPES).flat().join(", ")}
              </p>
            </div>
          )}
        </div>

        {/* Settings Panel */}
        {files.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                <Settings className="h-5 w-5 mr-2 text-gray-600" />
                PDF Settings
              </h2>
              <button
                type="button"
                onClick={() => setShowSettings(!showSettings)}
                className="text-gray-500 hover:text-blue-600 text-sm font-medium"
              >
                {showSettings ? "Hide" : "Show"} Settings
              </button>
            </div>

            {showSettings && (
              <div className="mt-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Page Size</label>
                    <select
                      value={settings.pageSize}
                      onChange={(e) => setSettings({ ...settings, pageSize: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-300 focus:outline-none"
                    >
                      {PAGE_SIZE_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label} ({option.width}mm × {option.height}mm)
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Image Quality</label>
                    <select
                      value={settings.quality}
                      onChange={(e) => setSettings({ ...settings, quality: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-300 focus:outline-none"
                    >
                      {QUALITY_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label} ({option.dpi} DPI)
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="includeFilenames"
                      checked={settings.includeFilenames}
                      onChange={(e) => setSettings({ ...settings, includeFilenames: e.target.checked })}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="includeFilenames" className="ml-2 block text-sm text-gray-700">
                      Include filenames in PDF
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="fitToPage"
                      checked={settings.fitToPage}
                      onChange={(e) => setSettings({ ...settings, fitToPage: e.target.checked })}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="fitToPage" className="ml-2 block text-sm text-gray-700">
                      Fit images to page
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* File List */}
        {files.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
            <div className="p-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">Selected Images ({files.length})</h3>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={sortFilesByName}
                    className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors flex items-center text-sm"
                    title="Sort alphabetically"
                  >
                    <ArrowUpDown className="h-4 w-4 mr-1" />
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
                    onPreview={handlePreview}
                  />
                ))}
              </div>
            </DndProvider>

            <div className="p-4 border-t border-gray-200">
              <button
                type="button"
                onClick={() => open()}
                className="w-full py-2 border border-blue-300 text-blue-600 rounded-md flex items-center justify-center hover:bg-blue-50 transition-colors"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add More Images
              </button>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          <button
            disabled={files.length === 0 || generating}
            className={`px-6 py-3 bg-blue-600 text-white rounded-lg flex items-center ${
              files.length === 0 || generating ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
            }`}
            onClick={generatePDF}
          >
            {generating ? (
              <>
                <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
                Generating PDF...
              </>
            ) : (
              <>
                <FileText className="h-5 w-5 mr-2" />
                Generate PDF
              </>
            )}
          </button>

          {files.length > 0 && !generating && (
            <button
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center"
              onClick={clearAll}
            >
              <RefreshCw className="h-5 w-5 mr-2" />
              Clear All
            </button>
          )}
        </div>

        {/* Image Preview Grid */}
        {files.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-10">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <ImageIcon className="h-5 w-5 mr-2 text-gray-600" />
              Image Preview
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {files.map((fileObj, i) => (
                <div key={fileObj.id} className="border rounded-lg overflow-hidden bg-gray-50">
                  <div className="aspect-w-16 aspect-h-12 relative h-48">
                    <Image
                      src={fileObj.imageUrl || "/placeholder.svg"}
                      alt={fileObj.fileName}
                      fill
                      className="object-contain"
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                    />
                    <button
                      onClick={() => handlePreview(fileObj)}
                      className="absolute bottom-2 right-2 p-1.5 bg-white bg-opacity-80 rounded-full hover:bg-opacity-100 transition-opacity"
                      title="Preview image"
                    >
                      <Maximize className="h-4 w-4 text-gray-700" />
                    </button>
                  </div>
                  <div className="p-3 border-t">
                    <p className="text-sm font-medium truncate">{fileObj.fileName}</p>
                    <p className="text-xs text-gray-500 mt-1">{fileObj.size}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Instructions when no files */}
        {files.length === 0 && !pdfGenerated && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-10">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">How to Convert Images to PDF</h3>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="flex">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                  <span className="text-blue-600 font-semibold">1</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 mb-1">Upload Your Images</h4>
                  <p className="text-gray-600 text-sm">

Drag and drop image files into the upload area, or click &quot;Browse Images&quot; to select them from your

                    device.
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                  <span className="text-blue-600 font-semibold">2</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 mb-1">Arrange Your Images</h4>
                  <p className="text-gray-600 text-sm">
                    Drag and drop the images to reorder them. The images will appear in the PDF in the order they are
                    listed.
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                  <span className="text-blue-600 font-semibold">3</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 mb-1">Adjust Settings</h4>
                  <p className="text-gray-600 text-sm">
                    Configure PDF settings like page size, image quality, and whether to include filenames in the
                    document.
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                  <span className="text-blue-600 font-semibold">4</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 mb-1">Generate and Download</h4>
                  <p className="text-gray-600 text-sm">

Click &quot;Generate PDF&quot; to create your document, then download or print the resulting PDF file.

                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Success Modal */}
      {pdfGenerated && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 animate-fade-in">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center">
                <div className="bg-green-100 p-2 rounded-full mr-3">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">PDF Generated Successfully!</h3>
              </div>
              <button
                onClick={() => setPdfGenerated(false)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="mb-6 text-gray-600">
              Your PDF has been created with {files.length} {files.length === 1 ? "image" : "images"} and is ready to
              download or print.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={downloadPDF}
                className="px-4 py-3 bg-blue-600 text-white rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors"
              >
                <FileDown className="h-5 w-5 mr-2" />
                <span>Download PDF</span>
              </button>

              <button
                onClick={printPDF}
                className="px-4 py-3 bg-gray-700 text-white rounded-lg flex items-center justify-center hover:bg-gray-800 transition-colors"
              >
                <Printer className="h-5 w-5 mr-2" />
                <span>Print PDF</span>
              </button>

              <button
                onClick={() => setPdfGenerated(false)}
                className="col-span-full px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Continue Editing
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Image Preview Modal */}
      {previewImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-semibold text-gray-800 truncate">{previewImage.fileName}</h3>
              <button
                onClick={() => setPreviewImage(null)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-auto p-4 flex items-center justify-center bg-gray-100">
              <div className="relative max-h-[70vh] max-w-full">
                <Image
                  src={previewImage.imageUrl || "/placeholder.svg"}
                  alt={previewImage.fileName}
                  fill
                  className="max-h-[70vh] max-w-full object-contain"
                  sizes="(max-width: 1024px) 90vw, 900px"
                  style={{ objectFit: "contain", position: "relative" }}
                  priority
                />
              </div>
            </div>
            <div className="p-4 border-t flex justify-between items-center">
              <div className="text-sm text-gray-500">{previewImage.size}</div>
              <button
                onClick={() => setPreviewImage(null)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
