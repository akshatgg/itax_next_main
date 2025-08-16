    'use client';

import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';
import userbackAxios from '@/lib/userbackAxios';

export default function ItemListSection({ formData, onChange }) {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Use formData.itemList as the source of truth instead of local state
  const selectedItems = formData.itemList || [];

  const fetchItems = async () => {
    try {
      setIsLoading(true);
      
      console.log("Fetching items data...");
      const response = await userbackAxios.get("/invoice/items");
      console.log("API Response:", response.data);
      
      if (response.data && response.data.items) {
        setItems(response.data.items);
        console.log("Items set:", response.data.items);
      } else if (response.data.success) {
        // Handle case where success is true but items might be in different structure
        setItems(response.data.items || []);
      } else {
        console.error("Error fetching items:", response.data.error);
      }
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleItemSelect = (item) => {
    const isSelected = selectedItems.find(selectedItem => selectedItem.id === item.id);
    
    if (isSelected) {
      // Remove item from selection
      const updatedItems = selectedItems.filter(selectedItem => selectedItem.id !== item.id);
      onChange('itemList', updatedItems);
    } else {
      // Add item to selection with default quantity and mapped data
      const itemWithQuantity = {
        ...item,
        quantity: 1,
        rate: parseFloat(item.price) || 0,
        // Additional fields for E-Invoice
        isService: false, // Default to goods, can be changed
        barcode: '',
        freeQty: 0,
        discount: 0,
        cesRate: 0,
        cesAmt: 0,
        cesNonAdvlAmt: 0,
        stateCesRate: 0,
        stateCesAmt: 0,
        stateCesNonAdvlAmt: 0,
        othChrg: 0,
        batchNumber: '',
        expiryDate: '',
        warrantyDate: '',
        orderLineRef: '',
        originCountry: 'IN',
        productSerialNumber: '',
        attributes: [] // Array of {Nm: name, Val: value}
      };
      const updatedItems = [...selectedItems, itemWithQuantity];
      onChange('itemList', updatedItems);
    }
  };

  const handleQuantityChange = (itemId, quantity) => {
    const updatedItems = selectedItems.map(item => 
      item.id === itemId ? { ...item, quantity: parseInt(quantity) || 1 } : item
    );
    onChange('itemList', updatedItems);
  };

  const handleRateChange = (itemId, rate) => {
    const updatedItems = selectedItems.map(item => 
      item.id === itemId ? { ...item, rate: parseFloat(rate) || 0 } : item
    );
    onChange('itemList', updatedItems);
  };

  const handleFieldChange = (itemId, field, value) => {
    const updatedItems = selectedItems.map(item => 
      item.id === itemId ? { ...item, [field]: value } : item
    );
    onChange('itemList', updatedItems);
  };

  const addAttribute = (itemId) => {
    const updatedItems = selectedItems.map(item => 
      item.id === itemId ? { 
        ...item, 
        attributes: [...(item.attributes || []), { Nm: '', Val: '' }] 
      } : item
    );
    onChange('itemList', updatedItems);
  };

  const removeAttribute = (itemId, attrIndex) => {
    const updatedItems = selectedItems.map(item => 
      item.id === itemId ? { 
        ...item, 
        attributes: item.attributes.filter((_, index) => index !== attrIndex) 
      } : item
    );
    onChange('itemList', updatedItems);
  };

  const updateAttribute = (itemId, attrIndex, field, value) => {
    const updatedItems = selectedItems.map(item => 
      item.id === itemId ? { 
        ...item, 
        attributes: item.attributes.map((attr, index) => 
          index === attrIndex ? { ...attr, [field]: value } : attr
        ) 
      } : item
    );
    onChange('itemList', updatedItems);
  };

  const calculateItemTotal = (item) => {
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
    
    const totalGst = igstAmt + cgstAmt + sgstAmt;
    const totalItemValue = preTaxVal + totalGst + (item.cesAmt || 0) + (item.othChrg || 0);
    
    return {
      grossAmt,
      preTaxVal,
      igstAmt,
      cgstAmt,
      sgstAmt,
      totalItemValue
    };
  };

  const calculateGrandTotal = () => {
    return selectedItems.reduce((total, item) => {
      const calculations = calculateItemTotal(item);
      return total + calculations.totalItemValue;
    }, 0);
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <h5 className="text-sm font-semibold text-gray-800 mb-3 flex items-center">
        <Icon icon="mdi:package-variant" className="w-4 h-4 mr-2 text-blue-600" />
        Item List (ItemList)
        {isLoading && (
          <span className="ml-2 text-xs text-blue-600">Loading items...</span>
        )}
      </h5>
      
      <div className="space-y-4">
        {/* Available Items */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Available Items
          </label>
          
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Icon icon="mdi:loading" className="w-6 h-6 animate-spin text-blue-600" />
              <span className="ml-2 text-gray-600">Loading items...</span>
            </div>
          ) : items.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-60 overflow-y-auto border border-gray-200 rounded-lg p-3">
              {items.map((item) => {
                const isSelected = selectedItems.find(selectedItem => selectedItem.id === item.id);
                return (
                  <div
                    key={item.id}
                    onClick={() => handleItemSelect(item)}
                    className={`cursor-pointer p-3 rounded-lg border transition-colors ${
                      isSelected 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h6 className="font-medium text-sm text-gray-800">
                          {item.itemName || item.name}
                        </h6>
                        <p className="text-xs text-gray-500">
                          {item.description || 'No description'}
                        </p>
                        <p className="text-xs text-blue-600 font-medium">
                          ₹{item.price || 0} | HSN: {item.hsnCode || 'N/A'}
                        </p>
                        <p className="text-xs text-gray-500">
                          Unit: {item.unit || 'pieces'} | Stock: {item.closingStock || 0}
                        </p>
                      </div>
                      <div className="ml-2">
                        {isSelected ? (
                          <Icon icon="mdi:check-circle" className="w-5 h-5 text-blue-600" />
                        ) : (
                          <Icon icon="mdi:plus-circle" className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Icon icon="mdi:package-variant-closed" className="w-12 h-12 mx-auto mb-2 text-gray-300" />
              <p>No items available</p>
              <p className="text-xs">Add items to your inventory first</p>
            </div>
          )}
        </div>

        {/* Selected Items */}
        {selectedItems.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Selected Items ({selectedItems.length})
            </label>
            
            <div className="border border-gray-200 rounded-lg">
              <div className="max-h-96 overflow-y-auto">
                {selectedItems.map((item, index) => {
                  const calculations = calculateItemTotal(item);
                  return (
                    <div key={item.id} className={`p-4 ${index !== selectedItems.length - 1 ? 'border-b border-gray-200' : ''}`}>
                      {/* Item Header */}
                      <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-200">
                        <div>
                          <h6 className="font-medium text-sm text-gray-800">
                            {item.itemName || item.name}
                          </h6>
                          <p className="text-xs text-gray-500">HSN: {item.hsnCode}</p>
                        </div>
                        <button
                          onClick={() => handleItemSelect(item)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Icon icon="mdi:close-circle" className="w-4 h-4" />
                        </button>
                      </div>
                      
                      {/* Basic Item Details */}
                      <div className="bg-gray-50 rounded-lg p-3 mb-3">
                        <h6 className="text-xs font-medium text-gray-700 mb-3">Basic Item Details</h6>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-sm">
                          <div>
                            <label className="block text-xs text-gray-600 mb-1">Quantity *</label>
                            <input
                              type="number"
                              min="1"
                              value={item.quantity || 1}
                              onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                              className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-600 mb-1">Unit Price (₹) *</label>
                            <input
                              type="number"
                              step="0.01"
                              min="0"
                              value={item.rate || 0}
                              onChange={(e) => handleRateChange(item.id, e.target.value)}
                              className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-600 mb-1">Free Qty</label>
                            <input
                              type="number"
                              min="0"
                              value={item.freeQty || 0}
                              onChange={(e) => handleFieldChange(item.id, 'freeQty', parseFloat(e.target.value) || 0)}
                              className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-600 mb-1">Unit</label>
                            <input
                              type="text"
                              value={item.unit || 'pieces'}
                              onChange={(e) => handleFieldChange(item.id, 'unit', e.target.value)}
                              className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-sm mt-3">
                          <div>
                            <label className="block text-xs text-gray-600 mb-1">Is Service *</label>
                            <select
                              value={item.isService ? 'Y' : 'N'}
                              onChange={(e) => handleFieldChange(item.id, 'isService', e.target.value === 'Y')}
                              className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            >
                              <option value="N">N - Goods</option>
                              <option value="Y">Y - Service</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs text-gray-600 mb-1">Discount (%)</label>
                            <input
                              type="number"
                              min="0"
                              max="100"
                              step="0.01"
                              value={item.discount || 0}
                              onChange={(e) => handleFieldChange(item.id, 'discount', parseFloat(e.target.value) || 0)}
                              className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-600 mb-1">Bar Code</label>
                            <input
                              type="text"
                              value={item.barcode || ''}
                              onChange={(e) => handleFieldChange(item.id, 'barcode', e.target.value)}
                              className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-600 mb-1">Other Charges (₹)</label>
                            <input
                              type="number"
                              min="0"
                              step="0.01"
                              value={item.othChrg || 0}
                              onChange={(e) => handleFieldChange(item.id, 'othChrg', parseFloat(e.target.value) || 0)}
                              className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Cess and State Cess Details */}
                      <div className="bg-orange-50 rounded-lg p-3 mb-3">
                        <h6 className="text-xs font-medium text-gray-700 mb-3">Cess and State Cess Details</h6>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                          <div>
                            <label className="block text-xs text-gray-600 mb-1">Cess Rate (%)</label>
                            <input
                              type="number"
                              min="0"
                              step="0.01"
                              value={item.cesRate || 0}
                              onChange={(e) => handleFieldChange(item.id, 'cesRate', parseFloat(e.target.value) || 0)}
                              className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-600 mb-1">Cess Amount (₹)</label>
                            <input
                              type="number"
                              min="0"
                              step="0.01"
                              value={item.cesAmt || 0}
                              onChange={(e) => handleFieldChange(item.id, 'cesAmt', parseFloat(e.target.value) || 0)}
                              className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-600 mb-1">Cess Non-Adval (₹)</label>
                            <input
                              type="number"
                              min="0"
                              step="0.01"
                              value={item.cesNonAdvlAmt || 0}
                              onChange={(e) => handleFieldChange(item.id, 'cesNonAdvlAmt', parseFloat(e.target.value) || 0)}
                              className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm mt-3">
                          <div>
                            <label className="block text-xs text-gray-600 mb-1">State Cess Rate (%)</label>
                            <input
                              type="number"
                              min="0"
                              step="0.01"
                              value={item.stateCesRate || 0}
                              onChange={(e) => handleFieldChange(item.id, 'stateCesRate', parseFloat(e.target.value) || 0)}
                              className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-600 mb-1">State Cess Amount (₹)</label>
                            <input
                              type="number"
                              min="0"
                              step="0.01"
                              value={item.stateCesAmt || 0}
                              onChange={(e) => handleFieldChange(item.id, 'stateCesAmt', parseFloat(e.target.value) || 0)}
                              className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-600 mb-1">State Cess Non-Adval (₹)</label>
                            <input
                              type="number"
                              min="0"
                              step="0.01"
                              value={item.stateCesNonAdvlAmt || 0}
                              onChange={(e) => handleFieldChange(item.id, 'stateCesNonAdvlAmt', parseFloat(e.target.value) || 0)}
                              className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Reference and Product Details */}
                      <div className="bg-green-50 rounded-lg p-3 mb-3">
                        <h6 className="text-xs font-medium text-gray-700 mb-3">Reference and Product Details</h6>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                          <div>
                            <label className="block text-xs text-gray-600 mb-1">Order Line Reference</label>
                            <input
                              type="text"
                              value={item.orderLineRef || ''}
                              onChange={(e) => handleFieldChange(item.id, 'orderLineRef', e.target.value)}
                              className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                              placeholder="Optional reference"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-600 mb-1">Origin Country</label>
                            <input
                              type="text"
                              value={item.originCountry || 'IN'}
                              onChange={(e) => handleFieldChange(item.id, 'originCountry', e.target.value)}
                              className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                              placeholder="Country code"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-600 mb-1">Product Serial Number</label>
                            <input
                              type="text"
                              value={item.productSerialNumber || ''}
                              onChange={(e) => handleFieldChange(item.id, 'productSerialNumber', e.target.value)}
                              className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                              placeholder="Optional serial number"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Batch Details */}
                      <div className="bg-yellow-50 rounded-lg p-3 mb-3">
                        <h6 className="text-xs font-medium text-gray-700 mb-3">Batch Details (Optional)</h6>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                          <div>
                            <label className="block text-xs text-gray-600 mb-1">Batch Number</label>
                            <input
                              type="text"
                              value={item.batchNumber || ''}
                              onChange={(e) => handleFieldChange(item.id, 'batchNumber', e.target.value)}
                              className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                              placeholder="Enter batch number"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-600 mb-1">Expiry Date (DD/MM/YYYY)</label>
                            <input
                              type="text"
                              placeholder="DD/MM/YYYY"
                              value={item.expiryDate || ''}
                              onChange={(e) => handleFieldChange(item.id, 'expiryDate', e.target.value)}
                              className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-600 mb-1">Warranty Date (DD/MM/YYYY)</label>
                            <input
                              type="text"
                              placeholder="DD/MM/YYYY"
                              value={item.warrantyDate || ''}
                              onChange={(e) => handleFieldChange(item.id, 'warrantyDate', e.target.value)}
                              className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Attribute Details */}
                      <div className="bg-blue-50 rounded-lg p-3 mb-3">
                        <div className="flex items-center justify-between mb-3">
                          <h6 className="text-xs font-medium text-gray-700">Attribute Details (Optional)</h6>
                          <button
                            type="button"
                            onClick={() => addAttribute(item.id)}
                            className="text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 flex items-center"
                          >
                            <Icon icon="mdi:plus" className="w-3 h-3 mr-1" />
                            Add Attribute
                          </button>
                        </div>
                        {item.attributes && item.attributes.length > 0 ? (
                          <div className="space-y-2">
                            {item.attributes.map((attr, attrIndex) => (
                              <div key={attrIndex} className="grid grid-cols-5 gap-2 items-end">
                                <div className="col-span-2">
                                  <label className="block text-xs text-gray-600 mb-1">Attribute Name</label>
                                  <input
                                    type="text"
                                    placeholder="e.g., Color, Size"
                                    value={attr.Nm || ''}
                                    onChange={(e) => updateAttribute(item.id, attrIndex, 'Nm', e.target.value)}
                                    className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none text-xs"
                                  />
                                </div>
                                <div className="col-span-2">
                                  <label className="block text-xs text-gray-600 mb-1">Attribute Value</label>
                                  <input
                                    type="text"
                                    placeholder="e.g., Red, Large"
                                    value={attr.Val || ''}
                                    onChange={(e) => updateAttribute(item.id, attrIndex, 'Val', e.target.value)}
                                    className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none text-xs"
                                  />
                                </div>
                                <div className="col-span-1">
                                  <button
                                    type="button"
                                    onClick={() => removeAttribute(item.id, attrIndex)}
                                    className="w-full text-red-500 hover:text-red-700 p-1 border border-red-300 rounded hover:bg-red-50"
                                  >
                                    <Icon icon="mdi:delete" className="w-3 h-3 mx-auto" />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-2">
                            <p className="text-xs text-gray-500">No attributes added</p>
                            <p className="text-xs text-gray-400">Click &quot;Add Attribute&quot; to add custom properties</p>
                          </div>
                        )}
                      </div>

                      {/* Tax Information */}
                      <div className="bg-gray-50 rounded-lg p-3 mb-3">
                        <h6 className="text-xs font-medium text-gray-700 mb-3">Tax Information (Auto-filled from item data)</h6>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                          <div className="bg-white p-2 rounded border">
                            <div className="text-gray-500 mb-1">IGST Rate</div>
                            <div className="font-medium text-gray-700">{item.igst || 0}%</div>
                          </div>
                          <div className="bg-white p-2 rounded border">
                            <div className="text-gray-500 mb-1">CGST Rate</div>
                            <div className="font-medium text-gray-700">{item.cgst || 0}%</div>
                          </div>
                          <div className="bg-white p-2 rounded border">
                            <div className="text-gray-500 mb-1">SGST Rate</div>
                            <div className="font-medium text-gray-700">{item.sgst || 0}%</div>
                          </div>
                          <div className="bg-white p-2 rounded border">
                            <div className="text-gray-500 mb-1">UTGST Rate</div>
                            <div className="font-medium text-gray-700">{item.utgst || 0}%</div>
                          </div>
                        </div>
                      </div>

                      {/* Calculations Display */}
                      <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                        <h6 className="text-xs font-medium text-gray-700 mb-3">Item Calculations</h6>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                          <div className="bg-white p-2 rounded border">
                            <div className="text-gray-500 mb-1">Gross Amount</div>
                            <div className="font-bold text-gray-700">₹{calculations.grossAmt.toFixed(2)}</div>
                          </div>
                          <div className="bg-white p-2 rounded border">
                            <div className="text-gray-500 mb-1">Pre-Tax Value</div>
                            <div className="font-bold text-gray-700">₹{calculations.preTaxVal.toFixed(2)}</div>
                          </div>
                          <div className="bg-white p-2 rounded border">
                            <div className="text-gray-500 mb-1">IGST Amount</div>
                            <div className="font-bold text-gray-700">₹{calculations.igstAmt.toFixed(2)}</div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs mt-3">
                          <div className="bg-white p-2 rounded border">
                            <div className="text-gray-500 mb-1">CGST + SGST</div>
                            <div className="font-bold text-gray-700">₹{(calculations.cgstAmt + calculations.sgstAmt).toFixed(2)}</div>
                          </div>
                          <div className="bg-white p-2 rounded border">
                            <div className="text-gray-500 mb-1">Total GST</div>
                            <div className="font-bold text-blue-600">₹{(calculations.igstAmt + calculations.cgstAmt + calculations.sgstAmt).toFixed(2)}</div>
                          </div>
                          <div className="bg-blue-100 p-2 rounded border border-blue-300">
                            <div className="text-blue-600 font-medium mb-1">Item Total</div>
                            <div className="font-bold text-blue-600 text-sm">₹{calculations.totalItemValue.toFixed(2)}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {/* Grand Total */}
              <div className="bg-blue-50 border-t border-blue-200 p-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700">Grand Total:</span>
                  <span className="font-bold text-lg text-blue-600">
                    ₹{calculateGrandTotal().toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
