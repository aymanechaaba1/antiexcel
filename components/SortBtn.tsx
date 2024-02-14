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
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [sort_by, setSortBy] = useState<string>(
    searchParams.get('sort_by') || ''
  );

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    if (sort_by) params.set('sort_by', sort_by);
    else params.delete('sort_by');

    router.replace(`${pathname}/?${params.toString()}`);
  }, [sort_by]);

  return (
    <Select onValueChange={setSortBy} value={sort_by}>
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
