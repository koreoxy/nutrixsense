"use client";

import InformasiGizi from "@/components/foods/informasi-gizi";
import { Separator } from "@/components/ui/separator";
import { Beef, EggFried, Flame, Wheat } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import SelectPorsi from "@/components/foods/select-porsi";
import { useToast } from "@/components/ui/use-toast";
import { Category, Portion } from "@prisma/client";

type Food = {
  id: string | null;
  name: string | null;
  description: string | null;
  calories: number | null;
  protein: number | null;
  fat: number | null;
  carbohydrates: number | null;
  portion: Portion | null;
  berat: string | null;
  energiKj: number | null;
  energiKl: number | null;
  lemakJenuh: number | null;
  lemakTakJenuhG: number | null;
  lemakTakJenuhT: number | null;
  kolestrol: number | null;
  serat: number | null;
  gula: number | null;
  sodium: number | null;
  kalium: number | null;
  imagePath: string;
  category: Category;
};

const portionMap: { [key in Portion | "all"]: string } = {
  [Portion.SATU_BESAR]: "1 Besar",
  [Portion.SATU_SDM]: "1 sdm",
  [Portion.SERATUS_GRAM]: "100 gram",
  [Portion.SATU_BUAH]: "1 buah",
  [Portion.SATU_PORSI]: "1 porsi",
  [Portion.SATU_MANGKOK]: "1 mangkok",
  [Portion.SATU_SEDANG]: "1 Sedang",
  [Portion.SATU_KECIL]: "1 kecil",
  [Portion.SATU_BUNGKUS]: "1 bungkus",
  all: "All",
};

const DetailFoodList = () => {
  const pathname = usePathname();
  const id = pathname.split("/")[2];

  const { toast } = useToast();

  const [food, setFood] = useState<Food | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPortion, setSelectedPortion] = useState<string | null>(null);
  const [allFoodData, setAllFoodData] = useState<Food[]>([]);

  const fetchFoodById = async (foodId: string) => {
    try {
      const response = await fetch(`/api/food?id=${foodId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch food data");
      }
      const data: Food[] = await response.json();
      setAllFoodData(data);
      const selectedFood = data.find((item) => item.id === foodId);
      if (selectedFood) {
        setFood(selectedFood);
      } else {
        setError("Food data not found.");
      }
    } catch (err) {
      console.error("Error fetching food:", err);
      setError("Failed to load food data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchFoodById(id);
    }
  }, [id]);

  const handlePortionChange = (portion: Portion) => {
    setSelectedPortion(portion);
    const foodByPortion = allFoodData.find(
      (item) => item.name === food?.name && item.portion === portion
    );
    if (foodByPortion) {
      setFood(foodByPortion);
      setError(null);
    } else {
      toast({
        title: "Porsi Tidak Tersedia",
        description: "Porsi ini tidak tersedia untuk makanan ini.",
      });
    }
  };

  if (loading)
    return (
      <div className="flex flex-col overflow-y-auto my-16 bg-white text-black dark:text-white dark:bg-background h-full mx-auto justify-center items-center">
        <div className="loading"></div>
      </div>
    );

  if (error) return <p>{error}</p>;

  return (
    <div className="flex flex-col p-4">
      <h1 className="font-bold text-2xl">{food?.name}</h1>
      <div className="flex gap-2 text-sm text-muted-foreground">
        <h1>{food?.portion ? portionMap[food.portion] : "N/A"}</h1>
        {food?.berat && <h1>- ({food.berat} g)</h1>}
      </div>
      <h2 className="text-sm text-muted-foreground">
        {food?.category
          .toLowerCase()
          .replace(/_/g, " ")
          .replace(/^\w/, (c) => c.toUpperCase())}
      </h2>
      <Separator className="my-2" />

      {food && (
        <Image
          src={food.imagePath || "/food-3d/5.png"}
          width={0}
          height={0}
          sizes="100vw"
          style={{
            width: "500px",
            height: "250px",
            objectFit: "cover",
          }}
          alt={food.name || "Food image"}
          className="rounded-md"
        />
      )}

      <div className="mt-4">
        <h1 className="font-bold text-lg">Ringkasan Gizi</h1>
        <Separator className="my-1" />
        <div className="flex justify-between text-center border p-2">
          <div>
            <div className="flex items-center">
              <Flame size={20} />
              <h1>Kal</h1>
            </div>
            <p>
              <b className="font-bold text-lg">{food?.calories}</b>
              <b className="text-muted-foreground font-normal">Kkal</b>
            </p>
          </div>

          <div>
            <div className="flex items-center">
              <Beef size={20} />
              <h1>Prot</h1>
            </div>
            <p>
              <b className="font-bold text-lg">{food?.protein}</b>
              <b className="text-muted-foreground font-normal">g</b>
            </p>
          </div>

          <div>
            <div className="flex items-center">
              <Wheat size={20} />
              <h1>Karbo</h1>
            </div>
            <p>
              <b className="font-bold text-lg">{food?.carbohydrates}</b>
              <b className="text-muted-foreground font-normal">g</b>
            </p>
          </div>

          <div>
            <div className="flex items-center">
              <EggFried size={20} />
              <h1>Lemak</h1>
            </div>
            <p>
              <b className="font-bold text-lg">{food?.fat}</b>
              <b className="text-muted-foreground font-normal">g</b>
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <h1 className="font-bold text-lg">Deskripsi</h1>
        <Separator className="my-1" />
        <p className="text-sm text-muted-foreground">{food?.description}</p>
      </div>

      <div className="mt-4">
        <h1 className="font-bold text-lg">Pilih Porsi</h1>
        <Separator className="my-1" />
        <SelectPorsi
          portion={food?.portion ?? null}
          onChange={handlePortionChange}
        />
      </div>

      <div className="mt-4">
        <h1 className="font-bold text-lg">Informasi Gizi</h1>
        <Separator className="my-1" />
        {food && <InformasiGizi food={food} />}
      </div>
    </div>
  );
};

export default DetailFoodList;
