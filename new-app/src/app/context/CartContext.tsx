"use client";

import { createContext, useState, useEffect, useContext } from "react";

// Define the structure of a product
interface Product {
  _id: string;
  name: string;
  price: number;
  quantity?: number;
  images: string[];
}

// Define the context value
interface CartContextValue {
  onRemove: (product: Product) => void;
  toggleCartItemQty: (id: string, value: "plus" | "minus") => void;
  totalPrice: number;
  totalQuantity: number;
  showCart: boolean;
  setShowCart: (show: boolean) => void;
  qty: number;
  incQty: () => void;
  decQty: () => void;
  cartItems: Product[];
  addProduct: (product: Product, quantity: number) => void;
}

export const CartContext = createContext<CartContextValue | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [showCart, setShowCart] = useState(false);
  const [qty, setQty] = useState(1);
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  // Load cart data from localStorage on initial render (client-side only)
  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
    const storedTotalPrice = JSON.parse(localStorage.getItem("totalPrice") || "0");
    const storedTotalQuantity = JSON.parse(localStorage.getItem("totalQuantity") || "0");

    setCartItems(storedCartItems);
    setTotalPrice(storedTotalPrice);
    setTotalQuantity(storedTotalQuantity);
  }, []);

  // Save cart data to localStorage whenever it changes
  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      localStorage.setItem("totalPrice", JSON.stringify(totalPrice));
      localStorage.setItem("totalQuantity", JSON.stringify(totalQuantity));
    }
  }, [cartItems, totalPrice, totalQuantity]);

  // Increase quantity
  const incQty = () => setQty((prevQty) => prevQty + 1);

  // Decrease quantity (with safeguard)
  const decQty = () => setQty((prevQty) => (prevQty > 1 ? prevQty - 1 : 1));

  // Add product to the cart
  const addProduct = (product: Product, quantity: number) => {
    setCartItems((prevCartItems) => {
      const existingProduct = prevCartItems.find((item) => item._id === product._id);

      if (existingProduct) {
        return prevCartItems.map((cartProduct) =>
          cartProduct._id === product._id
            ? { ...cartProduct, quantity: (cartProduct.quantity || 0) + quantity }
            : cartProduct
        );
      } else {
        return [...prevCartItems, { ...product, quantity }];
      }
    });

    setTotalQuantity((prevQty) => prevQty + quantity);
    setTotalPrice((prevTotal) => prevTotal + product.price * quantity);
  };

  // Toggle quantity of a cart item
  const toggleCartItemQty = (id: string, value: "plus" | "minus") => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((cartProduct) => {
        if (cartProduct._id === id) {
          const updatedQuantity =
            value === "plus"
              ? (cartProduct.quantity || 1) + 1
              : Math.max((cartProduct.quantity || 1) - 1, 1);

          return { ...cartProduct, quantity: updatedQuantity };
        }
        return cartProduct;
      })
    );

    const product = cartItems.find((item) => item._id === id);
    if (!product) return;

    setTotalQuantity((prevQty) => (value === "plus" ? prevQty + 1 : Math.max(prevQty - 1, 1))); 
    setTotalPrice((prevTotal) =>
      value === "plus"
        ? prevTotal + product.price
        : Math.max(prevTotal - product.price, 0)
    );
  };

  // Remove product from cart
  const onRemove = (product: Product) => {
    setCartItems((prevCartItems) => {
      const filteredCart = prevCartItems.filter((item) => item._id !== product._id);
      return filteredCart;
    });

    setTotalPrice((prevTotal) => prevTotal - product.price * (product.quantity || 0));
    setTotalQuantity((prevQty) => prevQty - (product.quantity || 0));
  };

  return (
    <CartContext.Provider
      value={{
        onRemove,
        toggleCartItemQty,
        totalPrice,
        totalQuantity,
        showCart,
        setShowCart,
        qty,
        incQty,
        decQty,
        cartItems,
        addProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom Hook for CartContext
export const useCart = (): CartContextValue => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
