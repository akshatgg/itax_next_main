"use client";
import React, { useState, useRef } from 'react';
import { Upload, Download, X, FileImage, File, AlertCircle, Edit3 } from 'lucide-react';

const JPGToPDFConverter = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isConverting, setIsConverting] = useState(false);
  const [error, setError] = useState('');
  const [customFilename, setCustomFilename] = useState('');
  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter(file => {
      const isValid = file.type.startsWith('image/');
      if (!isValid) {
        setError(`${file.name} is not a valid image file`);
      }
      return isValid;
    });
    
    if (validFiles.length > 0) {
      setError('');
      setSelectedFiles(prev => [...prev, ...validFiles.map(file => ({
        file,
        id: Math.random().toString(36).substr(2, 9),
        preview: URL.createObjectURL(file)
      }))]);
    }
  };

  const removeFile = (id) => {
    setSelectedFiles(prev => {
      const fileToRemove = prev.find(f => f.id === id);
      if (fileToRemove) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      return prev.filter(f => f.id !== id);
    });
  };

  const clearAllFiles = () => {
    selectedFiles.forEach(f => URL.revokeObjectURL(f.preview));
    setSelectedFiles([]);
    setCustomFilename('');
    setError('');
  };

  const loadImage = (file) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = URL.createObjectURL(file);
    });
  };

  const loadJsPDF = async () => {
    return new Promise((resolve, reject) => {
      if (window.jsPDF) {
        resolve(window.jsPDF);
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
      script.onload = () => {
        if (window.jspdf && window.jspdf.jsPDF) {
          resolve(window.jspdf.jsPDF);
        } else {
          reject(new Error('jsPDF failed to load'));
        }
      };
      script.onerror = () => reject(new Error('Failed to load jsPDF script'));
      document.head.appendChild(script);
    });
  };

  const convertToPDF = async () => {
    if (selectedFiles.length === 0) {
      setError('Please select at least one image file');
      return;
    }

    setIsConverting(true);
    setError('');

    try {
      // Load jsPDF library
      const jsPDF = await loadJsPDF();
      
      // Create new PDF document
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      // Get page dimensions
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 10; // 10mm margin
      const maxWidth = pageWidth - (2 * margin);
      const maxHeight = pageHeight - (2 * margin);

      for (let i = 0; i < selectedFiles.length; i++) {
        // Add new page for each image (except the first one)
        if (i > 0) {
          pdf.addPage();
        }

        try {
          const img = await loadImage(selectedFiles[i].file);
          
          // Create canvas to convert image to data URL
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
          
          const imgData = canvas.toDataURL('image/jpeg', 0.85);
          
          // Calculate dimensions to fit page while maintaining aspect ratio
          const imgWidth = img.width;
          const imgHeight = img.height;
          const imgRatio = imgWidth / imgHeight;
          
          let finalWidth, finalHeight;
          
          // Calculate size to fit within page margins
          if (imgRatio > (maxWidth / maxHeight)) {
            // Image is wider relative to page
            finalWidth = maxWidth;
            finalHeight = maxWidth / imgRatio;
          } else {
            // Image is taller relative to page
            finalHeight = maxHeight;
            finalWidth = maxHeight * imgRatio;
          }
          
          // Center the image on the page
          const x = (pageWidth - finalWidth) / 2;
          const y = (pageHeight - finalHeight) / 2;
          
          // Add image to PDF
          pdf.addImage(imgData, 'JPEG', x, y, finalWidth, finalHeight);
          
        } catch (imgError) {
          console.error(`Error processing image ${i + 1}:`, imgError);
          setError(`Failed to process image: ${selectedFiles[i].file.name}`);
          return;
        }
      }

      // Generate filename with custom name or timestamp
      let filename;
      if (customFilename.trim()) {
        // Clean the filename and ensure it has .pdf extension
        const cleanName = customFilename.trim().replace(/[^a-zA-Z0-9\-_\s]/g, '');
        filename = cleanName.endsWith('.pdf') ? cleanName : `${cleanName}.pdf`;
      } else {
        const timestamp = new Date().toISOString().slice(0, 19).replace(/[:.]/g, '-');
        filename = `images-to-pdf-${timestamp}.pdf`;
      }
      
      // Save the PDF
      pdf.save(filename);
      
      // Show success message
      setTimeout(() => {
        if (!error) {
          setError(''); // Clear any previous errors
        }
      }, 100);

    } catch (err) {
      console.error('PDF conversion error:', err);
      setError('Failed to convert images to PDF. Please check your internet connection and try again.');
    } finally {
      setIsConverting(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const validFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (validFiles.length > 0) {
      setError('');
      setSelectedFiles(prev => [...prev, ...validFiles.map(file => ({
        file,
        id: Math.random().toString(36).substr(2, 9),
        preview: URL.createObjectURL(file)
      }))]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">JPG to PDF Converter</h1>
        <p className="text-gray-600">Convert your images to PDF format quickly and easily</p>
      </div>

      {/* Upload Area */}
      <div 
        className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-6 hover:border-blue-400 transition-colors"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-700 mb-2">
          Drag and drop images here
        </h3>
        <p className="text-gray-500 mb-4">or</p>
        <button
          onClick={() => fileInputRef.current?.click()}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
        >
          Choose Files
        </button>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
        <p className="text-sm text-gray-400 mt-2">
          Supports JPG, PNG, GIF, BMP, and other image formats
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center">
          <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
          <span className="text-red-700">{error}</span>
        </div>
      )}

      {/* Selected Files */}
      {selectedFiles.length > 0 && (
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-700">
              Selected Images ({selectedFiles.length})
            </h3>
            <button
              onClick={clearAllFiles}
              className="text-red-500 hover:text-red-700 text-sm font-medium"
            >
              Clear All
            </button>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {selectedFiles.map((fileObj) => (
              <div key={fileObj.id} className="relative group">
                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={fileObj.preview}
                    alt={fileObj.file.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  onClick={() => removeFile(fileObj.id)}
                  className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="h-4 w-4" />
                </button>
                <p className="text-xs text-gray-500 mt-1 truncate" title={fileObj.file.name}>
                  {fileObj.file.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Custom Filename Input */}
      {selectedFiles.length > 0 && (
        <div className="mb-6">
          <label htmlFor="filename" className="flex items-center text-lg font-medium text-gray-700 mb-2">
            <Edit3 className="h-5 w-5 mr-2" />
            Custom Filename (Optional)
          </label>
          <div className="flex items-center space-x-2">
            <input
              id="filename"
              type="text"
              value={customFilename}
              onChange={(e) => setCustomFilename(e.target.value)}
              placeholder="Enter filename (without .pdf extension)"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              maxLength={100}
            />
            <span className="text-gray-500 font-medium">.pdf</span>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Leave empty to use automatic timestamp filename
          </p>
        </div>
      )}

      {/* Convert Button */}
      {selectedFiles.length > 0 && (
        <div className="text-center">
          <button
            onClick={convertToPDF}
            disabled={isConverting}
            className={`inline-flex items-center px-8 py-3 rounded-lg font-medium text-white transition-colors ${
              isConverting 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-green-500 hover:bg-green-600'
            }`}
          >
            {isConverting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Converting...
              </>
            ) : (
              <>
                <Download className="h-5 w-5 mr-2" />
                Convert to PDF
              </>
            )}
          </button>
        </div>
      )}

      {selectedFiles.length === 0 && !error && (
        <div className="text-center py-8">
          <FileImage className="mx-auto h-16 w-16 text-gray-300 mb-4" />
          <p className="text-gray-500">No images selected yet</p>
        </div>
      )}
    </div>
  );
};

export default JPGToPDFConverter;