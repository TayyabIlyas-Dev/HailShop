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
    const storedCartItems = localStorage.getItem("cartItems");
    const storedTotalPrice = localStorage.getItem("totalPrice");
    const storedTotalQuantity = localStorage.getItem("totalQuantity");

    if (storedCartItems) setCartItems(JSON.parse(storedCartItems));
    if (storedTotalPrice) setTotalPrice(JSON.parse(storedTotalPrice));
    if (storedTotalQuantity) setTotalQuantity(JSON.parse(storedTotalQuantity));
  }, []);

  // Save cart data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    localStorage.setItem("totalPrice", JSON.stringify(totalPrice));
    localStorage.setItem("totalQuantity", JSON.stringify(totalQuantity));
  }, [cartItems, totalPrice, totalQuantity]);

  // Increase quantity
  const incQty = () => setQty((prevQty) => prevQty + 1);

  // Decrease quantity (with safeguard)
  const decQty = () => setQty((prevQty) => (prevQty > 1 ? prevQty - 1 : 1));

  // Add product to the cart
  const addProduct = (product: Product, quantity: number) => {
    const existingProduct = cartItems.find((item) => item._id === product._id);

    setTotalQuantity((prevQty) => prevQty + quantity);
    setTotalPrice((prevTotal) => prevTotal + product.price * quantity);

    if (existingProduct) {
      const updatedCartItems = cartItems.map((cartProduct) =>
        cartProduct._id === product._id
          ? { ...cartProduct, quantity: (cartProduct.quantity || 0) + quantity }
          : cartProduct
      );
      setCartItems(updatedCartItems);
    } else {
      product.quantity = quantity;
      setCartItems([...cartItems, product]);
    }
  };

  // Toggle quantity of a cart item
  const toggleCartItemQty = (id: string, value: "plus" | "minus") => {
    const product = cartItems.find((item) => item._id === id);
    if (!product) return;

    const updatedCartItems = cartItems.map((cartProduct) => {
      if (cartProduct._id === id) {
        const updatedQuantity =
          value === "plus"
            ? (cartProduct.quantity || 1) + 1
            : Math.max((cartProduct.quantity || 1) - 1, 1);

        setTotalQuantity((prevQty) =>
          value === "plus" ? prevQty + 1 : Math.max(prevQty - 1, 0)
        );
        setTotalPrice((prevTotal) =>
          value === "plus"
            ? prevTotal + cartProduct.price
            : Math.max(prevTotal - cartProduct.price, 0)
        );

        return { ...cartProduct, quantity: updatedQuantity };
      }
      return cartProduct;
    });

    setCartItems(updatedCartItems.filter((item) => item.quantity! > 0));
  };

  // Remove product from cart
  const onRemove = (product: Product) => {
    const filteredCart = cartItems.filter((item) => item._id !== product._id);
    setCartItems(filteredCart);
    setTotalPrice(
      (prevTotal) => prevTotal - (product.price * (product.quantity || 1))
    );
    setTotalQuantity((prevQty) => prevQty - (product.quantity || 1));
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
