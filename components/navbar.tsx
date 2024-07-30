"use client";

import { ThemeToggle } from "@/components/ThemeToggle";
import { UserButton } from "@/components/auth/user-button";
import { useCurrentUser } from "@/hooks/use-current-user";
import { LoginButton } from "@/components/auth/login-button";
import { LogIn } from "lucide-react";

interface NavbarProps {
  title: string;
}

export const Navbar = ({ title }: NavbarProps) => {
  const user = useCurrentUser();

  return (
    <nav className="p-4 bg-white dark:bg-background w-full border">
      <div className="mx-auto flex items-center justify-between">
        <div>
          {user ? (
            <UserButton />
          ) : (
            <div className="border p-2 rounded-lg hover:bg-secondary">
              <LoginButton>
                <LogIn />
              </LoginButton>
            </div>
          )}
        </div>
        <div className="font-bold text-xl">{title}</div>
        <div className="">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};
