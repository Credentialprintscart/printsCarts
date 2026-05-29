'use client';
import React, { useEffect, useState } from 'react';
import { FavoritesContext } from './favoritesContextImpl';
export { FavoritesContext };

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('favorites');
      if (raw) {
        // defer setState to avoid calling setState synchronously in effect body
        const parsed = JSON.parse(raw);
        setTimeout(() => setFavorites(parsed), 0);
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    } catch {
      // ignore
    }
  }, [favorites]);

  const isFavorite = (id) => favorites.some(f => f.id === id);

  const addFavorite = (product) => {
    setFavorites(prev => {
      if (prev.some(p => p.id === product.id)) return prev;
      return [product, ...prev];
    });
  };

  const removeFavorite = (id) => {
    setFavorites(prev => prev.filter(p => p.id !== id));
  };

  const toggleFavorite = (product) => {
    if (isFavorite(product.id)) removeFavorite(product.id);
    else addFavorite(product);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, isFavorite, addFavorite, removeFavorite, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

