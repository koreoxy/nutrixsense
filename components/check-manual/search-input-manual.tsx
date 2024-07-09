"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";

interface SearchInputManualProps {
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}

const SearchInputManual = ({ setQuery }: SearchInputManualProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [localQuery, setLocalQuery] = useState("");

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearch = () => {
    setIsLoading(true);
    setQuery(localQuery);
    setIsLoading(false);
  };

  return (
    <div className="flex gap-2">
      <div className="w-full sm:max-w-xs">
        <Input
          type="text"
          value={localQuery}
          onChange={(e) => setLocalQuery(e.target.value)}
          placeholder="Search food"
          onKeyUp={handleKeyPress}
        />
      </div>
      <Button
        onClick={handleSearch}
        disabled={isLoading}
        className="text-white"
      >
        {isLoading ? (
          <>
            <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
            Searching...
          </>
        ) : (
          "Search"
        )}
      </Button>
    </div>
  );
};

export default SearchInputManual;
