import { auth, currentUser } from "@clerk/nextjs/server";
import React from "react";
import DashboardCard from "../components/DashboardCard";

const Page = async () => {
  const { userId } = await auth(); // Get the authenticated user
  const user = await currentUser(); // Fetch user data from Clerk
  const role = user?.publicMetadata?.role; // Get role from metadata
  // console.log("role=", user);

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
     {/* <DashNav/>  */}
     </div>
      <div>
        <DashboardCard/>
      </div>
      <div>
        {/* <DashFooter/> */}
      </div>
    </div>
  );
};

export default Page;
