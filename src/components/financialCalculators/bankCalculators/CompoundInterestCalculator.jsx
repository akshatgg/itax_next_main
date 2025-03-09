'use client';

import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { FaRupeeSign } from "react-icons/fa";
import { 
  FiDownload, 
  FiPrinter, 
  FiRefreshCw, 
  FiPercent, 
  FiCalendar,
  FiPieChart
} from 'react-icons/fi';

const customStyles = `
  .custom-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 20px;
    height: 20px;
    background: #3b82f6;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 2px 6px rgba(59, 130, 246, 0.4);
    transition: all 0.3s ease;
  }

  .custom-slider::-webkit-slider-thumb:hover {
    transform: scale(1.1);
    box-shadow: 0 3px 8px rgba(59, 130, 246, 0.5);
  }

  .custom-slider::-moz-range-thumb {
    width: 20px;
    height: 20px;
    background: #3b82f6;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 2px 6px rgba(59, 130, 246, 0.4);
  }

  .custom-slider::-webkit-slider-runnable-track {
    height: 6px;
    background: #bfdbfe;
    border-radius: 4px;
  }

  .custom-slider::-moz-range-track {
    height: 6px;
    background: #bfdbfe;
    border-radius: 4px;
  }
`;

const CompoundInterestCalculator = () => {
  const [principal, setPrincipal] = useState(1000);
  const [rate, setRate] = useState(6);
  const [time, setTime] = useState(1);
  const [totalAmount, setTotalAmount] = useState(0);
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    calculateInterest();
  }, [principal, rate, time]);

  const calculateInterest = () => {
    const r = rate / 100;
    const A = principal * Math.pow(1 + r, time);
    const totalInterest = A - principal;
    setTotalAmount(A);
    updateChart(principal, totalInterest);
  };

  const updateChart = (principal, totalInterest) => {
    const ctx = chartRef.current.getContext('2d');
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    chartInstance.current = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Principal amount', 'Total interest'],
        datasets: [
          {
            data: [principal, totalInterest],
            backgroundColor: ['#3b82f6', '#93c5fd'],
            borderColor: '#ffffff',
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top',
          },
        },
      },
    });
  };

  const handlePrint = () => {
    const printContent = document.querySelector('.print-content');
    if (!printContent) return;

    const originalContent = document.body.innerHTML;
    document.body.innerHTML = `
      <html>
        <head>
          <title>Print</title>
          <style>
            @media print {
              .print-content { width: 100%; }
              .chart-container { display: flex; flex-direction: column; }
              .chart-container canvas { width: 100% !important; height: auto; }
            }
          </style>
        </head>
        <body>
          ${printContent.innerHTML}
        </body>
      </html>
    `;
    window.print();
    document.body.innerHTML = originalContent;
  };

  const handleDownloadPDF = async () => {
    const element = document.querySelector('.print-content');
    if (!element) return;

    await new Promise((resolve) => setTimeout(resolve, 500));
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');

    const doc = new jsPDF('p', 'mm', 'a4');
    doc.addImage(imgData, 'PNG', 10, 10, 190, 0);
    doc.save('interest_calculator.pdf');
  };

  const handleClear = () => {
    setPrincipal(1000);
    setRate(6);
    setTime(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-3">
      <style>{customStyles}</style>
      <div className="max-w-5xl mx-auto px-4">
        <div className="bg-white shadow-2xl rounded-2xl p-6 print-content border border-blue-100">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-blue-900 flex items-center justify-center gap-3">
              <FaRupeeSign className="text-blue-600" />
              Compound Interest Calculator 
              <FiPercent className="text-blue-600" />
            </h1>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Input Section */}
            <div className="space-y-6">
              {/* Principal Input */}
              <div className="space-y-4">
                <label className="block text-gray-700 font-semibold text-sm">
                  <FaRupeeSign className="inline mr-2 text-blue-600" />
                  Principal Amount (₹)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={principal}
                    onChange={(e) => setPrincipal(parseFloat(e.target.value))}
                    className="w-full border-2 border-blue-100 rounded-lg p-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    min="1000"
                    max="1000000"
                  />
                  <input
                    type="range"
                    value={principal}
                    onChange={(e) => setPrincipal(parseFloat(e.target.value))}
                    className="custom-slider w-full mt-3"
                    min="1000"
                    max="1000000"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>₹1K</span>
                    <span>₹1M</span>
                  </div>
                </div>
              </div>

              {/* Rate Input */}
              <div className="space-y-4">
                <label className="block text-gray-700 font-semibold text-sm">
                  <FiPercent className="inline mr-2 text-blue-600" />
                  Annual Interest Rate (%)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={rate}
                    onChange={(e) => setRate(parseFloat(e.target.value))}
                    className="w-full border-2 border-blue-100 rounded-lg p-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    min="1"
                    max="30"
                  />
                  <input
                    type="range"
                    value={rate}
                    onChange={(e) => setRate(parseFloat(e.target.value))}
                    className="custom-slider w-full mt-3"
                    min="1"
                    max="30"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>1%</span>
                    <span>30%</span>
                  </div>
                </div>
              </div>

              {/* Time Input */}
              <div className="space-y-4">
                <label className="block text-gray-700 font-semibold text-sm">
                  <FiCalendar className="inline mr-2 text-blue-600" />
                  Time Period (Years)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={time}
                    onChange={(e) => setTime(parseFloat(e.target.value))}
                    className="w-full border-2 border-blue-100 rounded-lg p-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    min="1"
                    max="30"
                  />
                  <input
                    type="range"
                    value={time}
                    onChange={(e) => setTime(parseFloat(e.target.value))}
                    className="custom-slider w-full mt-3"
                    min="1"
                    max="30"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>1Y</span>
                    <span>30Y</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-3 gap-3 mt-4">
                <button
                  onClick={handlePrint}
                  className="py-2 px-3 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg font-medium
                           flex items-center justify-center gap-1.5 transition-all duration-300
                           hover:scale-[1.02] active:scale-95 border border-blue-200 text-sm"
                >
                  <FiPrinter className="text-base" />
                  <span className="hidden sm:inline">Print</span>
                </button>

                <button
                  onClick={handleDownloadPDF}
                  className="py-2 px-3 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg font-medium
                           flex items-center justify-center gap-1.5 transition-all duration-300
                           hover:scale-[1.02] active:scale-95 border border-green-200 text-sm"
                >
                  <FiDownload className="text-base" />
                  <span className="hidden sm:inline">PDF</span>
                </button>

                <button
                  onClick={handleClear}
                  className="py-2 px-3 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg font-medium
                           flex items-center justify-center gap-1.5 transition-all duration-300
                           hover:scale-[1.02] active:scale-95 border border-red-200 text-sm"
                >
                  <FiRefreshCw className="text-base" />
                  <span className="hidden sm:inline">Reset</span>
                </button>
              </div>
            </div>

            {/* Chart and Results Section */}
            <div className="flex flex-col">
              <div className="bg-white rounded-xl p-4 shadow-lg border border-blue-50 flex-1">
                <div className="chart-container" style={{ height: '250px' }}>
                  <canvas ref={chartRef}></canvas>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 shadow-md rounded-xl p-5 border border-blue-100">
                  <h2 className="text-lg font-bold text-blue-800 mb-3 flex items-center gap-2">
                    <FiPieChart className="text-blue-600" />
                    Calculation Results
                  </h2>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center bg-blue-50 rounded-lg p-3">
                      <span className="text-blue-700 font-medium">Principal:</span>
                      <span className="text-blue-900 font-bold font-mono">₹{principal.toFixed(0)}</span>
                    </div>
                    <div className="flex justify-between items-center bg-blue-50 rounded-lg p-3">
                      <span className="text-blue-700 font-medium">Total Interest:</span>
                      <span className="text-blue-900 font-bold font-mono">₹{(totalAmount - principal).toFixed(0)}</span>
                    </div>
                    <div className="flex justify-between items-center bg-blue-100 rounded-lg p-3">
                      <span className="text-blue-900 font-semibold">Total Amount:</span>
                      <span className="text-blue-900 font-bold font-mono">₹{totalAmount.toFixed(0)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompoundInterestCalculator;