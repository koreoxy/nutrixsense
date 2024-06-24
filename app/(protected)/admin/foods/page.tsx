import FoodTable from "@/components/admin/foods-table";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const FoodPage = () => {
  return (
    <div className="flex flex-col mt-5 p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-center font-bold text-lg">Foods</h1>
        <Button asChild>
          <Link href="/admin/foods/new">Add Foods</Link>
        </Button>
      </div>

      <FoodTable />
    </div>
  );
};

export default FoodPage;
