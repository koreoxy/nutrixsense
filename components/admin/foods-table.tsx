import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { Food, Portion } from "@prisma/client";

const FoodTable = ({
  foods,
  query,
  currentPage,
  portion,
}: {
  foods: Food[];
  query: string;
  currentPage: number;
  portion: Portion | "all";
}) => {
  if (foods.length === 0) return <p>No foods found</p>;

  return (
    <div>
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
              <TableCell>{index + 1 + (currentPage - 1) * 6}</TableCell>
              <TableCell>{food.name}</TableCell>
              <TableCell>
                {food.calories ?? "N/A"}
                <b className="text-muted-foreground text-sm font-normal">
                  {" "}
                  kkal
                </b>
              </TableCell>
              <TableCell>
                {food.protein ?? "N/A"}
                <b className="text-muted-foreground text-sm font-normal"> g</b>
              </TableCell>
              <TableCell>
                {food.fat ?? "N/A"}
                <b className="text-muted-foreground text-sm font-normal"> g</b>
              </TableCell>
              <TableCell>
                {food.carbohydrates ?? "N/A"}
                <b className="text-muted-foreground text-sm font-normal"> g</b>
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
    </div>
  );
};

export default FoodTable;
