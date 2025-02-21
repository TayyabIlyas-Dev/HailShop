"use client";

import { createContext, useState, useEffect, useContext } from "react";

// Define the structure of a product
// interface Product {
//   _id: string;
//   name: string;
//   price: number;
//   quantity?: number;
//   images: string[];
// }
interface Product {
  _id: string;
  name: string;
  price: number;
  discount?: number; // ✅ Fix: Add this line
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

const getDiscountedPrice = (product: Product) => {
  const discount = product.discount || 0; // Ensure discount is always a number
  return product.price - (product.price * discount) / 100;
};


export const CartContext = createContext<CartContextValue | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [isHydrated, setIsHydrated] = useState(false); // 👈 New state to track hydration

  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [showCart, setShowCart] = useState(false);
  const [qty, setQty] = useState(1);

  // Load cart data from localStorage only on client-side
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
      const storedTotalPrice = JSON.parse(localStorage.getItem("totalPrice") || "0");
      const storedTotalQuantity = JSON.parse(localStorage.getItem("totalQuantity") || "0");

      setCartItems(storedCartItems);
      setTotalPrice(storedTotalPrice);
      setTotalQuantity(storedTotalQuantity);
      setIsHydrated(true); // 👈 Now mark hydration as complete
    }
  }, []);

  // Save cart data to localStorage whenever it changes
  useEffect(() => {
    if (isHydrated) { // 👈 Only update localStorage after hydration
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      localStorage.setItem("totalPrice", JSON.stringify(totalPrice));
      localStorage.setItem("totalQuantity", JSON.stringify(totalQuantity));
    }
  }, [cartItems, totalPrice, totalQuantity, isHydrated]);

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
    // setTotalPrice((prevTotal) => prevTotal + product.price * quantity);
    setTotalPrice((prevTotal) => Math.floor(prevTotal + getDiscountedPrice(product) * quantity));

  };

  // Toggle quantity of a cart item
  const toggleCartItemQty = (id: string, value: "plus" | "minus") => {
    setCartItems((prevCartItems) => {
      let newTotalPrice = 0;
      let newTotalQuantity = 0;

      const updatedCart = prevCartItems.map((cartProduct) => {
        if (cartProduct._id === id) {
          const updatedQuantity =
            value === "plus"
              ? (cartProduct.quantity || 1) + 1
              : Math.max((cartProduct.quantity || 1) - 1, 1);

          // newTotalPrice += updatedQuantity * cartProduct.price;
          newTotalPrice += updatedQuantity * getDiscountedPrice(cartProduct); // ✅ Ab discount apply hoga

          newTotalQuantity += updatedQuantity;

          return { ...cartProduct, quantity: updatedQuantity };
        } else {
          // newTotalPrice += (cartProduct.quantity || 0) * cartProduct.price;
          newTotalPrice += (cartProduct.quantity || 0) * getDiscountedPrice(cartProduct);

          // newTotalQuantity += cartProduct.quantity || 0;
          newTotalPrice += (cartProduct.quantity || 0) * getDiscountedPrice(cartProduct);

          return cartProduct;
        }
      });

      setTotalPrice(Math.floor(newTotalPrice));
      setTotalQuantity(newTotalQuantity);
      return updatedCart;
    });
  };

  // Remove product from cart
  const onRemove = (product: Product) => {
    setCartItems((prevCartItems) => {
      const filteredCart = prevCartItems.filter((item) => item._id !== product._id);

      let newTotalPrice = 0;
      let newTotalQuantity = 0;

      filteredCart.forEach((item) => {
        // newTotalPrice += (item.quantity || 0) * item.price;
        newTotalPrice += (item.quantity || 0) * getDiscountedPrice(item);

        newTotalQuantity += item.quantity || 0;
      });

      setTotalPrice(Math.floor(newTotalPrice));
      setTotalQuantity(newTotalQuantity);

      return filteredCart;
    });
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
      {/* 👇 Fix: Ensure rendering only happens after hydration */}
      {isHydrated ? children : null}
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


























// "use client";

// import { createContext, useState, useEffect, useContext } from "react";

// // Define the structure of a product
// interface Product {
//   _id: string;
//   name: string;
//   price: number;
//   quantity?: number;
//   images: string[];
// }

// // Define the context value
// interface CartContextValue {
//   onRemove: (product: Product) => void;
//   toggleCartItemQty: (id: string, value: "plus" | "minus") => void;
//   totalPrice: number;
//   totalQuantity: number;
//   showCart: boolean;
//   setShowCart: (show: boolean) => void;
//   qty: number;
//   incQty: () => void;
//   decQty: () => void;
//   cartItems: Product[];
//   addProduct: (product: Product, quantity: number) => void;
// }

// export const CartContext = createContext<CartContextValue | undefined>(undefined);

// export const CartProvider = ({ children }: { children: React.ReactNode }) => {
//   const [isHydrated, setIsHydrated] = useState(false); // 👈 New state to track hydration

//   const [cartItems, setCartItems] = useState<Product[]>([]);
//   const [totalPrice, setTotalPrice] = useState(0);
//   const [totalQuantity, setTotalQuantity] = useState(0);
//   const [showCart, setShowCart] = useState(false);
//   const [qty, setQty] = useState(1);

//   // Load cart data from localStorage only on client-side
//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       const storedCartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
//       const storedTotalPrice = JSON.parse(localStorage.getItem("totalPrice") || "0");
//       const storedTotalQuantity = JSON.parse(localStorage.getItem("totalQuantity") || "0");

//       setCartItems(storedCartItems);
//       setTotalPrice(storedTotalPrice);
//       setTotalQuantity(storedTotalQuantity);
//       setIsHydrated(true); // 👈 Now mark hydration as complete
//     }
//   }, []);

//   // Save cart data to localStorage whenever it changes
//   useEffect(() => {
//     if (isHydrated) { // 👈 Only update localStorage after hydration
//       localStorage.setItem("cartItems", JSON.stringify(cartItems));
//       localStorage.setItem("totalPrice", JSON.stringify(totalPrice));
//       localStorage.setItem("totalQuantity", JSON.stringify(totalQuantity));
//     }
//   }, [cartItems, totalPrice, totalQuantity, isHydrated]);

//   // Increase quantity
//   const incQty = () => setQty((prevQty) => prevQty + 1);

//   // Decrease quantity (with safeguard)
//   const decQty = () => setQty((prevQty) => (prevQty > 1 ? prevQty - 1 : 1));

//   // Add product to the cart
//   const addProduct = (product: Product, quantity: number) => {
//     setCartItems((prevCartItems) => {
//       const existingProduct = prevCartItems.find((item) => item._id === product._id);

//       if (existingProduct) {
//         return prevCartItems.map((cartProduct) =>
//           cartProduct._id === product._id
//             ? { ...cartProduct, quantity: (cartProduct.quantity || 0) + quantity }
//             : cartProduct
//         );
//       } else {
//         return [...prevCartItems, { ...product, quantity }];
//       }
//     });

//     setTotalQuantity((prevQty) => prevQty + quantity);
//     setTotalPrice((prevTotal) => prevTotal + product.price * quantity);
//   };

//   // Toggle quantity of a cart item
//   const toggleCartItemQty = (id: string, value: "plus" | "minus") => {
//     setCartItems((prevCartItems) => {
//       let newTotalPrice = 0;
//       let newTotalQuantity = 0;

//       const updatedCart = prevCartItems.map((cartProduct) => {
//         if (cartProduct._id === id) {
//           const updatedQuantity =
//             value === "plus"
//               ? (cartProduct.quantity || 1) + 1
//               : Math.max((cartProduct.quantity || 1) - 1, 1);

//           newTotalPrice += updatedQuantity * cartProduct.price;
//           newTotalQuantity += updatedQuantity;

//           return { ...cartProduct, quantity: updatedQuantity };
//         } else {
//           newTotalPrice += (cartProduct.quantity || 0) * cartProduct.price;
//           newTotalQuantity += cartProduct.quantity || 0;
//           return cartProduct;
//         }
//       });

//       setTotalPrice(newTotalPrice);
//       setTotalQuantity(newTotalQuantity);
//       return updatedCart;
//     });
//   };

//   // Remove product from cart
//   const onRemove = (product: Product) => {
//     setCartItems((prevCartItems) => {
//       const filteredCart = prevCartItems.filter((item) => item._id !== product._id);

//       let newTotalPrice = 0;
//       let newTotalQuantity = 0;

//       filteredCart.forEach((item) => {
//         newTotalPrice += (item.quantity || 0) * item.price;
//         newTotalQuantity += item.quantity || 0;
//       });

//       setTotalPrice(newTotalPrice);
//       setTotalQuantity(newTotalQuantity);

//       return filteredCart;
//     });
//   };

//   return (
//     <CartContext.Provider
//       value={{
//         onRemove,
//         toggleCartItemQty,
//         totalPrice,
//         totalQuantity,
//         showCart,
//         setShowCart,
//         qty,
//         incQty,
//         decQty,
//         cartItems,
//         addProduct,
//       }}
//     >
//       {/* 👇 Fix: Ensure rendering only happens after hydration */}
//       {isHydrated ? children : null}
//     </CartContext.Provider>
//   );
// };

// // Custom Hook for CartContext
// export const useCart = (): CartContextValue => {
//   const context = useContext(CartContext);
//   if (!context) {
//     throw new Error("useCart must be used within a CartProvider");
//   }
//   return context;
// };
