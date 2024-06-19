import { auth, signOut } from "@/auth";
import { MenuBar } from "@/components/menu-bar";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";

const AccountPage = async () => {
  const session = await auth();
  return (
    <>
      <Navbar title="Account" />
      <div className="flex flex-col overflow-y-auto mb-16 bg-white dark:bg-background h-full">
        <div className="flex flex-col p-5">
          <span> {JSON.stringify(session)}</span>

          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <Button variant="destructive" type="submit">
              Sign Out
            </Button>
          </form>
        </div>
      </div>

      <MenuBar />
    </>
  );
};

export default AccountPage;
