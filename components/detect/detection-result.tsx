import React, { useEffect, useState } from "react";
import CardDetect from "@/components/detect/card-detect";
import ButtonSaveFood from "@/components/detect/button-save-food";
import { Beef, EggFried, Flame, MessageSquareX, Wheat } from "lucide-react";

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

const DetectionResults: React.FC<{ detections: DetectionResult[] }> = ({
  detections,
}) => {
  const [foodData, setFoodData] = useState<Food[]>([]);
  const [totalNutrients, setTotalNutrients] = useState({
    calories: 0,
    protein: 0,
    fat: 0,
    carbohydrates: 0,
  });

  // Fetch food data when the component mounts
  useEffect(() => {
    const fetchFoodData = async () => {
      const response = await fetch("/api/food");
      const foods: Food[] = await response.json();
      setFoodData(foods);
    };

    fetchFoodData();
  }, []);

  // Calculate total nutrients based on detected classes and fetched food data
  useEffect(() => {
    const calculateTotalNutrients = () => {
      let totals = { calories: 0, protein: 0, fat: 0, carbohydrates: 0 };

      detections.forEach((detection) => {
        const foodName = classNameToFoodName[detection.className];
        const foodItem = foodData.find((food) => food.name === foodName);

        if (foodItem) {
          const classCount = detections.filter(
            (d) => d.className === detection.className
          ).length;

          totals.calories += foodItem.calories * classCount;
          totals.protein += foodItem.protein * classCount;
          totals.fat += foodItem.fat * classCount;
          totals.carbohydrates += foodItem.carbohydrates * classCount;
        }
      });

      setTotalNutrients(totals);
    };

    if (foodData.length > 0) {
      calculateTotalNutrients();
    }
  }, [detections, foodData]);

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
      {detections.length > 0 ? (
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
      ) : (
        <div className="mx-4 p-3 border border-red-500 rounded-md">
          <div className="flex gap-1 items-center text-red-500">
            <MessageSquareX size={20} />
            <h1 className="text-sm">Object Detect Not found</h1>
          </div>

          <p className="text-xs text-muted-foreground mt-1">
            Tidak Ada Objek yang di deteksi Upload Image Baru
          </p>
        </div>
      )}
    </section>
  );
};

export default DetectionResults;
