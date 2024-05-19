import {
  AvatarIcon,
  HomeIcon,
  PlusCircledIcon,
  PlusIcon,
} from "@radix-ui/react-icons";
import {
  BookPlus,
  CircleUser,
  Home,
  Plus,
  PlusCircleIcon,
  ScanLine,
} from "lucide-react";
import Link from "next/link";

export const MenuBar = () => {
  return (
    <div className="bg-white p-4 absolute bottom-0 w-full border rounded-t-xl shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
      <div className=" mx-auto flex justify-between items-center">
        <Link href="/">
          <Home />
        </Link>
        <Link href="/detect">
          <ScanLine />
        </Link>
        <Link href="/image-detect" className="bg-black rounded-full px-10">
          <Plus className="text-white" size={30} />
        </Link>

        <div className="">
          <BookPlus />
        </div>
        <div className="">
          <CircleUser />
        </div>
      </div>
    </div>
  );
};
