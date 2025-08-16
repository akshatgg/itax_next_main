"use client";
import { Suspense, useState, useEffect } from 'react';
import DashSection from '../../pageLayout/DashSection';
import { AllContacts } from './AllContacts';
import { AllCareers } from './AllCareers';
import { FaEnvelope, FaBriefcase, FaUsers, FaPhone, FaChartLine } from 'react-icons/fa';
import { HiMail, HiUserGroup, HiOfficeBuilding, HiRefresh } from 'react-icons/hi';
import userbackAxios from '@/lib/userbackAxios';

function UserContact() {
  const [contactsCount, setContactsCount] = useState(0);
  const [careersCount, setCareersCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('contacts');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setIsLoading(true);
        const [contactsResponse, careersResponse] = await Promise.all([
          userbackAxios.get('/contactUs/getAll'),
          userbackAxios.get('/career/findAll')
        ]);
        
        setContactsCount(contactsResponse.data.allContactUs?.length || 0);
        setCareersCount(careersResponse.data.allCareer?.length || 0);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Professional Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-blue-50 p-2.5 rounded-lg border border-blue-100">
                <HiUserGroup className="text-blue-600 text-xl" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-800">Communications Hub</h1>
                <p className="text-sm text-gray-600">Manage contacts and applications</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-gray-50 px-3 py-2 rounded-lg border border-gray-200">
                <span className="text-xs font-medium text-gray-600">Total: </span>
                <span className="text-sm font-semibold text-gray-800">
                  {isLoading ? '...' : contactsCount + careersCount}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-6 space-y-6">
        {/* Compact Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-medium text-blue-600 uppercase tracking-wide">Contact Inquiries</span>
                <div className="text-2xl font-bold text-gray-800 mt-1">
                  {isLoading ? (
                    <div className="animate-pulse bg-gray-200 h-6 w-12 rounded"></div>
                  ) : (
                    contactsCount
                  )}
                </div>
                <span className="text-xs text-gray-500">Customer messages</span>
              </div>
              <div className="bg-blue-50 p-2.5 rounded-lg">
                <HiMail className="text-blue-500 text-lg" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-medium text-green-600 uppercase tracking-wide">Career Applications</span>
                <div className="text-2xl font-bold text-gray-800 mt-1">
                  {isLoading ? (
                    <div className="animate-pulse bg-gray-200 h-6 w-12 rounded"></div>
                  ) : (
                    careersCount
                  )}
                </div>
                <span className="text-xs text-gray-500">Job applications</span>
              </div>
              <div className="bg-green-50 p-2.5 rounded-lg">
                <FaBriefcase className="text-green-500 text-lg" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-medium text-gray-600 uppercase tracking-wide">Total Communications</span>
                <div className="text-2xl font-bold text-gray-800 mt-1">
                  {isLoading ? (
                    <div className="animate-pulse bg-gray-200 h-6 w-12 rounded"></div>
                  ) : (
                    contactsCount + careersCount
                  )}
                </div>
                <span className="text-xs text-gray-500">All interactions</span>
              </div>
              <div className="bg-gray-50 p-2.5 rounded-lg">
                <FaChartLine className="text-gray-600 text-lg" />
              </div>
            </div>
          </div>
        </div>

        {/* Professional Tab Navigation */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="border-b border-gray-200 bg-gray-50">
            <nav className="flex">
              <button
                onClick={() => setActiveTab('contacts')}
                className={`flex-1 px-6 py-3 text-sm font-medium transition-all duration-200 ${
                  activeTab === 'contacts'
                    ? 'bg-white text-blue-600 border-b-2 border-blue-600 -mb-px'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <HiMail className="text-base" />
                  <span>Contact Inquiries</span>
                  {!isLoading && (
                    <span className="bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full text-xs font-semibold ml-1">
                      {contactsCount}
                    </span>
                  )}
                </div>
              </button>
              <button
                onClick={() => setActiveTab('careers')}
                className={`flex-1 px-6 py-3 text-sm font-medium transition-all duration-200 ${
                  activeTab === 'careers'
                    ? 'bg-white text-green-600 border-b-2 border-green-600 -mb-px'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <FaBriefcase className="text-base" />
                  <span>Career Applications</span>
                  {!isLoading && (
                    <span className="bg-green-100 text-green-600 px-2 py-0.5 rounded-full text-xs font-semibold ml-1">
                      {careersCount}
                    </span>
                  )}
                </div>
              </button>
            </nav>
          </div>

          {/* Content Area */}
          <div className="p-6">
            {activeTab === 'contacts' ? (
              <Suspense
                fallback={
                  <div className="h-64 flex items-center justify-center">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mx-auto mb-2"></div>
                      <span className="text-sm text-gray-600">Loading contact inquiries...</span>
                    </div>
                  </div>
                }
              >
                <AllContacts />
              </Suspense>
            ) : (
              <Suspense
                fallback={
                  <div className="h-64 flex items-center justify-center">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-500 mx-auto mb-2"></div>
                      <span className="text-sm text-gray-600">Loading career applications...</span>
                    </div>
                  </div>
                }
              >
                <AllCareers />
              </Suspense>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserContact;
