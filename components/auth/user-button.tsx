"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { FaUser } from "react-icons/fa";
import { useCurrentUser } from "@/hooks/use-current-user";
import { LogoutButton } from "@/components/auth/logout-button";
import { ExitIcon } from "@radix-ui/react-icons";
import { Accessibility, BookPlus, CircleUser } from "lucide-react";
import { useCurrentRole } from "@/hooks/use-current-role";
import Link from "next/link";

export const UserButton = () => {
  const user = useCurrentUser();
  const role = useCurrentRole();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user?.image || ""} />
          <AvatarFallback>
            <FaUser />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="start">
        {role === "ADMIN" ? (
          <DropdownMenuItem>
            <Link href="/admin" className="flex">
              <Accessibility className="h-4 w-4 mr-2" />
              <span>Admin</span>
            </Link>
          </DropdownMenuItem>
        ) : (
          <></>
        )}
        <DropdownMenuItem>
          <Link href="/account" className="flex">
            <CircleUser className="h-4 w-4 mr-2" />
            Account
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/account/save-food" className="flex">
            <BookPlus className="h-4 w-4 mr-2" />
            Save Food
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <LogoutButton>
            <div className="flex">
              <ExitIcon className="h-4 w-4 mr-2" />
              Logout
            </div>
          </LogoutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
