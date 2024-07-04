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
          <TableHead>Kalori</TableHead>
          <TableHead>Protein</TableHead>
          <TableHead>Lemak</TableHead>
          <TableHead>Karbohidrat</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="text-center">
        {foods.map((food, index) => (
          <TableRow key={food.id}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{food.name}</TableCell>
            <TableCell>
              {food.calories}
              <b className="text-muted-foreground text-sm font-normal">kkal</b>
            </TableCell>
            <TableCell>
              {food.protein}
              <b className="text-muted-foreground text-sm font-normal">g</b>
            </TableCell>
            <TableCell>
              {food.fat}
              <b className="text-muted-foreground text-sm font-normal">g</b>
            </TableCell>
            <TableCell>
              {food.carbohydrates}
              <b className="text-muted-foreground text-sm font-normal">g</b>
            </TableCell>
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
