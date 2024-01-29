'use client';

import { Search } from 'lucide-react';
import { useTransition } from 'react';

function SearchBar() {
  // const [startTransition] = useTransition();

  return (
    <form className="flex items-center gap-4 border rounded-lg px-4 py-2 mb-5">
      <Search size={18} />
      <input
        name="search_query"
        className="border-0 bg-transparent flex-1 outline-none text-sm"
        placeholder="Search a student by firstname"
      />
    </form>
  );
}

export default SearchBar;
