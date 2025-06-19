"use client"
import { ArrowLeft, RefreshCw, XCircle, AlertCircle, Mail, FileText, CheckCircle2, Clock } from "lucide-react"
import { useRouter } from "next/navigation"

export default function RefundCancellationPolicy() {
  const router = useRouter()

  const sections = [
    {
      id: "refund-policy",
      title: "Refund Policy",
      icon: <RefreshCw className="h-5 w-5" />,
      content: (
        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-blue-800 mb-3 flex items-center gap-2">
              <FileText className="h-5 w-5" />
              For Tax Filing and GST Services
            </h4>
            <p className="text-gray-700 leading-relaxed">
              We are committed to ensuring your satisfaction with our tax filing and GST-related services. If you
              encounter any issues or decide not to proceed with our services, please contact us at{" "}
              <a href="mailto:support@itaxeasy.com" className="text-blue-600 hover:underline font-medium">
                support@itaxeasy.com
              </a>{" "}
              for assistance.
            </p>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-green-800 mb-3 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5" />
              For Online Products
            </h4>
            <p className="text-gray-700 leading-relaxed">
              For online products purchased through iTaxEasy, refunds may be provided under certain circumstances.
              Please refer to the specific refund policies outlined during the purchase process or contact our support
              team for further assistance.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "cancellation-policy",
      title: "Cancellation Policy",
      icon: <XCircle className="h-5 w-5" />,
      content: (
        <div className="space-y-6">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-amber-800 mb-3 flex items-center gap-2">
              <Clock className="h-5 w-5" />
              For Tax Filing and GST Services
            </h4>
            <p className="text-gray-700 leading-relaxed">
              If you need to cancel your tax filing or GST-related service request, please notify us as soon as
              possible. Cancellation requests received before the commencement of the service will be processed
              accordingly.
            </p>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-purple-800 mb-3 flex items-center gap-2">
              <FileText className="h-5 w-5" />
              For Online Products
            </h4>
            <p className="text-gray-700 leading-relaxed">
              Cancellation policies for online products vary depending on the product and service agreement. Please
              refer to the terms and conditions provided during the purchase or contact our support team for assistance
              with cancellations.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "important-notes",
      title: "Important Notes",
      icon: <AlertCircle className="h-5 w-5" />,
      content: (
        <div className="space-y-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-red-800 mb-4 flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Please Note
            </h4>
            <div className="grid gap-4">
              {[
                "All refund and cancellation requests must be submitted in writing to support@itaxeasy.com",
                "Refunds may be subject to processing fees and eligibility criteria.",
                "Refunds for online products may be contingent upon the product's return or deactivation process.",
                "iTaxEasy reserves the right to modify its refund and cancellation policies at any time without prior notice.",
              ].map((note, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-red-100">
                  <div className="flex-shrink-0 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center mt-0.5 text-white font-bold text-xs">
                    {index + 1}
                  </div>
                  <p className="text-gray-700 text-sm">{note}</p>
                </div>
              ))}
            </div>
          </div>
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
              <RefreshCw className="h-6 w-6" />
              <span className="font-semibold">Refund & Cancellation Policy</span>
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
              <RefreshCw className="h-8 w-8 text-blue-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Refund & Cancellation Policy</h1>
            <p className="text-gray-700 leading-relaxed max-w-2xl mx-auto">
              We understand that circumstances may change, and we strive to provide the best service for our customers
              at iTaxEasy. Please review our refund and cancellation policies below for our tax filing, GST-related
              services, and online products.
            </p>
          </div>
        </div>

        {/* Table of Contents */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Navigation</h2>
          <div className="grid md:grid-cols-3 gap-3">
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
            <h3 className="text-2xl font-bold mb-4">Need Help?</h3>
            <p className="text-blue-100 leading-relaxed mb-6 max-w-2xl mx-auto">
              For any inquiries or assistance regarding refunds or cancellations, please contact our support team. We
              are here to help ensure a seamless experience for our customers.
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
      </div>
    </div>
  )
}
