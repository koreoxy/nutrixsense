"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const NavbarAdmin = () => {
  const pathname = usePathname();
  return (
    <nav className="border flex justify-center p-4 shadow-sm">
      <div className="flex gap-x-2">
        <Button asChild variant={pathname === "/admin" ? "default" : "outline"}>
          <Link href="/admin/">Dashboard</Link>
        </Button>
        <Button
          asChild
          variant={pathname === "/admin/foods" ? "default" : "outline"}
        >
          <Link href="/admin/foods">Makanan</Link>
        </Button>
        <Button
          asChild
          variant={pathname === "/admin/users" ? "default" : "outline"}
        >
          <Link href="/admin/users">Users</Link>
        </Button>
      </div>
    </nav>
  );
};
