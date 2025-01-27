"use client";

import { createContext, useState, useEffect, useContext } from "react";

interface FavouritesContextValue {
  favourites: any[];
  addProduct: (product: any) => void;
  removeProduct: (product: any) => void;
  isFavourite: (product: any) => boolean;
  totalFavourites: number; // Renamed from totalQuantity to totalFavourites
  loading: boolean;
}

export const FavouritesContext = createContext<FavouritesContextValue | undefined>(undefined);

export const FavouritesProvider = ({ children }: { children: React.ReactNode }) => {
  const [favourites, setFavourites] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedFavourites = localStorage.getItem("favourites");
    if (storedFavourites) {
      setFavourites(JSON.parse(storedFavourites));
    }
    setLoading(false);
  }, []);

  const addProduct = (product: any) => {
    const updatedFavourites = [...favourites, product];
    setFavourites(updatedFavourites);
    localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
  };

  const removeProduct = (product: any) => {
    const updatedFavourites = favourites.filter((item) => item._id !== product._id);
    setFavourites(updatedFavourites);
    localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
  };

  const isFavourite = (product: any) => {
    return favourites.some((item) => item._id === product._id);
  };

  return (
    <FavouritesContext.Provider
      value={{
        favourites,
        addProduct,
        removeProduct,
        isFavourite,
        totalFavourites: favourites.length, // Updated to reflect the total number of favorites
        loading,
      }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};

export const useFavourites = (): FavouritesContextValue => {
  const context = useContext(FavouritesContext);
  if (!context) {
    throw new Error("useFavourites must be used within a FavouritesProvider");
  }
  return context;
};
