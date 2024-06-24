import { NavbarAdmin } from "@/components/admin/navbar-admin";
import { RoleGate } from "@/components/auth/role-gate";
import { FormSuccess } from "@/components/form-success";
import { Navbar } from "@/components/navbar";
import { UserRole } from "@prisma/client";

export const dynamic = "force-dynamic";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    <>
      <Navbar title="Admin" />
      <div className="overflow-y-auto mb-16">
        <RoleGate allowedRole={UserRole.ADMIN}>
          <FormSuccess message="Anda mempunyai Akses !" />
        </RoleGate>
        <NavbarAdmin />
        {children}
      </div>
    </>
  );
};

export default AdminLayout;
