import { CircleUserRound, Moon } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

interface NavbarProps {
  title: string;
}

export const Navbar = ({ title }: NavbarProps) => {
  return (
    <nav className="p-4 bg-white dark:bg-background w-full border">
      <div className="mx-auto flex items-center justify-between">
        <div>
          <CircleUserRound />
        </div>
        <div className="font-bold text-xl">{title}</div>
        <div className="">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};
