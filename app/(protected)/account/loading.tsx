import { MenuBar } from "@/components/menu-bar";
import { Navbar } from "@/components/navbar";

export default function Loading() {
  return (
    <>
      <Navbar title="Loading..." />
      <div className="flex flex-col overflow-y-auto my-16 bg-white text-black dark:text-white dark:bg-background h-full mx-auto justify-center items-center">
        <div className="loading"></div>
      </div>
      <MenuBar />
    </>
  );
}
