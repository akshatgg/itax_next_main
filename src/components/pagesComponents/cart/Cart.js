"use client"
import Image from "next/image"
import RemoveFromCart from "./RemoveFromCart"
import ButtonLink from "../dashboard/GSTR/Button"
import { iconList } from "../apiService/staticData"
import { formatINRCurrency } from "@/utils/utilityFunctions"
import { useCallback, useEffect, useState } from "react"
import { toast } from "react-toastify"
import UseAuth from "../../../hooks/useAuth"
import axios from "axios"
import { makePayment, createOrder } from "../../../utils/razorpay"
import { ShoppingCart, Package, ArrowRight, AlertCircle, CheckCircle2 } from "lucide-react"

export default function Cart() {
  const { token } = UseAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const [startupcartItems, setStartUpCartItems] = useState([])
  const [refreshKey, setRefreshKey] = useState(0)
  const [isPaymentLoading, setIsPaymentLoading] = useState(false)
  const [paymentError, setPaymentError] = useState(null)
  const [termsAccepted, setTermsAccepted] = useState(false)

  // Function to refresh both carts
  const refreshCart = useCallback(() => {
    setRefreshKey((prevKey) => prevKey + 1)
  }, [])

  const fetchServiceCart = useCallback(async () => {
    if (!token) return

    try {
      setIsLoading(true)
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACK_URL}/cart/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (response.status === 200 && response.data) {
        setCartItems(response.data.services || [])
      }
    } catch (error) {
      console.error("Error fetching cart:", error)
    } finally {
      setIsLoading(false)
    }
  }, [token])

  const fetchStartupCart = useCallback(async () => {
    if (!token) return

    try {
      setIsLoading(true)
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACK_URL}/cartStartup/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (response.status === 200 && response.data) {
        setStartUpCartItems(response.data.startupItems || [])
      }
    } catch (error) {
      console.error("Error fetching startup cart:", error)
    } finally {
      setIsLoading(false)
    }
  }, [token])

  useEffect(() => {
    if (token) {
      fetchServiceCart()
      fetchStartupCart()
    }
  }, [token, refreshKey])

  // Calculate totals
  const serviceSubtotal = cartItems.reduce((total, item) => total + (item.price || 0), 0)
  const startupSubtotal = startupcartItems.reduce(
    (total, item) => total + (item.price ? item.price : item.priceWithGst || 0),
    0,
  )
  const gstRate = 0.18 // 18% GST
  const gstAmount = serviceSubtotal * gstRate
  const serviceTotalWithGST = serviceSubtotal + gstAmount
  const subtotal = serviceSubtotal + startupSubtotal
  const totalWithGst = serviceTotalWithGST + startupSubtotal

  const handlePayment = async () => {
    if (!token) {
      toast.error("Please login to continue with payment")
      return
    }

    if (cartItems.length === 0 && startupcartItems.length === 0) {
      toast.error("Your cart is empty")
      return
    }

    if (!termsAccepted) {
      toast.error("Please accept the terms and privacy policy")
      return
    }

    try {
      setIsPaymentLoading(true)
      setPaymentError(null)

      // Step 1: Calculate amounts
      // For regular services, we'll add GST
      const serviceSubtotal = cartItems.reduce((total, item) => total + (item.price || 0), 0)
      const serviceGST = serviceSubtotal * 0.18 // 18% GST
      const serviceTotalWithGST = serviceSubtotal + serviceGST

      // For startup items, use priceWithGst as it already includes GST
      const startupTotal = startupcartItems.reduce((total, item) => total + (item.priceWithGst || 0), 0)

      // Calculate final total
      const totalAmount = Math.round(serviceTotalWithGST + startupTotal)

      if (totalAmount <= 0) {
        throw new Error("Invalid order amount")
      }

      console.log({
        serviceSubtotal,
        serviceGST,
        serviceTotalWithGST,
        startupTotal,
        totalAmount,
      })

      // Step 2: Create Razorpay order with retry mechanism
      let orderData
      let retryCount = 0
      const maxRetries = 3

      while (retryCount < maxRetries) {
        try {
          orderData = await createOrder(totalAmount)
          if (orderData && orderData.id) break
          retryCount++
        } catch (err) {
          if (retryCount === maxRetries - 1) throw err
          await new Promise((resolve) => setTimeout(resolve, 1000 * retryCount))
        }
      }

      if (!orderData || !orderData.id) {
        throw new Error("Failed to create order")
      }

      // Step 3: Initiate payment
      await makePayment(totalAmount, {
        ...orderData,
        prefill: {
          name: token?.name || "",
          email: token?.email || "",
          contact: token?.phone || "",
        },
        handler: async (response) => {
          try {
            // Handle successful payment
            const paymentData = {
              orderId: orderData.id,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature,
              amount: totalAmount,
              services: cartItems.map((item) => ({
                ...item,
                gstAmount: (item.price || 0) * 0.18,
                totalWithGst: (item.price || 0) * 1.18,
              })),
              startupServices: startupcartItems.map((item) => ({
                ...item,
                // For startup services, priceWithGst already includes GST
                gstAmount: item.priceWithGst - item.price,
                totalWithGst: item.priceWithGst,
              })),
            }

            // Update order status
            await axios.post(`${process.env.NEXT_PUBLIC_BACK_URL}/payment/verify`, paymentData, {
              headers: { Authorization: `Bearer ${token}` },
            })

            toast.success("Payment successful!")
            refreshCart() // Refresh cart after successful payment
          } catch (error) {
            console.error("Payment verification error:", error)
            toast.error("Payment verification failed. Please contact support.")
          }
        },
      })
    } catch (error) {
      console.error("Payment error:", error)
      setPaymentError(error.message)
      toast.error(error.message || "Payment failed. Please try again.")
    } finally {
      setIsPaymentLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <div className="flex flex-col items-center gap-4">
          <Image src={"/loading.svg"} width={60} height={60} alt="Loading.." />
          <p className="text-gray-600 animate-pulse">Loading your cart...</p>
        </div>
      </div>
    )
  }

  const hasItems =
    (Array.isArray(cartItems) && cartItems.length > 0) ||
    (Array.isArray(startupcartItems) && startupcartItems.length > 0)

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-2">
            <ShoppingCart className="h-6 w-6 md:h-7 md:w-7 text-blue-600" />
            Your Cart
          </h1>
          <ButtonLink title="Continue Shopping" linkTo="/apis/all_apis" className="flex items-center gap-1 text-sm" />
        </div>

        {hasItems ? (
          <div className="grid md:grid-cols-3 gap-6">
            {/* Cart Items Section */}
            <div className="md:col-span-2 space-y-4">
              {/* Services Section */}
              {cartItems.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                  <div className="bg-blue-50 px-4 py-3 border-b border-blue-100">
                    <h2 className="font-semibold text-blue-800 flex items-center gap-2">
                      <Package className="h-4 w-4" />
                      Services
                    </h2>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {cartItems.map((item) => (
                      <div
                        key={`service-${item.id}`}
                        className="p-4 hover:bg-gray-50 transition-colors duration-200 group"
                      >
                        <div className="flex gap-4">
                          <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-blue-50 transition-colors duration-200">
                            {iconList[item.title]?.icon ? (
                              <span className="h-8 w-8 text-blue-600">{iconList[item.title]?.icon}</span>
                            ) : (
                              <Image
                                src={iconList[item.title]?.src || "/default-service.svg"}
                                width={40}
                                height={40}
                                alt={item.title}
                                className="object-contain"
                              />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-base font-medium text-gray-900 truncate">
                              {item.title}
                              {item.category && <span className="ml-2 text-xs text-gray-500">({item.category})</span>}
                            </h3>
                            <div className="mt-1 flex flex-wrap gap-2">
                              <ButtonLink
                                title="View Details"
                                size="xs"
                                linkTo={item?.link || `/apis/all_apis/${item.id}`}
                                className="text-xs"
                              />
                              <RemoveFromCart refresh={refreshCart} item={item} type="service" />
                            </div>
                          </div>
                          <div className="flex-shrink-0 flex flex-col items-end">
                            <span className="font-medium text-gray-900">{formatINRCurrency(item.price)}</span>
                            <span className="text-xs text-gray-500 mt-1">
                              +{formatINRCurrency(item.price * 0.18)} GST
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Startup Items Section */}
              {startupcartItems.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                  <div className="bg-green-50 px-4 py-3 border-b border-green-100">
                    <h2 className="font-semibold text-green-800 flex items-center gap-2">
                      <Package className="h-4 w-4" />
                      Startup Services
                    </h2>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {startupcartItems.map((item) => (
                      <div
                        key={`startup-${item.id}`}
                        className="p-4 hover:bg-gray-50 transition-colors duration-200 group"
                      >
                        <div className="flex gap-4">
                          <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden group-hover:bg-green-50 transition-colors duration-200">
                            <Image
                              src={item.image || "/default-startup.svg"}
                              width={50}
                              height={50}
                              alt={item.title}
                              className="object-contain"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-base font-medium text-gray-900 truncate">
                              {item.title}
                              {item.category && <span className="ml-2 text-xs text-gray-500">({item.category})</span>}
                            </h3>
                            {item.aboutService && (
                              <p className="mt-1 text-xs text-gray-500 line-clamp-2">{item.aboutService}</p>
                            )}
                            <div className="mt-2 flex flex-wrap gap-2">
                              <ButtonLink
                                title="View Details"
                                size="xs"
                                linkTo={`/register-startup/registration/${item.id}`}
                                className="text-xs"
                              />
                              <RemoveFromCart refresh={refreshCart} item={item} type="startup" />
                            </div>
                          </div>
                          <div className="flex-shrink-0 flex flex-col items-end">
                            <span className="font-medium text-gray-900">
                              {formatINRCurrency(item.priceWithGst || item.price)}
                            </span>
                            {item.price !== item.priceWithGst && (
                              <span className="text-xs text-gray-500 mt-1">(GST included)</span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Order Summary Section */}
            <div className="md:col-span-1">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 sticky top-4">
                <div className="bg-gradient-to-r from-blue-50 to-gray-50 px-4 py-3 border-b border-gray-200">
                  <h2 className="font-semibold text-gray-800">Order Summary</h2>
                </div>
                <div className="p-5 space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">{formatINRCurrency(subtotal)}</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">GST (18%)</span>
                    <span className="font-medium">{formatINRCurrency(gstAmount)}</span>
                  </div>

                  {paymentError && (
                    <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm flex items-start gap-2">
                      <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                      <p>{paymentError}</p>
                    </div>
                  )}

                  <div className="mt-4 flex items-start gap-2">
                    <input
                      type="checkbox"
                      id="terms-policy"
                      className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                    />
                    <label htmlFor="terms-policy" className="text-sm text-gray-600">
                      I agree to the{" "}
                      <a href="/privacy-policy" className="text-blue-600 hover:underline">
                        Terms and Privacy Policy
                      </a>
                    </label>
                  </div>

                  <div className="border-t border-gray-200 pt-4 mt-2">
                    <div className="flex justify-between">
                      <span className="text-lg font-semibold text-gray-900">Total</span>
                      <span className="text-lg font-bold text-blue-700">{formatINRCurrency(totalWithGst)}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      GST is applied only to services, not to startup items with included GST
                    </p>
                  </div>

                  <button
                    onClick={handlePayment}
                    disabled={isPaymentLoading || !hasItems || !termsAccepted}
                    className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow transition-colors duration-200 flex items-center justify-center gap-2 disabled:bg-blue-300 disabled:cursor-not-allowed"
                  >
                    {isPaymentLoading ? (
                      <>
                        <Image src="/loading.svg" width={20} height={20} alt="Loading" />
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <span>Proceed to Payment</span>
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-2 text-xs text-gray-500 mt-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>Secure payment via Razorpay</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <div className="flex flex-col items-center gap-6 max-w-md mx-auto py-12">
              <div className="bg-blue-50 p-6 rounded-full animate-pulse">
                <ShoppingCart className="w-16 h-16 text-blue-500" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">Your Cart is Empty</h2>
              <p className="text-gray-600 max-w-sm mx-auto">
                Looks like you haven&apos;t added any services or startup packages to your cart yet.
              </p>
              <ButtonLink title="Browse Services" linkTo="/apis/all_apis" className="mt-4 px-6 py-2.5 text-base" />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
