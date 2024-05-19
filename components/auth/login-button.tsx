"use client";

import { useRouter } from "next/navigation";

interface LoginButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}

export const LoginButtton = ({
  children,
  mode = "redirect",
  asChild,
}: LoginButtonProps) => {
  const router = useRouter();
  const OnClick = () => {
    router.push("/auth/login");
  };
  if (mode === "modal") {
    return <span>MODA</span>;
  }
  return (
    <span className="cursor-pointer" onClick={OnClick}>
      {children}
    </span>
  );
};
