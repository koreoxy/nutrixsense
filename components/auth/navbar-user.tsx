import { Button } from "@/components/ui/button";
import { BookPlus, CircleUser, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const NavbarUser = () => {
  const path = usePathname();

  const isPageActive = (pathname: string) => {
    return path === pathname;
  };

  return (
    <nav className="border p-2 shadow-sm">
      <div className="flex justify-center gap-2">
        <Link
          href="/account"
          passHref
          className={`${
            isPageActive("/account")
              ? "text-white border p-3 rounded-lg text-sm bg-[#3b82f6] hover:text-white font-medium"
              : "text-black dark:text-white hover:text-white hover:bg-[#3b82f6] border p-3 rounded-lg bg-white text-sm dark:bg-background"
          }`}
        >
          <CircleUser />
        </Link>
        <Link
          href="/account/settings"
          passHref
          className={`${
            isPageActive("/account/settings")
              ? "text-white border p-3 rounded-lg text-sm bg-[#3b82f6] hover:text-white font-medium "
              : "text-black dark:text-white hover:text-white hover:bg-[#3b82f6] border p-3 rounded-lg bg-white text-sm dark:bg-background"
          }`}
        >
          <Settings />
        </Link>
        <Link
          href="/account/save-food"
          passHref
          className={`${
            isPageActive("/account/save-food")
              ? "text-white border p-3 rounded-lg text-sm bg-[#3b82f6] hover:text-white font-medium "
              : "text-black dark:text-white hover:text-white hover:bg-[#3b82f6] border p-3 rounded-lg bg-white text-sm dark:bg-background"
          }`}
        >
          <BookPlus />
        </Link>
      </div>
    </nav>
  );
};
