"use client";

import { NavbarUser } from "@/components/auth/navbar-user";

import { Navbar } from "@/components/navbar";

interface AccountLayoutProps {
  children: React.ReactNode;
}

const AccountLayout = ({ children }: AccountLayoutProps) => {
  return (
    <>
      <Navbar title="Account" />
      <NavbarUser />
      <div className="flex flex-col overflow-y-auto mb-16 bg-white dark:bg-background h-full">
        {children}
      </div>
    </>
  );
};

export default AccountLayout;
