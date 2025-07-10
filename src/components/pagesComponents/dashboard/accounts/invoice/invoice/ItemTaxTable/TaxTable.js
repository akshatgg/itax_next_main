"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { TAX_TYPES_BY_STATES } from '../staticData';
import { formClassNames } from '../CreateInvoice';
import { formatINRCurrency } from '@/utils/utilityFunctions';
import { Trash2, Plus, Edit3 } from 'lucide-react';

const NonInventoryTaxComponent = ({ taxType, onTaxCalculation }) => {
  const [items, setItems] = useState([]);
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [currentItem, setCurrentItem] = useState({
    description: '',
    quantity: 1,
    rate: '',
    taxRate: '',
    amount: 0,
    taxAmount: 0,
    totalAmount: 0
  });
  const [errors, setErrors] = useState({});

  // Available GST rates
  const gstRates = [0, 1, 1.5, 3, 5, 6, 7.5, 12, 18, 28];

  // Calculate item amounts whenever rate, quantity, or taxRate changes
  useEffect(() => {
    const rate = parseFloat(currentItem.rate) || 0;
    const quantity = parseFloat(currentItem.quantity) || 1;
    const taxRate = parseFloat(currentItem.taxRate) || 0;

    const amount = rate * quantity;
    const taxAmount = (amount * taxRate) / 100;
    const totalAmount = amount + taxAmount;

    setCurrentItem(prev => ({
      ...prev,
      amount: amount,
      taxAmount: taxAmount,
      totalAmount: totalAmount
    }));
  }, [currentItem.rate, currentItem.quantity, currentItem.taxRate]);

  // Calculate totals and send to parent
  useEffect(() => {
    const totalTaxableValue = items.reduce((sum, item) => sum + item.amount, 0);
    const totalTaxAmount = items.reduce((sum, item) => sum + item.taxAmount, 0);
    const totalInvoiceValue = totalTaxableValue + totalTaxAmount;

    // Calculate tax breakdown based on tax type
    let cgst = 0, sgst = 0, igst = 0, utgst = 0;

    if (taxType === TAX_TYPES_BY_STATES.inter) {
      // Intra-state: CGST + SGST
      cgst = totalTaxAmount / 2;
      sgst = totalTaxAmount / 2;
    } else if (taxType === TAX_TYPES_BY_STATES.intra) {
      // Inter-state: IGST
      igst = totalTaxAmount;
    } else if (taxType === TAX_TYPES_BY_STATES.ut) {
      // UT: CGST + UTGST
      cgst = totalTaxAmount / 2;
      utgst = totalTaxAmount / 2;
    }

    if (onTaxCalculation) {
      onTaxCalculation({
        totalTaxableValue,
        totalTaxAmount,
        totalInvoiceValue,
        cgst,
        sgst,
        igst,
        utgst,
        taxBreakdown: items.reduce((acc, item, index) => {
          acc[`item_${index}`] = {
            description: item.description,
            amount: item.amount,
            taxAmount: item.taxAmount
          };
          return acc;
        }, {})
      });
    }
  }, [items, taxType, onTaxCalculation]);

  const validateItem = () => {
    const newErrors = {};
    
    if (!currentItem.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!currentItem.rate || parseFloat(currentItem.rate) <= 0) {
      newErrors.rate = 'Rate must be greater than 0';
    }
    
    if (!currentItem.quantity || parseFloat(currentItem.quantity) <= 0) {
      newErrors.quantity = 'Quantity must be greater than 0';
    }
    
    if (currentItem.taxRate === '') {
      newErrors.taxRate = 'Tax rate is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddItem = () => {
    if (validateItem()) {
      const newItem = {
        ...currentItem,
        id: Date.now() + Math.random()
      };
      
      if (editingIndex !== null) {
        const updatedItems = [...items];
        updatedItems[editingIndex] = newItem;
        setItems(updatedItems);
        setEditingIndex(null);
      } else {
        setItems(prev => [...prev, newItem]);
      }
      
      setCurrentItem({
        description: '',
        quantity: 1,
        rate: '',
        taxRate: '',
        amount: 0,
        taxAmount: 0,
        totalAmount: 0
      });
      setIsAddingItem(false);
      setErrors({});
    }
  };

  const handleEditItem = (index) => {
    setCurrentItem(items[index]);
    setEditingIndex(index);
    setIsAddingItem(true);
  };

  const handleDeleteItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  const handleCancelEdit = () => {
    setCurrentItem({
      description: '',
      quantity: 1,
      rate: '',
      taxRate: '',
      amount: 0,
      taxAmount: 0,
      totalAmount: 0
    });
    setIsAddingItem(false);
    setEditingIndex(null);
    setErrors({});
  };

  const handleInputChange = (field, value) => {
    setCurrentItem(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const getTaxLabel = () => {
    switch (taxType) {
      case TAX_TYPES_BY_STATES.inter:
        return 'CGST + SGST';
      case TAX_TYPES_BY_STATES.intra:
        return 'IGST';
      case TAX_TYPES_BY_STATES.ut:
        return 'CGST + UTGST';
      default:
        return 'GST';
    }
  };

  const totalTaxableValue = items.reduce((sum, item) => sum + item.amount, 0);
  const totalTaxAmount = items.reduce((sum, item) => sum + item.taxAmount, 0);
  const totalInvoiceValue = totalTaxableValue + totalTaxAmount;

  return (
    <div className="my-6 space-y-4">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Non-Inventory Items - {taxType?.toUpperCase()} State ({getTaxLabel()})
          </h3>
          <div className="flex space-x-4 text-sm">
            <div className="bg-white dark:bg-gray-800 px-3 py-1 rounded-full border">
              <span className="text-gray-600 dark:text-gray-300">Items: </span>
              <span className="font-bold text-blue-600 dark:text-blue-400">
                {items.length}
              </span>
            </div>
            <div className="bg-white dark:bg-gray-800 px-3 py-1 rounded-full border">
              <span className="text-gray-600 dark:text-gray-300">Total: </span>
              <span className="font-bold text-green-600 dark:text-green-400">
                {formatINRCurrency(totalInvoiceValue)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Add Item Button */}
      {!isAddingItem && (
        <button
          onClick={() => setIsAddingItem(true)}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Item</span>
        </button>
      )}

      {/* Add/Edit Item Form */}
      {isAddingItem && (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-4">
          <h4 className="text-md font-medium text-gray-800 dark:text-gray-200">
            {editingIndex !== null ? 'Edit Item' : 'Add New Item'}
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Description */}
            <div className="md:col-span-2 lg:col-span-1">
              <label className={formClassNames.label}>Description *</label>
              <input
                type="text"
                value={currentItem.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className={`${formClassNames.input} ${errors.description ? 'border-red-500' : ''}`}
                placeholder="Enter item description"
              />
              {errors.description && (
                <p className="text-xs text-red-500 mt-1">{errors.description}</p>
              )}
            </div>

            {/* Quantity */}
            <div>
              <label className={formClassNames.label}>Quantity *</label>
              <input
                type="number"
                value={currentItem.quantity}
                onChange={(e) => handleInputChange('quantity', e.target.value)}
                className={`${formClassNames.input} ${errors.quantity ? 'border-red-500' : ''}`}
                placeholder="1"
                min="1"
                step="1"
              />
              {errors.quantity && (
                <p className="text-xs text-red-500 mt-1">{errors.quantity}</p>
              )}
            </div>

            {/* Rate */}
            <div>
              <label className={formClassNames.label}>Rate (₹) *</label>
              <input
                type="number"
                value={currentItem.rate}
                onChange={(e) => handleInputChange('rate', e.target.value)}
                className={`${formClassNames.input} ${errors.rate ? 'border-red-500' : ''}`}
                placeholder="0.00"
                min="0"
                step="0.01"
              />
              {errors.rate && (
                <p className="text-xs text-red-500 mt-1">{errors.rate}</p>
              )}
            </div>

            {/* Tax Rate */}
            <div>
              <label className={formClassNames.label}>GST Rate (%) *</label>
              <select
                value={currentItem.taxRate}
                onChange={(e) => handleInputChange('taxRate', e.target.value)}
                className={`${formClassNames.input} ${errors.taxRate ? 'border-red-500' : ''}`}
              >
                <option value="">Select GST Rate</option>
                {gstRates.map(rate => (
                  <option key={rate} value={rate}>{rate}%</option>
                ))}
              </select>
              {errors.taxRate && (
                <p className="text-xs text-red-500 mt-1">{errors.taxRate}</p>
              )}
            </div>

            {/* Amount (calculated) */}
            <div>
              <label className={formClassNames.label}>Amount (₹)</label>
              <input
                type="text"
                value={formatINRCurrency(currentItem.amount)}
                className={`${formClassNames.input} bg-gray-50 dark:bg-gray-700`}
                disabled
              />
            </div>

            {/* Tax Amount (calculated) */}
            <div>
              <label className={formClassNames.label}>Tax Amount (₹)</label>
              <input
                type="text"
                value={formatINRCurrency(currentItem.taxAmount)}
                className={`${formClassNames.input} bg-gray-50 dark:bg-gray-700`}
                disabled
              />
            </div>
          </div>

          {/* Total Amount Display */}
          <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
            <div className="text-center">
              <span className="text-sm text-gray-600 dark:text-gray-300">Total Amount: </span>
              <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                {formatINRCurrency(currentItem.totalAmount)}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3">
            <button
              onClick={handleCancelEdit}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleAddItem}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              {editingIndex !== null ? 'Update Item' : 'Add Item'}
            </button>
          </div>
        </div>
      )}

      {/* Items List */}
      {items.length > 0 && (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
          <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
            <h4 className="text-md font-medium text-gray-800 dark:text-gray-200">Added Items</h4>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Qty
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Rate
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    GST %
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Tax
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {items.map((item, index) => (
                  <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">
                      {item.description}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100 text-right">
                      {item.quantity}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100 text-right">
                      {formatINRCurrency(item.rate)}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100 text-right">
                      {item.taxRate}%
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100 text-right">
                      {formatINRCurrency(item.amount)}
                    </td>
                    <td className="px-4 py-3 text-sm text-green-600 dark:text-green-400 text-right font-medium">
                      {formatINRCurrency(item.taxAmount)}
                    </td>
                    <td className="px-4 py-3 text-sm text-blue-600 dark:text-blue-400 text-right font-bold">
                      {formatINRCurrency(item.totalAmount)}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex justify-center space-x-2">
                        <button
                          onClick={() => handleEditItem(index)}
                          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteItem(index)}
                          className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Summary Section */}
      {items.length > 0 && (
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
              <div className="text-sm text-gray-600 dark:text-gray-300">Total Tax Amount ({getTaxLabel()})</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {formatINRCurrency(totalInvoiceValue)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Total Invoice Value</div>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {items.length === 0 && !isAddingItem && (
        <div className="text-center py-8 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="text-gray-500 dark:text-gray-400">
            <p className="text-lg mb-2">No items added yet</p>
            <p className="text-sm">Click Add Item to start adding non-inventory items to your invoice</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default NonInventoryTaxComponent;