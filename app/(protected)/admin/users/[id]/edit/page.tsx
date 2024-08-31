import { UserForm } from "@/components/admin/users/users-form";
import { getUserById } from "@/data/user";

export default async function EditUserPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const user = await getUserById(id);

  if (!user) {
    return <p>User not found</p>;
  }

  return (
    <div className="mt-5 p-4">
      <h1 className="font-bold text-lg">Edit Users</h1>
      <UserForm user={user} />
    </div>
  );
}
