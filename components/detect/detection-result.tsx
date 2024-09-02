import React, { useEffect, useState } from "react";
import CardDetect from "@/components/detect/card-detect";
import ButtonSaveFood from "@/components/detect/button-save-food";
import { Beef, EggFried, Flame, Wheat } from "lucide-react";

interface DetectionResult {
  className: string;
  score: number;
}

type Food = {
  id: number;
  name: string;
  description: string;
  calories: number;
  protein: number;
  fat: number;
  carbohydrates: number;
};

type ClassNameToFoodName = {
  [key: string]: string;
};

const classNameToFoodName: ClassNameToFoodName = {
  tahu_goreng: "Tahu Goreng",
  tempe_goreng: "Tempe Goreng",
  paha_ayam_goreng: "Paha Ayam Goreng",
  telur_dadar: "Telur Dadar",
  telur_rebus: "Telur Rebus",
  tumis_kangkung: "Tumis Kangkung",
  nasi_putih: "Nasi Putih",
  pisang: "Pisang",
  sambal: "Sambal",
  indomie_goreng: "Indomie Goreng",
};

type PortionFood = {
  [key: string]: string;
};

const portionFood: PortionFood = {
  "Tahu Goreng": "Buah",
  "Tempe Goreng": "Buah",
  "Paha Ayam Goreng": "Buah",
  "Telur Dadar": "Besar",
  "Telur Rebus": "Sedang",
  "Tumis Kangkung": "Mangkuk",
  "Nasi Putih": "Porsi",
  Pisang: "Sedang",
  Sambal: "Sdm",
  "Indomie Goreng": "Bungkus",
};

const DetectionResults: React.FC<{ detections: DetectionResult[] }> = ({
  detections,
}) => {
  const [totalNutrients, setTotalNutrients] = useState({
    calories: 0,
    protein: 0,
    fat: 0,
    carbohydrates: 0,
  });

  useEffect(() => {
    const fetchFoodData = async () => {
      const response = await fetch("/api/food");
      const foods: Food[] = await response.json();
      return foods.reduce((acc: Record<string, Food>, food: Food) => {
        acc[food.name] = food;
        return acc;
      }, {});
    };

    const calculateTotalNutrients = async () => {
      const foodData = await fetchFoodData();
      let totals = { calories: 0, protein: 0, fat: 0, carbohydrates: 0 };

      detections.forEach((detection) => {
        const foodName = classNameToFoodName[detection.className];
        const foodItem = foodData[foodName];
        if (foodItem) {
          totals.calories += foodItem.calories;
          totals.protein += foodItem.protein;
          totals.fat += foodItem.fat;
          totals.carbohydrates += foodItem.carbohydrates;
        }
      });

      setTotalNutrients(totals);
    };

    calculateTotalNutrients();
  }, [detections]);

  const classCounts = detections.reduce((acc, detection) => {
    const foodName = classNameToFoodName[detection.className];
    if (foodName) {
      acc[foodName] = (acc[foodName] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const uniqueDetections = detections.reduce((acc, detection) => {
    const foodName = classNameToFoodName[detection.className];
    if (foodName && !acc.has(foodName)) {
      acc.add(foodName);
    }
    return acc;
  }, new Set<string>());

  return (
    <section>
      {detections.length > 0 && (
        <div className="border rounded-b-none rounded-t-xl shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] mt-3">
          <h1 className="font-bold text-xl text-center mt-4">Hasil Deteksi</h1>
          <p className="text-center">{detections.length} Deteksi Objek</p>

          {Array.from(uniqueDetections).map((foodName, index) => (
            <div key={index}>
              <CardDetect name={foodName} totalClass={classCounts[foodName]} />
            </div>
          ))}

          {/* Tampilkan Total Nutrisi untuk Semua Makanan */}
          <div className="mt-4 border-t pt-4 p-4">
            <h2 className="font-bold text-lg">Total Nutrisi Semua Makanan</h2>

            {Array.from(uniqueDetections).map((foodName, index) => (
              <p key={index}>
                {classCounts[foodName]} {portionFood[foodName]} {foodName}
              </p>
            ))}
            <div className="flex gap-2 justify-between text-center mt-2">
              <div>
                <div className="flex items-center">
                  <Flame size={20} />
                  <h1>Kal</h1>
                </div>
                <p>
                  <b className="font-bold text-lg">
                    {Math.round(totalNutrients.calories)}
                  </b>
                  <b className="text-muted-foreground font-normal">Kkal</b>
                </p>
              </div>
              <div>
                <div className="flex items-center">
                  <Beef size={20} />
                  <h1>Prot</h1>
                </div>
                <p>
                  <b className="font-bold text-lg">
                    {totalNutrients.protein.toFixed(2)}
                  </b>
                  <b className="text-muted-foreground font-normal">g</b>
                </p>
              </div>
              <div>
                <div className="flex items-center">
                  <Wheat size={20} />
                  <h1>Karbo</h1>
                </div>
                <p>
                  <b className="font-bold text-lg">
                    {totalNutrients.carbohydrates.toFixed(2)}
                  </b>
                  <b className="text-muted-foreground font-normal">g</b>
                </p>
              </div>
              <div>
                <div className="flex items-center">
                  <EggFried size={20} />
                  <h1>Lemak</h1>
                </div>
                <p>
                  <b className="font-bold text-lg">
                    {totalNutrients.fat.toFixed(2)}
                  </b>
                  <b className="text-muted-foreground font-normal">g</b>
                </p>
              </div>
            </div>

            <ButtonSaveFood
              foodNames={Array.from(uniqueDetections)}
              classCounts={classCounts}
              totalNutrients={totalNutrients}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default DetectionResults;
