"use client";

import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

const SearchUsers = ({ initialQuery = "" }: { initialQuery?: string }) => {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(initialQuery);

  const updateUrlParams = (term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");

    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }

    router.replace(`${pathName}?${params.toString()}`);
  };

  const handleSearch = useDebouncedCallback((term: string) => {
    setSearchTerm(term);
    updateUrlParams(term);
  }, 300);

  return (
    <div className="relative flex flex-col gap-4">
      <div className="relative flex flex-1">
        <Input
          placeholder="Search..."
          type="text"
          className="w-full"
          onChange={(e) => handleSearch(e.target.value)}
          defaultValue={initialQuery}
        />
        <SearchIcon className="absolute right-3 top-2 h-5 w-5" />
      </div>
    </div>
  );
};

export default SearchUsers;
