"use client";

import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
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
import { Portion } from "@prisma/client";
import { useDebouncedCallback } from "use-debounce";

const SearchInputAdmin = ({
  initialQuery = "",
  initialPortion = "all",
}: {
  initialQuery?: string;
  initialPortion?: string;
}) => {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();
  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [selectedPortion, setSelectedPortion] =
    useState<string>(initialPortion);

  const updateUrlParams = (term: string, portion: string) => {
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

    replace(`${pathName}?${params.toString()}`);
  };

  const handleSearch = useDebouncedCallback((term: string) => {
    setSearchTerm(term);
    updateUrlParams(term, selectedPortion);
  }, 300);

  const handlePortionChange = (value: string) => {
    setSelectedPortion(value);
    updateUrlParams(searchTerm, value);
  };

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
      {/* <div className="flex-col">
        <h1 className="text-sm mb-1 font-bold">Pilih Porsi</h1>
        <Select
          name="portion"
          value={selectedPortion}
          onValueChange={handlePortionChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="Pilih porsi" />
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
              <SelectItem value={Portion.SATU_MANGKOK}>1 mangkok</SelectItem>
              <SelectItem value={Portion.SATU_SEDANG}>1 sedang</SelectItem>
              <SelectItem value={Portion.SATU_KECIL}>1 kecil</SelectItem>
              <SelectItem value={Portion.SATU_BUNGKUS}>1 bungkus</SelectItem>
              <SelectItem value={Portion.SATU_GELAS}>1 gelas</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div> */}
    </div>
  );
};

export default SearchInputAdmin;
