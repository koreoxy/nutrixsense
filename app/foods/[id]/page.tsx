import InformasiGizi from "@/components/foods/informasi-gizi";
import { Separator } from "@/components/ui/separator";
import { getFoodById } from "@/data/food";
import { Beef, EggFried, Flame, Wheat } from "lucide-react";
import Image from "next/image";

type Food = {
  id: string;
  name: string;
  description: string;
  calories: number | null;
  protein: number | null;
  fat: number | null;
  carbohydrates: number | null;
  imagePath: string;
};

type DetailFoodProps = {
  params: {
    id: string;
  };
};

export default async function DetailFood({ params: { id } }: DetailFoodProps) {
  const food: Food | null = await getFoodById(id);

  if (!food) {
    return <div>Food not found</div>;
  }

  return (
    <div className="flex flex-col p-4">
      <h1 className="font-bold text-2xl">{food.name}</h1>
      <Separator className="my-2" />

      {food.imagePath && (
        <Image
          src={food.imagePath}
          width={500}
          height={500}
          alt={food.name}
          className="rounded-md"
        />
      )}

      <div className="mt-3">
        <h1 className="font-bold text-lg">Ringkasan Gizi</h1>
        <Separator className="my-1" />
        <div className="flex justify-between text-center border p-2">
          <div>
            <div className="flex items-center">
              <Flame size={20} />
              <h1>Kal</h1>
            </div>
            <p>
              <b className="font-bold text-lg">{food.calories}</b>
              <b className="text-muted-foreground font-normal">Kkal</b>
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
              <b className="font-bold text-lg">{food.carbohydrates}</b>
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
      </div>

      <div className="mt-3">
        <h1 className="font-bold text-lg">Deskripsi</h1>
        <Separator className="my-1" />
        <p className="text-sm text-muted-foreground">{food.description}</p>
      </div>

      <div className="mt-3">
        <h1 className="font-bold text-lg">Informasi Gizi</h1>
        <Separator className="my-1" />
        <InformasiGizi />
      </div>
    </div>
  );
}
