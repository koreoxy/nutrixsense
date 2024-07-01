import { MenuBar } from "@/components/menu-bar";
import { Navbar } from "@/components/navbar";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const FoodsLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    <>
      <Navbar title="Detail Food" />
      <div className="overflow-y-auto mb-16">{children}</div>
      <MenuBar />
    </>
  );
};

export default FoodsLayout;
