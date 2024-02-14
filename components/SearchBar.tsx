'use client';

import { Search } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react';

function SearchBar() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [_, startTransition] = useTransition();

  useEffect(() => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams);

      if (searchQuery) params.set('query', searchQuery);
      else params.delete('query');

      router.replace(`${pathname}?${params.toString()}`);
    });
  }, [searchQuery]);

  return (
    <form className="flex items-center gap-4 border rounded-lg px-4 py-2 mb-5">
      <Search size={18} />
      <input
        onChange={(e) => {
          setSearchQuery(e.target.value);
        }}
        value={searchQuery}
        className="border-0 bg-transparent flex-1 outline-none text-sm"
        placeholder="Search..."
      />
    </form>
  );
}

export default SearchBar;
