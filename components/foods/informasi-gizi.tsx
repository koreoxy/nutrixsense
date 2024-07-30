import { Separator } from "@/components/ui/separator";
import { Portion } from "@prisma/client";

const portionMap: { [key in Portion]: string } = {
  [Portion.SATU_BESAR]: "1 Besar",
  [Portion.SATU_SDM]: "1 sdm",
  [Portion.SERATUS_GRAM]: "100 gram",
  [Portion.SATU_BUAH]: "1 buah",
  [Portion.SATU_PORSI]: "1 porsi",
  [Portion.SATU_MANGKOK]: "1 mangkok",
  [Portion.all]: "All",
};

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
};

const InformasiGizi = ({ food }: { food: Food }) => {
  return (
    <div className="border p-2">
      <div className="flex justify-between">
        <h1 className="font-bold">Ukuran Porsi</h1>
        <h2>{food.portion ? portionMap[food.portion] : "N/A"}</h2>
      </div>

      <Separator className="my-1 h-4" />
      <h3 className="text-end text-sm font-bold mt-2">Per porsi</h3>
      <Separator className="my-2 h-2" />

      <div className="flex justify-between text-sm">
        <h1 className="font-bold">Energi</h1>
        <h2 className="font-bold">{food.energiKj ?? "0"} kj</h2>
      </div>

      <h3 className="text-end text-sm mt-1">{food.energiKl ?? "0"} kkal</h3>
      <Separator className="my-2" />

      <div className="flex justify-between text-sm">
        <h1 className="font-bold">Lemak Jenuh</h1>
        <h2 className="font-bold">{food.lemakJenuh ?? "0"}g</h2>
      </div>

      <div className="flex flex-col text-sm my-2 gap-2">
        <div className="flex justify-between">
          <h1 className="ml-3">Lemak tak Jenuh Ganda</h1>
          <h2>{food.lemakTakJenuhG ?? "0"}g</h2>
        </div>
        <div className="flex justify-between">
          <h1 className="ml-3">Lemak tak Jenuh Tunggal</h1>
          <h2>{food.lemakTakJenuhT ?? "0"}g</h2>
        </div>
      </div>

      <Separator className="my-1" />
      <div className="flex justify-between text-sm">
        <h1>Kolestrol</h1>
        <h2>{food.kolestrol ?? "0"}mg</h2>
      </div>

      <Separator className="my-1" />
      <div className="flex justify-between text-sm">
        <h1>Serat</h1>
        <h2>{food.serat ?? "0"}g</h2>
      </div>

      <Separator className="my-1" />
      <div className="flex justify-between text-sm">
        <h1>Gula</h1>
        <h2>{food.gula ?? "0"}g</h2>
      </div>

      <Separator className="my-1" />
      <div className="flex justify-between text-sm">
        <h1>Sodium</h1>
        <h2>{food.sodium ?? "0"}mg</h2>
      </div>

      <Separator className="my-1" />
      <div className="flex justify-between text-sm">
        <h1>Kalium</h1>
        <h2>{food.kalium ?? "0"}mg</h2>
      </div>

      <Separator className="my-2 h-2" />

      <h1 className="text-xs">
        Sumber :{" "}
        <a href="https://www.fatsecret.co.id/" className="text-blue-600">
          FatSecret Platform{" "}
        </a>
      </h1>
    </div>
  );
};

export default InformasiGizi;
