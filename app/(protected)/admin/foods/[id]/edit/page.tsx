import FoodForm from "@/components/admin/food-form";
import { getFoodById } from "@/data/food";

export default async function EditFoodPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const food = await getFoodById(id);
  return (
    <div className="mt-5 p-4">
      <h1 className="font-bold text-lg">Edit Foods</h1>
      <FoodForm food={food} />
    </div>
  );
}
