"use client";

import { BookPlus, CircleUser, Home, Plus, Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const MenuBar = () => {
  const path = usePathname();

  const isPageActive = (pathname: string) => {
    return path === pathname;
  };

  return (
    <div className="bg-white dark:bg-background p-4 absolute bottom-0 w-full border rounded-t-xl shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
      <div className="mx-auto flex justify-between items-center">
        <Link
          href="/"
          passHref
          className={`${
            isPageActive("/")
              ? "text-[#3b82f6]"
              : "text-black dark:text-white hover:text-[#3b82f6]"
          }`}
        >
          <Home />
        </Link>
        <Link
          href="/search"
          passHref
          className={`${
            isPageActive("/search")
              ? "text-[#3b82f6]"
              : "text-black dark:text-white hover:text-[#3b82f6]"
          }`}
        >
          <Search />
        </Link>
        <Link
          href="/image-detect"
          passHref
          className={`${
            isPageActive("/image-detect")
              ? "text-white bg-[#3b82f6] rounded-full px-10"
              : "hover:text-[#ffffff] text-white hover:bg-[#3b82f6] dark:bg-white dark:text-black bg-black rounded-full px-10"
          }`}
        >
          <Plus size={30} />
        </Link>
        <div>
          <Link
            href="/account/save-food"
            passHref
            className={`${
              isPageActive("/account/save-food")
                ? "text-[#3b82f6]"
                : "text-black dark:text-white hover:text-[#3b82f6]"
            }`}
          >
            <BookPlus />
          </Link>
        </div>
        <Link
          href="/account"
          passHref
          className={`${
            isPageActive("/account")
              ? "text-[#3b82f6]"
              : "text-black dark:text-white hover:text-[#3b82f6]"
          }`}
        >
          <CircleUser />
        </Link>
      </div>
    </div>
  );
};
