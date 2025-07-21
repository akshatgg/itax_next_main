'use client';

import DashSection from '@/components/pagesComponents/pageLayout/DashSection';
import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';
import userbackAxios from '@/lib/userbackAxios';
import { toast } from 'react-toastify';
import CreateEInvoiceModal from './CreateEInvoiceModal';

export default function EinvoiceDashboard(businessProfile) {
  // Sample data for developer mode
  const sampleInvoiceData = [
    {
      id: 'sample1',
      irn: '01AMBPG1234A1Z5-DOC-001-2024',
      date: '2024-01-15',
      amount: 125000,
      status: 'Generated'
    },
    {
      id: 'sample2', 
      irn: '01AMBPG1234A1Z5-DOC-002-2024',
      date: '2024-01-16',
      amount: 87500,
      status: 'Generated'
    },
    {
      id: 'sample3',
      irn: '01AMBPG1234A1Z5-DOC-003-2024', 
      date: '2024-01-17',
      amount: 156000,
      status: 'Generated'
    }
  ];

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
    isLoading: false,
    authExpiry: null
  });

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Check if authentication is still valid (2 hours)
  useEffect(() => {
    const sampleData = [
      {
        id: 'sample1',
        irn: '01AMBPG1234A1Z5-DOC-001-2024',
        date: '2024-01-15',
        amount: 125000,
        status: 'Generated'
      },
      {
        id: 'sample2', 
        irn: '01AMBPG1234A1Z5-DOC-002-2024',
        date: '2024-01-16',
        amount: 87500,
        status: 'Generated'
      },
      {
        id: 'sample3',
        irn: '01AMBPG1234A1Z5-DOC-003-2024', 
        date: '2024-01-17',
        amount: 156000,
        status: 'Generated'
      }
    ];

    const savedAuthData = localStorage.getItem('einvoiceAuth');
    if (savedAuthData) {
      const parsedAuth = JSON.parse(savedAuthData);
      const now = new Date().getTime();
      const expiryTime = new Date(parsedAuth.authExpiry).getTime();
      
      if (now < expiryTime) {
        // Auth is still valid
        setAuthData(parsedAuth);
        setEinvoiceData(prev => ({
          ...prev,
          generated: sampleData
        }));
      } else {
        // Auth expired, clear storage
        localStorage.removeItem('einvoiceAuth');
      }
    }
  }, []);

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setAuthData(prev => ({ ...prev, isLoading: true }));
    
    try {
      // Check for developer mode credentials first
      if (authData.username === 'developer' && 
          authData.password === 'dev123' && 
          authData.gstin === '27AMBPG1234A1Z5') {
        
        // Set auth expiry to 2 hours from now
        const authExpiry = new Date();
        authExpiry.setHours(authExpiry.getHours() + 2);
        
        const authenticatedData = {
          ...authData,
          isAuthenticated: true,
          isLoading: false,
          authExpiry: authExpiry.toISOString()
        };
        
        setAuthData(authenticatedData);
        setEinvoiceData(prev => ({
          ...prev,
          generated: sampleInvoiceData
        }));
        
        // Save to localStorage for 2-hour persistence
        localStorage.setItem('einvoiceAuth', JSON.stringify(authenticatedData));
        setShowAuthModal(false);
        toast.success('Authentication successful! (Developer Mode)');
        return;
      }
      
      // Try Next.js API first, then fallback to backend API
      let response;
      try {
        // Use Next.js internal API
        response = await fetch('/api/einvoice/auth', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: authData.username,
            gstin: authData.gstin,
            password: authData.password
          })
        });
        
        const responseData = await response.json();
        
        if (response.ok && responseData.status) {
          const authExpiry = new Date();
          authExpiry.setHours(authExpiry.getHours() + 2);
          
          const authenticatedData = {
            ...authData,
            isAuthenticated: true,
            isLoading: false,
            authExpiry: authExpiry.toISOString()
          };
          
          setAuthData(authenticatedData);
          
          // Load invoice data from API response
          if (responseData.data && responseData.data.invoices) {
            setEinvoiceData(prev => ({
              ...prev,
              generated: responseData.data.invoices
            }));
          }
          
          // Save to localStorage for 2-hour persistence
          localStorage.setItem('einvoiceAuth', JSON.stringify(authenticatedData));
          setShowAuthModal(false);
          toast.success(responseData.message || 'Authentication successful!');
          return;
        } else {
          throw new Error(responseData.message || 'Authentication failed');
        }
      } catch (fetchError) {
        // Fallback to backend API if Next.js API fails
        const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
        if (BACKEND_URL) {
          response = await userbackAxios.post(`${BACKEND_URL}/einvoice/auth`, {
            username: authData.username,
            gstin: authData.gstin,
            password: authData.password
          });
          
          if (response.status === 200) {
            const authExpiry = new Date();
            authExpiry.setHours(authExpiry.getHours() + 2);
            
            const authenticatedData = {
              ...authData,
              isAuthenticated: true,
              isLoading: false,
              authExpiry: authExpiry.toISOString()
            };
            
            setAuthData(authenticatedData);
            
            // Load actual invoice data from API response
            if (response.data && response.data.invoices) {
              setEinvoiceData(prev => ({
                ...prev,
                generated: response.data.invoices
              }));
            }
            
            // Save to localStorage for 2-hour persistence
            localStorage.setItem('einvoiceAuth', JSON.stringify(authenticatedData));
            setShowAuthModal(false);
            toast.success('Authentication successful!');
            return;
          }
        }
        throw fetchError;
      }
    } catch (error) {
      console.error('Authentication error:', error);
      toast.error(error.response?.data?.message || error.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setAuthData(prev => ({ ...prev, isLoading: false }));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('einvoiceAuth');
    setAuthData({
      username: '',
      gstin: '',
      password: '',
      isAuthenticated: false,
      isLoading: false,
      authExpiry: null
    });
    setEinvoiceData({
      generated: [],
      pending: [],
      cancelled: [],
      failed: []
    });
    toast.info('Logged out successfully');
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

                {/* Developer Mode Hint */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <div className="flex items-start space-x-2">
                    <Icon icon="mdi:lightbulb" className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h6 className="text-sm font-semibold text-yellow-800 mb-1">Developer Mode</h6>
                      <p className="text-xs text-yellow-700 mb-2">
                        For testing purposes, use these credentials:
                      </p>
                      <div className="text-xs text-yellow-700 font-mono">
                        <div>Username: <span className="font-semibold">developer</span></div>
                        <div>GSTIN: <span className="font-semibold">27AMBPG1234A1Z5</span></div>
                        <div>Password: <span className="font-semibold">dev123</span></div>
                      </div>
                    </div>
                  </div>
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
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Icon icon="mdi:check-circle" className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">GST Portal Connected</h4>
                    <p className="text-sm text-gray-600">GSTIN: {authData.gstin}</p>
                    {authData.authExpiry && (
                      <p className="text-xs text-gray-500">
                        Session expires: {new Date(authData.authExpiry).toLocaleString()}
                      </p>
                    )}
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
            <div>
              {/* Create E-Invoice Button */}
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">E-Invoice List</h3>
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                >
                  <Icon icon="mdi:plus" className="w-4 h-4" />
                  <span>Create E-Invoice</span>
                </button>
              </div>
              
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
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                            Generated
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-800">
                              <Icon icon="mdi:eye" className="w-4 h-4" />
                            </button>
                            <button className="text-blue-600 hover:text-blue-800">
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
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
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

      {/* Create E-Invoice Modal */}
      {showCreateModal && (
        <CreateEInvoiceModal 
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          authData={authData}
          businessProfile={businessProfile}
        />
      )}
    </>
  );
}

