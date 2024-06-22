"use client";

import { useCurrentRole } from "@/hooks/use-current-role";
import { UserRole } from "@prisma/client";
import { FormError } from "@/components/form-error";
import { useRouter } from "next/navigation";

interface RoleGateProps {
  children: React.ReactNode;
  allowedRole: UserRole;
}

export const RoleGate = ({ children, allowedRole }: RoleGateProps) => {
  const role = useCurrentRole();
  const router = useRouter();

  if (role !== allowedRole) {
    router.push("/");
    return (
      <>
        <FormError message="Tidak punya akses!" />
      </>
    );
  } else {
    return <>{children}</>;
  }
};
