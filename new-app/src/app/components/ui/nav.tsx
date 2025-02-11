"use client";

import Link from "next/link";
import { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from "@/components/ui/tooltip";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { usePathname } from "next/navigation";

interface NavProps {
  isCollapsed: boolean;
  links: {
    title: string;
    label?: string;
    icon: LucideIcon;
    variant: "default" | "ghost";
    href: string;
  }[];
}

export function Nav({ links, isCollapsed }: NavProps) {
  const pathName = usePathname();
  return (
    <TooltipProvider>
      <div
        data-collapsed={isCollapsed}
        className="group flex flex-col gap-4 py-3 px-3 rounded-lg bg-white text-black h-full"
      >
        <nav className="grid gap-2 group-[[data-collapsed=true]]:justify-center h-full">
          {links.map((link, index) => (
            <Tooltip key={index} delayDuration={0}>
              <TooltipTrigger asChild>
                <Link
                  href={link.href}
                  className={cn(
                    buttonVariants({
                      variant: link.href === pathName ? "default" : "ghost",
                      size: isCollapsed ? "icon" : "sm"
                    }),
                    "flex items-center justify-start gap-2 px-4 py-2 rounded-lg transition-all duration-200 hover:bg-gray-200",
                    link.href === pathName && "bg-gray-200",
                    link.title === "Logout" ? "text-red-600 absolute top-[90vh] justify-center px-0" : "text-red-500" // Push logout near bottom

                  )}
                >
                  <link.icon className="h-5 w-5 text-black" />
                  {!isCollapsed && <span className="text-sm font-medium text-black">{link.title}</span>}
                </Link>
              </TooltipTrigger>
              {isCollapsed && (
                <TooltipContent side="right" className="bg-gray-200 text-black px-2 py-1 rounded-md">
                  {link.title}
                </TooltipContent>
              )}
            </Tooltip>
          ))}
        </nav>
      </div>
    </TooltipProvider>
  );
}
