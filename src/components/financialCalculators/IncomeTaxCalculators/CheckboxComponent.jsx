// CheckboxComponent.js
import React from 'react';
import { FaCity } from 'react-icons/fa';

export default function CheckboxComponent({ label, checked, onChange }) {
  return (
    <div className="pt-6">
    <label
      className="flex items-center gap-4 p-3 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all cursor-pointer"
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-5 w-5 text-purple-600 accent-purple-600 focus:ring-2 focus:ring-purple-400 rounded-md transition"
      />
      <span className="flex items-center text-gray-800 font-medium text-sm md:text-base">
        <FaCity className="text-purple-600 mr-2" />
        {label}
      </span>
    </label>
  </div>
  );
}
