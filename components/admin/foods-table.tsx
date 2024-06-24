import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getFoods } from "@/data/food";
import { MoreVerticalIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { DeleteDropdownItem } from "@/components/admin/delete-food-dropdown";

const FoodTable = async () => {
  const foods = await getFoods();

  if (foods.length === 0) return <p>No foods found</p>;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">No</TableHead>
          <TableHead>Food Name</TableHead>
          <TableHead>Calories</TableHead>
          <TableHead>Protein</TableHead>
          <TableHead>Fat</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {foods.map((food, index) => (
          <TableRow key={food.id}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{food.name}</TableCell>
            <TableCell>{food.calories}</TableCell>
            <TableCell>{food.protein}</TableCell>
            <TableCell>{food.fat}</TableCell>
            <TableCell className="flex justify-center">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <MoreVerticalIcon />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href={`/admin/foods/${food.id}/edit`}>Edit</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DeleteDropdownItem id={food.id} disabled={false} />
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default FoodTable;
