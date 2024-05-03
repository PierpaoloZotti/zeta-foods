"use client";

import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const Search = () => {
  const [search, setSearch] = useState<string>("");
  const router = useRouter();
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const handleSearchSubmit = () => {
    if (!search) return;
    router.push(`/restaurants?search=${search}`);
  };
  return (
    <div className="flex gap-2">
      <Input
        placeholder="Buscar restaurantes..."
        className="border-none"
        onChange={handleSearch}
      />
      <Button size="icon" onClick={handleSearchSubmit}>
        <SearchIcon size={18} />
      </Button>
    </div>
  );
};

export default Search;
