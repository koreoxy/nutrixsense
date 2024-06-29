"use client";

import { Button } from "@/components/ui/button";

import { UserInfo } from "@/components/user-info";
import { useCurrentUser } from "@/hooks/use-current-user";
import { signOut } from "next-auth/react";

const AccountPage = () => {
  const user = useCurrentUser();
  const onClick = () => {
    signOut();
  };

  return (
    <>
      <div className="flex flex-col p-5">
        <UserInfo user={user} label="Info Account" />
        <Button onClick={onClick} variant="destructive" type="submit">
          Logout
        </Button>
      </div>
    </>
  );
};

export default AccountPage;
