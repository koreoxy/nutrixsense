import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getFoods } from "@/data/food";
import {
  CreateButton,
  DeleteButton,
  EditButton,
} from "@/components/admin/button-action";

const FoodTable = async () => {
  const foods = await getFoods();
  return (
    <Table>
      <TableCaption>A list of foods</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Id</TableHead>
          <TableHead>Food Name</TableHead>
          <TableHead>Calories</TableHead>
          <TableHead>Protein</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {foods.map((food, index) => (
          <TableRow key={food.id}>
            <TableCell className="font-medium">{index + 1}</TableCell>
            <TableCell>{food.foodName}</TableCell>
            <TableCell>{food.calories}</TableCell>
            <TableCell>{food.protein}</TableCell>
            <TableCell className="text-right">
              <CreateButton />
              <EditButton />
              <DeleteButton />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default FoodTable;
