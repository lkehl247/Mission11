import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Book } from './types/Book';

// Define the cart item type
interface CartItem {
  book: Book;
  quantity: number;
}

// Define the context type
interface CartContextType {
  cart: CartItem[];
  addToCart: (book: Book) => void;
  removeFromCart: (bookID: number) => void;
  clearCart: () => void;
}

// Create the context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Cart Provider component
export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Add book to cart
  const addToCart = (book: Book) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.book.bookID === book.bookID
      );
      if (existingItem) {
        return prevCart.map((item) =>
          item.book.bookID === book.bookID
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { book, quantity: 1 }];
      }
    });
  };

  // Remove book from cart
  const removeFromCart = (bookID: number) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.book.bookID !== bookID)
    );
  };

  // Clear cart
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
