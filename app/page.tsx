"use client";

import { LoginButtton } from "@/components/auth/login-button";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/navbar";
import { MenuBar } from "@/components/menu-bar";

export default function Home() {
  return (
    <>
      <Navbar title="Home" />
      <div className="flex-1 items-start overflow-y-auto flex justify-center mb-16 bg-white dark:bg-background">
        <div className="p-4">
          <section className="relative">
            <h1 className="text-4xl font-bold z-[1] absolute">
              Track Your Food Journey
            </h1>
            <Image
              src="/food.png"
              width={300}
              height={300}
              alt="food"
              className="absolute z-0 top-[20px] left-[53px] scale-x-[-1]"
            />
          </section>

          <section className="mt-52">
            <LoginButtton>
              <Button variant="secondary" size="lg">
                Login
              </Button>
            </LoginButtton>
          </section>

          <section>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
              reprehenderit voluptate perspiciatis alias omnis consequuntur?
              Tempore facere in aperiam, dolorum culpa ut sapiente minima
              itaque. Maxime, explicabo doloribus. Dolores, recusandae?
            </p>
          </section>
          <section>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
              reprehenderit voluptate perspiciatis alias omnis consequuntur?
              Tempore facere in aperiam, dolorum culpa ut sapiente minima
              itaque. Maxime, explicabo doloribus. Dolores, recusandae?
            </p>
          </section>
          <section>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
              reprehenderit voluptate perspiciatis alias omnis consequuntur?
              Tempore facere in aperiam, dolorum culpa ut sapiente minima
              itaque. Maxime, explicabo doloribus. Dolores, recusandae?
            </p>
          </section>
        </div>
      </div>
      <MenuBar />
    </>
  );
}
