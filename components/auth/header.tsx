import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";

interface HeaderProps {
  label: string;
}

export const Header = ({ label }: HeaderProps) => {
  const { theme } = useTheme();
  const logoSrc = theme === "dark" ? "/logo-dark.png" : "/logo-light.png";

  return (
    <div className="w-full flex flex-col items-center gap-y-4 justify-center">
      <Link href="/">
        <Image src={logoSrc} width={50} height={50} alt="logo" />
      </Link>
      <h1 className="text-3xl font-bold">NutrixSense</h1>
      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  );
};
