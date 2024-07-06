import Pagination from "@/components/pagination";
import CardFoodSearch from "@/components/search/card-food-search";
import SearchInput from "@/components/search/search-input";
import { getAllFoodPages } from "@/data/food";

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
    portion?: string;
  };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const portion = searchParams?.portion || "all";

  const totalPages = await getAllFoodPages(query, portion);

  return (
    <div className="p-4 flex flex-col">
      <SearchInput initialQuery={query} initialPortion={portion} />

      <div className="mt-5">
        <CardFoodSearch
          query={query}
          currentPage={currentPage}
          portion={portion}
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
