"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";

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
    portion: "1 buah",
    kalori: "1",
    protein: "2",
    karbo: "3",
    lemak: "5",
  },
  {
    name: "Nasi Putih",
    image: "/food_class/nasi_putih.jpg",
    portion: "1 buah",
    kalori: "1",
    protein: "2",
    karbo: "3",
    lemak: "5",
  },
  {
    name: "Paha Ayam Goreng",
    image: "/food_class/paha_ayam_goreng.jpg",
    portion: "1 buah",
    kalori: "1",
    protein: "2",
    karbo: "3",
    lemak: "5",
  },
  {
    name: "Pisang",
    image: "/food_class/pisang.jpg",
    portion: "1 buah",
    kalori: "1",
    protein: "2",
    karbo: "3",
    lemak: "5",
  },
  {
    name: "Sambal",
    image: "/food_class/sambal.jpg",
    portion: "1 buah",
    kalori: "1",
    protein: "2",
    karbo: "3",
    lemak: "5",
  },
  {
    name: "Tahu Goreng",
    image: "/food_class/tahu_goreng.jpg",
    portion: "1 buah",
    kalori: "1",
    protein: "2",
    karbo: "3",
    lemak: "5",
  },
  {
    name: "Telur Dadar",
    image: "/food_class/telur_dadar.jpg",
    portion: "1 buah",
    kalori: "1",
    protein: "2",
    karbo: "3",
    lemak: "5",
  },
  {
    name: "Telur Rebus",
    image: "/food_class/telur_rebus.jpg",
    portion: "1 buah",
    kalori: "1",
    protein: "2",
    karbo: "3",
    lemak: "5",
  },
  {
    name: "Tempe Goreng",
    image: "/food_class/tempe_goreng.jpg",
    portion: "1 buah",
    kalori: "1",
    protein: "2",
    karbo: "3",
    lemak: "5",
  },
  {
    name: "Tumis Kangkung",
    image: "/food_class/tumis_kangkung.jpg",
    portion: "1 buah",
    kalori: "1",
    protein: "2",
    karbo: "3",
    lemak: "5",
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

        <div>
          {data.portion && <p>Porsi: {data.portion}</p>}
          {data.kalori && <p>Kalori: {data.kalori}</p>}
          {data.protein && <p>Protein: {data.protein}</p>}
          {data.karbo && <p>Karbo: {data.karbo}</p>}
          {data.lemak && <p>Lemak: {data.lemak}</p>}
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
