'use client'

import { useState } from 'react';
import { Footer, Hero, Products } from './components';
import { AppProvider } from './context/AppContext';  // Import AppProvider
import { CartProvider } from './context/CartContext';  // Import CartProvider
import { FavouritesProvider } from './context/FavouritesContext';  // Import FavouritesProvider
import Navbar from './components/NavBar';

export default function Home() {
  const [showCart, setShowCart] = useState(false);

  return (
    <AppProvider>
      <CartProvider>
        <FavouritesProvider>
          <Navbar />
          <Hero />
          <Products />
          <Footer />
        </FavouritesProvider>
      </CartProvider>
    </AppProvider>
  );
}
