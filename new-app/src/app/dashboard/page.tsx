// import { AppSidebar } from "@/components/app-sidebar"
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from "@/components/ui/breadcrumb"
// import { Separator } from "@/components/ui/separator"
// import {
//   SidebarInset,
//   SidebarProvider,
//   SidebarTrigger,
// } from "@/components/ui/sidebar"

// export default function Page() {
//   return (
//     <SidebarProvider>
//       <AppSidebar />
//       <SidebarInset>
//         <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
//           <SidebarTrigger className="-ml-1" />
//           <Separator orientation="vertical" className="mr-2 h-4" />
//           <Breadcrumb>
//             <BreadcrumbList>
//               <BreadcrumbItem className="hidden md:block">
//                 <BreadcrumbLink href="#">
//                   Building Your Application
//                 </BreadcrumbLink>
//               </BreadcrumbItem>
//               <BreadcrumbSeparator className="hidden md:block" />
//               <BreadcrumbItem>
//                 <BreadcrumbPage>Data Fetching</BreadcrumbPage>
//               </BreadcrumbItem>
//             </BreadcrumbList>
//           </Breadcrumb>
//         </header>
//         <div className="flex flex-1 flex-col gap-4 p-4">
//           <div className="grid auto-rows-min gap-4 md:grid-cols-3">
//             <div className="aspect-video rounded-xl bg-muted/50" />
//             <div className="aspect-video rounded-xl bg-muted/50" />
//             <div className="aspect-video rounded-xl bg-muted/50" />
//           </div>
//           <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
//         </div>
//       </SidebarInset>
//     </SidebarProvider>
//   )
// }
import { auth, currentUser } from "@clerk/nextjs/server";
import { ChartComponent } from "@/components/chart";
import React from "react";
import Dashboard from "../components/Dashboard";
import DashboardCard from "../components/DashboardCard";
import DashNav from "../components/DashNav";
import DashFooter from "../components/DashFooter";

const Page = async () => {
  const { userId } = await auth(); // Get the authenticated user
  const user = await currentUser(); // Fetch user data from Clerk
  const role = user?.publicMetadata?.role; // Get role from metadata
  console.log("role=", user);

  // If user is not logged in or not an admin, deny access
  if (!userId || role !== "admin") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500 text-lg font-semibold">
          Access Denied: Admins Only
        </p>
      </div>
    );
  }

  return (
    <div>
     <div>
     <DashNav/> 
     </div>
      <div>
        <DashboardCard/>
      </div>
      <div>
        <DashFooter/>
      </div>
    </div>
  );
};

export default Page;
