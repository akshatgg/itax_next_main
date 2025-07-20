'use client';

import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';
import userbackAxios from '@/lib/userbackAxios.js';

export default function SellerDtlsSection({ formData, onChange }) {
  const [businessProfile, setBusinessProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getBusinessProfile = async () => {
    try {
      setIsLoading(true);
      const response = await userbackAxios.get('/business/profile');
      if (response.data && response.data.data && response.data.data.profile) {
        const profile = response.data.data.profile;
        setBusinessProfile(profile);
        console.log("Fetched business profile:", profile);
        
        // Auto-fill seller details from business profile
        onChange('SellerGstin', profile.gstin || '');
        onChange('SellerLglNm', profile.businessName || '');
        onChange('SellerTrdNm', profile.businessName || '');
        onChange('SellerAddr1', profile.street || '');
        onChange('SellerAddr2', profile.landmark || '');
        onChange('SellerLoc', profile.city || '');
        onChange('SellerPin', profile.pincode || '');
        onChange('SellerStcd', profile.statecode || '');
      }
    } catch (error) {
      console.log("Error fetching business profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getBusinessProfile();
  }, []);

  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <h5 className="text-sm font-semibold text-gray-800 mb-3 flex items-center">
        <Icon icon="mdi:store" className="w-4 h-4 mr-2 text-purple-600" />
        Seller Details (SellerDtls)
      </h5>
      
      <div className="space-y-4">
        {/* Seller GSTIN */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            GSTIN <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.SellerGstin}
            onChange={(e) => handleInputChange('SellerGstin', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors"
            placeholder="Enter seller GSTIN"
            pattern="[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}"
            required
          />
          <p className="text-xs text-gray-500 mt-1">GSTIN of supplier</p>
        </div>

        {/* Legal Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Legal Name (LglNm) <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.SellerLglNm}
            onChange={(e) => handleInputChange('SellerLglNm', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors"
            placeholder="Enter legal name"
            required
          />
          <p className="text-xs text-gray-500 mt-1">Legal name of the seller</p>
        </div>

        {/* Trade Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Trade Name (TrdNm)
          </label>
          <input
            type="text"
            value={formData.SellerTrdNm}
            onChange={(e) => handleInputChange('SellerTrdNm', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors"
            placeholder="Enter trade name (optional)"
          />
          <p className="text-xs text-gray-500 mt-1">Trade name of the seller</p>
        </div>

        {/* Address 1 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Address 1 (Addr1) <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.SellerAddr1}
            onChange={(e) => handleInputChange('SellerAddr1', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors"
            placeholder="Building/Flat no, Road/Street"
            required
          />
          <p className="text-xs text-gray-500 mt-1">Building/Flat no, Road/Street</p>
        </div>

        {/* Address 2 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Address 2 (Addr2)
          </label>
          <input
            type="text"
            value={formData.SellerAddr2}
            onChange={(e) => handleInputChange('SellerAddr2', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors"
            placeholder="Floor no, Name of the premises/building (optional)"
          />
          <p className="text-xs text-gray-500 mt-1">Floor no, Name of the premises/building</p>
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location (Loc) <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.SellerLoc}
            onChange={(e) => handleInputChange('SellerLoc', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors"
            placeholder="Enter location"
            required
          />
          <p className="text-xs text-gray-500 mt-1">Location/City</p>
        </div>

        {/* Pincode */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Pincode (Pin) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            value={formData.SellerPin}
            onChange={(e) => handleInputChange('SellerPin', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors"
            placeholder="Enter pincode"
            required
          />
          <p className="text-xs text-gray-500 mt-1">Pincode of the location</p>
        </div>

        {/* State Code */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            State Code (Stcd) <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.SellerStcd}
            onChange={(e) => handleInputChange('SellerStcd', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors"
            placeholder="Enter state code"
            required
          />
          <p className="text-xs text-gray-500 mt-1">State code of the supplier</p>
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone (Ph)
          </label>
          <input
            type="tel"
            value={formData.SellerPh}
            onChange={(e) => handleInputChange('SellerPh', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors"
            placeholder="Enter phone or mobile number (optional)"
          />
          <p className="text-xs text-gray-500 mt-1">Phone or Mobile number</p>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email (Em)
          </label>
          <input
            type="email"
            value={formData.SellerEm}
            onChange={(e) => handleInputChange('SellerEm', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors"
            placeholder="Enter email address (optional)"
          />
          <p className="text-xs text-gray-500 mt-1">Email address</p>
        </div>
      </div>
    </div>
  );
}
