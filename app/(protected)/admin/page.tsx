import { DashboardCard } from "@/components/admin/dashboard-card";
import { getFoods } from "@/data/food";
import { getUsers } from "@/data/user";

const AdminPage = async () => {
  const foods = await getFoods();
  const users = await getUsers();

  // Menghitung jumlah kategori unik dari foods
  const uniqueCategoriesArray = Array.from(
    new Set(foods.map((food) => food.category))
  );

  return (
    <div className="flex flex-col mt-5 p-4 space-y-4">
      <h1 className="text-center font-bold">Dashboard</h1>
      <DashboardCard
        title="Foods"
        subTitle="Total Foods"
        body={foods.length.toString()}
        titleBody="Foods"
        category={uniqueCategoriesArray.length.toString()}
        titleCategory="Category"
      />
      <DashboardCard
        title="Users"
        subTitle="Total Users"
        body={users.length.toString()}
        titleBody="Users"
      />
    </div>
  );
};

export default AdminPage;
