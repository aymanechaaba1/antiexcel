'use client';

import { useEffect, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { DEFAULT_SORT_BY } from '@/lib/config';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

function SortBtn({ sortOptions }: { sortOptions: readonly string[] }) {
  const [sortBy, setSortBy] = useState<string>(DEFAULT_SORT_BY);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const page = searchParams.get('page');
    const per_page = searchParams.get('per_page');

    if (!page || !per_page) return;

    const newSearchParams = new URLSearchParams();
    newSearchParams.set('page', page);
    newSearchParams.set('per_page', per_page);
    newSearchParams.set('sort_by', sortBy);

    router.replace(`${pathname}/?${newSearchParams.toString()}`);
  }, [sortBy]);

  return (
    <Select onValueChange={setSortBy} defaultValue={DEFAULT_SORT_BY}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Sort By" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Sort By</SelectLabel>
          {sortOptions.map((option, i) => (
            <SelectItem key={i} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default SortBtn;
