"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { TAX_TYPES_BY_STATES } from '../staticData';
import ReactTable from '@/components/ui/ReactTable';
import { formClassNames } from '../CreateInvoice';
import { formatINRCurrency } from '@/utils/utilityFunctions';

const baseTableHeaders = [
  {
    text: 'Rate %',
    dataField: 'rate',
    formatter: (data) => {
      return (
        <div className="flex justify-center items-center font-medium">
          <span>{data}</span>
        </div>
      );
    },
  },
  {
    text: 'Taxable Value (₹)',
    dataField: 'value',
    formatter: (data) => {
      return (
        <div className="flex justify-center items-center">
          {data}
        </div>
      );
    },
  },
];

const intraTableHeaders = [
  {
    text: 'Central Tax (₹)',
    dataField: 'cgst',
    formatter: (data) => {
      return (
        <div className="flex justify-center items-center font-medium text-green-600">
          <span>{data}</span>
        </div>
      );
    },
  },
  {
    text: 'State/UT Tax (₹)',
    dataField: 'sgst',
    formatter: (data) => {
      return (
        <div className="flex justify-center items-center font-medium text-blue-600">
          <span>{data}</span>
        </div>
      );
    },
  },
  {
    text: 'CESS (₹)',
    dataField: 'cess',
    formatter: (data) => {
      return (
        <div className="flex justify-center items-center font-medium text-purple-600">
          <span>{data}</span>
        </div>
      );
    },
  },
];

const utTableHeaders = [
  intraTableHeaders.at(0),
  {
    text: 'UT Tax (₹)',
    dataField: 'utgst',
    formatter: (data) => {
      return (
        <div className="flex justify-center items-center font-medium text-orange-600">
          <span>{data}</span>
        </div>
      );
    },
  },
  {
    text: 'CESS (₹)',
    dataField: 'cess',
    formatter: (data) => {
      return (
        <div className="flex justify-center items-center font-medium text-purple-600">
          <span>{data}</span>
        </div>
      );
    },
  },
];

const interTableHeaders = [
  {
    text: 'Integrated Tax (₹)',
    dataField: 'igst',
    formatter: (data) => {
      return (
        <div className="flex justify-center items-center font-medium text-indigo-600">
          <span>{data}</span>
        </div>
      );
    },
  },
  {
    text: 'CESS (₹)',
    dataField: 'cess',
    formatter: (data) => {
      return (
        <div className="flex justify-center items-center font-medium text-purple-600">
          <span>{data}</span>
        </div>
      );
    },
  },
];

const tableHeaders = {
  [TAX_TYPES_BY_STATES.intra]: baseTableHeaders.concat(intraTableHeaders),
  [TAX_TYPES_BY_STATES.inter]: baseTableHeaders.concat(interTableHeaders),
  [TAX_TYPES_BY_STATES.ut]: baseTableHeaders.concat(utTableHeaders),
};

const TaxTable = ({ taxType, onTaxCalculation }) => {
  const [tax, setTax] = useState({});
  const [errors, setErrors] = useState({});
  const [totalTaxableValue, setTotalTaxableValue] = useState(0);
  const [totalTaxAmount, setTotalTaxAmount] = useState(0);

  // Validate input value
  const validateInput = (value) => {
    if (value === '') return true;
    const numValue = parseFloat(value);
    return !isNaN(numValue) && numValue >= 0;
  };

  // Format number with proper decimal places
  const formatNumber = (num) => {
    return parseFloat(num).toFixed(2);
  };

  const handleTaxValueChange = useCallback((e) => {
    const { name, value } = e.target;
    
    // Remove any non-numeric characters except decimal point
    const cleanValue = value.replace(/[^0-9.]/g, '');
    
    // Validate the input
    if (!validateInput(cleanValue)) {
      setErrors(prev => ({
        ...prev,
        [name]: 'Please enter a valid positive number'
      }));
      return;
    }

    // Clear error for this field
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[name];
      return newErrors;
    });

    // Update tax state
    setTax((prevTax) => ({
      ...prevTax,
      [name]: cleanValue,
    }));
  }, []);

  const getTax = useCallback((taxName, rate) => {
    const allowedTaxes = {
      [TAX_TYPES_BY_STATES.intra]: ['cgst', 'sgst'],
      [TAX_TYPES_BY_STATES.inter]: ['igst'],
      [TAX_TYPES_BY_STATES.ut]: ['cgst', 'utgst'],
    };

    // If no rate is specified, it sends the total gst tax
    if (taxType && allowedTaxes[taxType].includes(taxName) && !rate) {
      let totalTax = 0;
      Object.entries(tax).forEach(([key, value]) => {
        if (key && value) {
          const parsedKey = parseFloat(key);
          const parseVal = parseFloat(value);
          if (!isNaN(parsedKey) && !isNaN(parseVal)) {
            totalTax += (parseVal * parsedKey) / 100;
          }
        }
      });
      return totalTax;
    }

    if (taxType && tax[rate] && allowedTaxes[taxType].includes(taxName)) {
      const taxValue = parseFloat(tax[rate]);
      const taxRate = parseFloat(rate);
      if (!isNaN(taxValue) && !isNaN(taxRate)) {
        return (taxValue * taxRate) / 100;
      }
    }

    return 0;
  }, [tax, taxType]);

  // Calculate totals whenever tax changes
  useEffect(() => {
    const taxableValue = Object.values(tax).reduce(
      (total, val) => parseFloat(val || 0) + total,
      0
    );
    
    const taxAmount = getTax('cgst') + getTax('sgst') + getTax('igst') + getTax('utgst');
    
    setTotalTaxableValue(taxableValue);
    setTotalTaxAmount(taxAmount);

    // Send calculation to parent component
    if (onTaxCalculation) {
      onTaxCalculation({
        totalTaxableValue: taxableValue,
        totalTaxAmount: taxAmount,
        totalInvoiceValue: taxableValue + taxAmount,
        cgst: getTax('cgst'),
        sgst: getTax('sgst'),
        igst: getTax('igst'),
        utgst: getTax('utgst'),
        taxBreakdown: tax
      });
    }
  }, [tax, getTax, onTaxCalculation]);

  const createInputField = (rate) => (
    <div className="relative">
      <input
        type="text"
        name={rate}
        className={`${formClassNames.input} ${errors[rate] ? 'border-red-500 focus:border-red-500' : ''} text-right`}
        onChange={handleTaxValueChange}
        value={tax[rate] || ''}
        placeholder="0.00"
        autoComplete="off"
      />
      {errors[rate] && (
        <div className="absolute -bottom-5 left-0 text-xs text-red-500">
          {errors[rate]}
        </div>
      )}
    </div>
  );

  const tableData = [
    {
      rate: '0%',
      value: createInputField('0'),
      cgst: formatNumber(getTax('cgst', '0')),
      sgst: formatNumber(getTax('sgst', '0')),
      igst: formatNumber(getTax('igst', '0')),
      utgst: formatNumber(getTax('utgst', '0')),
      cess: '0.00',
    },
    {
      rate: '1%',
      value: createInputField('1'),
      cgst: formatNumber(getTax('cgst', '1')),
      sgst: formatNumber(getTax('sgst', '1')),
      igst: formatNumber(getTax('igst', '1')),
      utgst: formatNumber(getTax('utgst', '1')),
      cess: '0.00',
    },
    {
      rate: '1.5%',
      value: createInputField('1.5'),
      cgst: formatNumber(getTax('cgst', '1.5')),
      sgst: formatNumber(getTax('sgst', '1.5')),
      igst: formatNumber(getTax('igst', '1.5')),
      utgst: formatNumber(getTax('utgst', '1.5')),
      cess: '0.00',
    },
    {
      rate: '3%',
      value: createInputField('3'),
      cgst: formatNumber(getTax('cgst', '3')),
      sgst: formatNumber(getTax('sgst', '3')),
      igst: formatNumber(getTax('igst', '3')),
      utgst: formatNumber(getTax('utgst', '3')),
      cess: '0.00',
    },
    {
      rate: '5%',
      value: createInputField('5'),
      cgst: formatNumber(getTax('cgst', '5')),
      sgst: formatNumber(getTax('sgst', '5')),
      igst: formatNumber(getTax('igst', '5')),
      utgst: formatNumber(getTax('utgst', '5')),
      cess: '0.00',
    },
    {
      rate: '6%',
      value: createInputField('6'),
      cgst: formatNumber(getTax('cgst', '6')),
      sgst: formatNumber(getTax('sgst', '6')),
      igst: formatNumber(getTax('igst', '6')),
      utgst: formatNumber(getTax('utgst', '6')),
      cess: '0.00',
    },
    {
      rate: '7.5%',
      value: createInputField('7.5'),
      cgst: formatNumber(getTax('cgst', '7.5')),
      sgst: formatNumber(getTax('sgst', '7.5')),
      igst: formatNumber(getTax('igst', '7.5')),
      utgst: formatNumber(getTax('utgst', '7.5')),
      cess: '0.00',
    },
    {
      rate: '12%',
      value: createInputField('12'),
      cgst: formatNumber(getTax('cgst', '12')),
      sgst: formatNumber(getTax('sgst', '12')),
      igst: formatNumber(getTax('igst', '12')),
      utgst: formatNumber(getTax('utgst', '12')),
      cess: '0.00',
    },
    {
      rate: '18%',
      value: createInputField('18'),
      cgst: formatNumber(getTax('cgst', '18')),
      sgst: formatNumber(getTax('sgst', '18')),
      igst: formatNumber(getTax('igst', '18')),
      utgst: formatNumber(getTax('utgst', '18')),
      cess: '0.00',
    },
    {
      rate: '28%',
      value: createInputField('28'),
      cgst: formatNumber(getTax('cgst', '28')),
      sgst: formatNumber(getTax('sgst', '28')),
      igst: formatNumber(getTax('igst', '28')),
      utgst: formatNumber(getTax('utgst', '28')),
      cess: '0.00',
    },
    {
      rate: (
        <div className="font-bold text-lg bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
          <span>Total</span>
        </div>
      ),
      value: (
        <div className="flex justify-center w-full">
          <span className="font-bold text-lg bg-blue-100 dark:bg-blue-900 px-3 py-1 rounded text-blue-800 dark:text-blue-200">
            {formatINRCurrency(totalTaxableValue)}
          </span>
        </div>
      ),
      cgst: (
        <div className="font-bold text-lg bg-green-100 dark:bg-green-900 px-2 py-1 rounded text-green-800 dark:text-green-200">
          {formatINRCurrency(getTax('cgst'))}
        </div>
      ),
      sgst: (
        <div className="font-bold text-lg bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded text-blue-800 dark:text-blue-200">
          {formatINRCurrency(getTax('sgst'))}
        </div>
      ),
      igst: (
        <div className="font-bold text-lg bg-indigo-100 dark:bg-indigo-900 px-2 py-1 rounded text-indigo-800 dark:text-indigo-200">
          {formatINRCurrency(getTax('igst'))}
        </div>
      ),
      utgst: (
        <div className="font-bold text-lg bg-orange-100 dark:bg-orange-900 px-2 py-1 rounded text-orange-800 dark:text-orange-200">
          {formatINRCurrency(getTax('utgst'))}
        </div>
      ),
      cess: (
        <div className="font-bold text-lg bg-purple-100 dark:bg-purple-900 px-2 py-1 rounded text-purple-800 dark:text-purple-200">
          {formatINRCurrency(0)}
        </div>
      ),
    },
  ];

  return (
    <div className="my-6 space-y-4">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Tax Calculation Table - {taxType?.toUpperCase()} State
          </h3>
          <div className="flex space-x-4 text-sm">
            <div className="bg-white dark:bg-gray-800 px-3 py-1 rounded-full border">
              <span className="text-gray-600 dark:text-gray-300">Total Taxable: </span>
              <span className="font-bold text-blue-600 dark:text-blue-400">
                {formatINRCurrency(totalTaxableValue)}
              </span>
            </div>
            <div className="bg-white dark:bg-gray-800 px-3 py-1 rounded-full border">
              <span className="text-gray-600 dark:text-gray-300">Total Tax: </span>
              <span className="font-bold text-green-600 dark:text-green-400">
                {formatINRCurrency(totalTaxAmount)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3">
        <div className="flex items-start space-x-2">
          <div className="text-amber-600 dark:text-amber-400 mt-0.5">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <p className="text-sm text-amber-800 dark:text-amber-200">
              <strong>Instructions:</strong> Enter the taxable value for each GST rate applicable to your invoice. 
              The system will automatically calculate the corresponding tax amounts based on your supply type.
            </p>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
        <ReactTable columns={tableHeaders[taxType] || []} data={tableData} />
      </div>

      {/* Summary Card */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {formatINRCurrency(totalTaxableValue)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Total Taxable Value</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {formatINRCurrency(totalTaxAmount)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Total Tax Amount</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {formatINRCurrency(totalTaxableValue + totalTaxAmount)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Total Invoice Value</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaxTable;