"use client";

import { usePathname } from "next/navigation";
import { Navbar, Footer } from "@/src/app/components";
import { CartProvider } from "@/src/app/context/CartContext";
import { FavouritesProvider } from "@/src/app/context/FavouritesContext";
import { ToastProvider } from "@/src/app/context/ToastContext";
import { Toaster } from "react-hot-toast";
import { ClerkProvider } from "@clerk/nextjs";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname(); // Get the current route path

  // Check if the user is on any page inside "/dashboard2"
  const isDashboard = pathname.startsWith("/dashboard2");

  return (
    <ClerkProvider>
      <CartProvider>
        <FavouritesProvider>
          <ToastProvider>
            <Toaster position="top-right" reverseOrder={false} />

            {/* Show Navbar only if NOT on a dashboard page */}
            {!isDashboard && <Navbar />}

            {children}

       
            {/* Show Footer only if NOT on a dashboard page */}
            {!isDashboard && <Footer />}
          </ToastProvider>
        </FavouritesProvider>
      </CartProvider>
    </ClerkProvider>
  );
}
