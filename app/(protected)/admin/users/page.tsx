import SearchUsers from "@/components/admin/users/search-users";
import UserTable from "@/components/admin/users/user-table";
import Pagination from "@/components/pagination";
import { Button } from "@/components/ui/button";
import { getAllUsers, getAllUsersPages } from "@/data/user";
import Link from "next/link";

export default async function UserPage({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  const [users, totalPages] = await Promise.all([
    getAllUsers(query, currentPage),
    getAllUsersPages(query),
  ]);

  return (
    <div className="p-4 flex flex-col">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-center font-bold text-lg">List Users</h1>
        <Button asChild className="text-white">
          <Link href="/admin/users/new">Add Users</Link>
        </Button>
      </div>
      <SearchUsers initialQuery={query} />

      <div className="mt-5">
        <UserTable users={users} currentPage={currentPage} />
      </div>

      <div className="flex justify-center mt-4">
        {totalPages > 1 && (
          <Pagination totalPages={totalPages} currentPage={currentPage} />
        )}
      </div>
    </div>
  );
}
