import Image from "next/image";

export default function Home() {
  return (
    <div className="flex-1 items-start overflow-y-auto flex justify-center my-16 bg-white">
      <div className="p-4">
        <section className="mb-36">
          <h1 className="text-4xl font-bold">Track Your Food Journey</h1>
          <Image
            src="/food.png"
            width={300}
            height={300}
            alt="food"
            className="absolute z-[1] top-[90px] left-[110px] scale-x-[-1]"
          />
        </section>

        <section className="mt-10">
          <h1>HELLO</h1>
        </section>
      </div>
    </div>
  );
}
