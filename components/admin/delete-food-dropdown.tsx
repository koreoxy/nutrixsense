"use client";

import { useTransition } from "react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { deleteFood } from "@/actions/admin/foods";
import { useRouter } from "next/navigation";

export function DeleteDropdownItem({
  id,
  disabled,
}: {
  id: string;
  disabled: boolean;
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <DropdownMenuItem
      disabled={disabled || isPending}
      onClick={() => {
        startTransition(async () => {
          await deleteFood(id);
          router.refresh();
        });
      }}
      className="bg-destructive"
    >
      Delete
    </DropdownMenuItem>
  );
}
