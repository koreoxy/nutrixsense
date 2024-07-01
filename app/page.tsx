import Image from "next/image";
import { Navbar } from "@/components/navbar";
import { MenuBar } from "@/components/menu-bar";
import CardFoodHome from "@/components/card-food-home";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  return (
    <>
      <Navbar title="Home" />
      <div className="flex-1 items-start overflow-y-auto overflow-x-hidden flex justify-center mb-16 bg-white dark:bg-background">
        <div className="p-4 flex flex-col w-full ">
          <div className="relative w-full">
            <h1 className="text-4xl font-bold z-[1] absolute text-balance">
              Lacak Gizi Makananmu dengan Deteksi Gambar!
            </h1>

            <Image
              src="/food.png"
              width={300}
              height={300}
              alt="food"
              className="absolute z-0 top-[20px] left-[53px] scale-x-[-1] opacity-40"
            />
          </div>
          <Link href="/image-detect" className="mt-44">
            <Button variant="outline">let&apos;s try</Button>
          </Link>

          <div className="mt-7">
            <div className="flex justify-between items-center border-b">
              <h1 className="font-bold text-2xl">List food</h1>
              <h2 className="text-muted-foreground text-xs">
                Slide to see more
              </h2>
            </div>

            <div className="mt-2">
              <CardFoodHome />
            </div>
          </div>

          <div className="mt-10">
            <div className="border-b">
              <h1 className="font-bold text-2xl">Info</h1>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit
              dolor, totam rem distinctio aspernatur quo impedit dolorem
              voluptatum ab et eligendi, cupiditate ratione quidem ipsa vel cum
              rerum nemo mollitia?
            </p>
          </div>
        </div>
      </div>
      <MenuBar />
    </>
  );
}
