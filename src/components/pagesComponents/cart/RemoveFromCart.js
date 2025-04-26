import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Image from 'next/image';
import axios from 'axios';
import UseAuth from '../../../hooks/useAuth';

const RemoveFromCart = ({ item, refresh, type = type }) => {
  const { token } = UseAuth(); 
  const [isLoading, setIsLoading] = useState(false);

  const handlerRemoveFromCart = async () => {
    try {
      setIsLoading(true);
      
      // Determine the endpoint based on the item type
      const endpoint = type === 'startup' 
        ? `${process.env.NEXT_PUBLIC_BACK_URL}/cartStartup/` 
        : `${process.env.NEXT_PUBLIC_BACK_URL}/cart/`;
      
      const { data, status } = await axios.delete(
        endpoint,
        {
          data: { serviceId: item.id },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (status === 200) {
        toast.success(data.message || 'Item removed from cart');
        // Ensure refresh is called properly
        if (typeof refresh === 'function') {
          await refresh();
        }
      }
    } catch (error) {
      toast.error('Failed to remove item from cart');
      console.error('Error removing item from cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handlerRemoveFromCart}
      disabled={isLoading}
      className="focus-within:outline min-w-[150px] flex justify-center focus-within:outline-slate-700 border-none py-[8px] px-[15px] rounded-md text-slate-800 font-semibold disabled:cursor-not-allowed disabled:opacity-50"
      style={{
        backgroundColor: 'white',
        marginLeft: '1rem',
      }}
    >
      {isLoading ? (
        <Image
          loading="eager"
          width={25}
          height={25}
          src="/loading.svg"
          alt="Loading..."
        />
      ) : (
        'Remove From Cart'
      )}
    </button>
  );
};

export default RemoveFromCart;