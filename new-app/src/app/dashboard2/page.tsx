import { auth, currentUser } from "@clerk/nextjs/server";
import React from "react";
import DashboardCard from "../components/DashboardCard";

import { SignedOut, SignInButton } from "@clerk/nextjs";

const Page = async () => {
  const { userId } = await auth(); // Get the authenticated user
  const user = await currentUser(); // Fetch user data from Clerk
  const role = user?.publicMetadata?.role; // Get role from metadata
  // console.log("role=", user);

  // If user is not logged in or not an admin, deny access
  if (!userId || role !== "admin") {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <div>
          <p className="text-red-500 text-lg font-semibold">
            Access Denied: Admins Only
          </p>
        </div>
    
        <SignedOut>
          <div className="p-2">
            <button className="text-base underline font-semibold">
             <span className="underline">
             <SignInButton />
             </span>
            </button>{" "}
            to Access
          </div>
        </SignedOut>
      </div>
    );
    
  }

  return (
    <div>
      <div>{/* <DashNav/>  */}</div>
      <div>
        <DashboardCard />
      </div>
      <div>{/* <DashFooter/> */}</div>
    </div>
  );
};

export default Page;
