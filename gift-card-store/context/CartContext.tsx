'use client';

import React, { createContext, useContext, useState, type ReactNode, useEffect } from 'react';
import { GiftCard } from '../data/types';
type CartItem = {
  card: GiftCard;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  addItem: (card: GiftCard, quantity?: number) => void;
  removeItem: (cardId: string) => void;
  updateQuantity: (cardId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    // Only attempt to read from localStorage on client-side
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('cart');
        return saved ? JSON.parse(saved) : [];
      } catch (error) {
        console.error('Error reading cart from localStorage:', error);
        return [];
      }
    }
    return [];
  });

  // Update localStorage whenever items change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(items));
    }
  }, [items]);

  const addItem = (card: GiftCard, quantity = 1) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.card.id === card.id);
      
      if (existingItem) {
        return prevItems.map((item) =>
          item.card.id === card.id
            ? {
                ...item,
                quantity: item.quantity + quantity,
              }
            : item
        );
      }
      
      return [
        ...prevItems,
        {
          card,
          quantity,
        },
      ];
    });
  };
  const removeItem = (cardId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.card.id !== cardId))
  }
  const updateQuantity = (cardId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(cardId)
      return
    }
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.card.id === cardId
          ? {
              ...item,
              quantity,
            }
          : item,
      ),
    )
  }
  const clearCart = () => {
    setItems([])
  }
  const totalItems = items.reduce((total, item) => total + item.quantity, 0)
  const totalPrice = items.reduce(
    (total, item) => total + item.card.price * item.quantity,
    0,
  )
  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
export function useCart() {
  const context = useContext(CartContext);
  
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  
  return context;
}
