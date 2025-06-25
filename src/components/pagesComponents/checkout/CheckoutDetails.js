// 'use client';
// import React, { useEffect, useState, useCallback } from 'react';
// import { Title, PaymentButton } from '@/components/Checkout/checkoutStyles';
// import { toast } from 'react-toastify';
// import userAxios from "@/lib/userbackAxios"
// import PayNowHandler from './PayNowHandler';
// import UseAuth from '@/hooks/useAuth';
// import axios from "axios"
// import Image from 'next/image';
// const PaymentPageWrapper = ({ children }) => (
//   <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 py-8 flex items-center justify-center">
//     {children}
//   </div>
// );

// const PaymentForm = ({ children }) => (
//   <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
//     {children}
//   </div>
// );

// export default function CheckoutDetails() {
//   const { token } = UseAuth();
  
//   // State for cart items
//   const [services, setServices] = useState([]);
//   const [registrationStartup, setRegistrationStartup] = useState([]);
//   const [registrationServices, setRegistrationServices] = useState([]);
  
//   const [userDetails, setUserDetails] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     gst: '',
//   });
//   const [isLoading, setIsLoading] = useState(false);
//   const [cartLoading, setCartLoading] = useState(true);

//   // Fetch cart data directly
//   const fetchCartData = useCallback(async () => {
//     if (!token) return;
//     try {
//       setCartLoading(true);
      
//       // Fetch regular services cart
//       const serviceResponse = await axios.get(`${process.env.NEXT_PUBLIC_BACK_URL}/cart/`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
      
//       // Fetch startup cart
//       const startupResponse = await axios.get(`${process.env.NEXT_PUBLIC_BACK_URL}/cartStartup/`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       console.log("Service Cart Data:", serviceResponse.data);
//       console.log("Startup Cart Data:", startupResponse.data);
      
//       if (serviceResponse.status === 200 && serviceResponse.data) {
//         setServices(serviceResponse.data.services || []);
//       }
      
//       if (startupResponse.status === 200 && startupResponse.data) {
//         setRegistrationStartup(startupResponse.data.startupItems || []);
//       }
      
//     } catch (error) {
//       console.error("Error fetching cart data:", error);
//       toast.error("Error loading cart data");
//     } finally {
//       setCartLoading(false);
//     }
//   }, [token]);

//   const getUserDetails = useCallback(async () => {
//     try {
//       setIsLoading(true);
      
//       const { data, status } = await userAxios.get(`/user/profile`)
//       console.log("User Details:", data.data.user);
//       if (status === 200 && data && data.data && data.data.user) {
//         // const { firstName, lastName, email, gst } = data.data.user;
//         // setUserDetails({ firstName, lastName, email, gst });
//         const { firstName, lastName, email } = data.data.user;
//         setUserDetails({ firstName, lastName, email });
//       }
//     } catch (error) {
//       toast.error('Error fetching user details.');
//     } finally {
//       setIsLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     if (!token) return; // Wait for token to be available
//     getUserDetails();
//     fetchCartData();
//   }, [getUserDetails, fetchCartData, token]);
  

//   const calculateTotal = (
//     services,
//     registrationStartup,
//     registrationServices,
//   ) => {
//     const serviceTotal = services.reduce((acc, item) => acc + (item.price || 0), 0);
//     const registrationStartupTotal = registrationStartup.reduce(
//       (acc, item) => acc + (item.priceWithGst || item.price || 0),
//       0,
//     );
//     const registrationServiceTotal = registrationServices.reduce(
//       (acc, item) => acc + (item.price || 0),
//       0,
//     );
//     return serviceTotal + registrationStartupTotal + registrationServiceTotal;
//   };

//   const calculateGST = (serviceTotal) => {
//     // Only calculate GST for services, not for startup items (they already include GST)
//     const servicesSubtotal = services.reduce((acc, item) => acc + (item.price || 0), 0);
//     const registrationServicesSubtotal = registrationServices.reduce((acc, item) => acc + (item.price || 0), 0);
//     return (servicesSubtotal + registrationServicesSubtotal) * 0.18;
//   };

//   const serviceTotal = services.reduce((acc, item) => acc + (item.price || 0), 0);
//   const registrationServiceTotal = registrationServices.reduce((acc, item) => acc + (item.price || 0), 0);
//   const startupTotal = registrationStartup.reduce((acc, item) => acc + (item.priceWithGst || item.price || 0), 0);
  
//   const gstAmount = calculateGST(serviceTotal + registrationServiceTotal);
//   const netTotalAmount = serviceTotal + registrationServiceTotal + startupTotal + gstAmount;

//   if (isLoading || cartLoading || !userDetails.email) {
//     return (
//       <PaymentPageWrapper className="py-10">
//         <PaymentForm>
//           <Title>Payment Page</Title>
//           <div className="flex justify-center items-center bg-gray-200 p-8 mt-5 rounded-lg">
//             <div className="text-center">
//               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
//               <h2 className="text-gray-600">Loading...</h2>
//             </div>
//           </div>
//         </PaymentForm>
//       </PaymentPageWrapper>
//     );
//   }

//   if (!services.length && !registrationStartup.length && !registrationServices.length) {
//     return (
//       <PaymentPageWrapper className="py-10">
//         <PaymentForm>
//           <Title>Payment Page</Title>
//           <div className="flex flex-col items-center justify-center bg-gray-100 p-8 mt-5 rounded-lg">
//             <div className="text-center">
//               <div className="text-6xl mb-4">🛒</div>
//               <h2 className="text-xl font-semibold text-gray-700 mb-2">Your cart is empty</h2>
//               <p className="text-gray-500">Add some items to your cart to proceed with checkout</p>
//               <button 
//                 onClick={() => window.history.back()}
//                 className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
//               >
//                 Go Back to Shopping
//               </button>
//             </div>
//           </div>
//         </PaymentForm>
//       </PaymentPageWrapper>
//     );
//   }

//   return (
//     <PaymentPageWrapper>
//       <PaymentForm>
//         <div className="text-center mb-6">
//           <h1 className="text-3xl font-semibold text-gray-800">
//             Checkout Page
//           </h1>
//         </div>
//         <div className="space-y-4">
//           <div className="bg-gray-50 p-4 rounded-lg flex justify-between items-center">
//             <span className="text-gray-600">Name</span>
//             <span className="font-medium text-gray-800">
//               {userDetails.firstName} {userDetails.lastName}
//             </span>
//           </div>
//           <div className="bg-gray-50 p-4 rounded-lg flex justify-between items-center">
//             <span className="text-gray-600">Email</span>
//             <span className="font-medium text-gray-800">
//               {userDetails.email}
//             </span>
//           </div>
//           {userDetails.gst && (
//             <div className="bg-gray-50 p-4 rounded-lg flex justify-between items-center">
//               <span className="text-gray-600">GST</span>
//               <span className="font-medium text-gray-800">
//                 {userDetails.gst}
//               </span>
//             </div>
//           )}
          
//           {/* Services Section */}
//           {services.map((item) => (
//             <div
//               key={`service-${item.id}`}
//               className="bg-gray-50 p-4 rounded-lg flex justify-between items-center"
//             >
//               <div>
//                 <span className="text-gray-600">Service</span>
//                 <div className="font-medium text-gray-800">{item.title}</div>
//                 {item.image && (
//                   <Image
//                    height={80}
//                     width={80}
//                     src={item.image}
//                     alt={item.title}
//                     className="mt-2 w-20 h-20 object-cover rounded-md"
//                   />
//                 )}
//               </div>
//               <div>
//                 <span className="text-gray-600">Price</span>
//                 <div className="font-medium text-gray-800">₹{item.price}</div>
//               </div>
//             </div>
//           ))}
          
//           {/* Startup Services Section */}
//           {registrationStartup.map((item) => (
//             <div
//               key={`startup-${item.id}`}
//               className="bg-gray-50 p-4 rounded-lg flex justify-between items-center"
//             >
//               <div>
//                 <span className="text-gray-600">Startup Service</span>
//                 <div className="font-medium text-gray-800">{item.title}</div>
//                 {item.image && (
//                   <Image
//                    height={80}
//                     width={80}
//                     src={item.image}
//                     alt={item.title}
//                     className="mt-2 w-20 h-20 object-cover rounded-md"
//                   />
//                 )}
//               </div>
//               <div>
//                 <span className="text-gray-600">Price</span>
//                 <div className="font-medium text-gray-800">
//                   ₹{item.priceWithGst || item.price} {item.priceWithGst && <span className="text-xs text-gray-500">(GST included)</span>}
//                 </div>
//               </div>
//             </div>
//           ))}
          
//           {/* Registration Services Section */}
//           {registrationServices.map((item) => (
//             <div
//               key={`reg-service-${item.id}`}
//               className="bg-gray-50 p-4 rounded-lg flex justify-between items-center"
//             >
//               <div>
//                 <span className="text-gray-600">Registration Service</span>
//                 <div className="font-medium text-gray-800">{item.title}</div>
//                 {item.image && (
//                   <Image
//                     height={80}
//                     width={80}
//                     src={item.image}
//                     alt={item.title}
//                     className="mt-2 w-20 h-20 object-cover rounded-md"
//                   />
//                 )}
//               </div>
//               <div>
//                 <span className="text-gray-600">Price</span>
//                 <div className="font-medium text-gray-800">₹{item.price}</div>
//               </div>
//             </div>
//           ))}
          
//           {/* Totals */}
//           <div className="bg-gray-50 p-4 rounded-lg flex justify-between items-center">
//             <span className="text-gray-600">Subtotal</span>
//             <span className="font-medium text-gray-800">
//               ₹{(serviceTotal + registrationServiceTotal + startupTotal).toFixed(2)}
//             </span>
//           </div>
          
//           <div className="bg-gray-50 p-4 rounded-lg flex justify-between items-center">
//             <span className="text-gray-600">GST (18%)</span>
//             <span className="font-medium text-gray-800">
//               ₹{gstAmount.toFixed(2)}
//             </span>
//           </div>
          
//           <div className="bg-blue-50 p-4 rounded-lg flex justify-between items-center border-2 border-blue-200">
//             <span className="text-lg font-semibold text-gray-800">Net Total Amount</span>
//             <span className="text-lg font-bold text-blue-600">
//               ₹{netTotalAmount.toFixed(2)}
//             </span>
//           </div>
          
//           <div className="flex justify-center mt-8">
//             <PayNowHandler
//               totalAmount={netTotalAmount.toFixed(2)}
//               services={services}
//               registrationStartup={registrationStartup}
//               registrationServices={registrationServices}
//               className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
//             />
//           </div>
//         </div>
//       </PaymentForm>
//     </PaymentPageWrapper>
//   );
// }

"use client";

import React, { useEffect, useState, useCallback } from "react";
import { Title, PaymentButton } from "@/components/Checkout/checkoutStyles";
import { toast } from "react-toastify";
import userAxios from "@/lib/userbackAxios";
import PayNowHandler from "./PayNowHandler";
import { iconList } from "../apiService/staticData";
import UseAuth from "@/hooks/useAuth";
import axios from "axios";
import Image from "next/image";
import { ArrowLeft, ShoppingCart, CheckCircle2, CreditCard } from "lucide-react";
import { useRouter } from "next/navigation";

const PaymentPageWrapper = ({ children }) => (
  <div className="min-h-screen bg-gray-50 py-8 px-4">
    {children}
  </div>
);

const PaymentForm = ({ children }) => (
  <div className="w-full max-w-6xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
    {children}
  </div>
);

export default function CheckoutDetails() {
  const { token } = UseAuth();
  const router = useRouter();
  const [services, setServices] = useState([]);
  const [registrationStartup, setRegistrationStartup] = useState([]);
  const [registrationServices, setRegistrationServices] = useState([]);
  const [userDetails, setUserDetails] = useState({ firstName: '', lastName: '', email: '', gst: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [cartLoading, setCartLoading] = useState(true);

  const fetchCartData = useCallback(async () => {
    if (!token) return;
    try {
      setCartLoading(true);
      const serviceRes = await axios.get(`${process.env.NEXT_PUBLIC_BACK_URL}/cart/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const startupRes = await axios.get(`${process.env.NEXT_PUBLIC_BACK_URL}/cartStartup/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setServices(serviceRes.data?.services || []);
      setRegistrationStartup(startupRes.data?.startupItems || []);
    } catch (error) {
      console.error("Cart load error:", error);
      toast.error("Error loading cart data");
    } finally {
      setCartLoading(false);
    }
  }, [token]);

  const getUserDetails = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await userAxios.get(`/user/profile`);
      const user = res.data?.data?.user;
      if (user) {
        const { firstName, lastName, email, gst } = user;
        setUserDetails({ firstName, lastName, email, gst });
      }
    } catch (error) {
      toast.error("Error fetching user details");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!token) return;
    getUserDetails();
    fetchCartData();
  }, [token, getUserDetails, fetchCartData]);

  // Calculate totals (all prices are GST inclusive)
  const serviceTotal = services.reduce((acc, item) => acc + (item.price || 0), 0);
  const regServiceTotal = registrationServices.reduce((acc, item) => acc + (item.price || 0), 0);
  const startupTotal = registrationStartup.reduce((acc, item) => acc + (item.priceWithGst || item.price || 0), 0);
  const totalAmount = serviceTotal + regServiceTotal + startupTotal;

  const goBackToCart = () => {
    router.push('/cart');
  };

  if (isLoading || cartLoading || !userDetails.email) {
    return (
      <PaymentPageWrapper>
        <PaymentForm>
          <div className="p-8">
            <div className="flex items-center gap-4 mb-6">
              <button
                onClick={goBackToCart}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </button>
              <h1 className="text-2xl font-semibold text-gray-800">Checkout</h1>
            </div>
            <div className="flex flex-col items-center gap-4 py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="text-gray-600">Loading checkout details...</p>
            </div>
          </div>
        </PaymentForm>
      </PaymentPageWrapper>
    );
  }

  if (!services.length && !registrationStartup.length && !registrationServices.length) {
    return (
      <PaymentPageWrapper>
        <PaymentForm>
          <div className="p-8">
            <div className="flex items-center gap-4 mb-6">
              <button
                onClick={goBackToCart}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </button>
              <h1 className="text-2xl font-semibold text-gray-800">Checkout</h1>
            </div>
            <div className="text-center py-16">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-gray-50 rounded-full">
                  <ShoppingCart className="h-12 w-12 text-gray-400" strokeWidth={1.5} />
                </div>
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">Your cart is empty</h2>
              <p className="text-gray-600 mb-8">Add some items to your cart to continue with checkout.</p>
              <button 
                onClick={goBackToCart}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2 mx-auto"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Cart
              </button>
            </div>
          </div>
        </PaymentForm>
      </PaymentPageWrapper>
    );
  }

  return (
    <PaymentPageWrapper>
      <PaymentForm>
        {/* Header with Back Button */}
        <div className="bg-gradient-to-r from-blue-50 to-gray-50 p-6 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <button
              onClick={goBackToCart}
              className="p-2 hover:bg-white hover:shadow-sm rounded-lg transition-all duration-200 flex items-center gap-2 text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft className="h-5 w-5" />
           
            </button>
            <div className="flex-1">
              <h1 className="text-2xl font-semibold text-gray-800">Checkout</h1>
              <p className="text-sm text-gray-600 mt-1">Complete your purchase securely</p>
            </div>
          </div>
        </div>

        {/* Main Content - Two Column Layout */}
        <div className="lg:grid lg:grid-cols-3 lg:gap-8 p-6">
          {/* Left Column - Customer Details & Order Items */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer Details */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold text-sm">1</span>
                </div>
                Customer Information
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { label: "Name", value: `${userDetails.firstName} ${userDetails.lastName}` },
                  { label: "Email", value: userDetails.email },
                  ...(userDetails.gst ? [{ label: "GST Number", value: userDetails.gst }] : [])
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between items-center bg-white px-4 py-3 rounded-lg border border-gray-100">
                    <span className="text-sm font-medium text-gray-600">{label}</span>
                    <span className="text-gray-800 text-sm">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold text-sm">2</span>
                </div>
                Order Items
              </h2>
              <div className="space-y-3">
                {[
                  ...services.map(item => ({ ...item, type: "Service", price: item.price })),
                  ...registrationStartup.map(item => ({ ...item, type: "Startup", price: item.priceWithGst || item.price })),
                  ...registrationServices.map(item => ({ ...item, type: "Registration", price: item.price }))
                ].map((item, idx) => (
                  <div key={idx} className="bg-gray-50 border border-gray-100 rounded-lg p-4 flex items-center justify-between hover:shadow-sm transition-shadow duration-200">
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-white rounded-lg flex items-center justify-center border border-gray-200">
                        {/* Icon logic remains the same */}
                        {item.type === "Service" && (
                          <>
                            {iconList[item.title]?.icon ? (
                              <span className="h-6 w-6 text-blue-600">{iconList[item.title]?.icon}</span>
                            ) : (
                              <Image
                                src={iconList[item.title]?.src || "/default-service.svg"}
                                width={24}
                                height={24}
                                alt={item.title}
                                className="object-contain"
                              />
                            )}
                          </>
                        )}
                        
                        {item.type === "Startup" && (
                          <Image
                            src={item.image || "/default-startup.svg"}
                            width={24}
                            height={24}
                            alt={item.title}
                            className="object-contain"
                          />
                        )}
                        
                        {item.type === "Registration" && (
                          <>
                            {iconList[item.title]?.icon ? (
                              <span className="h-6 w-6 text-blue-600">{iconList[item.title]?.icon}</span>
                            ) : (
                              <Image
                                src={iconList[item.title]?.src || "/default-service.svg"}
                                width={24}
                                height={24}
                                alt={item.title}
                                className="object-contain"
                              />
                            )}
                          </>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium text-gray-800">{item.title}</h3>
                          <span className="px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded-full font-medium">
                            {item.type}
                          </span>
                        </div>
                        {item.aboutService && (
                          <p className="text-sm text-gray-500 line-clamp-2">{item.aboutService}</p>
                        )}
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0 ml-4">
                      <div className="text-lg font-semibold text-gray-800">₹{item.price.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">GST included</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Checkout Summary & Payment */}
          <div className="lg:col-span-1 mt-6 lg:mt-0">
            <div className="sticky top-6 space-y-6">
              {/* Checkout Summary */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold text-sm">3</span>
                  </div>
                  Order Summary
                </h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-medium">₹{totalAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-gray-600">
                    <span>GST (18%)</span>
                    <span className="font-medium">₹0.00</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-gray-800">Total Amount</span>
                      <span className="text-2xl font-bold text-blue-600">₹{totalAmount.toLocaleString()}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2 text-center">All prices are inclusive of GST</p>
                  </div>
                </div>

                {/* Payment Button */}
                <div className="space-y-4">
                  <PayNowHandler
                    totalAmount={totalAmount.toFixed(2)}
                    services={services}
                    registrationStartup={registrationStartup}
                    registrationServices={registrationServices}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-4 px-6 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <CreditCard className="h-5 w-5" />
                    Complete Payment
                  </PayNowHandler>
                  
                  {/* Security Features */}
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium text-green-800">Secure Payment</span>
                    </div>
                    <div className="grid grid-cols-1 gap-2 text-xs text-green-700">
                      <div className="flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3" />
                        <span>256-bit SSL Encryption</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3" />
                        <span>PCI DSS Compliant</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3" />
                        <span>Money Back Guarantee</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PaymentForm>
    </PaymentPageWrapper>
  );
}