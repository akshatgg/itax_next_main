'use client';

import { Icon } from '@iconify/react';

export default function BuyerDtlsSection({ formData, onChange, partiesData, isLoadingParties }) { 
    console.log('BuyerDtlsSection partiesData:', partiesData);

    // Function to handle party selection
    const handlePartySelection = (partyId) => {
      if (!partyId || !partiesData || !Array.isArray(partiesData)) return;
      
      const selectedParty = partiesData.find(party => party.id === partyId);
      if (selectedParty) {
        // Auto-fill buyer details from selected party
        onChange('BuyerGstin', selectedParty.gstin || '');
        onChange('BuyerLglNm', selectedParty.partyName || '');
        onChange('BuyerTrdNm', selectedParty.partyName || '');
        onChange('BuyerAddr1', selectedParty.address || '');
        onChange('BuyerPh', selectedParty.phone || '');
        onChange('BuyerEm', selectedParty.email || '');
        
        // Clear the fields that need to be filled manually
        onChange('BuyerPos', '');
        onChange('BuyerAddr2', '');
        onChange('BuyerLoc', '');
        onChange('BuyerPin', '');
        onChange('BuyerStcd', '');
        
        console.log('Auto-filled buyer details for:', selectedParty.partyName);
      }
    };

    // Filter parties to show only customers (buyers)
    const customerParties = partiesData && Array.isArray(partiesData) 
      ? partiesData.filter(party => party.type === 'customer')
      : [];

  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <h5 className="text-sm font-semibold text-gray-800 mb-3 flex items-center">
        <Icon icon="mdi:account" className="w-4 h-4 mr-2 text-blue-600" />
        Buyer Details (BuyerDtls)
      </h5>
      
      <div className="space-y-4">
        {/* Select Existing Buyer */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Existing Buyer (Optional)
          </label>
          <select
            onChange={(e) => handlePartySelection(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
            disabled={isLoadingParties}
            defaultValue=""
          >
            <option value="">
              {isLoadingParties ? 'Loading buyers...' : 'Choose existing buyer or fill manually'}
            </option>
            {customerParties.map((party) => (
              <option key={party.id} value={party.id}>
                {party.partyName} - {party.gstin}
              </option>
            ))}
          </select>
          <p className="text-xs text-gray-500 mt-1">
            Select from existing customer parties to auto-fill basic details. Address fields will need manual input.
          </p>
        </div>

        {/* Buyer GSTIN */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            GSTIN <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.BuyerGstin || ''}
            onChange={(e) => onChange('BuyerGstin', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
            placeholder="Enter buyer GSTIN or URP if exporting"
            pattern="[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}"
            required
          />
          <p className="text-xs text-gray-500 mt-1">GSTIN of buyer, URP if exporting</p>
        </div>

        {/* Legal Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Legal Name (LglNm) <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.BuyerLglNm || ''}
            onChange={(e) => onChange('BuyerLglNm', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
            placeholder="Enter legal name"
            required
          />
          <p className="text-xs text-gray-500 mt-1">Legal name of the buyer</p>
        </div>

        {/* Trade Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Trade Name (TrdNm)
          </label>
          <input
            type="text"
            value={formData.BuyerTrdNm || ''}
            onChange={(e) => onChange('BuyerTrdNm', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
            placeholder="Enter trade name (optional)"
          />
          <p className="text-xs text-gray-500 mt-1">Trade name of the buyer</p>
        </div>

        {/* Place of Supply */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Place of Supply (Pos) <span className="text-red-500">*</span>
            <span className="text-orange-500 text-xs ml-2">(Fill manually)</span>
          </label>
          <input
            type="text"
            value={formData.BuyerPos || ''}
            onChange={(e) => onChange('BuyerPos', e.target.value)}
            className="w-full px-3 py-2 border border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
            placeholder="Enter state code (96 for outside country)"
            required
          />
          <p className="text-xs text-gray-500 mt-1">Place of supply (state code). Use 96 if POS lies outside the country</p>
        </div>

        {/* Address 1 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Address 1 (Addr1) <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.BuyerAddr1 || ''}
            onChange={(e) => onChange('BuyerAddr1', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
            placeholder="Building/Flat no, Road/Street"
            required
          />
          <p className="text-xs text-gray-500 mt-1">Building/Flat no, Road/Street (auto-filled from party data)</p>
        </div>

        {/* Address 2 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Address 2 (Addr2)
            <span className="text-orange-500 text-xs ml-2">(Fill manually)</span>
          </label>
          <input
            type="text"
            value={formData.BuyerAddr2 || ''}
            onChange={(e) => onChange('BuyerAddr2', e.target.value)}
            className="w-full px-3 py-2 border border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
            placeholder="Floor no, Name of the premises/building (optional)"
          />
          <p className="text-xs text-gray-500 mt-1">Floor no, Name of the premises/building</p>
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location (Loc) <span className="text-red-500">*</span>
            <span className="text-orange-500 text-xs ml-2">(Fill manually)</span>
          </label>
          <input
            type="text"
            value={formData.BuyerLoc || ''}
            onChange={(e) => onChange('BuyerLoc', e.target.value)}
            className="w-full px-3 py-2 border border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
            placeholder="Enter location"
            required
          />
          <p className="text-xs text-gray-500 mt-1">Location/City</p>
        </div>

        {/* Pincode */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Pincode (Pin) <span className="text-red-500">*</span>
            <span className="text-orange-500 text-xs ml-2">(Fill manually)</span>
          </label>
          <input
            type="number"
            value={formData.BuyerPin || ''}
            onChange={(e) => onChange('BuyerPin', e.target.value)}
            className="w-full px-3 py-2 border border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
            placeholder="Enter pincode"
            required
          />
          <p className="text-xs text-gray-500 mt-1">Pincode of the location</p>
        </div>

        {/* State Code */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            State Code (Stcd) <span className="text-red-500">*</span>
            <span className="text-orange-500 text-xs ml-2">(Fill manually)</span>
          </label>
          <input
            type="text"
            value={formData.BuyerStcd || ''}
            onChange={(e) => onChange('BuyerStcd', e.target.value)}
            className="w-full px-3 py-2 border border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
            placeholder="Enter state code"
            required
          />
          <p className="text-xs text-gray-500 mt-1">State code of the buyer</p>
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone (Ph)
          </label>
          <input
            type="tel"
            value={formData.BuyerPh || ''}
            onChange={(e) => onChange('BuyerPh', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors"
            placeholder="Enter phone or mobile number (optional)"
          />
          <p className="text-xs text-gray-500 mt-1">Phone or Mobile number (auto-filled from party data)</p>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email (Em)
          </label>
          <input
            type="email"
            value={formData.BuyerEm || ''}
            onChange={(e) => onChange('BuyerEm', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors"
            placeholder="Enter email address (optional)"
          />
          <p className="text-xs text-gray-500 mt-1">Email address (auto-filled from party data)</p>
        </div>
      </div>
    </div>
  );
}