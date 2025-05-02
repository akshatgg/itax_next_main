import React from 'react';
import { FaCalculator, FaFileDownload, FaUndo } from 'react-icons/fa';
import IncomeTaxInput from './IncomeTaxInput';
import CheckboxComponent from './CheckboxComponent';

export default function IncomeTaxComponents({
  title,
  des = '',
  inputs = [],
  isMetro,
  setIsMetro,
  result,
  calculateHRA,
  handleDownload,
  clearFields,
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-purple-100 flex items-center justify-center p-6">
    <div className="bg-white w-full max-w-4xl rounded-3xl shadow-xl p-10 transition-all duration-300 hover:shadow-2xl">

      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-2 flex items-center justify-center gap-3">
          <FaCalculator className="text-purple-600 text-5xl" />
          {title}
        </h1>
        <p className="text-gray-500 text-base">{des}</p>
      </div>

      {/* Inputs in Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {inputs.map((input, index) => (
          <IncomeTaxInput
            key={index}
            label={input.label}
            typeField="number"
            value={input.value}
            onChange={input.onChange}
          />
        ))}
           <CheckboxComponent
          label="Living in Metro City"
          checked={isMetro}
          onChange={(e) => setIsMetro(e.target.checked)}
        />
      </div>

      {/* Checkbox */}
      <div className="mb-6">
     
      </div>

      {/* Result Box */}
      {result !== null && (
        <div className="bg-black text-white rounded-2xl p-6 mb-8 shadow-lg">
          <div className="text-center">
            <p className="text-xs uppercase tracking-wider mb-1 opacity-80">Tax Exempt HRA</p>
            <p className="text-4xl font-bold tracking-tight">₹{result}</p>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
        <button
          onClick={calculateHRA}
          type="button"
          className="p-4 bg-black hover:bg-gray-800 text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-all"
        >
          <FaCalculator className="text-xl" />
          Calculate
        </button>

        <button
          onClick={handleDownload}
          type="button"
          className="p-4 bg-black hover:bg-gray-800 text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-all"
        >
          <FaFileDownload className="text-lg" />
          Download PDF
        </button>

        <button
          onClick={clearFields}
          type="button"
          className="p-4 bg-black hover:bg-gray-800 text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-all"
        >
          <FaUndo className="text-lg" />
          Reset
        </button>
      </div>
    </div>
  </div>
  );
}
