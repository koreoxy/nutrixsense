// components/SearchResultManual.tsx
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useFood } from "@/app/context/FoodContext";
import { useToast } from "@/components/ui/use-toast";

enum Portion {
  SATU_BESAR = "SATU_BESAR",
  SATU_SDM = "SATU_SDM",
  SERATUS_GRAM = "SERATUS_GRAM",
  SATU_BUAH = "SATU_BUAH",
  SATU_PORSI = "SATU_PORSI",
  SATU_MANGKOK = "SATU_MANGKOK",
}

const portionMap: { [key in Portion]: string } = {
  [Portion.SATU_BESAR]: "1 Besar",
  [Portion.SATU_SDM]: "1 sdm",
  [Portion.SERATUS_GRAM]: "100 gram",
  [Portion.SATU_BUAH]: "1 buah",
  [Portion.SATU_PORSI]: "1 porsi",
  [Portion.SATU_MANGKOK]: "1 mangkok",
};

interface Food {
  id: number;
  name: string;
  portion: Portion;
  calories: number;
  protein: number;
  fat: number;
  carbohydrates: number;
}

interface SearchResultManualProps {
  query: string;
  results: Food[];
}

const SearchResultManual = ({ query, results }: SearchResultManualProps) => {
  const { addFood } = useFood();
  const { toast } = useToast();

  const handleAddFood = (food: Food) => {
    addFood(food);
    toast({
      title: "Makanan Telah Ditambahkan",
      description: `Makanan "${food.name}" berhasil ditambahkan.`,
    });
  };

  return (
    <div className="[&::-webkit-scrollbar-thumb]:bg-gray-300 block max-h-[200px] overflow-y-auto sm:max-h-[300px] dark:[&::-webkit-scrollbar-thumb]:bg-slate-500 dark:[&::-webkit-scrollbar-track]:bg-slate-700 [&::-webkit-scrollbar]:w-2 [&::webkit-scrollbar-track]:bg-gray-100">
      {query.length > 0 ? (
        results.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama Makanan</TableHead>
                <TableHead>Porsi</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.map((food) => (
                <TableRow key={food.id}>
                  <TableCell>{food.name}</TableCell>
                  <TableCell>
                    {food.portion ? portionMap[food.portion] : "N/A"}
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handleAddFood(food)}
                      className="text-white"
                    >
                      Add Food
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="flex max-h-60 items-center justify-center p-16">
            <p className="text-gray-600 dark:text-gray-400">
              Data makanan tidak ada
            </p>
          </div>
        )
      ) : (
        <div className="flex max-h-60 items-center justify-center p-16">
          <p className="text-gray-600 dark:text-gray-400">
            Mulai pencarian Anda!
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchResultManual;
