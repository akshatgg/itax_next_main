'use client';

import { Icon } from '@iconify/react';

export default function DocDtlsSection({ formData, onChange }) {
  // Document type options
  const documentTypes = [
    { value: 'INV', label: 'Invoice' },
    { value: 'CRN', label: 'Credit Note' },
    { value: 'DBN', label: 'Debit Note' }
  ];

  const generateDocumentNumber = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const time = String(now.getTime()).slice(-4);
    
    const docNo = `${formData.Typ}-${year}${month}${day}-${time}`;
    onChange('No', docNo);
  };

  const setTodayDate = () => {
    const today = new Date().toISOString().split('T')[0];
    onChange('Dt', today);
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <h5 className="text-sm font-semibold text-gray-800 mb-3 flex items-center">
        <Icon icon="mdi:file-document" className="w-4 h-4 mr-2 text-green-600" />
        Document Details (DocDtls)
      </h5>
      
      <div className="space-y-4">
        {/* Document Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Document Type (Typ) <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.Typ}
            onChange={(e) => onChange('Typ', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors"
            required
          >
            {documentTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.value} - {type.label}
              </option>
            ))}
          </select>
          <p className="text-xs text-gray-500 mt-1">
            INV = Invoice, CRN = Credit Note, DBN = Debit Note
          </p>
        </div>

        {/* Document Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Document Number (No) <span className="text-red-500">*</span>
          </label>
          <div className="flex space-x-2">
            <input
              type="text"
              value={formData.No}
              onChange={(e) => onChange('No', e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors"
              placeholder="Enter document number"
              required
            />
            <button
              type="button"
              onClick={generateDocumentNumber}
              className="px-3 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-1"
              title="Generate document number"
            >
              <Icon icon="mdi:auto-fix" className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Unique document identifier for this invoice
          </p>
        </div>

        {/* Document Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Document Date (Dt) <span className="text-red-500">*</span>
          </label>
          <div className="flex space-x-2">
            <input
              type="date"
              value={formData.Dt}
              onChange={(e) => onChange('Dt', e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors"
              required
            />
            <button
              type="button"
              onClick={setTodayDate}
              className="px-3 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-1"
              title="Set today's date"
            >
              <Icon icon="mdi:calendar-today" className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Date will be formatted as DD/MM/YYYY for E-Invoice
          </p>
        </div>
      </div>
    </div>
  );
}


