import { MenuBar } from "@/components/menu-bar";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    <>
      {children}
      <MenuBar />
    </>
  );
};

export default ProtectedLayout;
