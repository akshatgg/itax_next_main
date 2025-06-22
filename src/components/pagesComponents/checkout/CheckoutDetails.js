'use client';
import React, { useEffect, useState, useCallback } from 'react';
import { Title, PaymentButton } from '@/components/Checkout/checkoutStyles';
import { toast } from 'react-toastify';
import userAxios from "@/lib/userbackAxios"
import PayNowHandler from './PayNowHandler';
import UseAuth from '@/hooks/useAuth';
import axios from "axios"
import Image from 'next/image';
const PaymentPageWrapper = ({ children }) => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 py-8 flex items-center justify-center">
    {children}
  </div>
);

const PaymentForm = ({ children }) => (
  <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
    {children}
  </div>
);

export default function CheckoutDetails() {
  const { token } = UseAuth();
  
  // State for cart items
  const [services, setServices] = useState([]);
  const [registrationStartup, setRegistrationStartup] = useState([]);
  const [registrationServices, setRegistrationServices] = useState([]);
  
  const [userDetails, setUserDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    gst: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [cartLoading, setCartLoading] = useState(true);

  // Fetch cart data directly
  const fetchCartData = useCallback(async () => {
    if (!token) return;
    try {
      setCartLoading(true);
      
      // Fetch regular services cart
      const serviceResponse = await axios.get(`${process.env.NEXT_PUBLIC_BACK_URL}/cart/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      // Fetch startup cart
      const startupResponse = await axios.get(`${process.env.NEXT_PUBLIC_BACK_URL}/cartStartup/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Service Cart Data:", serviceResponse.data);
      console.log("Startup Cart Data:", startupResponse.data);
      
      if (serviceResponse.status === 200 && serviceResponse.data) {
        setServices(serviceResponse.data.services || []);
      }
      
      if (startupResponse.status === 200 && startupResponse.data) {
        setRegistrationStartup(startupResponse.data.startupItems || []);
      }
      
    } catch (error) {
      console.error("Error fetching cart data:", error);
      toast.error("Error loading cart data");
    } finally {
      setCartLoading(false);
    }
  }, [token]);

  const getUserDetails = useCallback(async () => {
    try {
      setIsLoading(true);
      
      const { data, status } = await userAxios.get(`/user/profile`)
      console.log("User Details:", data.data.user);
      if (status === 200 && data && data.data && data.data.user) {
        // const { firstName, lastName, email, gst } = data.data.user;
        // setUserDetails({ firstName, lastName, email, gst });
        const { firstName, lastName, email } = data.data.user;
        setUserDetails({ firstName, lastName, email });
      }
    } catch (error) {
      toast.error('Error fetching user details.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!token) return; // Wait for token to be available
    getUserDetails();
    fetchCartData();
  }, [getUserDetails, fetchCartData, token]);
  

  const calculateTotal = (
    services,
    registrationStartup,
    registrationServices,
  ) => {
    const serviceTotal = services.reduce((acc, item) => acc + (item.price || 0), 0);
    const registrationStartupTotal = registrationStartup.reduce(
      (acc, item) => acc + (item.priceWithGst || item.price || 0),
      0,
    );
    const registrationServiceTotal = registrationServices.reduce(
      (acc, item) => acc + (item.price || 0),
      0,
    );
    return serviceTotal + registrationStartupTotal + registrationServiceTotal;
  };

  const calculateGST = (serviceTotal) => {
    // Only calculate GST for services, not for startup items (they already include GST)
    const servicesSubtotal = services.reduce((acc, item) => acc + (item.price || 0), 0);
    const registrationServicesSubtotal = registrationServices.reduce((acc, item) => acc + (item.price || 0), 0);
    return (servicesSubtotal + registrationServicesSubtotal) * 0.18;
  };

  const serviceTotal = services.reduce((acc, item) => acc + (item.price || 0), 0);
  const registrationServiceTotal = registrationServices.reduce((acc, item) => acc + (item.price || 0), 0);
  const startupTotal = registrationStartup.reduce((acc, item) => acc + (item.priceWithGst || item.price || 0), 0);
  
  const gstAmount = calculateGST(serviceTotal + registrationServiceTotal);
  const netTotalAmount = serviceTotal + registrationServiceTotal + startupTotal + gstAmount;

  if (isLoading || cartLoading || !userDetails.email) {
    return (
      <PaymentPageWrapper className="py-10">
        <PaymentForm>
          <Title>Payment Page</Title>
          <div className="flex justify-center items-center bg-gray-200 p-8 mt-5 rounded-lg">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
              <h2 className="text-gray-600">Loading...</h2>
            </div>
          </div>
        </PaymentForm>
      </PaymentPageWrapper>
    );
  }

  if (!services.length && !registrationStartup.length && !registrationServices.length) {
    return (
      <PaymentPageWrapper className="py-10">
        <PaymentForm>
          <Title>Payment Page</Title>
          <div className="flex flex-col items-center justify-center bg-gray-100 p-8 mt-5 rounded-lg">
            <div className="text-center">
              <div className="text-6xl mb-4">🛒</div>
              <h2 className="text-xl font-semibold text-gray-700 mb-2">Your cart is empty</h2>
              <p className="text-gray-500">Add some items to your cart to proceed with checkout</p>
              <button 
                onClick={() => window.history.back()}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Go Back to Shopping
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
        <div className="text-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-800">
            Checkout Page
          </h1>
        </div>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg flex justify-between items-center">
            <span className="text-gray-600">Name</span>
            <span className="font-medium text-gray-800">
              {userDetails.firstName} {userDetails.lastName}
            </span>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg flex justify-between items-center">
            <span className="text-gray-600">Email</span>
            <span className="font-medium text-gray-800">
              {userDetails.email}
            </span>
          </div>
          {userDetails.gst && (
            <div className="bg-gray-50 p-4 rounded-lg flex justify-between items-center">
              <span className="text-gray-600">GST</span>
              <span className="font-medium text-gray-800">
                {userDetails.gst}
              </span>
            </div>
          )}
          
          {/* Services Section */}
          {services.map((item) => (
            <div
              key={`service-${item.id}`}
              className="bg-gray-50 p-4 rounded-lg flex justify-between items-center"
            >
              <div>
                <span className="text-gray-600">Service</span>
                <div className="font-medium text-gray-800">{item.title}</div>
                {item.image && (
                  <Image
                    src={item.image}
                    alt={item.title}
                    className="mt-2 w-20 h-20 object-cover rounded-md"
                  />
                )}
              </div>
              <div>
                <span className="text-gray-600">Price</span>
                <div className="font-medium text-gray-800">₹{item.price}</div>
              </div>
            </div>
          ))}
          
          {/* Startup Services Section */}
          {registrationStartup.map((item) => (
            <div
              key={`startup-${item.id}`}
              className="bg-gray-50 p-4 rounded-lg flex justify-between items-center"
            >
              <div>
                <span className="text-gray-600">Startup Service</span>
                <div className="font-medium text-gray-800">{item.title}</div>
                {item.image && (
                  <Image
                    src={item.image}
                    alt={item.title}
                    className="mt-2 w-20 h-20 object-cover rounded-md"
                  />
                )}
              </div>
              <div>
                <span className="text-gray-600">Price</span>
                <div className="font-medium text-gray-800">
                  ₹{item.priceWithGst || item.price} {item.priceWithGst && <span className="text-xs text-gray-500">(GST included)</span>}
                </div>
              </div>
            </div>
          ))}
          
          {/* Registration Services Section */}
          {registrationServices.map((item) => (
            <div
              key={`reg-service-${item.id}`}
              className="bg-gray-50 p-4 rounded-lg flex justify-between items-center"
            >
              <div>
                <span className="text-gray-600">Registration Service</span>
                <div className="font-medium text-gray-800">{item.title}</div>
                {item.image && (
                  <Image
                    src={item.image}
                    alt={item.title}
                    className="mt-2 w-20 h-20 object-cover rounded-md"
                  />
                )}
              </div>
              <div>
                <span className="text-gray-600">Price</span>
                <div className="font-medium text-gray-800">₹{item.price}</div>
              </div>
            </div>
          ))}
          
          {/* Totals */}
          <div className="bg-gray-50 p-4 rounded-lg flex justify-between items-center">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-medium text-gray-800">
              ₹{(serviceTotal + registrationServiceTotal + startupTotal).toFixed(2)}
            </span>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg flex justify-between items-center">
            <span className="text-gray-600">GST (18%)</span>
            <span className="font-medium text-gray-800">
              ₹{gstAmount.toFixed(2)}
            </span>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg flex justify-between items-center border-2 border-blue-200">
            <span className="text-lg font-semibold text-gray-800">Net Total Amount</span>
            <span className="text-lg font-bold text-blue-600">
              ₹{netTotalAmount.toFixed(2)}
            </span>
          </div>
          
          <div className="flex justify-center mt-8">
            <PayNowHandler
              totalAmount={netTotalAmount.toFixed(2)}
              services={services}
              registrationStartup={registrationStartup}
              registrationServices={registrationServices}
              className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            />
          </div>
        </div>
      </PaymentForm>
    </PaymentPageWrapper>
  );
}