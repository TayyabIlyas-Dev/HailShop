"use client";

import { usePathname } from "next/navigation";
import { Navbar, Footer } from "@/src/app/components";
import { CartProvider } from "@/src/app/context/CartContext";
import { FavouritesProvider } from "@/src/app/context/FavouritesContext";
import { ToastProvider } from "@/src/app/context/ToastContext";
import { Toaster } from "react-hot-toast";
import { ClerkProvider } from "@clerk/nextjs";
import PageLoader from "./PageLoader";
import { ThankyouToastProvider } from "./ThankyouToast";
import { BsFillSendExclamationFill } from "react-icons/bs";
import Link from "next/link";
import ValuePoints from "./ValuePoints";
import { TbMessageCircleFilled } from "react-icons/tb";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname(); // Get the current route path

  // Check if the user is on any page inside "/dashboard2"
  const isDashboard = pathname.startsWith("/dashboard2");
  const isAddComplain = pathname.startsWith("/addComplain");

  return (
    <ClerkProvider>
      <CartProvider>
        <FavouritesProvider>
          <ToastProvider>
            <ThankyouToastProvider>
              <Toaster position="top-right" reverseOrder={false} />

              {/* Show Navbar only if NOT on a dashboard page */}
              {!isDashboard && <Navbar />}
              <PageLoader />
              {children}

              {!isAddComplain &&
                <Link href="/addComplain">
                  <div className="fixed bottom-3 text-center right-4 px-2 py-2 rounded-full border-2 border-black  bg-black hover:bg-white text-white hover:text-black transition-all hover:scale-110">
                    <TbMessageCircleFilled
                      className=" h-5 w-5  " />
                  </div>
                </Link>
              }
              {!isDashboard && <ValuePoints />}
              {!isDashboard && <Footer />}
            </ThankyouToastProvider>
          </ToastProvider>
        </FavouritesProvider>
      </CartProvider>
    </ClerkProvider>
  );
}
