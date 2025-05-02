import React from 'react';
import { FaRupeeSign } from 'react-icons/fa';

export default function IncomeTaxInput({ label, typeField, value, onChange }) {
  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <input
        type={typeField}
        value={value}
        onChange={onChange}
        className="w-full pl-10 pr-2 py-2   border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
      />
    </div>
  );
}
