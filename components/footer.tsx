"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaInstagram, FaYoutube } from "react-icons/fa";

export const Footer = () => {
  const { theme } = useTheme();
  const logoSrc = theme === "dark" ? "/logo-dark.png" : "/logo-light.png";

  return (
    <div className="mt-10 border-t">
      <div className="flex flex-row justify-between items-center p-2">
        <div className="flex gap-2 items-center">
          <Image src={logoSrc} width={20} height={20} alt="logo" />
          <h1 className="font-bold text-lg">NutrixSense</h1>
        </div>

        <div className="">
          <div className="flex gap-2">
            <Link href="https://github.com/koreoxy" target="_blank">
              <FaGithub size={25} />
            </Link>

            <Link href="https://www.youtube.com/@1sh1sh" target="_blank">
              <FaYoutube size={25} />
            </Link>

            <Link href="https://www.instagram.com/ifulufi/" target="_blank">
              <FaInstagram size={25} />
            </Link>
          </div>
        </div>
      </div>
      <p className="text-xs text-muted-foreground text-center mt-5">
        Versi 1.0
      </p>
      <p className="text-xs text-muted-foreground mt-1 text-center">
        Koreoxy &copy; 2024
      </p>
    </div>
  );
};
