import Pagination from "@/components/pagination";
import CardFoodSearch from "@/components/search/card-food-search";
import SearchInput from "@/components/search/search-input";
import { getAllFoodPages } from "@/data/food";
import { Portion } from "@prisma/client";

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

  const totalPages = await getAllFoodPages(query, prismaPortion);

  return (
    <div className="p-4 flex flex-col">
      <SearchInput initialQuery={query} initialPortion={portion} />

      <div className="mt-5">
        <CardFoodSearch
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
