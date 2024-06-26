import Image from "next/image";
import { Navbar } from "@/components/navbar";
import { MenuBar } from "@/components/menu-bar";
import { getNewestFoods } from "@/data/food";

export default async function Home() {
  const foods = await getNewestFoods();

  console.log(foods);

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
