import { MenuBar } from "@/components/menu-bar";
import { Navbar } from "@/components/navbar";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    <>
      <Navbar title="Account" />
      {children}
      <MenuBar />
    </>
  );
};

export default ProtectedLayout;
