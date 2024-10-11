"use client";

import { useState, useEffect } from "react";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Beef, EggFried, Flame, Info, Wheat } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Food {
  id: string;
  name: string;
  classCounts: { [key: string]: number };
  calories: number;
  protein: number;
  fat: number;
  carbohydrates: number;
  createdAt: string;
}

const portionFood: { [key: string]: string } = {
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

const AccountSaveFood = () => {
  const user = useCurrentUser();
  const [saveFood, setSaveFood] = useState<Food[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSaveFood = async () => {
      if (user?.id) {
        try {
          const response = await fetch(`/api/savefood?userId=${user.id}`);
          if (!response.ok) {
            throw new Error("Failed to fetch saved foods");
          }
          const data = await response.json();
          setSaveFood(data.data);
        } catch (err) {
          console.error("Error fetching saved food:", err);
          setError("Failed to load saved foods.");
        }
      }
      setLoading(false);
    };

    fetchSaveFood();
  }, [user?.id]);

  const handleDelete = async (foodId: string) => {
    try {
      const response = await fetch(`/api/savefood?foodId=${foodId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete food");
      }
      setSaveFood((prevSaveFood) =>
        prevSaveFood.filter((food) => food.id !== foodId)
      );
    } catch (err) {
      console.error("Error deleting food:", err);
      setError("Failed to delete food.");
    }
  };

  return (
    <div>
      {loading ? (
        <div className="flex flex-col overflow-y-auto my-16 text-black dark:text-white dark:bg-background h-full mx-auto justify-center items-center">
          <div>Loading...</div>
        </div>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <h1 className="text-center font-bold text-lg mt-4">
            List Nutrisi Makanan
          </h1>
          <div>
            {saveFood.length > 0 ? (
              <div className="">
                {saveFood.map((food, index) => (
                  <div key={index} className="border my-2 p-4">
                    <h1 className="font-bold">Total Nutrisi Makanan</h1>
                    <div>{new Date(food.createdAt).toLocaleString()}</div>
                    <ul className="mt-1">
                      {food.classCounts &&
                        Object.entries(food.classCounts).map(
                          ([foodName, count]: [string, number], idx) => (
                            <li key={idx}>
                              {foodName} {count} {portionFood[foodName] || ""}
                            </li>
                          )
                        )}
                    </ul>
                    <div className="flex flex-row gap-2 justify-between text-center mt-2">
                      <div>
                        <div className="flex items-center">
                          <Flame size={20} />
                          <h1>Kal</h1>
                        </div>
                        <p>
                          <b className="font-bold text-lg">{food.calories}</b>
                          <b className="text-muted-foreground font-normal">
                            Kkal
                          </b>
                        </p>
                      </div>

                      <div>
                        <div className="flex items-center">
                          <Beef size={20} />
                          <h1>Prot</h1>
                        </div>
                        <p>
                          <b className="font-bold text-lg">{food.protein}</b>
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
                            {food.carbohydrates}
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
                          <b className="font-bold text-lg">{food.fat}</b>
                          <b className="text-muted-foreground font-normal">g</b>
                        </p>
                      </div>
                    </div>
                    <Button
                      className="w-full mt-2"
                      variant="destructive"
                      onClick={() => handleDelete(food.id)}
                    >
                      Delete
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-5">
                <div className="p-3 border border-orange-500 rounded-md mx-5">
                  <div className="flex gap-1 items-center text-orange-700">
                    <Info size={20} />
                    <h1 className="text-sm">Note</h1>
                  </div>

                  <p className="text-xs text-muted-foreground mt-1">
                    Tidak Ada Data makanan yang disimpan, anda bisa tambahkan
                    makanan baru
                  </p>
                  <Button className="w-full mt-2" variant="secondary">
                    <Link href="/image-detect">Deteksi Makanan Baru</Link>
                  </Button>
                  <Button className="w-full mt-2" variant="secondary">
                    <Link href="/check-manual">Tambahkan Makanan Baru</Link>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default AccountSaveFood;
