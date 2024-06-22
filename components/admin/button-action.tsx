import { Button } from "@/components/ui/button";
import {
  PlusCircledIcon,
  Pencil1Icon,
  CrossCircledIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";

export const CreateButton = () => {
  return (
    <Button variant="default">
      <Link href="/admin/create">
        <PlusCircledIcon />
      </Link>
    </Button>
  );
};

export const EditButton = () => {
  return (
    <Button variant="secondary">
      <Link href="/admin/edit">
        <Pencil1Icon />
      </Link>
    </Button>
  );
};

export const DeleteButton = () => {
  return (
    <Button variant="destructive">
      <Link href="/admin/delete">
        <CrossCircledIcon />
      </Link>
    </Button>
  );
};
