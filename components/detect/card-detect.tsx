// "use client";

// import React from "react";
// import useSWR from "swr";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// interface CardDetectProps {
//   name: string;
//   calorie: number;
// }

// type Food = {
//   id: number;
//   name: string;
//   description: string;
//   calories: number;
//   protein: number;
//   fat: number;
//   carbohydrates: number;
// };

// const fetcher = (url: string) => fetch(url).then((res) => res.json());

// export default function CardDetect({ name }: CardDetectProps) {
//   const { data, error } = useSWR<Food[]>("/api/food", fetcher);

//   if (error) return <div>failed to load</div>;
//   if (!data) return <div>loading...</div>;

//   return (
//     <>
//       {data.map((food) => (
//         <Card key={food.id}>
//           <CardHeader>
//             <CardTitle>{food.name}</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <p>Calories: {food.calories}</p>
//             <p>Protein: {food.protein}</p>
//             <p>Fat: {food.fat}</p>
//             <p>Carbohydrates: {food.carbohydrates}</p>
//           </CardContent>
//         </Card>
//       ))}
//     </>
//   );
// }

// "use client";

// import Image from "next/image";
// import React from "react";
// import useSWR from "swr";

// interface CardDetectProps {
//   name: string;
//   totalClass: number;
// }

// type Food = {
//   id: number;
//   name: string;
//   description: string;
//   calories: number;
//   protein: number;
//   fat: number;
//   carbohydrates: number;
//   imagePath: string;
// };

// type PortionFood = {
//   [key: string]: string;
// };

// const fetcher = (url: string) => fetch(url).then((res) => res.json());

// const CardDetect: React.FC<CardDetectProps> = ({ name, totalClass }) => {
//   const portionFood: PortionFood = {
//     "Tahu Goreng": `${totalClass} Buah`,
//     "Tempe Goreng": `${totalClass} Buah`,
//     "Paha Ayam Goreng": `${totalClass} Buah`,
//     "Telur Dadar": `${totalClass} Besar`,
//     "Telur Rebus": `${totalClass} Sedang`,
//     "Tumis Kangkung": `${totalClass} Mangkuk`,
//     "Nasi Putih": `${totalClass} Porsi`,
//   };

//   const { data, error } = useSWR<Food[]>("/api/food", fetcher);

//   if (error) return <div>failed to load</div>;
//   if (!data) return <div>loading...</div>;

//   const foodItem = data.find((food) => food.name === name);

//   if (!foodItem) return <div>No data found for {name}</div>;

//   const formatNumber = (num: number) =>
//     new Intl.NumberFormat("en-US", {
//       minimumFractionDigits: 2,
//       maximumFractionDigits: 2,
//     }).format(num);

//   const totalNutrients = {
//     calories: foodItem.calories * totalClass,
//     protein: foodItem.protein * totalClass,
//     fat: foodItem.fat * totalClass,
//     carbohydrates: foodItem.carbohydrates * totalClass,
//   };

//   const nutrients = [
//     {
//       label: "Kal",
//       value: foodItem.calories.toString(),
//       unit: "Kkal",
//       image: "/nutrisi/kalori.png",
//     },
//     {
//       label: "Prot",
//       value: formatNumber(foodItem.protein),
//       unit: "g",
//       image: "/nutrisi/protein.png",
//     },
//     {
//       label: "Karbo",
//       value: formatNumber(foodItem.carbohydrates),
//       unit: "g",
//       image: "/nutrisi/carbo.png",
//     },
//     {
//       label: "Lemak",
//       value: formatNumber(foodItem.fat),
//       unit: "g",
//       image: "/nutrisi/fat.png",
//     },
//   ];

//   const totalNutrientsDisplay = [
//     {
//       label: "Kal",
//       value: totalNutrients.calories.toString(),
//       unit: "Kkal",
//       image: "/nutrisi/kalori.png",
//     },
//     {
//       label: "Prot",
//       value: formatNumber(totalNutrients.protein),
//       unit: "g",
//       image: "/nutrisi/protein.png",
//     },
//     {
//       label: "Karbo",
//       value: formatNumber(totalNutrients.carbohydrates),
//       unit: "g",
//       image: "/nutrisi/carbo.png",
//     },
//     {
//       label: "Lemak",
//       value: formatNumber(totalNutrients.fat),
//       unit: "g",
//       image: "/nutrisi/fat.png",
//     },
//   ];

//   return (
//     <div className="border border-r-0 border-l-0 mt-4 p-4">
//       <div className="">
//         <h1 className="font-bold text-lg">{foodItem.name}</h1>
//         <h2>Total Porsi : {portionFood[foodItem.name]}</h2>
//       </div>
//       <div className="flex gap-2 justify-between text-center">
//         {nutrients.map((nutrient) => (
//           <div key={nutrient.label}>
//             <div className="flex items-center">
//               <Image
//                 src={nutrient.image}
//                 width={25}
//                 height={25}
//                 alt={`${nutrient.label} image`}
//               />
//               <h1>{nutrient.label}</h1>
//             </div>
//             <p>
//               <b className="font-bold text-lg">{nutrient.value}</b>
//               <b className="text-muted-foreground font-normal">
//                 {nutrient.unit}
//               </b>
//             </p>
//           </div>
//         ))}
//       </div>
//       {totalClass > 1 && (
//         <div className="mt-4 border-t pt-4">
//           <h2 className="font-bold text-lg">Total Nutrisi</h2>
//           <div className="flex gap-2 justify-between text-center">
//             {totalNutrientsDisplay.map((nutrient) => (
//               <div key={nutrient.label}>
//                 <div className="flex items-center">
//                   <Image
//                     src={nutrient.image}
//                     width={25}
//                     height={25}
//                     alt={`${nutrient.label} image`}
//                   />
//                   <h1>{nutrient.label}</h1>
//                 </div>
//                 <p>
//                   <b className="font-bold text-lg">{nutrient.value}</b>
//                   <b className="text-muted-foreground font-normal">
//                     {nutrient.unit}
//                   </b>
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CardDetect;

"use client";

import Image from "next/image";
import React from "react";
import useSWR from "swr";

interface CardDetectProps {
  name: string;
  totalClass: number;
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

type PortionFood = {
  [key: string]: string;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const CardDetect: React.FC<CardDetectProps> = ({ name, totalClass }) => {
  const portionFood: PortionFood = {
    "Tahu Goreng": `${totalClass} Buah`,
    "Tempe Goreng": `${totalClass} Buah`,
    "Paha Ayam Goreng": `${totalClass} Buah`,
    "Telur Dadar": `${totalClass} Besar`,
    "Telur Rebus": `${totalClass} Sedang`,
    "Tumis Kangkung": `${totalClass} Mangkuk`,
    "Nasi Putih": `${totalClass} Porsi`,
  };

  const { data, error } = useSWR<Food[]>("/api/food", fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  const foodItem = data.find((food) => food.name === name);

  if (!foodItem) return <div>No data found for {name}</div>;

  // Calculate total nutrients
  const totalNutrients = {
    calories: Math.round(foodItem.calories * totalClass),
    protein: (foodItem.protein * totalClass).toFixed(2),
    fat: (foodItem.fat * totalClass).toFixed(2),
    carbohydrates: (foodItem.carbohydrates * totalClass).toFixed(2),
  };

  const nutrients = [
    {
      label: "Kal",
      value: totalNutrients.calories.toString(),
      unit: "Kkal",
      image: "/nutrisi/kalori.png",
    },
    {
      label: "Prot",
      value: totalNutrients.protein,
      unit: "g",
      image: "/nutrisi/protein.png",
    },
    {
      label: "Karbo",
      value: totalNutrients.carbohydrates,
      unit: "g",
      image: "/nutrisi/carbo.png",
    },
    {
      label: "Lemak",
      value: totalNutrients.fat,
      unit: "g",
      image: "/nutrisi/fat.png",
    },
  ];

  return (
    <div className="border border-r-0 border-l-0 mt-4 p-4">
      <div className="">
        <h1 className="font-bold text-lg">
          {foodItem.name} {""}
          {portionFood[foodItem.name]}
        </h1>
      </div>
      <div className="flex gap-2 justify-between text-center">
        {nutrients.map((nutrient) => (
          <div key={nutrient.label}>
            <div className="flex items-center mt-2">
              <Image
                src={nutrient.image}
                width={25}
                height={25}
                alt={`${nutrient.label} image`}
              />
              <h1 className="text-lg">{nutrient.label}</h1>
            </div>
            <p>
              <b className="font-bold text-lg">{nutrient.value}</b>
              <b className="text-muted-foreground font-normal">
                {nutrient.unit}
              </b>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardDetect;
