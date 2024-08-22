import Pagination from "@/components/pagination";
import FoodTable from "@/components/admin/foods-table";
import SearchInput from "@/components/search/search-input";
import { getAllFoodAdmin, getAllFoodPages } from "@/data/food";
import { Portion } from "@prisma/client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

enum CustomPortion {
  SATU_BESAR = "SATU_BESAR",
  SATU_SDM = "SATU_SDM",
  SERATUS_GRAM = "SERATUS_GRAM",
  SATU_BUAH = "SATU_BUAH",
  SATU_PORSI = "SATU_PORSI",
  SATU_MANGKOK = "SATU_MANGKOK",
  ALL = "all",
}

const mapToPortion = (customPortion: CustomPortion): Portion | "all" => {
  if (customPortion === CustomPortion.ALL) {
    return "all";
  }
  return customPortion as Portion;
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
    portion?: CustomPortion;
  };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const portion = searchParams?.portion || CustomPortion.ALL;
  const prismaPortion = mapToPortion(portion);

  const [foods, totalPages] = await Promise.all([
    getAllFoodAdmin(query, currentPage),
    getAllFoodPages(query, prismaPortion),
  ]);

  return (
    <div className="p-4 flex flex-col">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-center font-bold text-lg">List Makanan</h1>
        <Button asChild className="text-white">
          <Link href="/admin/foods/new">Add Foods</Link>
        </Button>
      </div>
      <SearchInput initialQuery={query} initialPortion={portion} />

      <div className="mt-5">
        <FoodTable
          foods={foods}
          query={query}
          currentPage={currentPage}
          portion={prismaPortion}
        />
      </div>

      <div className="flex justify-center mt-4">
        {totalPages > 1 && (
          <Pagination totalPages={totalPages} currentPage={currentPage} />
        )}
      </div>
    </div>
  );
}
