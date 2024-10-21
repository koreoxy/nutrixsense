import Image from "next/image";
import { Navbar } from "@/components/navbar";
import { MenuBar } from "@/components/menu-bar";
import CardFoodHome from "@/components/card-food-home";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Footer } from "@/components/footer";
import { Info, MessageSquareQuote, Salad } from "lucide-react";
import Feedback from "@/components/feedback";
import PwaInstallPrompt from "@/components/pwa-install-prompt";
import ButtonInstallPwa from "@/components/button-install-pwa";
import ClassFoodList from "@/components/classfood-list";

export default async function Home() {
  return (
    <>
      <Navbar title="Home" />
      <div className="flex-1 items-start overflow-y-auto overflow-x-hidden flex justify-center mb-16 bg-white dark:bg-background">
        <div className="p-4 flex flex-col w-full">
          <div className="relative w-full">
            <h1 className="text-4xl font-bold z-[1] absolute text-balance text-shadow">
              Lacak Nutrisi Makananmu dengan Deteksi Gambar!
            </h1>

            <Image
              src="/food.png"
              width={300}
              height={300}
              alt="food"
              className="absolute z-0 top-[20px] left-[53px] scale-x-[-1] opacity-40"
            />
          </div>
          <div className="flex mt-44 items-center gap-2 z-50">
            <Link href="/image-detect" className="">
              <Button className="dark:text-white">let&apos;s try</Button>
            </Link>
            <div>
              <ButtonInstallPwa />
            </div>
          </div>

          <div className="mt-10">
            <div className="flex justify-between items-center border-b">
              <h1 className="font-bold text-2xl flex items-center gap-1">
                <Salad />
                List food
              </h1>
              <h2 className="text-muted-foreground text-xs">
                Slide to see more
              </h2>
            </div>

            <div className="mt-2">
              <CardFoodHome />
            </div>
          </div>

          <div className="mt-10">
            <ClassFoodList />
          </div>

          <div className="mt-10">
            <div className="border-b">
              <h1 className="font-bold text-2xl flex items-center gap-1">
                <Info />
                Information
              </h1>
            </div>
            <p className="text-sm mt-2 text-justify">
              Aplikasi NutrixSense adalah aplikasi berbasis web yang bertujuan
              untuk menghitung kalori dan nutrisi harian di Indonesia
              menggunakan deteksi objek dari model YOLOv8. Aplikasi ini juga
              memungkinkan pengguna untuk menghitung kalori dan nutrisi makanan
              secara manual. Saat ini, NutrixSense hanya dapat mendeteksi 10
              jenis makanan.
            </p>
          </div>

          <div className="mt-10">
            <div className="border-b">
              <h1 className="font-bold text-2xl flex items-center gap-1">
                <MessageSquareQuote />
                Feedback
              </h1>
            </div>
            <div className="mt-2">
              <Feedback />
            </div>
          </div>

          <Footer />
        </div>
      </div>

      <MenuBar />
      <PwaInstallPrompt />
    </>
  );
}
