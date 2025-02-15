"use client";
import { BrowseCategory, Hero, IconSlider, Products } from "./components";
// import Footer from '@/components/Footer';
import HeroTwo from "./components/HeroTwo";
import { AppProvider } from "./context/AppContext"; // Import AppProvider
import { CartProvider } from "./context/CartContext"; // Import CartProvider
import { FavouritesProvider } from "./context/FavouritesContext"; // Import FavouritesProvider

export default function Home() {
  return (
    <AppProvider>
      {/* Hero */}
      <Hero />
      {/* Products */}

      <div className="bg-[#FAFAFA] pt-14 pb-0 mt-10 text-center">
        <h1 className="text-3xl font-bold">Best Selling Products</h1>
        <h1 className="">Enjoy Up To 50% off</h1>
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

      <div>
        <HeroTwo />
      </div>
    </AppProvider>
  );
}
