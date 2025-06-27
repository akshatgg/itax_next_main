"use client"; // This file uses client-side features, so it should be a client component
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, FileText, Calendar, Users, Building, Search, ArrowRight, ArrowLeft, Shield, CheckCircle, Eye, CreditCard, Hash, UserCheck, MapPin, User } from 'lucide-react';

const AuditInfoPage = () => {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const auditTypes = [
    {
      id: 'statutory-audit',
      title: 'Statutory Audit',
      subtitle: 'Mandatory Annual Audit',
      icon: <FileText className="w-6 h-6" />,
      description: 'Statutory audit is a mandatory annual audit required for companies and certain other entities as per the Companies Act, 2013. It ensures compliance with accounting standards and legal requirements, providing assurance to stakeholders about the accuracy of financial statements.',
      details: [
        'Mandatory for all companies irrespective of turnover',
        'Conducted by qualified Chartered Accountants',
        'Annual requirement with specific timelines',
        'Covers financial statements, books of accounts, and internal controls',
        'Results in audit report expressing opinion on true and fair view',
        'Non-compliance attracts penalties and legal consequences'
      ],
      dueDate: 'Within 30 days of AGM (AGM within 6 months of financial year end)',
      applicableTo: 'All companies, LLPs above threshold, trusts, and specified entities'
    },
    {
      id: 'tax-audit',
      title: 'Tax Audit',
      subtitle: 'Income Tax Compliance Audit',
      icon: <Calculator className="w-6 h-6" />,
      description: 'Tax audit under Section 44AB of the Income Tax Act is mandatory for businesses and professionals whose turnover/gross receipts exceed specified limits. It ensures proper maintenance of books of accounts and compliance with tax provisions.',
      details: [
        'Mandatory when business turnover exceeds ₹1 crore',
        'Professional gross receipts threshold: ₹50 lakhs',
        'Conducted by qualified Chartered Accountants',
        'Form 3CA/3CB audit report required',
        'Covers compliance with tax provisions and accounting standards',
        'Late filing attracts penalty of ₹1,50,000'
      ],
      dueDate: '31st October of the assessment year',
      applicableTo: 'Businesses with turnover > ₹1 crore, Professionals with receipts > ₹50 lakhs'
    },
    {
      id: 'gst-audit',
      title: 'GST Audit',
      subtitle: 'Goods and Services Tax Audit',
      icon: <Shield className="w-6 h-6" />,
      description: 'GST audit is required for registered taxpayers with annual turnover exceeding ₹2 crores. It involves examination of records, returns filed, and compliance with GST provisions to ensure accuracy and completeness of GST compliance.',
      details: [
        'Mandatory for turnover exceeding ₹2 crores',
        'Self-certification by qualified Chartered Accountant or Cost Accountant',
        'Annual audit covering GST compliance',
        'Form GSTR-9C audit report required',
        'Reconciliation of annual return with audited financial statements',
        'Due date: 31st December following financial year'
      ],
      dueDate: '31st December of following financial year',
      applicableTo: 'GST registered taxpayers with turnover > ₹2 crores'
    },
    {
      id: 'internal-audit',
      title: 'Internal Audit',
      subtitle: 'Risk Management & Control Assessment',
      icon: <Search className="w-6 h-6" />,
      description: 'Internal audit is an independent assessment of an organization\'s risk management, control, and governance processes. It helps organizations accomplish objectives by bringing systematic approach to evaluate and improve effectiveness of operations.',
      details: [
        'Mandatory for companies with paid-up capital ≥ ₹50 crores or turnover ≥ ₹200 crores',
        'Independent evaluation of internal controls',
        'Risk-based approach to audit planning',
        'Continuous monitoring and improvement process',
        'Reports to Audit Committee of Board',
        'Helps in fraud prevention and operational efficiency'
      ],
      dueDate: 'Ongoing process as per Board approval',
      applicableTo: 'Large companies meeting specified thresholds'
    },
    {
      id: 'cost-audit',
      title: 'Cost Audit',
      subtitle: 'Cost Accounting Standards Compliance',
      icon: <Building className="w-6 h-6" />,
      description: 'Cost audit is mandatory for companies in specified industries to ensure compliance with cost accounting standards and proper maintenance of cost records. It helps in cost optimization and pricing decisions.',
      details: [
        'Applicable to companies in specified sectors',
        'Turnover threshold: ₹35 crores for manufacturing, ₹100 crores for others',
        'Conducted by qualified Cost Accountants',
        'Form CRA-1 cost audit report required',
        'Covers cost accounting records and cost accounting standards',
        'Helps in cost control and pricing strategies'
      ],
      dueDate: '180 days from closure of financial year',
      applicableTo: 'Companies in specified industries above turnover thresholds'
    },
    {
      id: 'concurrent-audit',
      title: 'Concurrent Audit',
      subtitle: 'Real-time Transaction Monitoring',
      icon: <Eye className="w-6 h-6" />,
      description: 'Concurrent audit involves examination of transactions simultaneously or immediately after their occurrence. It provides real-time feedback on compliance and helps in early detection of irregularities and frauds.',
      details: [
        'Real-time or near real-time audit process',
        'Mainly applicable to banks and financial institutions',
        'Continuous monitoring of transactions',
        'Early detection of frauds and irregularities',
        'Immediate feedback and corrective action',
        'Regulatory requirement for banking sector'
      ],
      dueDate: 'Ongoing process throughout the year',
      applicableTo: 'Banks, NBFCs, and financial institutions'
    }
  ];

  const easyServices = [
    {
      title: 'Easy ITR Status',
      icon: <CheckCircle className="w-5 h-5" />,
      description: 'Check the processing status of your Income Tax Return filing instantly online',
      features: 'Real-time status updates, acknowledgment verification, refund tracking'
    },
    {
      title: 'Easy E-PAN',
      icon: <User className="w-5 h-5" />,
      description: 'Apply for new PAN card or make corrections in existing PAN details electronically',
      features: 'Online application, digital PAN, instant processing, document upload'
    },
    {
      title: 'Easy E-verify Return',
      icon: <Shield className="w-5 h-5" />,
      description: 'Electronically verify your filed income tax return using various authentication methods',
      features: 'Aadhaar OTP, net banking, bank account verification, demat account'
    },
    {
      title: 'Easy E-pay Tax',
      icon: <CreditCard className="w-5 h-5" />,
      description: 'Pay income tax, advance tax, self-assessment tax, and other dues online',
      features: 'Multiple payment options, instant receipts, payment history, reminders'
    },
    {
      title: 'Easy Know TAN Details',
      icon: <Hash className="w-5 h-5" />,
      description: 'Retrieve TAN (Tax Deduction Account Number) details and verify TAN information',
      features: 'TAN verification, deductor details, TAN status check, correction facility'
    },
    {
      title: 'Easy Verify Your PAN',
      icon: <UserCheck className="w-5 h-5" />,
      description: 'Verify PAN details, check PAN validity, and ensure PAN-Aadhaar linking status',
      features: 'PAN validation, linking status, name verification, instant results'
    },
    {
      title: 'Easy Know Your AO',
      icon: <MapPin className="w-5 h-5" />,
      description: 'Find your Assessing Officer details, jurisdiction, and contact information',
      features: 'AO allocation, jurisdiction mapping, contact details, office addresses'
    },
    {
      title: 'Easy PAN Details',
      icon: <FileText className="w-5 h-5" />,
      description: 'Access comprehensive PAN information, download PAN card, and manage PAN services',
      features: 'PAN download, correction requests, status tracking, service history'
    },
    {
      title: 'Easy E-PAN Application',
      icon: <ArrowRight className="w-5 h-5" />,
      description: 'Streamlined online PAN application process with digital document submission',
      features: 'Quick application, digital verification, fast processing, home delivery'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back Button */}
          <div className="mb-6">
            <button 
              onClick={() => window.history.back()}
              className="flex items-center text-blue-600 hover:text-blue-700 transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          </div>
          
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Audit Services & Compliance
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive guide to different types of audits, compliance requirements, and easy-to-use 
              tax services for businesses and individuals in India.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Introduction */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12 border border-blue-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Audit Requirements</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Audit is a systematic examination of books of accounts, records, and documents to verify 
            accuracy, compliance, and adherence to applicable laws and standards. Different types of 
            audits serve various purposes ranging from statutory compliance to operational efficiency.
          </p>
          <p className="text-gray-700 leading-relaxed">
            In India, various audit requirements are mandated by different laws including Companies Act, 
            Income Tax Act, GST Act, and sector-specific regulations. Understanding these requirements 
            is crucial for maintaining compliance and avoiding penalties.
          </p>
        </div>

        {/* Main Audit Types */}
        <div className="space-y-6 mb-12">
          {auditTypes.map((auditType) => (
            <div key={auditType.id} className="bg-white rounded-xl shadow-lg border border-blue-100 overflow-hidden">
              <div 
                className="p-6 cursor-pointer hover:bg-blue-50 transition-colors duration-200"
                onClick={() => toggleSection(auditType.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                      {auditType.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{auditType.title}</h3>
                      <p className="text-blue-600 font-medium">{auditType.subtitle}</p>
                    </div>
                  </div>
                  {openSection === auditType.id ? 
                    <ChevronUp className="w-5 h-5 text-gray-500" /> : 
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  }
                </div>
              </div>
              
              {openSection === auditType.id && (
                <div className="px-6 pb-6 border-t border-blue-100 bg-blue-50/30">
                  <div className="pt-6">
                    <p className="text-gray-700 mb-6 leading-relaxed">
                      {auditType.description}
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Key Features:</h4>
                        <ul className="space-y-2">
                          {auditType.details.map((detail, index) => (
                            <li key={index} className="flex items-start space-x-2">
                              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-gray-700">{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="bg-white p-4 rounded-lg border border-blue-200">
                          <h5 className="font-semibold text-gray-900 mb-2">Due Date</h5>
                          <p className="text-blue-600 font-medium">{auditType.dueDate}</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-blue-200">
                          <h5 className="font-semibold text-gray-900 mb-2">Applicable To</h5>
                          <p className="text-gray-700">{auditType.applicableTo}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Easy Tax Services */}
        <div className="bg-white rounded-xl shadow-lg p-8 border border-blue-100 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Easy Tax Services</h2>
          <p className="text-gray-600 mb-8">
            Simplify your tax compliance with our comprehensive suite of easy-to-use online services 
            designed for individuals and businesses.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {easyServices.map((service, index) => (
              <div key={index} className="bg-blue-50 p-6 rounded-lg border border-blue-200 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                    {service.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{service.title}</h3>
                </div>
                <p className="text-gray-700 mb-4">{service.description}</p>
                <div className="text-sm">
                  <span className="font-medium text-gray-900">Features: </span>
                  <span className="text-blue-600">{service.features}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Important Compliance Notes */}
        <div className="bg-gradient-to-r from-blue-400 to-blue-600 rounded-xl shadow-lg p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Important Compliance Guidelines</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3">Audit Compliance</h3>
              <ul className="space-y-2 text-blue-100">
                <li>• Maintain proper books of accounts as per applicable standards</li>
                <li>• Appoint qualified auditors within prescribed timelines</li>
                <li>• File audit reports within due dates to avoid penalties</li>
                <li>• Ensure proper documentation and supporting evidence</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Best Practices</h3>
              <ul className="space-y-2 text-blue-100">
                <li>• Regular internal reviews and reconciliations</li>
                <li>• Maintain digital records for easy access and audit</li>
                <li>• Stay updated with changing compliance requirements</li>
                <li>• Engage professional help for complex compliance matters</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Calculator component (missing import fix)
const Calculator = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <rect x="4" y="2" width="16" height="20" rx="2" ry="2"/>
    <line x1="8" y1="6" x2="16" y2="6"/>
    <line x1="8" y1="10" x2="16" y2="10"/>
    <line x1="8" y1="14" x2="16" y2="14"/>
    <line x1="8" y1="18" x2="12" y2="18"/>
  </svg>
);

export default AuditInfoPage;