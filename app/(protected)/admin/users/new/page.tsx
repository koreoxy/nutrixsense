import { UserForm } from "@/components/admin/users/users-form";

export default function NewUsersPage() {
  return (
    <div className="mt-5 p-4">
      <h1 className="font-bold text-lg text-center">Tambahkan User baru</h1>
      <UserForm />
    </div>
  );
}
