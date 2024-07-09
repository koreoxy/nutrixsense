import React, { useState } from "react";
import { Beef, CircleX, EggFried, Flame, Wheat } from "lucide-react";
import { useFood } from "@/app/context/FoodContext";
import { Button } from "@/components/ui/button";
import ButtonSaveFood from "@/components/detect/button-save-food";
import { Separator } from "@/components/ui/separator";

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

const ResultFoodManual = () => {
  const { foods, removeFood } = useFood();
  const [showTotals, setShowTotals] = useState(false);

  // Function to calculate total nutrients
  const calculateTotalNutrients = () => {
    return foods.reduce(
      (totals, food) => {
        totals.calories += food.calories;
        totals.protein += food.protein;
        totals.fat += food.fat;
        totals.carbohydrates += food.carbohydrates;
        return totals;
      },
      { calories: 0, protein: 0, fat: 0, carbohydrates: 0 }
    );
  };

  const totalNutrients = calculateTotalNutrients();

  return (
    <div className="border p-1 rounded-md bg-white shadow dark:bg-background">
      {foods.length > 0 ? (
        <>
          {foods.map((food) => (
            <div key={food.id} className="mb-4 p-2 border rounded-md shadow-sm">
              <div className="flex justify-between">
                <h1 className="font-bold text-lg mb-2">{food.name}</h1>
                <Button
                  variant="destructive"
                  onClick={() => removeFood(food.id)} // Attach removeFood function to button
                >
                  <CircleX size={20} />
                </Button>
              </div>
              <h2 className="text-gray-700 dark:text-gray-300 mb-4">
                Porsi {food.portion ? portionMap[food.portion] : "N/A"}
              </h2>
              <div className="grid grid-cols-4 gap-4 text-center">
                <div>
                  <div className="flex items-center justify-center mb-1">
                    <Flame size={20} className="mr-1" />
                    <h1 className="text-sm font-semibold">Kal</h1>
                  </div>
                  <p>
                    <b className="font-bold text-lg">{food.calories}</b>
                    <b className="text-muted-foreground font-normal">Kkal</b>
                  </p>
                </div>
                <div>
                  <div className="flex items-center justify-center mb-1">
                    <Beef size={20} className="mr-1" />
                    <h1 className="text-sm font-semibold">Prot</h1>
                  </div>
                  <p>
                    <b className="font-bold text-lg">
                      {food.protein.toFixed(2)}
                    </b>
                    <b className="text-muted-foreground font-normal">g</b>
                  </p>
                </div>
                <div>
                  <div className="flex items-center justify-center mb-1">
                    <Wheat size={20} className="mr-1" />
                    <h1 className="text-sm font-semibold">Karbo</h1>
                  </div>
                  <p>
                    <b className="font-bold text-lg">
                      {food.carbohydrates.toFixed(2)}
                    </b>
                    <b className="text-muted-foreground font-normal">g</b>
                  </p>
                </div>
                <div>
                  <div className="flex items-center justify-center mb-1">
                    <EggFried size={20} className="mr-1" />
                    <h1 className="text-sm font-semibold">Lemak</h1>
                  </div>
                  <p>
                    <b className="font-bold text-lg">{food.fat.toFixed(2)}</b>
                    <b className="text-muted-foreground font-normal">g</b>
                  </p>
                </div>
              </div>
            </div>
          ))}
          <Button
            className="mt-4 w-full text-white"
            onClick={() => setShowTotals(!showTotals)}
          >
            {showTotals ? "Hide" : "Tampilkan"} Total Nutrisi
          </Button>
          {showTotals && (
            <div className="mt-4 p-2 border rounded-md bg-white dark:bg-background">
              <h2 className="font-bold text-lg">Total Nutrisi</h2>
              <Separator className="mb-2" />
              {foods.length < 2 ? (
                <p className="text-red-500 mb-4">
                  Tambahkan makanan lainnya untuk melihat total nutrisi.
                </p>
              ) : (
                <>
                  <ul className="mb-4">
                    {foods.map((food) => (
                      <li key={food.id} className="mb-1">
                        <b>{food.name}</b> - Porsi {portionMap[food.portion]}
                      </li>
                    ))}
                  </ul>
                  <p>
                    Total Kalori : {totalNutrients.calories}
                    <b className="text-muted-foreground font-normal">Kkal</b>
                  </p>
                  <p>
                    Total Protein : {totalNutrients.protein.toFixed(2)}
                    <b className="text-muted-foreground font-normal">g</b>
                  </p>
                  <p>
                    Total Lemak : {totalNutrients.fat.toFixed(2)}
                    <b className="text-muted-foreground font-normal">g</b>
                  </p>
                  <p>
                    Total Karbo : {totalNutrients.carbohydrates.toFixed(2)}
                    <b className="text-muted-foreground font-normal">g</b>
                  </p>

                  {/* Pass the necessary data to ButtonSaveFood */}
                  <ButtonSaveFood
                    foodNames={foods.map((food) => food.name)}
                    classCounts={foods.reduce((acc, food) => {
                      acc[food.name] = (acc[food.name] || 0) + 1;
                      return acc;
                    }, {} as Record<string, number>)}
                    totalNutrients={totalNutrients}
                  />
                </>
              )}
            </div>
          )}
        </>
      ) : (
        <p className="text-gray-600 dark:text-gray-400 text-center">
          Tidak ada makanan yang ditambahkan.
        </p>
      )}
    </div>
  );
};

export default ResultFoodManual;
