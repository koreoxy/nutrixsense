import React, { useEffect, useState } from "react";
import ButtonSaveFood from "@/components/detect/button-save-food";
import { Beef, EggFried, Flame, OctagonX, Wheat } from "lucide-react";

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

type PortionFood = {
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
  const [classNutrients, setClassNutrients] = useState<
    Record<
      string,
      { calories: number; protein: number; fat: number; carbohydrates: number }
    >
  >({});

  useEffect(() => {
    const fetchFoodData = async () => {
      const response = await fetch("/api/makanan");
      const foods: Food[] = await response.json();
      setFoodData(foods);
    };

    fetchFoodData();
  }, []);

  useEffect(() => {
    const calculateTotalNutrients = () => {
      let totals = { calories: 0, protein: 0, fat: 0, carbohydrates: 0 };
      let nutrientsPerClass: Record<
        string,
        {
          calories: number;
          protein: number;
          fat: number;
          carbohydrates: number;
        }
      > = {};

      detections.forEach((detection) => {
        const foodName = classNameToFoodName[detection.className];
        const foodItem = foodData.find((food) => food.name === foodName);

        if (foodItem) {
          const classCount = detections.filter(
            (d) => d.className === detection.className
          ).length;

          const classTotal = {
            calories: foodItem.calories * classCount,
            protein: foodItem.protein * classCount,
            fat: foodItem.fat * classCount,
            carbohydrates: foodItem.carbohydrates * classCount,
          };

          totals.calories += classTotal.calories;
          totals.protein += classTotal.protein;
          totals.fat += classTotal.fat;
          totals.carbohydrates += classTotal.carbohydrates;

          nutrientsPerClass[foodName] = classTotal;
        }
      });

      setTotalNutrients(totals);
      setClassNutrients(nutrientsPerClass);
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

  const portionFood: PortionFood = {
    "Tahu Goreng": `${classCounts["Tahu Goreng"]} Buah`,
    "Tempe Goreng": `${classCounts["Tempe Goreng"]} Buah`,
    "Paha Ayam Goreng": `${classCounts["Paha Ayam Goreng"]} Buah`,
    "Telur Dadar": `${classCounts["Telur Dadar"]} Besar`,
    "Telur Rebus": `${classCounts["Telur Rebus"]} Sedang`,
    "Tumis Kangkung": `${classCounts["Tumis Kangkung"]} Mangkok`,
    "Nasi Putih": `${classCounts["Nasi Putih"]} Porsi`,
    Pisang: `${classCounts["Pisang"]} Sedang`,
    Sambal: `${classCounts["Sambal"]} Sdm`,
    "Indomie Goreng": `${classCounts["Indomie Goreng"]} Bungkus`,
  };

  return (
    <section>
      {detections.length > 0 ? (
        <div className="border rounded-b-none rounded-t-xl shadow mt-3">
          <h1 className="font-bold text-xl text-center mt-4">Hasil Deteksi</h1>
          <p className="text-center">
            Terdapat {detections.length} Deteksi Objek Makanan
          </p>

          {Array.from(uniqueDetections).map((foodName, index) => (
            <div key={index} className="border p-4 mt-4 shadow">
              <div className="flex flex-row items-center justify-between">
                <h2 className="font-bold text-lg">{foodName}</h2>
                <p>Total {classCounts[foodName]}</p>
              </div>
              <p>{portionFood[foodName]}</p> {/* Menampilkan porsi */}
              {/* Menampilkan total nutrisi untuk setiap makanan */}
              <div className="flex gap-2 justify-between text-center mt-2">
                <div>
                  <div className="flex items-center">
                    <Flame size={20} />
                    <h1>Kal</h1>
                  </div>
                  <p>
                    <b className="font-bold text-lg">
                      {classNutrients[foodName]?.calories || 0}
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
                      {classNutrients[foodName]?.protein.toFixed(2) || 0}
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
                      {classNutrients[foodName]?.carbohydrates.toFixed(2) || 0}
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
                      {classNutrients[foodName]?.fat.toFixed(2) || 0}
                    </b>
                    <b className="text-muted-foreground font-normal">g</b>
                  </p>
                </div>
              </div>
              {/* Tombol untuk menyimpan nutrisi total per makanan hanya jika satu kelas terdeteksi */}
              {uniqueDetections.size === 1 && (
                <ButtonSaveFood
                  foodNames={[foodName]}
                  classCounts={classCounts}
                  totalNutrients={classNutrients[foodName] || totalNutrients}
                />
              )}
            </div>
          ))}

          {/* Jika lebih dari satu kelas terdeteksi, tampilkan total nutrisi semua makanan */}
          {uniqueDetections.size > 1 && (
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
                      {totalNutrients.calories}
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
          )}
        </div>
      ) : (
        <div className="rounded-b-none rounded-t-xl border mt-3">
          <h1 className="text-center text-xl font-bold mt-4">Hasil Deteksi</h1>
          <div className="flex justify-center items-center h-64">
            <div className="flex flex-col text-center items-center">
              <OctagonX size={64} />
              <p className="font-bold p-5">
                No Food Object Detected. Please Upload a New Image.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default DetectionResults;
