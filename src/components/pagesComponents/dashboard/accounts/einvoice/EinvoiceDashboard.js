'use client';

import DashSection from '@/components/pagesComponents/pageLayout/DashSection';
import { Icon } from '@iconify/react';
import { useState } from 'react';

function EinvoiceDashboard() {
  const [einvoiceData, setEinvoiceData] = useState({
    generated: [],
    pending: [],
    cancelled: [],
    failed: []
  });

  const [authData, setAuthData] = useState({
    username: '',
    gstin: '',
    password: '',
    isAuthenticated: false,
    isLoading: false
  });

  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setAuthData(prev => ({ ...prev, isLoading: true }));
    
    // Simulate API call
    setTimeout(() => {
      setAuthData(prev => ({ 
        ...prev, 
        isAuthenticated: true, 
        isLoading: false 
      }));
      setShowAuthModal(false);
    }, 2000);
  };

  const handleLogout = () => {
    setAuthData({
      username: '',
      gstin: '',
      password: '',
      isAuthenticated: false,
      isLoading: false
    });
  };

  const openGSTPortal = () => {
    window.open('https://einvoice1.gst.gov.in/', '_blank');
  };

  const handleEInvoiceClick = (e) => {
    e.preventDefault();
    if (!authData.isAuthenticated) {
      setShowAuthModal(true);
    } else {
      // Navigate to the E-Invoice page
      window.location.href = e.currentTarget.href;
    }
  };

  return (
    <>
      {/* E-Invoice Authentication Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                E-Invoice Authentication Required
              </h3>
              <button
                onClick={() => setShowAuthModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <Icon icon="mdi:close" className="w-6 h-6" />
              </button>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h4 className="text-md font-semibold text-gray-800 mb-2">
                    Connect Your GST Portal Account
                  </h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Authenticate with your GST Portal credentials to access E-Invoice services
                  </p>
                </div>
                <Icon 
                  icon="mdi:shield-lock" 
                  className="w-8 h-8 text-blue-600" 
                />
              </div>

              <form onSubmit={handleAuthSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    value={authData.username}
                    onChange={(e) => setAuthData(prev => ({ ...prev, username: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    placeholder="Enter your GST Portal username"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    GSTIN
                  </label>
                  <input
                    type="text"
                    value={authData.gstin}
                    onChange={(e) => setAuthData(prev => ({ ...prev, gstin: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    placeholder="Enter your GSTIN"
                    pattern="[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    value={authData.password}
                    onChange={(e) => setAuthData(prev => ({ ...prev, password: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    placeholder="Enter your GST Portal password"
                    required
                  />
                </div>

                <div className="flex items-center justify-between pt-4">
                  <button
                    type="button"
                    onClick={openGSTPortal}
                    className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <Icon icon="mdi:external-link" className="w-4 h-4" />
                    <span className="text-sm">Create Account</span>
                  </button>
                  <div className="flex space-x-2">
                    <button
                      type="button"
                      onClick={() => setShowAuthModal(false)}
                      className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={authData.isLoading}
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
                    >
                      {authData.isLoading ? (
                        <>
                          <Icon icon="mdi:loading" className="w-4 h-4 animate-spin" />
                          <span>Authenticating...</span>
                        </>
                      ) : (
                        <>
                          <Icon icon="mdi:login" className="w-4 h-4" />
                          <span>Authenticate</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* E-Invoice Status Bar - Show if authenticated */}
      {authData.isAuthenticated && (
        <DashSection title="E-Invoice Status" className="mb-4">
          <div className="p-4">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    <Icon icon="mdi:check-circle" className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">GST Portal Connected</h4>
                    <p className="text-sm text-gray-600">GSTIN: {authData.gstin}</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-red-100 text-red-600 px-3 py-1 rounded-lg hover:bg-red-200 transition-colors flex items-center space-x-2 text-sm"
                >
                  <Icon icon="mdi:logout" className="w-4 h-4" />
                  <span>Disconnect</span>
                </button>
              </div>
            </div>
          </div>
        </DashSection>
      )}

      {/* Recent Activity */}
      <DashSection title="Recent E-Invoices" className="mb-8">
        <div className="p-6">
          {!authData.isAuthenticated ? (
            <div className="text-center py-8">
              <Icon icon="mdi:shield-lock" className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Authentication Required</h3>
              <p className="text-gray-500 mb-4">Connect to GST Portal to view E-Invoice data</p>
              <button
                onClick={() => setShowAuthModal(true)}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Connect Now
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      IRN
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Amount</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {einvoiceData.generated.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center py-8 text-gray-500">
                        No invoices found
                      </td>
                    </tr>
                  ) : (
                    einvoiceData.generated.slice(0, 5).map((invoice) => (
                      <tr key={invoice.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 text-sm font-mono">{invoice.irn}</td>
                        <td className="py-3 px-4 text-sm">{invoice.date}</td>
                        <td className="py-3 px-4 text-sm">₹{invoice.amount.toLocaleString()}</td>
                        <td className="py-3 px-4">
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                            Generated
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-800">
                              <Icon icon="mdi:eye" className="w-4 h-4" />
                            </button>
                            <button className="text-green-600 hover:text-green-800">
                              <Icon icon="mdi:download" className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </DashSection>

      {/* API Status - Show if authenticated */}
      {authData.isAuthenticated && (
        <DashSection title="API Status" className="mb-8">
          <div className="p-6">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Sandbox API Connected</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Rate Limit: 95/100 requests</span>
              </div>
            </div>
          </div>
        </DashSection>
      )}
    </>
  );
}

export default EinvoiceDashboard;