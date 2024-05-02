import { CircleUserRound, Moon } from "lucide-react";

export const Navbar = () => {
  return (
    <nav className="p-4 absolute top-0 bg-white w-full">
      <div className="relative mx-auto flex justify-between">
        <div>
          <CircleUserRound />
        </div>
        <div className="font-bold text-xl">Home</div>
        <div className="">
          <Moon />
        </div>
      </div>
    </nav>
  );
};
