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
      <div className="flex flex-col overflow-y-auto mb-16 bg-white dark:bg-background h-full">
        <div className="flex flex-col p-5">
          {/* {user ? <span> {JSON.stringify(user)}</span> : <div>Loading...</div>} */}
          <UserInfo user={user} label="Info Account" />
          <Button onClick={onClick} variant="destructive" type="submit">
            Logout
          </Button>
        </div>
      </div>
    </>
  );
};

export default AccountPage;
