'use client';

import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';

export default function ValDtlsSection({ formData, onChange }) {
  const [valueDetails, setValueDetails] = useState({
    AssVal: 0,      // Total Assessable value
    CgstVal: 0,     // Total CGST value
    SgstVal: 0,     // Total SGST value
    IgstVal: 0,     // Total IGST value
    CesVal: 0,      // Total Cess value
    StCesVal: 0,    // Total State Cess value
    Discount: 0,    // Total Discount
    OthChrg: 0,     // Other Charges
    RndOffAmt: 0,   // Rounded off amount
    TotInvVal: 0,   // Total Invoice value
    TotInvValFc: 0  // Total Invoice value in additional currency
  });

  const handleInputChange = (field, value) => {
    const numValue = parseFloat(value) || 0;
    const updatedValues = {
      ...valueDetails,
      [field]: numValue
    };

    // Recalculate total invoice value when manual changes are made
    if (field === 'RndOffAmt' || field === 'OthChrg') {
      const baseTotal = updatedValues.AssVal + updatedValues.CgstVal + updatedValues.SgstVal + 
                       updatedValues.IgstVal + updatedValues.CesVal + updatedValues.StCesVal;
      updatedValues.TotInvVal = baseTotal + updatedValues.OthChrg + updatedValues.RndOffAmt;
    }

    setValueDetails(updatedValues);
    onChange('ValDtls', updatedValues);
  };

  // Auto-calculate when itemList changes
  useEffect(() => {
    const calculateValues = () => {
      const itemList = formData.itemList || [];
      
      let totalAssVal = 0;
      let totalCgstVal = 0;
      let totalSgstVal = 0;
      let totalIgstVal = 0;
      let totalCesVal = 0;
      let totalStCesVal = 0;
      let totalDiscount = 0;
      let totalOthChrg = 0;

      itemList.forEach(item => {
        const qty = item.quantity || 1;
        const rate = item.rate || 0;
        const discount = item.discount || 0;
        const grossAmt = qty * rate;
        const discountAmt = (grossAmt * discount) / 100;
        const preTaxVal = grossAmt - discountAmt;
        
        // Calculate GST amounts
        const gstRate = parseFloat(item.igst) || 0;
        const cgstRate = parseFloat(item.cgst) || 0;
        const sgstRate = parseFloat(item.sgst) || 0;
        
        const igstAmt = (preTaxVal * gstRate) / 100;
        const cgstAmt = (preTaxVal * cgstRate) / 100;
        const sgstAmt = (preTaxVal * sgstRate) / 100;
        
        const cesAmt = item.cesAmt || 0;
        const stateCesAmt = item.stateCesAmt || 0;
        const othChrg = item.othChrg || 0;

        // Accumulate totals
        totalAssVal += preTaxVal;
        totalCgstVal += cgstAmt;
        totalSgstVal += sgstAmt;
        totalIgstVal += igstAmt;
        totalCesVal += cesAmt;
        totalStCesVal += stateCesAmt;
        totalDiscount += discountAmt;
        totalOthChrg += othChrg;
      });

      // Calculate total invoice value
      const totalBeforeRounding = totalAssVal + totalCgstVal + totalSgstVal + totalIgstVal + totalCesVal + totalStCesVal + totalOthChrg;
      const roundedTotal = Math.round(totalBeforeRounding);
      const roundOffAmt = roundedTotal - totalBeforeRounding;

      return {
        AssVal: parseFloat(totalAssVal.toFixed(2)),
        CgstVal: parseFloat(totalCgstVal.toFixed(2)),
        SgstVal: parseFloat(totalSgstVal.toFixed(2)),
        IgstVal: parseFloat(totalIgstVal.toFixed(2)),
        CesVal: parseFloat(totalCesVal.toFixed(2)),
        StCesVal: parseFloat(totalStCesVal.toFixed(2)),
        Discount: parseFloat(totalDiscount.toFixed(2)),
        OthChrg: parseFloat(totalOthChrg.toFixed(2)),
        RndOffAmt: parseFloat(roundOffAmt.toFixed(2)),
        TotInvVal: parseFloat(roundedTotal.toFixed(2)),
        TotInvValFc: 0 // Additional currency not implemented yet
      };
    };

    const calculatedValues = calculateValues();
    setValueDetails(calculatedValues);
    onChange('ValDtls', calculatedValues);
  }, [formData.itemList, onChange]);

  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <h5 className="text-sm font-semibold text-gray-800 mb-3 flex items-center">
        <Icon icon="mdi:calculator" className="w-4 h-4 mr-2 text-blue-600" />
        Value Details (ValDtls)
      </h5>
      
      <div className="space-y-4">
        {/* Auto-calculated Values (Read-only) */}
        <div className="bg-blue-50 rounded-lg p-3">
          <h6 className="text-xs font-medium text-gray-700 mb-3">Auto-calculated Values</h6>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs text-gray-600 mb-1">Total Assessable Value (AssVal) *</label>
              <input
                type="number"
                step="0.01"
                value={valueDetails.AssVal}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Total CGST Value (CgstVal)</label>
              <input
                type="number"
                step="0.01"
                value={valueDetails.CgstVal}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Total SGST Value (SgstVal)</label>
              <input
                type="number"
                step="0.01"
                value={valueDetails.SgstVal}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Total IGST Value (IgstVal)</label>
              <input
                type="number"
                step="0.01"
                value={valueDetails.IgstVal}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Total Cess Value (CesVal)</label>
              <input
                type="number"
                step="0.01"
                value={valueDetails.CesVal}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Total State Cess Value (StCesVal)</label>
              <input
                type="number"
                step="0.01"
                value={valueDetails.StCesVal}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Total Discount</label>
              <input
                type="number"
                step="0.01"
                value={valueDetails.Discount}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Manual Adjustable Values */}
        <div className="bg-yellow-50 rounded-lg p-3">
          <h6 className="text-xs font-medium text-gray-700 mb-3">Manual Adjustments</h6>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs text-gray-600 mb-1">Other Charges (OthChrg)</label>
              <input
                type="number"
                step="0.01"
                value={valueDetails.OthChrg}
                onChange={(e) => handleInputChange('OthChrg', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                placeholder="Enter other charges"
              />
              <p className="text-xs text-gray-500 mt-1">Additional charges not included in items</p>
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Round Off Amount (RndOffAmt)</label>
              <input
                type="number"
                step="0.01"
                value={valueDetails.RndOffAmt}
                onChange={(e) => handleInputChange('RndOffAmt', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                placeholder="Auto-calculated"
              />
              <p className="text-xs text-gray-500 mt-1">Round off adjustment</p>
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Total Invoice Value FC (TotInvValFc)</label>
              <input
                type="number"
                step="0.01"
                value={valueDetails.TotInvValFc}
                onChange={(e) => handleInputChange('TotInvValFc', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                placeholder="Foreign currency value (optional)"
              />
              <p className="text-xs text-gray-500 mt-1">Total value in additional currency</p>
            </div>
          </div>
        </div>

        {/* Final Total */}
        <div className="bg-blue-600 text-white rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <h6 className="text-sm font-medium">Total Invoice Value (TotInvVal) *</h6>
              <p className="text-xs opacity-90">Final amount to be paid</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">₹{valueDetails.TotInvVal.toFixed(2)}</div>
              <input
                type="hidden"
                value={valueDetails.TotInvVal}
                onChange={(e) => handleInputChange('TotInvVal', e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Summary Breakdown */}
        <div className="bg-gray-50 rounded-lg p-3">
          <h6 className="text-xs font-medium text-gray-700 mb-2">Invoice Summary</h6>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between">
              <span>Assessable Value:</span>
              <span>₹{valueDetails.AssVal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Total GST (CGST + SGST + IGST):</span>
              <span>₹{(valueDetails.CgstVal + valueDetails.SgstVal + valueDetails.IgstVal).toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Total Cess:</span>
              <span>₹{(valueDetails.CesVal + valueDetails.StCesVal).toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Other Charges:</span>
              <span>₹{valueDetails.OthChrg.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Round Off:</span>
              <span>₹{valueDetails.RndOffAmt.toFixed(2)}</span>
            </div>
            <hr className="my-1" />
            <div className="flex justify-between font-medium">
              <span>Total Invoice Value:</span>
              <span>₹{valueDetails.TotInvVal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
