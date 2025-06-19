"use client"
import { ArrowLeft, Shield, Eye, Lock, Users, FileText, Mail, Calendar } from "lucide-react"
import { useRouter } from "next/navigation"

export default function PrivacyPolicy() {
  const router = useRouter()

  const sections = [
    {
      id: "information-collect",
      title: "Information We Collect",
      icon: <Eye className="h-5 w-5" />,
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="text-md font-semibold mb-3 text-gray-800">1.1 Personal Information:</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {[
                "Name",
                "Gender",
                "Address",
                "Phone number",
                "Email address",
                "Aadhaar number",
                "PAN number",
                "Father's name",
              ].map((item) => (
                <div key={item} className="bg-blue-50 text-blue-800 px-3 py-2 rounded-lg text-sm font-medium">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-md font-semibold mb-3 text-gray-800">1.2 Usage Information:</h4>
            <ul className="space-y-2">
              {[
                "Device information (e.g., device type, operating system, unique device identifiers)",
                "Log information (e.g., IP address, app features accessed, app crashes, timestamps)",
                "Geolocation data (only if you grant permission)",
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: "use-information",
      title: "Use of Personal Information",
      icon: <Lock className="h-5 w-5" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            We use the personal information collected to provide you with our finance services and to improve and
            personalize your experience with the app. This includes:
          </p>
          <div className="grid md:grid-cols-2 gap-3">
            {[
              "Authenticating your identity",
              "Processing financial transactions",
              "Providing personalized recommendations and offers",
              "Sending important app updates and notifications",
              "Responding to customer support inquiries",
              "Conducting research and analysis to improve our app's functionality and user experience",
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-700 text-sm">{item}</span>
              </div>
            ))}
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <p className="text-amber-800 text-sm">
              <strong>Important:</strong> We will not share your personal information with any third parties without
              your explicit consent, except as described in this Privacy Policy or as required by law.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "data-security",
      title: "Data Security",
      icon: <Shield className="h-5 w-5" />,
      content: (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <p className="text-gray-700 leading-relaxed">
            We are committed to protecting the security of your personal information and have implemented appropriate
            technical and organizational measures to safeguard it. However, no method of transmission over the internet
            or electronic storage is completely secure, and we cannot guarantee absolute security.
          </p>
        </div>
      ),
    },
    {
      id: "third-party",
      title: "Third-Party Services",
      icon: <Users className="h-5 w-5" />,
      content: (
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
          <p className="text-gray-700 leading-relaxed">
            iTaxEasy may include links to third-party websites or services that are not operated or controlled by us.
            This Privacy Policy does not apply to any third-party services, and we encourage you to review the privacy
            policies of those services before providing them with any personal information.
          </p>
        </div>
      ),
    },
    {
      id: "children-privacy",
      title: "Children's Privacy",
      icon: <Users className="h-5 w-5" />,
      content: (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <p className="text-gray-700 leading-relaxed">
            iTaxEasy is not intended for use by individuals under the age of 18. We do not knowingly collect personal
            information from children. If you believe that we have inadvertently collected personal information from a
            child, please contact us immediately, and we will take steps to delete the information.
          </p>
        </div>
      ),
    },
    {
      id: "policy-changes",
      title: "Changes to the Privacy Policy",
      icon: <FileText className="h-5 w-5" />,
      content: (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <p className="text-gray-700 leading-relaxed">
            We may update this Privacy Policy from time to time to reflect changes in our practices or legal
            obligations. We will notify you of any significant changes by posting the updated Privacy Policy within the
            app or by other means. Your continued use of the app after such modifications constitutes your
            acknowledgment of the modified Privacy Policy.
          </p>
        </div>
      ),
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">Back</span>
            </button>
            <div className="flex items-center gap-2 text-blue-600">
              <Shield className="h-6 w-6" />
              <span className="font-semibold">Privacy Policy</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <Shield className="h-8 w-8 text-blue-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Privacy Policy for iTaxEasy</h1>
            <div className="flex items-center justify-center gap-2 text-gray-600 mb-4">
              <Calendar className="h-4 w-4" />
              <span className="text-lg font-medium">Effective Date: 24/05/2023</span>
            </div>
            <p className="text-gray-700 leading-relaxed max-w-2xl mx-auto">
              Thank you for using iTaxEasy. This Privacy Policy outlines how we collect, use, store, and protect your
              personal information when you use our finance app. By using iTaxEasy, you consent to the practices
              described in this Privacy Policy.
            </p>
          </div>
        </div>

        {/* Table of Contents */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Table of Contents</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {sections.map((section, index) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
              >
                <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                  {section.icon}
                </div>
                <div>
                  <span className="font-medium text-gray-900">
                    {index + 1}. {section.title}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <div
              key={section.id}
              id={section.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg">{section.icon}</div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                  {index + 1}. {section.title}
                </h3>
              </div>
              {section.content}
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-sm p-8 mt-8 text-white">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
              <Mail className="h-8 w-8" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Contact Us</h3>
            <p className="text-blue-100 leading-relaxed mb-6 max-w-2xl mx-auto">
If you have any questions or concerns about this Privacy Policy or our privacy practices, please don&apos;t
              hesitate to reach out to us.
            </p>
            <a
              href="mailto:support@itaxeasy.com"
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              <Mail className="h-5 w-5" />
              support@itaxeasy.com
            </a>
          </div>
        </div>

        {/* Acknowledgment */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8 mt-8">
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-0.5">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-green-800 mb-2">Acknowledgment</h4>
                <p className="text-green-700 leading-relaxed">
                  By using iTaxEasy, you acknowledge that you have read and understood this Privacy Policy and agree to
                  the collection, use, and disclosure of your personal information as described herein.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
