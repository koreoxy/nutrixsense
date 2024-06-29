import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const NavbarUser = () => {
  const pathname = usePathname();

  return (
    <nav className="bg-secondary flex justify-between p-4 shadow-sm">
      <div className="flex gap-x-2">
        <Button
          asChild
          variant={pathname === "/account" ? "default" : "outline"}
        >
          <Link href="/account">Info Account</Link>
        </Button>
        <Button
          asChild
          variant={pathname === "/account/settings" ? "default" : "outline"}
        >
          <Link href="/account/settings">Settings</Link>
        </Button>
        <Button
          asChild
          variant={pathname === "/account/save-food" ? "default" : "outline"}
        >
          <Link href="/account/save-food">Save Food</Link>
        </Button>
      </div>
    </nav>
  );
};
