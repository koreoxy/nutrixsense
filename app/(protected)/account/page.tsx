import { auth, signOut } from "@/auth";

const AccountPage = async () => {
  const session = await auth();
  return (
    <div className="mt-16">
      {JSON.stringify(session)}

      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button type="submit">Sign Out</button>
      </form>
    </div>
  );
};

export default AccountPage;
