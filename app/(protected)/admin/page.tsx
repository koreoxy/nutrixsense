import { DashboardCard } from "@/components/admin/dashboard-card";

const AdminPage = () => {
  return (
    <div className="flex flex-col mt-5 p-4 space-y-4">
      <h1 className="text-center font-bold">Dashboard</h1>
      <DashboardCard title="Foods" subTitle="fodsada" body="teasds" />
      <DashboardCard title="Users" subTitle="fodsada" body="teasds" />
    </div>
  );
};

export default AdminPage;
