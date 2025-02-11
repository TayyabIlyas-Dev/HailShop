"use client";

import { useState } from "react";
import { Nav } from "./ui/nav";
import {
  ShoppingCart,
  LayoutDashboard,
  UsersRound,
  Settings,
  LogOut,
  ChevronLeft,
  Boxes,
} from "lucide-react";
import { Button } from "../../../components/ui/button";
import { useWindowWidth } from "@react-hook/window-size";
import { useAuth } from "@clerk/nextjs"; // Import Clerk's auth hook

interface SideNavbarProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

export default function SideNavbar({ isCollapsed, setIsCollapsed }: SideNavbarProps) {
  const onlyWidth = useWindowWidth();
  const mobileWidth = onlyWidth < 768;
  const { signOut } = useAuth(); // Clerk's logout function

  function toggleSidebar() {
    setIsCollapsed(!isCollapsed);
  }

  return (
    <div
      className={`relative px-3 pb-10 pt-24 transition-all duration-300 ${
        mobileWidth ? "w-[60px]" : isCollapsed ? "w-[60px]" : "w-[15%]"
      }`}
    >
      {!mobileWidth && (
        <div
          className={`absolute top-20 pt-4 transition-all duration-300 ${
              isCollapsed ? "right-1/2 translate-x-1/2" : "right-[-154px]"
          }`}
        >
          <Button
            onClick={toggleSidebar}
            variant="secondary"
            className="rounded-full hover:bg-[#e5e7eb] text-black p-1"
          >
            <ChevronLeft className={isCollapsed ? "rotate-180" : ""} />
          </Button>
        </div>
      )}
      
      <div className="pt-8">
        <Nav
          isCollapsed={mobileWidth || isCollapsed}
          links={[
            {
              title: "Dashboard",
              href: "/dashboard2",
              icon: LayoutDashboard,
              variant: "default",
            },
            {
              title: "Users",
              href: "/users",
              icon: UsersRound,
              variant: "ghost",
            },
            {
              title: "Orders",
              href: "/dashboard2/order",
              icon: ShoppingCart,
              variant: "ghost",
            },
            {
              title: "Inventory",
              href: "/dashboard2/inventory",
              icon: Boxes, // Added Inventory icon
              variant: "ghost",
            },
            {
              title: "Settings",
              href: "/settings",
              icon: Settings,
              variant: "ghost",
            },
            {
              title: "Logout",
              href: "#",
              icon: LogOut,
              variant: "ghost",
            },
          ]}
          
        />
      </div>
    </div>
  );
}
