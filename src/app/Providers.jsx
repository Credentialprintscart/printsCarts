'use client';

import React from 'react';
import { Provider } from 'react-redux';
import store from '@/redux/store';
import { CartProvider } from "@/context/CartContext";
import { FavoritesProvider } from "@/context/FavoritesContext";

export function Providers({ children }) {
  return (
    <Provider store={store}>
      <CartProvider>
        <FavoritesProvider>
          {children}
        </FavoritesProvider>
      </CartProvider>
    </Provider>
  );
}
