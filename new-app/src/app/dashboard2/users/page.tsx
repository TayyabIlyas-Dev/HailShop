import { clerkClient, type User } from "@clerk/clerk-sdk-node";
import { auth, currentUser } from "@clerk/nextjs/server";
import { SignedOut, SignInButton } from "@clerk/nextjs";
import Image from "next/image";
import { User as UserIcon } from "lucide-react"; // User icon

// Fetch users with proper typing
const fetchUsers = async (): Promise<User[]> => {
  try {
    const usersResponse = await clerkClient.users.getUserList();
    return usersResponse.data as User[];
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

const Page = async () => {
  const { userId } = await auth();
  const user = await currentUser();
  const role = user?.publicMetadata?.role;

  if (!userId || role !== "admin") {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <p className="text-red-500 text-lg font-semibold">
          Access Denied: Admins Only
        </p>
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

  const users = await fetchUsers();

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Users List</h2>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <ul className="space-y-4">
          {users.map((user: User) => (
            <li key={user.id} className="border p-4 rounded flex items-center gap-4 shadow-sm">
              {/* User Profile Image or Default Icon */}
              {user.imageUrl ? (
                <Image
                  src={user.imageUrl}
                  alt="User"
                  width={40}
                  height={40}
                  className="rounded-full border"
                />
              ) : (
                <UserIcon className="w-10 h-10 text-gray-500" />
              )}

              {/* User Details */}
              <div>
                <p className="font-semibold text-lg">
                  {user.firstName || "No Name"} {user.lastName || ""}
                </p>
                <p className="text-sm text-gray-600">
                  {user.emailAddresses[0]?.emailAddress || "No Email"}
                </p>
                <p className="text-xs text-gray-500">
                  Username: {user.username || "Not Set"}
                </p>
                <p className="text-xs text-gray-500">
                  Created: {new Date(user.createdAt).toLocaleDateString()}
                </p>
                <p className="text-xs text-gray-500">
                  Last Sign-in:{" "}
                  {user.lastSignInAt
                    ? new Date(user.lastSignInAt).toLocaleString()
                    : "Never"}
                </p>
                <p className={`text-xs font-bold ${user.locked ? "text-red-500" : "text-green-500"}`}>
                  {user.locked ? "Disabled" : "Active"}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Page;
