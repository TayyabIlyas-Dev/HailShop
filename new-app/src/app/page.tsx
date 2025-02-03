"use client";

import { useState } from "react";
import {
  BrowseCategory,
  Footer,
  Hero,
  IconSlider,
  Products,
} from "./components";
import { AppProvider } from "./context/AppContext"; // Import AppProvider
import { CartProvider } from "./context/CartContext"; // Import CartProvider
import { FavouritesProvider } from "./context/FavouritesContext"; // Import FavouritesProvider
// import Navbar from './components/NavBar';

export default function Home() {
  const [showCart, setShowCart] = useState(false);

  return (
    <AppProvider>
      <CartProvider>
        <FavouritesProvider>
          {/* Hero */}
          <Hero />
          {/* Products */}

          <div className="bg-[#FAFAFA] pt-8 pb-0 mt-10 text-center">
            <h1 className="text-3xl font-bold">Best Selling Products</h1>
            <h1 className="">Enjoy Up To 50%</h1>
          </div>
          <div>
          <Products />
          </div>
          <div className="py-6 bg-[#FAFAFA]">
            {/* Iconslider */}

          <IconSlider />
          </div>
          <div>
            {/* Browsecategory */}

          <BrowseCategory />
          </div>
          {/* footer */}
          {/* <Footer /> */}
        </FavouritesProvider>
      </CartProvider>
    </AppProvider>
  );
}
