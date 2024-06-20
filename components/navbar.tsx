"use client";

import { ThemeToggle } from "@/components/ThemeToggle";
import { UserButton } from "@/components/auth/user-button";
import { useCurrentUser } from "@/hooks/use-current-user";
import { LoginButton } from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";

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
            <LoginButton>
              <Button variant="secondary" size="lg">
                Login
              </Button>
            </LoginButton>
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
