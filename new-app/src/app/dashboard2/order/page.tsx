import React from 'react'
import Dashboard from '../../components/Dashboard'
import { auth, currentUser } from '@clerk/nextjs/server';

const page = async () => {
       const { userId } = await auth(); // Get the authenticated user
        const user = await currentUser(); // Fetch user data from Clerk
        const role = user?.publicMetadata?.role; // Get role from metadata
        // console.log("role=", user);
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
    <div className=' w-full overflow-hidden'>
        
      <Dashboard/>
    </div>
  )
}

export default page
