import { MoreVerticalIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import Link from "next/link";
import { User } from "@prisma/client";
import { DeleteUserDropdownItem } from "./delete-user-dropdown";

const UserTable = ({
  users,
  currentPage,
}: {
  users: User[];
  currentPage: number;
}) => {
  if (users.length === 0) return <p>No Users found</p>;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">No</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="text-center">
        {users.map((user, index) => (
          <TableRow key={user.id}>
            <TableCell>{index + 1 + (currentPage - 1) * 6}</TableCell>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.role}</TableCell>
            <TableCell className="flex justify-center">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <MoreVerticalIcon />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href={`/admin/users/${user.id}/edit`}>Edit</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DeleteUserDropdownItem id={user.id} disabled={false} />
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UserTable;
