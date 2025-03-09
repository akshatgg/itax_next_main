'use client';

import React, { useState } from 'react';

const sharedInputClasses = 'w-full p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-purple-500 transition-all';
const sharedLabelClasses = 'block text-gray-600 font-semibold mb-2';
const sharedContainerClasses = 'mb-6';

const GSTCalculator = () => {
  const [gstType, setGstType] = useState('include');
  const [amount, setAmount] = useState('');
  const [gstRate, setGstRate] = useState('5');
  const [customGstRate, setCustomGstRate] = useState('');
  const [gstAmount, setGstAmount] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [isCustomGstRate, setIsCustomGstRate] = useState(false);

  const calculateGst = () => {
    const amountValue = parseFloat(amount) || 0;
    const gstRateValue = isCustomGstRate
      ? parseFloat(customGstRate) || 0
      : parseFloat(gstRate) || 0;
    let gstAmountValue = 0;
    let totalAmountValue = 0;

    if (gstType === 'include') {
      gstAmountValue = (amountValue * gstRateValue) / (100 + gstRateValue);
      totalAmountValue = amountValue - gstAmountValue;
    } else {
      gstAmountValue = (amountValue * gstRateValue) / 100;
      totalAmountValue = amountValue + gstAmountValue;
    }

    setGstAmount(gstAmountValue.toFixed(2));
    setTotalAmount(totalAmountValue.toFixed(2));
  };

  const handleGstRateChange = (e) => {
    if (e.target.value === 'custom') {
      setIsCustomGstRate(true);
      setGstRate(''); // Reset the gstRate value when switching to custom
    } else {
      setGstRate(e.target.value);
      setIsCustomGstRate(false);
      setCustomGstRate(''); // Reset the customGstRate value when switching back to predefined rates
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 md:p-10">
      <div className="bg-white shadow-2xl rounded-2xl p-6 md:p-8 w-full max-w-lg transform hover:scale-[1.005] transition-transform duration-300 hover:shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-600 bg-clip-text text-transparent mb-2">
            GST Calculator
          </h1>
          <p className="text-gray-500 font-medium">Smart Tax Calculation Made Simple</p>
        </div>

        <div className="space-y-6">
          <div className={sharedContainerClasses}>
            <label htmlFor="gst-type" className={sharedLabelClasses}>
              GST Type
            </label>
            <div className="relative">
              <select
                id="gst-type"
                className={`${sharedInputClasses} cursor-pointer pr-10 bg-white`}
                value={gstType}
                onChange={(e) => setGstType(e.target.value)}
              >
                <option value="include">Including GST</option>
                <option value="exclude">Excluding GST</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <div className={sharedContainerClasses}>
            <label htmlFor="amount" className={sharedLabelClasses}>
              Amount (₹)
            </label>
            <div className="relative">
              <input
                type="number"
                id="amount"
                className={`${sharedInputClasses} pl-10`}
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
            </div>
          </div>

          <div className={sharedContainerClasses}>
            <label htmlFor="gst-rate" className={sharedLabelClasses}>
              GST Rate
            </label>
            {!isCustomGstRate ? (
              <div className="relative">
                <select
                  id="gst-rate"
                  className={`${sharedInputClasses} cursor-pointer pr-10 bg-white`}
                  value={gstRate}
                  onChange={handleGstRateChange}
                >
                  <option value="0">0% (NILL)</option>
                  <option value="5">5%</option>
                  <option value="12">12%</option>
                  <option value="18">18%</option>
                  <option value="28">28%</option>
                  <option value="custom">Custom Rate</option>
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            ) : (
              <div className="relative">
                <input
                  type="number"
                  id="custom-gst-rate"
                  className={`${sharedInputClasses} pl-12`}
                  placeholder="Enter custom GST rate"
                  value={customGstRate}
                  onChange={(e) => setCustomGstRate(e.target.value)}
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                </svg>
              </span>
            </div>
          )}
        </div>

        <div className="bg-blue-50 p-6 rounded-xl space-y-4 border-2 border-blue-100">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 text-gray-600">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="font-medium">GST Amount:</span>
            </div>
            <span className="text-blue-600 font-bold text-xl">
              ₹{gstAmount || '0.00'}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 text-gray-600">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              <span className="font-medium">Total Amount:</span>
            </div>
            <span className="text-green-600 font-bold text-xl">
              ₹{totalAmount || '0.00'}
            </span>
          </div>
        </div>

        <button
          onClick={calculateGst}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-600 hover:from-blue-700 hover:to-blue-700 text-white py-4 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
          Calculate GST
        </button>
      </div>
    </div>
  </div>
);
};

export default GSTCalculator;