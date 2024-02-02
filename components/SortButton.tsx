'use client';

import { useRouter } from 'next/navigation';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { useEffect, useState } from 'react';

const sortOptions = ['Latest', 'Grade'] as const;

function SortButton({ page, per_page }: { page: number; per_page: number }) {
  const [sortBy, setSortBy] = useState('latest');
  const router = useRouter();

  useEffect(() => {
    const searchParamas = new URLSearchParams();
    searchParamas.set('page', page.toString());
    searchParamas.set('per_page', per_page.toString());

    if (sortBy === 'latest') {
      searchParamas.set('sort_by', 'latest');
      router.push(`/students?${searchParamas.toString()}`);
    }

    if (sortBy === 'grade') {
      searchParamas.set('sort_by', 'grade');
      router.push(`/students?${searchParamas.toString()}`);
    }
  }, [sortBy]);

  return (
    <form>
      <Label htmlFor="sort_by" hidden />
      <Select
        value={sortBy}
        onValueChange={setSortBy}
        name="sort_by"
        defaultValue="latest"
      >
        <SelectTrigger>
          <SelectValue placeholder="Sort By" />
        </SelectTrigger>
        <SelectContent>
          {sortOptions.map((option, i) => (
            <SelectItem key={i} value={option.toLowerCase()}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </form>
  );
}

export default SortButton;
