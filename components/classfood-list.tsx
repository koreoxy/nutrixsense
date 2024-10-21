"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Beef, EggFried, Flame, Wheat } from "lucide-react";
import { Separator } from "@radix-ui/react-dropdown-menu";

interface FoodData {
  name: string;
  image: string;
  portion?: string;
  kalori?: string;
  protein?: string;
  karbo?: string;
  lemak?: string;
}
const dataFood: FoodData[] = [
  {
    name: "Indomie Goreng",
    image: "/food_class/indomie_goreng.jpg",
    portion: "1 Bungkus",
    kalori: "350",
    protein: "8",
    karbo: "52",
    lemak: "12",
  },
  {
    name: "Nasi Putih",
    image: "/food_class/nasi_putih.jpg",
    portion: "1 Porsi (105g)",
    kalori: "135",
    protein: "2.79",
    karbo: "29.3",
    lemak: "0.29",
  },
  {
    name: "Paha Ayam Goreng",
    image: "/food_class/paha_ayam_goreng.jpg",
    portion: "1 Porsi",
    kalori: "239",
    protein: "18.14",
    karbo: "8.48",
    lemak: "14.23",
  },
  {
    name: "Pisang",
    image: "/food_class/pisang.jpg",
    portion: "1 Sedang",
    kalori: "105",
    protein: "1,29",
    karbo: "26.95",
    lemak: "0.39",
  },
  {
    name: "Sambal",
    image: "/food_class/sambal.jpg",
    portion: "1 Sdm",
    kalori: "15",
    protein: "1.37",
    karbo: "1.56",
    lemak: "0.41",
  },
  {
    name: "Tahu Goreng",
    image: "/food_class/tahu_goreng.jpg",
    portion: "1 Buah",
    kalori: "35",
    protein: "2.23",
    karbo: "1.36",
    lemak: "2.26",
  },
  {
    name: "Telur Dadar",
    image: "/food_class/telur_dadar.jpg",
    portion: "1 Besar",
    kalori: "93",
    protein: "6.48",
    karbo: "0.42",
    lemak: "7.33",
  },
  {
    name: "Telur Rebus",
    image: "/food_class/telur_rebus.jpg",
    portion: "1 Sedang",
    kalori: "68",
    protein: "5.51",
    karbo: "0.49",
    lemak: "4.65",
  },
  {
    name: "Tempe Goreng",
    image: "/food_class/tempe_goreng.jpg",
    portion: "1 Buah",
    kalori: "34",
    protein: "2",
    karbo: "1.79",
    lemak: "2.28",
  },
  {
    name: "Tumis Kangkung",
    image: "/food_class/tumis_kangkung.jpg",
    portion: "1 Mangkok",
    kalori: "211",
    protein: "5.5",
    karbo: "8.58",
    lemak: "18.72",
  },
];

interface FoodDetailPopupProps {
  data: FoodData;

  onClose: () => void;
}

const FoodDetailPopup: React.FC<FoodDetailPopupProps> = ({ data, onClose }) => {
  if (!data) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-[1]">
      <div className="bg-background p-4 rounded shadow-lg transform transition-all duration-300 opacity-100 scale-100">
        <h2 className="font-bold text-lg">{data.name}</h2>
        <div className="mt-4">
          <h1 className="font-bold text-base">Ringkasan Gizi</h1>
          <Separator className="my-1" />
          <div className="flex flex-row justify-between text-center border p-2 gap-4">
            <div className="flex flex-col gap-4">
              <div>
                <div className="flex items-center">
                  <Flame size={20} />
                  <h1>Kal</h1>
                </div>
                <p>
                  <b className="font-bold text-lg">{data?.kalori}</b>
                  <b className="text-muted-foreground font-normal">Kkal</b>
                </p>
              </div>

              <div>
                <div className="flex items-center">
                  <Beef size={20} />
                  <h1>Prot</h1>
                </div>
                <p>
                  <b className="font-bold text-lg">{data?.protein}</b>
                  <b className="text-muted-foreground font-normal">g</b>
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <div className="flex items-center">
                  <Wheat size={20} />
                  <h1>Karbo</h1>
                </div>
                <p>
                  <b className="font-bold text-lg">{data?.karbo}</b>
                  <b className="text-muted-foreground font-normal">g</b>
                </p>
              </div>

              <div>
                <div className="flex items-center">
                  <EggFried size={20} />
                  <h1>Lemak</h1>
                </div>
                <p>
                  <b className="font-bold text-lg">{data?.lemak}</b>
                  <b className="text-muted-foreground font-normal">g</b>
                </p>
              </div>
            </div>
          </div>
        </div>

        <Button onClick={onClose} className="mt-2 text-white w-full">
          Close
        </Button>
      </div>
    </div>
  );
};

const ClassFoodList: React.FC = () => {
  const [selectedFood, setSelectedFood] = useState<FoodData | null>(null);

  const datas = dataFood;

  return (
    <div>
      <div className="border-b mb-2">
        <h1 className="font-bold text-lg">10 Data Kelas Makanan Deteksi</h1>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {datas.map((data, index) => (
          <div
            key={index}
            className="border rounded-sm border-gray-800 relative cursor-pointer"
            onClick={() => setSelectedFood(data)}
          >
            <div className="flex justify-center items-center">
              <h1 className="font-bold text-sm z-[1] absolute hover:underline">
                {data.name}
              </h1>

              <div className="p-1">
                <Image
                  src={data.image}
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{
                    opacity: 0.4,
                    width: "500px",
                    height: "50px",
                    objectFit: "cover",
                  }}
                  alt="image"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedFood && selectedFood.portion && (
        <FoodDetailPopup
          data={selectedFood}
          onClose={() => setSelectedFood(null)}
        />
      )}
    </div>
  );
};

export default ClassFoodList;
