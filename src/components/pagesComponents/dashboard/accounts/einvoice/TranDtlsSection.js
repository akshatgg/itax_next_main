'use client';

import { Icon } from '@iconify/react';

export default function TranDtlsSection({ formData, onChange }) {
  // Supply type options
  const supplyTypes = [
    { value: 'B2B', label: 'B2B - Business to Business' },
    { value: 'SEZWP', label: 'SEZWP - SEZ with payment' },
    { value: 'SEZWOP', label: 'SEZWOP - SEZ without payment' },
    { value: 'EXPWP', label: 'EXPWP - Export with Payment' },
    { value: 'EXPWOP', label: 'EXPWOP - Export without payment' },
    { value: 'DEXP', label: 'DEXP - Deemed Export' }
  ];

  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <h5 className="text-sm font-semibold text-gray-800 mb-3 flex items-center">
        <Icon icon="mdi:swap-horizontal" className="w-4 h-4 mr-2 text-blue-600" />
        Transaction Details (TranDtls)
      </h5>
      
      <div className="space-y-4">
        {/* Tax Scheme */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tax Scheme (TaxSch) <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.TaxSch}
                                onChange={(e) => onChange('TaxSch', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
            placeholder="GST"
            required
          />
          <p className="text-xs text-gray-500 mt-1">Tax scheme applicable</p>
        </div>

        {/* Supply Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Type of Supply (SupTyp) <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.SupTyp}
                                onChange={(e) => onChange('SupTyp', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
            required
          >
            {supplyTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
          <p className="text-xs text-gray-500 mt-1">Select the type of supply transaction</p>
        </div>

        {/* Reverse Charge */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Reverse Charge (RegRev)
          </label>
          <select
            value={formData.RegRev}
            onChange={(e) => onChange('RegRev', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
          >
            <option value="N">N - No</option>
            <option value="Y">Y - Yes</option>
          </select>
          <p className="text-xs text-gray-500 mt-1">Whether reverse charge is applicable</p>
        </div>

        {/* E-Commerce GSTIN */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            E-Commerce GSTIN (EcmGstin)
          </label>
          <input
            type="text"
            value={formData.EcmGstin}
            onChange={(e) => onChange('EcmGstin', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
            placeholder="Enter e-Commerce operator GSTIN (optional)"
            pattern="[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}"
          />
          <p className="text-xs text-gray-500 mt-1">GSTIN of e-Commerce operator (if applicable)</p>
        </div>

        {/* IGST on Intra-state */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            IGST on Intra-state (IgstOnIntra)
          </label>
          <select
            value={formData.IgstOnIntra}
            onChange={(e) => onChange('IgstOnIntra', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
          >
            <option value="N">N - No</option>
            <option value="Y">Y - Yes</option>
          </select>
          <p className="text-xs text-gray-500 mt-1">If IGST applicable on intra-state supply</p>
        </div>
      </div>
    </div>
  );
}

