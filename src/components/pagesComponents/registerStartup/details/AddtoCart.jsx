'use client';

import useAuth from '@/hooks/useAuth';
import api from '@/lib/userNextAxios';
import Actions from '@/store/actions';
import { StoreContext } from '@/store/store-context';
import { useRouter } from 'next/navigation';
import { useCallback, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

function AddToCart({ item }) {
  const { token } = useAuth();
  const [_, dispatch] = useContext(StoreContext);
  const [loading, setLoading] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const router = useRouter();

  const refreshPage = () => router.refresh();

  // Check if the item is in the cart - revised to properly check current item
  const checkCartStatus = useCallback(async () => {
    try {
      if (!item?.id || !token) return;
      
      setLoading(true);
      // Get all cart items
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACK_URL}/cartStartup/`, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Check if our specific item is in the cart
      if (response.status === 200 && response.data) {
        const cartItems = response.data.startupItems || response.data.data || [];
        
        // Check if item exists in cart using both possible ID fields
        const itemExists = cartItems.some(cartItem => {
          const cartItemId = cartItem.id || cartItem.startupId;
          const currentItemId = item.id || item.startupId;
          return cartItemId === currentItemId;
        });

        console.log('Cart check:', {
          cartItems,
          currentItem: item,
          isInCart: itemExists
        });

        setIsInCart(itemExists);
      } else {
        setIsInCart(false);
      }
    } catch (error) {
      console.error("Error checking cart status:", error);
      setIsInCart(false);
    } finally {
      setLoading(false);
    }
  }, [item, token]);

  // Add item to cart
  async function addToCartHandler() {
    try {
      if (loading || !item?.id) return;
      
      setLoading(true);
      const { status, data } = await axios.put(
        `${process.env.NEXT_PUBLIC_BACK_URL}/cartStartup`,
        {
          id: item.id, // body data
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // token in header
          },
        }
      );
      
      if (status === 200) {
        setIsInCart(true);
        toast.success(data.message || 'Successfully added to cart');
        dispatch({ type: Actions.CART_UPDATE_COUNT });
        await checkCartStatus(); // Recheck cart status after adding
        refreshPage();
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error('Failed to add to cart');
    } finally {
      setLoading(false);
    }
  }

  // Remove item from cart
  async function removeFromCartHandler() {
    try {
      if (loading || !item?.id) return;
      
      setLoading(true);
      const { status, data } = await axios.delete(
        `${process.env.NEXT_PUBLIC_BACK_URL}/cartStartup`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            id: item.id,
          },
        }
      );
      
      if (status === 200) {
        setIsInCart(false);
        toast.success(data.message || 'Successfully removed from cart');
        dispatch({ type: Actions.CART_UPDATE_COUNT });
        await checkCartStatus(); // Recheck cart status after removing
        refreshPage();
      }
    } catch (error) {
      console.error("Error removing from cart:", error);
      toast.error('Failed to remove item from cart');
    } finally {
      setLoading(false);
    }
  }

  // Check cart status when component mounts or item changes
  useEffect(() => {
    if (item && token) {
      checkCartStatus();
    }
  }, [item, token, checkCartStatus]);

  if (!token) {
    return (
      <button
        onClick={() => router.push('/login')} 
        className="btn-primary"
      >
        Sign in to add to cart
      </button>
    );
  }

  return (
    <>
      {!isInCart ? (
        <button
          onClick={addToCartHandler}
          disabled={loading}
          className="btn-primary"
          aria-label="Add to cart"
        >
          {loading ? (
            <span className="inline-block w-4 h-4 border-white border-b-zinc-400 border-r-zinc-400 border-2 border-solid rounded-full animate-spin"></span>
          ) : (
            'Add to Cart'
          )}
        </button>
      ) : (
        <button
          onClick={removeFromCartHandler}
          disabled={loading}
          className="btn-primary bg-red-600 hover:bg-red-700"
          aria-label="Remove from cart"
        >
          {loading ? (
            <span className="inline-block w-4 h-4 border-white border-b-zinc-400 border-r-zinc-400 border-2 border-solid rounded-full animate-spin"></span>
          ) : (
            'Remove from Cart'
          )}
        </button>
      )}
    </>
  );
}

export default AddToCart;