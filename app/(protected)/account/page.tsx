"use server";

import { Button } from "@/components/ui/button";

import { UserInfo } from "@/components/user-info";
import { currentUser } from "@/lib/auth";
import { signOut } from "@/auth";

const AccountPage = async () => {
  const user = await currentUser();

  return (
    <>
      <div className="flex flex-col p-5">
        <UserInfo user={user} label="Info Account" />

        <form
          action={async () => {
            "use server";

            await signOut();
          }}
        >
          <Button variant="destructive" className="w-full" type="submit">
            Logout
          </Button>
        </form>
      </div>
    </>
  );
};

export default AccountPage;
