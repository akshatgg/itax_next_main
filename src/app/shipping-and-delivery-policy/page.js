"use client"
import { ArrowLeft, Truck, Monitor, AlertCircle, Calendar, CheckCircle2 } from "lucide-react"
import { useRouter } from "next/navigation"

export default function ShippingAndDeliveryPolicy() {
  const router = useRouter()

  // Create a new Date object for the current date
  const currentDate = new Date()

  // Format the current date as desired
  const lastUpdated = currentDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })

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
              <Truck className="h-6 w-6" />
              <span className="font-semibold">Shipping & Delivery Policy</span>
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
              <Truck className="h-8 w-8 text-blue-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Shipping & Delivery Policy</h1>
            <div className="flex items-center justify-center gap-2 text-gray-600 mb-6">
              <Calendar className="h-4 w-4" />
              <span className="text-lg font-medium">Last updated on {lastUpdated}</span>
            </div>
          </div>
        </div>

        {/* Digital Services Notice */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8 mb-8">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full">
                <Monitor className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Digital Services Only</h3>
              <p className="text-gray-700 leading-relaxed">
                Shipping is not applicable for our services at iTaxEasy. As we primarily provide digital services
                related to taxation, GST filing, and online products, there are no physical shipments involved.
              </p>
            </div>
          </div>
        </div>

        {/* Service Delivery Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg">
              <CheckCircle2 className="h-5 w-5 text-blue-600" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900">How We Deliver Our Services</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h4 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
                <Monitor className="h-5 w-5" />
                Digital Platform Access
              </h4>
              <p className="text-gray-700 text-sm">
                All our services are delivered through our secure online platform. You&apos;ll receive instant access to your
                dashboard and tools upon successful registration and payment.
              </p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h4 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5" />
                Immediate Availability
              </h4>
              <p className="text-gray-700 text-sm">
                Our tax filing, GST services, and online products are available immediately after purchase. No waiting
                for physical delivery required.
              </p>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
              <h4 className="font-semibold text-purple-800 mb-3 flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                24/7 Access
              </h4>
              <p className="text-gray-700 text-sm">
                Access your services anytime, anywhere through our web platform. Your data and tools are always
                available when you need them.
              </p>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
              <h4 className="font-semibold text-amber-800 mb-3 flex items-center gap-2">
                <Truck className="h-5 w-5" />
                Cloud-Based Delivery
              </h4>
              <p className="text-gray-700 text-sm">
                All services are delivered through secure cloud infrastructure, ensuring reliability and instant access
                to your tax and GST solutions.
              </p>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-6 w-6 text-amber-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-amber-800 mb-2">Disclaimer</h4>
                <p className="text-amber-700 leading-relaxed">
                  The above content is provided solely for informational purposes by iTaxEasy. We take every effort to
                  ensure accuracy, but we shall not be liable for any claims or liabilities arising from non-adherence
                  to this policy by our users.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="bg-gradient-to-r from-gray-600 to-gray-700 rounded-xl shadow-sm p-8 mt-8 text-white">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Questions About Our Services?</h3>
            <p className="text-gray-100 leading-relaxed mb-6 max-w-2xl mx-auto">
              Since we provide digital services only, there are no shipping delays or delivery concerns. If you have any
              questions about accessing your services, our support team is here to help.
            </p>
            <a
              href="mailto:support@itaxeasy.com"
              className="inline-flex items-center gap-2 bg-white text-gray-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              <Monitor className="h-5 w-5" />
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
