"use client";

import AddFoodManual from "@/components/check-manual/add-food-manual";
import ResultFoodManual from "@/components/check-manual/result-food-manual";
import { MenuBar } from "@/components/menu-bar";
import { Navbar } from "@/components/navbar";
import { FoodProvider } from "../context/FoodContext";
import { Separator } from "@/components/ui/separator";

export default function CheckManualPage() {
  return (
    <FoodProvider>
      <Navbar title="Check Manual" />
      <div className="overflow-y-auto mb-16">
        <div className="p-4">
          <div className="grid grid-cols-2 items-center mt-2">
            <h1 className="font-bold text-xl">Check Manual</h1>
            <AddFoodManual />
            <p className="row-span-2 col-span-2 mt-1 text-muted-foreground">
              Tambahkan makanan untuk mengetahui nutrisi makanan nya
            </p>
          </div>
          <div className="mt-5">
            <h1 className="font-bold">Makanan</h1>
            <Separator className="mb-2" />
            <ResultFoodManual />
          </div>
        </div>
      </div>
      <MenuBar />
    </FoodProvider>
  );
}
