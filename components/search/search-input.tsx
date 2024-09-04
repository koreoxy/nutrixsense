"use client";

import { Input } from "@/components/ui/input";
import { Blinds, Filter, FilterX, SearchIcon } from "lucide-react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select";
import { Category, Portion } from "@prisma/client";
import { useDebouncedCallback } from "use-debounce";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { FaChartPie } from "react-icons/fa";

const SearchInput = ({
  initialQuery,
  initialPortion,
  initialCategory,
}: {
  initialQuery: string;
  initialPortion: string;
  initialCategory: Category | undefined;
}) => {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();
  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [selectedPortion, setSelectedPortion] =
    useState<string>(initialPortion);
  const [selectedCategory, setSelectedCategory] = useState<
    Category | undefined
  >(initialCategory);
  const [showFilters, setShowFilters] = useState<boolean>(false);

  const updateUrlParams = (
    term: string,
    portion: string,
    category?: Category
  ) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");

    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }

    if (portion && portion !== "all") {
      params.set("portion", portion);
    } else {
      params.delete("portion");
    }

    if (category) {
      params.set("category", category);
    } else {
      params.delete("category");
    }

    replace(`${pathName}?${params.toString()}`);
  };

  const handleSearch = useDebouncedCallback((term: string) => {
    setSearchTerm(term);
    updateUrlParams(term, selectedPortion, selectedCategory);
  }, 300);

  const handlePortionChange = (value: string) => {
    setSelectedPortion(value);
    updateUrlParams(searchTerm, value, selectedCategory);
  };

  const handleCategoryChange = (value: Category) => {
    setSelectedCategory(value);
    updateUrlParams(searchTerm, selectedPortion, value);
  };

  const toggleFilters = () => {
    if (showFilters) {
      // Reset filters when hiding
      setSelectedPortion("all");
      setSelectedCategory(undefined);
      updateUrlParams(searchTerm, "all");
    }
    setShowFilters(!showFilters);
  };

  return (
    <div className="relative flex flex-col gap-4">
      <div className="flex items-center gap-2">
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

        <Button
          onClick={toggleFilters}
          className="cursor-pointer flex dark:text-white"
          variant="outline"
        >
          {showFilters ? (
            <>
              <FilterX />
              <h1>Close</h1>
            </>
          ) : (
            <>
              <Filter />
              <h1>Open</h1>
            </>
          )}
        </Button>
      </div>

      {showFilters && (
        <>
          <div className="flex-col mt-1">
            <h1 className="text-sm mb-2 font-bold">
              Pilih Porsi dan Kategori Makanan
            </h1>
            <Select
              name="portion"
              value={selectedPortion}
              onValueChange={handlePortionChange}
            >
              <SelectTrigger>
                <div className="flex items-center gap-2">
                  <FaChartPie />
                  <SelectValue placeholder="Pilih porsi" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Porsi</SelectLabel>
                  <SelectItem value="all">Semua</SelectItem>
                  <SelectItem value={Portion.SATU_BESAR}>1 Besar</SelectItem>
                  <SelectItem value={Portion.SATU_SDM}>1 sdm</SelectItem>
                  <SelectItem value={Portion.SERATUS_GRAM}>100 gram</SelectItem>
                  <SelectItem value={Portion.SATU_BUAH}>1 buah</SelectItem>
                  <SelectItem value={Portion.SATU_PORSI}>1 porsi</SelectItem>
                  <SelectItem value={Portion.SATU_MANGKOK}>
                    1 mangkok
                  </SelectItem>
                  <SelectItem value={Portion.SATU_SEDANG}>1 sedang</SelectItem>
                  <SelectItem value={Portion.SATU_KECIL}>1 kecil</SelectItem>
                  <SelectItem value={Portion.SATU_BUNGKUS}>
                    1 bungkus
                  </SelectItem>
                  <SelectItem value={Portion.SATU_GELAS}>1 gelas</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Select
              name="category"
              value={selectedCategory}
              onValueChange={(value) => handleCategoryChange(value as Category)}
            >
              <SelectTrigger>
                <div className="flex items-center gap-2">
                  <Blinds size={20} />
                  <SelectValue placeholder="Pilih kategori" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Kategori</SelectLabel>
                  {Object.entries(Category).map(([key, value]) => {
                    const formattedKey = key
                      .replace(/_/g, " ")
                      .toLowerCase()
                      .replace(/^\w/, (c) => c.toUpperCase());
                    return (
                      <SelectItem key={key} value={value}>
                        {formattedKey}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </>
      )}
    </div>
  );
};

export default SearchInput;
