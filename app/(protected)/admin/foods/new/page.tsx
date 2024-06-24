import { FoodForm } from "@/components/admin/food-form";

export default function NewFoodPage() {
  return (
    <div className="mt-5 p-4">
      <h1 className="font-bold text-lg">Add Foods</h1>
      <FoodForm />
    </div>
  );
}
