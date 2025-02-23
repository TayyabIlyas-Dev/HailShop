import React from 'react'
import Dashboard from '../../components/Dashboard'
import { auth, currentUser } from '@clerk/nextjs/server';
import { SignedOut, SignInButton } from '@clerk/nextjs';

const page = async () => {
       const { userId } = await auth(); // Get the authenticated user
        const user = await currentUser(); // Fetch user data from Clerk
        const role = user?.publicMetadata?.role; // Get role from metadata
        // console.log("role=", user);
        if (!userId || role !== "admin") {
          return (
            <div className="flex flex-col items-center justify-center h-full text-center ">
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
    <div className=' w-full overflow-hidden py-2'>
        
      <Dashboard/>
    </div>
  )
}

export default page
