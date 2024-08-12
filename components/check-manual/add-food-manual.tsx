"use client";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useMediaQuery } from "@/hooks/use-media-query";
import SearchInputManual from "@/components/check-manual/search-input-manual";
import SearchResultManual from "@/components/check-manual/search-result-manual";
import { useState, useEffect } from "react";
import { CirclePlus } from "lucide-react";

enum Portion {
  SATU_BESAR = "SATU_BESAR",
  SATU_SDM = "SATU_SDM",
  SERATUS_GRAM = "SERATUS_GRAM",
  SATU_BUAH = "SATU_BUAH",
  SATU_PORSI = "SATU_PORSI",
  SATU_MANGKOK = "SATU_MANGKOK",
}

interface Food {
  id: number;
  name: string;
  portion: Portion;
  calories: number;
  protein: number;
  fat: number;
  carbohydrates: number;
}

const AddFoodManual = () => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<Food[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (query.length > 0) {
      setIsLoading(true); // Set loading state to true before fetching data
      fetch(`/api/food?search=${query}`)
        .then((response) => response.json())
        .then((data) => setResults(data))
        .catch((error) => console.error("Error fetching food data:", error))
        .finally(() => setIsLoading(false)); // Set loading state to false after fetching data
    } else {
      setResults([]);
    }
  }, [query]);

  return isDesktop ? (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="text-white">
          <CirclePlus className="mr-1" /> Makanan Baru
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-1">
            <CirclePlus /> Makanan Baru
          </DialogTitle>
          <DialogDescription>
            Cari makanan yang mau ditambahkan
          </DialogDescription>
          <SearchInputManual setQuery={setQuery} />
        </DialogHeader>
        <SearchResultManual
          query={query}
          results={results}
          isLoading={isLoading}
        />
      </DialogContent>
    </Dialog>
  ) : (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>
          <CirclePlus className="mr-2" /> Makanan Baru
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Tambah Makanan Baru</DrawerTitle>
          <DrawerDescription>
            Cari makanan yang mau ditambahkan
          </DrawerDescription>
          <SearchInputManual setQuery={setQuery} />
        </DrawerHeader>
        <SearchResultManual
          query={query}
          results={results}
          isLoading={isLoading}
        />
      </DrawerContent>
    </Drawer>
  );
};

export default AddFoodManual;
