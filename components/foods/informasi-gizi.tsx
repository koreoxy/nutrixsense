import { Separator } from "@/components/ui/separator";

const InformasiGizi = () => {
  return (
    <div className="border p-2">
      <div className="flex justify-between">
        <h1 className="font-bold">Ukuran Porsi</h1>
        <h2>1 Besar</h2>
      </div>

      <Separator className="my-1 h-4" />
      <h3 className="text-end text-sm font-bold mt-2">Per porsi</h3>
      <Separator className="my-2 h-2" />
      <div className="flex justify-between text-sm">
        <h1 className="font-bold">Energi</h1>
        <h2 className="font-bold">322 kj</h2>
      </div>

      <h3 className="text-end text-sm mt-1">77 kkal</h3>
      <Separator className="my-2" />
      <div className="flex justify-between text-sm">
        <h1 className="font-bold">Lemak</h1>
        <h2 className="font-bold">5.28g</h2>
      </div>

      <div className="flex flex-col text-sm my-2 gap-2">
        <div className="flex justify-between">
          <h1 className="ml-3">Lemak Jenuh</h1>
          <h2>1.627g</h2>
        </div>
        <div className="flex justify-between">
          <h1 className="ml-3">Lemak tak Jenuh Ganda</h1>
          <h2>0.704g</h2>
        </div>
        <div className="flex justify-between">
          <h1 className="ml-3">Lemak tak Jenuh Tunggal</h1>
          <h2>2.03g</h2>
        </div>
      </div>

      <Separator className="my-1" />
      <div className="flex justify-between text-sm">
        <h1>Kolestrol</h1>
        <h2>211mg</h2>
      </div>

      <Separator className="my-1" />
      <div className="flex justify-between text-sm font-bold">
        <h1>Protein</h1>
        <h2>6.26g</h2>
      </div>

      <Separator className="my-1" />
      <div className="flex justify-between text-sm font-bold">
        <h1>Karbohidrat</h1>
        <h2>0.56g</h2>
      </div>

      <div className="flex flex-col text-sm my-2 gap-2">
        <div className="flex justify-between">
          <h1 className="ml-3">Serat</h1>
          <h2>0g</h2>
        </div>
        <div className="flex justify-between">
          <h1 className="ml-3">Gula</h1>
          <h2>0.56g</h2>
        </div>
      </div>

      <Separator className="my-1" />
      <div className="flex justify-between text-sm">
        <h1>Sodium</h1>
        <h2>139mg</h2>
      </div>

      <Separator className="my-1" />
      <div className="flex justify-between text-sm">
        <h1>Kalium</h1>
        <h2>63mg</h2>
      </div>

      <Separator className="my-2 h-2" />

      <h1 className="text-xs">
        Sumber :{" "}
        <a href="https://www.fatsecret.co.id/" className="text-blue-600">
          FatSecret Platform{" "}
        </a>
      </h1>
    </div>
  );
};

export default InformasiGizi;
