import { LogoutButton } from "@/components/auth/logout-button";
import { Button } from "@/components/ui/button";
import { UserInfo } from "@/components/user-info";
import { currentUser } from "@/lib/auth";

const ServerPage = async () => {
  const user = await currentUser();

  return (
    <>
      <UserInfo user={user} label="Server component" />
      <Button variant="destructive">
        <LogoutButton>Logout</LogoutButton>
      </Button>
    </>
  );
};

export default ServerPage;
