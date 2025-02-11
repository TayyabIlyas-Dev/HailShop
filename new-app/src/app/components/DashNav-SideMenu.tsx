import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MdOutlineMenu } from "react-icons/md";
import { FaUser } from "react-icons/fa6";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { HiHome } from "react-icons/hi";
import { IoMdSettings } from "react-icons/io";
import { MdLogout } from "react-icons/md";
import { MdOutlineAnalytics } from "react-icons/md";
import { BiCommentDetail } from "react-icons/bi";


export function DropdownMenuDemo() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>
          <MdOutlineMenu className="text-3xl" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 m-4 py-3 px-1 cursor-pointer flex flex-col bg-white gap-1">
        <DropdownMenuLabel className=" py-1 ">Menu</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem >
            <div className="py-0  px-2 pr-16 flex gap-2 items-center text-black hover:text-white rounded-md transition-all duration-200 hover:bg-[#000000] ">
                <div>
                    <FaUser/>
                </div>
                <div >
                Profile
                </div>
                
            </div>
           
          </DropdownMenuItem>
          <DropdownMenuItem>
            <div className="py-0  mt-1 px-2 pr-16 flex gap-2 items-center text-black hover:text-white rounded-md transition-all duration-200 hover:bg-[#000000] ">
                <div>
                    <HiHome/>
                </div>
                <div>
                Home
                </div>
                
            </div>
         
           
          </DropdownMenuItem>
          <DropdownMenuItem>
            <div className="py-0 px-2 mt-1 pr-16 flex gap-2 items-center text-black hover:text-white rounded-md transition-all duration-200 hover:bg-[#000000] ">
                <div>
                    <TbLayoutDashboardFilled/>
                </div>
                <div>
                Dashboard
                </div>
                
            </div>
         
          </DropdownMenuItem>
          <DropdownMenuItem>
            <div className="py-0 px-2 mt-1 pr-16 flex gap-2 items-center text-black hover:text-white rounded-md transition-all duration-200 hover:bg-[#000000] ">
                <div>
                    <IoMdSettings/>
                </div>
                <div>
                Settings
                </div>
                
            </div>
           
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
          <div className="py-1 flex gap-2 items-center ">
                <div>
                    <MdOutlineAnalytics/>
                </div>
                <div>
                Analytics
                </div>
                
            </div>
          </DropdownMenuItem>
          {/* <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <div className="py-1">Profile</div>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>
                  <div className="py-1">Profile</div>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <div className="py-1">Profile</div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <div className="py-1">Profile</div>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub> */}
          <DropdownMenuItem>
          <div className="py-1 flex gap-2 items-center ">
                <div>
                    <BiCommentDetail/>
                </div>
                <div>
                Complaints
                </div>
                
            </div>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <div className="flex gap-1 text-xs">

        <DropdownMenuItem>GitHub</DropdownMenuItem>
        <DropdownMenuItem>Support</DropdownMenuItem>
        <DropdownMenuItem disabled>API</DropdownMenuItem>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          Log out
          <DropdownMenuShortcut>
            <MdLogout/>
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
