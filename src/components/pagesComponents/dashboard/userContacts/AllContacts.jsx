"use client"

import React, { useEffect, useState } from 'react';
import userbackAxios from '@/lib/userbackAxios';
import { FaSearch, FaRefresh, FaEnvelope, FaPhone, FaUser } from 'react-icons/fa';
import { HiRefresh } from 'react-icons/hi';

export const AllContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchContacts = async () => {
    try {
      setIsLoading(true);
      setIsError(false);
      const response = await userbackAxios.get('/contactUs/getAll');
      const contactData = response.data.allContactUs || [];
      setContacts(contactData);
      setFilteredContacts(contactData);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // Filter contacts based on search term
  useEffect(() => {
    if (!searchTerm) {
      setFilteredContacts(contacts);
    } else {
      const filtered = contacts.filter((contact) =>
        contact.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.phoneNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.message?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredContacts(filtered);
    }
  }, [searchTerm, contacts]);

  return (
    <div className="space-y-6">
      {/* Search and Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex-1 w-full sm:max-w-md">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search contacts by name, email, phone, or message..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 bg-gray-50 focus:bg-white"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={fetchContacts}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-3 bg-white hover:bg-gray-50 text-gray-600 border border-gray-200 rounded-lg transition-all duration-200 shadow-sm disabled:opacity-50"
          >
            <HiRefresh className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Refresh</span>
          </button>
          
          <div className="text-sm text-gray-600 bg-gray-50 px-4 py-3 rounded-lg border border-gray-200">
            <span className="font-medium">{filteredContacts.length}</span> of <span className="font-medium">{contacts.length}</span> contacts
          </div>
        </div>
      </div>

      {/* Contacts Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 border-collapse">
            <thead className="text-xs text-white bg-blue-600">
              <tr>
                <th className="px-4 py-3 font-semibold">Contact</th>
                <th className="px-4 py-3 font-semibold">Email</th>
                <th className="px-4 py-3 font-semibold">Phone</th>
                <th className="px-4 py-3 font-semibold">Message</th>
                <th className="px-4 py-3 font-semibold">Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredContacts.length > 0 ? (
                filteredContacts.map((contact, index) => (
                  <tr 
                    key={contact.id || index} 
                    className={`${index % 2 === 0 ? "bg-white" : "bg-blue-50"} border-b hover:bg-gray-50 transition-colors`}
                  >
                    {/* Contact Info */}
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center border border-blue-100">
                            <FaUser className="text-blue-500 text-sm" />
                          </div>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-800">
                            {contact.name || 'N/A'}
                          </div>
                          <div className="text-xs text-gray-500">
                            Contact Inquiry
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <FaEnvelope className="text-gray-400 text-xs" />
                        <span className="text-sm text-blue-500 hover:text-blue-600">
                          {contact.email || 'N/A'}
                        </span>
                      </div>
                    </td>

                    {/* Phone */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <FaPhone className="text-gray-400 text-xs" />
                        <span className="text-sm font-mono text-gray-700 bg-gray-50 px-2 py-1 rounded">
                          {contact.phoneNumber || 'N/A'}
                        </span>
                      </div>
                    </td>

                    {/* Message */}
                    <td className="px-4 py-3">
                      <div className="max-w-xs">
                        <p className="text-sm text-gray-600 truncate" title={contact.message}>
                          {contact.message || 'No message'}
                        </p>
                      </div>
                    </td>

                    {/* Date */}
                    <td className="px-4 py-3">
                      <div className="text-sm text-gray-900">
                        {contact.createdAt ? new Date(contact.createdAt).toLocaleDateString() : 'N/A'}
                      </div>
                      <div className="text-xs text-gray-500">
                        {contact.createdAt ? new Date(contact.createdAt).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric',
                          year: 'numeric'
                        }) : ''}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-4 py-8 text-center text-gray-500">
                    {isLoading ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
                        <span>Loading contacts...</span>
                      </div>
                    ) : isError ? (
                      <div className="text-red-500">
                        <span>Error loading contacts. Please try again.</span>
                      </div>
                    ) : (
                      <div>
                        <span>No contacts found matching your criteria.</span>
                      </div>
                    )}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
