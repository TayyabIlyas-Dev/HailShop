
"use client";

import { usePathname } from "next/navigation";
import { Navbar, Footer } from "@/src/app/components";
import { CartProvider } from "@/src/app/context/CartContext";
import { FavouritesProvider } from "@/src/app/context/FavouritesContext";
import { ToastProvider } from "@/src/app/context/ToastContext";
import { ClerkProvider, SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname(); // Current route ka path check karein

  return (
    <ClerkProvider>
      <CartProvider>
        <FavouritesProvider>
          <ToastProvider>
            {/* Dashboard ke ilawa sab jagah Navbar dikhaye */}
            {pathname !== "/dashboard" && <Navbar />}
             {/* <Navbar/> */}
            {children}

            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
            </SignedIn>

            {pathname !== "/dashboard" && <Footer />}
          </ToastProvider>
        </FavouritesProvider>
      </CartProvider>
    </ClerkProvider>
  );
}
