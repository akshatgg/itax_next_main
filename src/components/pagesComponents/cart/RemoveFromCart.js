import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
// import { useRouter } from 'next/router';
// import Loader from '@/components/partials/loading/Loader';
// import LoadingComponent from '@/components/partials/loading/LoadingComponent';
import Image from 'next/image';
import api from '@/lib/userNextAxios';

const RemoveFromCart = ({ item, refresh, type = 'service' }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handlerRemoveFromCart = async () => {
    try {
      setIsLoading(true);

      const { data } = await api.put('api/cart/delete', {
        ...(type === 'service' && { serviceIds: [item.id] }),
        ...(type === 'registerStartup' && { registerStartupIds: [item.id] }),
        ...(type === 'registerService' && { registerServiceIds: [item.id] }),
      });

      if (data.status === 200) {
        toast.success(data.message);
        await refresh();
      }
    } catch (error) {
      toast.error('Failed to remove item from cart');
      console.log('🚀 ~ handlerRemoveFromCart ~ error:', error);
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
