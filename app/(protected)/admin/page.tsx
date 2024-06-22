import FoodTable from "@/components/admin/foods-table";
import { RoleGate } from "@/components/auth/role-gate";
import { FormSuccess } from "@/components/form-success";
import { Navbar } from "@/components/navbar";
import { UserRole } from "@prisma/client";

const AdminPage = () => {
  return (
    <div>
      <Navbar title="Admin" />
      <RoleGate allowedRole={UserRole.ADMIN}>
        <FormSuccess message="Anda mempunyai Akses !" />
      </RoleGate>
      <div>
        <h1>Update user</h1>
        <FoodTable />
      </div>
    </div>
  );
};

export default AdminPage;
