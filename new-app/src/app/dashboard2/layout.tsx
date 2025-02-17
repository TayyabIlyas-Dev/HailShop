'use client'
import DashNav from "../components/DashNav";
import SideNavbar from "../components/SideNav";
import { useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex h-screen">

        {/* Top Navigation */}
        <nav className="h-16 fixed top-0 w-full bg-white shadow-md border-b z-10">
          <DashNav />
        </nav> 
        
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full bg-white border-r shadow-md transition-all ${
          isCollapsed ? "w-[60px]" : "w-[15%]"
        }`}
      >
        <SideNavbar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      </aside>

      {/* Main Content Area */}
      <div
        className="flex-1 flex flex-col transition-all"
        style={{ marginLeft: isCollapsed ? "60px" : "15%" }}
      >
        

        {/* Page Content */}
        <main className="flex-1 mt-16  py-4 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
