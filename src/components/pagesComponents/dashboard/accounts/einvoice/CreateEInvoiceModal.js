'use client';

import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import userbackAxios from '@/lib/userbackAxios';
import TranDtlsSection from './TranDtlsSection';
import DocDtlsSection from './DocDtlsSection';
import SellerDtlsSection from './SellerDtlsSection';
import BuyerDtlsSection from './BuyerDtlsSection';
import ItemListSection from './ItemListSection';
import ValDtlsSection from './ValDtlsSection';
import EInvoiceNavigation from './EInvoiceNavigation';

export default function CreateEInvoiceModal({ isOpen, onClose, authData, businessProfile }) {
  const [formData, setFormData] = useState({
    // Transaction Details (TranDtls)
    TaxSch: 'GST',
    SupTyp: 'B2B',
    RegRev: 'N',
    EcmGstin: '',
    IgstOnIntra: 'N',
    // Document Details (DocDtls)
    Typ: 'INV',
    No: '',
    Dt: '',
    // Seller Details (SellerDtls)
    SellerGstin: '',
    SellerLglNm: '',
    SellerTrdNm: '',
    SellerAddr1: '',
    SellerAddr2: '',
    SellerLoc: '',
    SellerPin: '',
    SellerStcd: '',
    SellerPh: '',
    SellerEm: '',
    // Buyer Details (BuyerDtls)
    BuyerGstin: '',
    BuyerLglNm: '',
    BuyerTrdNm: '',
    BuyerPos: '',
    BuyerAddr1: '',
    BuyerAddr2: '',
    BuyerLoc: '',
    BuyerPin: '',
    BuyerStcd: '',
    BuyerPh: '',
    BuyerEm: '',
    // Item List
    itemList: [],
    // Value Details
    ValDtls: {
      AssVal: 0,
      CgstVal: 0,
      SgstVal: 0,
      IgstVal: 0,
      CesVal: 0,
      StCesVal: 0,
      Discount: 0,
      OthChrg: 0,
      RndOffAmt: 0,
      TotInvVal: 0,
      TotInvValFc: 0
    }
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState('transaction');
  const [partiesData, setPartiesData] = useState({ parties: [] });
  const [isLoadingParties, setIsLoadingParties] = useState(false);

  // Function to get parties data
  const getParties = async () => {
    try {
      setIsLoadingParties(true);
      const response = await userbackAxios.get('/invoice/parties');
      if (response.data && response.data.parties) {
        setPartiesData(response.data);
      }
      console.log('Fetched parties:', response.data.parties);
    } catch (error) {
      console.error('Error fetching parties:', error);
    } finally {
      setIsLoadingParties(false);
    }
  };

  useEffect(() => {
    getParties();
  }, []);

  // Navigation steps
  const steps = [
    { id: 'transaction', label: 'Transaction', shortLabel: 'Tran', icon: 'mdi:swap-horizontal' },
    { id: 'document', label: 'Document', shortLabel: 'Doc', icon: 'mdi:file-document' },
    { id: 'seller', label: 'Seller', shortLabel: 'Sell', icon: 'mdi:store' },
    { id: 'buyer', label: 'Buyer', shortLabel: 'Buy', icon: 'mdi:account' },
    { id: 'items', label: 'Items', shortLabel: 'Items', icon: 'mdi:package-variant' },
    { id: 'values', label: 'Values', shortLabel: 'Val', icon: 'mdi:calculator' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleStepChange = (stepId) => {
    setCurrentStep(stepId);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate form data
      if (!formData.No.trim()) {
        throw new Error('Document Number is required');
      }
      
      if (!formData.Dt) {
        throw new Error('Document Date is required');
      }

      // Convert date from YYYY-MM-DD to DD/MM/YYYY format
      const dateParts = formData.Dt.split('-');
      const formattedDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;

      const tranDetails = {
        TaxSch: formData.TaxSch,
        SupTyp: formData.SupTyp,
        RegRev: formData.RegRev,
        ...(formData.EcmGstin && { EcmGstin: formData.EcmGstin }),
        IgstOnIntra: formData.IgstOnIntra
      };

      const docDetails = {
        Typ: formData.Typ,
        No: formData.No.trim(),
        Dt: formattedDate
      };

      const sellerDetails = {
        Gstin: formData.SellerGstin,
        LglNm: formData.SellerLglNm,
        TrdNm: formData.SellerTrdNm,
        Addr1: formData.SellerAddr1,
        Addr2: formData.SellerAddr2,
        Loc: formData.SellerLoc,
        Pin: formData.SellerPin,
        Stcd: formData.SellerStcd,
        Ph: formData.SellerPh,
        Em: formData.SellerEm
      };

      const buyerDetails = {
        Gstin: formData.BuyerGstin,
        LglNm: formData.BuyerLglNm,
        TrdNm: formData.BuyerTrdNm,
        Pos: formData.BuyerPos,
        Addr1: formData.BuyerAddr1,
        Addr2: formData.BuyerAddr2,
        Loc: formData.BuyerLoc,
        Pin: formData.BuyerPin,
        Stcd: formData.BuyerStcd,
        Ph: formData.BuyerPh,
        Em: formData.BuyerEm
      };

      // Transform selected items for E-Invoice format
      const itemList = formData.itemList.map((item, index) => {
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
        const cesNonAdvlAmt = item.cesNonAdvlAmt || 0;
        const stateCesAmt = item.stateCesAmt || 0;
        const stateCesNonAdvlAmt = item.stateCesNonAdvlAmt || 0;
        const othChrg = item.othChrg || 0;
        
        const totalItemValue = preTaxVal + igstAmt + cgstAmt + sgstAmt + cesAmt + cesNonAdvlAmt + stateCesAmt + stateCesNonAdvlAmt + othChrg;

        const itemData = {
          SlNo: (index + 1).toString(),
          PrdDesc: item.itemName || item.name || item.description || '',
          IsServc: item.isService ? "Y" : "N",
          HsnCd: item.hsnCode || "1234",
          Barcde: item.barcode || "",
          Qty: qty,
          FreeQty: item.freeQty || 0,
          Unit: item.unit || "NOS",
          UnitPrice: rate,
          TotAmt: grossAmt,
          Discount: discountAmt,
          PreTaxVal: preTaxVal,
          AssAmt: preTaxVal, // Assessable amount (same as pre-tax value)
          GstRt: gstRate, // Total GST rate (should be IGST rate only as per requirement)
          IgstAmt: igstAmt,
          CgstAmt: cgstAmt,
          SgstAmt: sgstAmt,
          CesRt: item.cesRate || 0,
          CesAmt: cesAmt,
          CesNonAdvlAmt: cesNonAdvlAmt,
          StateCesRt: item.stateCesRate || 0,
          StateCesAmt: stateCesAmt,
          StateCesNonAdvlAmt: stateCesNonAdvlAmt,
          OthChrg: othChrg,
          TotItemVal: totalItemValue,
          OrdLineRef: item.orderLineRef || "",
          OrgCntry: item.originCountry || "IN",
          PrdSlNo: item.productSerialNumber || ""
        };

        // Add batch details if batch number is provided
        if (item.batchNumber && item.batchNumber.trim()) {
          itemData.BchDtls = {
            Nm: item.batchNumber,
            ...(item.expiryDate && { ExpDt: item.expiryDate }),
            ...(item.warrantyDate && { WrDt: item.warrantyDate })
          };
        }

        // Add attribute details if any attributes are provided
        if (item.attributes && item.attributes.length > 0) {
          const validAttributes = item.attributes.filter(attr => attr.Nm && attr.Nm.trim());
          if (validAttributes.length > 0) {
            itemData.AttribDtls = validAttributes.map(attr => ({
              Nm: attr.Nm,
              Val: attr.Val || ""
            }));
          }
        }

        return itemData;
      });

      console.log('Creating E-Invoice with TranDtls:', tranDetails);
      console.log('Creating E-Invoice with DocDtls:', docDetails);
      console.log('Creating E-Invoice with SellerDtls:', sellerDetails);
      console.log('Creating E-Invoice with BuyerDtls:', buyerDetails);
      console.log('Creating E-Invoice with ItemList:', itemList);
      console.log('Creating E-Invoice with ValDtls:', formData.ValDtls);
      
      // Call the E-Invoice creation API
      const response = await fetch('/api/einvoice/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          TranDtls: tranDetails,
          DocDtls: docDetails,
          SellerDtls: sellerDetails,
          BuyerDtls: buyerDetails,
          ItemList: itemList,
          ValDtls: formData.ValDtls,
          authToken: authData.token || 'mock_token'
        })
      });

      const responseData = await response.json();

      if (response.ok && responseData.status) {
        toast.success(`E-Invoice created successfully! IRN: ${responseData.data.irn}`);
        
        // Log the response for debugging
        console.log('E-Invoice creation response:', responseData);
        
        // Reset form
        setFormData({
          // Transaction Details (TranDtls)
          TaxSch: 'GST',
          SupTyp: 'B2B',
          RegRev: 'N',
          EcmGstin: '',
          IgstOnIntra: 'N',
          // Document Details (DocDtls)
          Typ: 'INV',
          No: '',
          Dt: '',
          // Seller Details (SellerDtls)
          SellerGstin: '',
          SellerLglNm: '',
          SellerTrdNm: '',
          SellerAddr1: '',
          SellerAddr2: '',
          SellerLoc: '',
          SellerPin: '',
          SellerStcd: '',
          SellerPh: '',
          SellerEm: '',
          // Buyer Details (BuyerDtls)
          BuyerGstin: '',
          BuyerLglNm: '',
          BuyerTrdNm: '',
          BuyerPos: '',
          BuyerAddr1: '',
          BuyerAddr2: '',
          BuyerLoc: '',
          BuyerPin: '',
          BuyerStcd: '',
          BuyerPh: '',
          BuyerEm: '',
          // Item List
          itemList: [],
          // Value Details
          ValDtls: {
            AssVal: 0,
            CgstVal: 0,
            SgstVal: 0,
            IgstVal: 0,
            CesVal: 0,
            StCesVal: 0,
            Discount: 0,
            OthChrg: 0,
            RndOffAmt: 0,
            TotInvVal: 0,
            TotInvValFc: 0
          }
        });
        
        setCurrentStep('transaction');
        onClose();
      } else {
        throw new Error(responseData.message || 'Failed to create E-Invoice');
      }
      
    } catch (error) {
      console.error('E-Invoice creation error:', error);
      toast.error(error.message || 'Failed to create E-Invoice');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-white rounded-xl w-full max-w-6xl mx-auto max-h-[95vh] sm:max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header - Fixed */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 flex-shrink-0">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
            Create E-Invoice
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 p-1"
          >
            <Icon icon="mdi:close" className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 sm:p-6">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 sm:p-6 border border-blue-200">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 sm:mb-6">
                <div className="mb-4 sm:mb-0">
                  <h4 className="text-md sm:text-lg font-semibold text-gray-800 mb-2">
                    E-Invoice Details
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Enter transaction and document details for E-Invoice generation
                  </p>
                </div>
                <Icon 
                  icon="mdi:file-document-plus" 
                  className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 flex-shrink-0" 
                />
              </div>

              {/* Navigation */}
              <EInvoiceNavigation 
                steps={steps} 
                currentStep={currentStep} 
                onStepChange={handleStepChange} 
              />

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 mt-4 sm:mt-6">
                {/* Render current step component */}
                {currentStep === 'transaction' && (
                  <TranDtlsSection 
                    formData={formData} 
                    onChange={handleInputChange} 
                  />
                )}
                
                {currentStep === 'document' && (
                  <DocDtlsSection 
                    formData={formData} 
                    onChange={handleInputChange} 
                  />
                )}
                
                {currentStep === 'seller' && (
                  <SellerDtlsSection
                    businessProfile={businessProfile}
                    formData={formData} 
                    onChange={handleInputChange} 
                  />
                )}
                
                {currentStep === 'buyer' && (
                  <BuyerDtlsSection 
                    partiesData={partiesData.parties.filter(p => p.type === 'customer')}
                    isLoadingParties={isLoadingParties}
                    handleInputChange={handleInputChange}
                    formData={formData} 
                    onChange={handleInputChange} 
                  />
                )}

                {currentStep === 'items' && (
                  <ItemListSection 
                    formData={formData} 
                    onChange={handleInputChange} 
                  />
                )}

                {currentStep === 'values' && (
                  <ValDtlsSection 
                    formData={formData} 
                    onChange={handleInputChange} 
                  />
                )}
              </form>
            </div>
          </div>
        </div>

        {/* Footer - Fixed */}
        <div className="border-t border-gray-200 p-4 sm:p-6 bg-white flex-shrink-0">
          <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
            {/* Navigation Buttons */}
            <div className="flex gap-2 sm:gap-3 order-2 sm:order-1">
              {currentStep !== 'transaction' && (
                <button
                  type="button"
                  onClick={() => {
                    const currentIndex = steps.findIndex(step => step.id === currentStep);
                    if (currentIndex > 0) {
                      setCurrentStep(steps[currentIndex - 1].id);
                    }
                  }}
                  className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm sm:text-base"
                >
                  Previous
                </button>
              )}
              
              {currentStep !== 'buyer' && currentStep !== 'items' && currentStep !== 'values' && (
                <button
                  type="button"
                  onClick={() => {
                    const currentIndex = steps.findIndex(step => step.id === currentStep);
                    if (currentIndex < steps.length - 1) {
                      setCurrentStep(steps[currentIndex + 1].id);
                    }
                  }}
                  className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base"
                >
                  Next
                </button>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 sm:gap-3 order-1 sm:order-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm sm:text-base"
              >
                Cancel
              </button>
              
              {currentStep === 'values' && (
                <button
                  type="submit"
                  disabled={isLoading}
                  onClick={handleSubmit}
                  className="flex-1 sm:flex-none px-4 sm:px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center text-sm sm:text-base"
                >
                  {isLoading && (
                    <Icon icon="mdi:loading" className="w-4 h-4 mr-2 animate-spin" />
                  )}
                  {isLoading ? 'Creating...' : 'Create E-Invoice'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
