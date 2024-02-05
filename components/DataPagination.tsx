'use client';

import { ArrowLeft, ArrowRight } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Button } from './ui/button';

function DataPagination({ totalResults }: { totalResults: number }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  let currentPage = searchParams.get('page');
  let per_page = searchParams.get('per_page');
  if (!currentPage || !per_page) return;

  const totalPages = Math.trunc(totalResults / Number(per_page)) || 1;
  const onFirstPage = Number(currentPage) === 1;
  const onLastPage = Number(currentPage) === totalPages;

  const newSearchParams = new URLSearchParams();

  return (
    <div className="flex items-center justify-between w-full mx-auto my-5">
      {!onFirstPage ? (
        <Button
          variant={'ghost'}
          className="px-3 py-2 rounded-lg flex justify-center items-center border"
          onClick={() => {
            newSearchParams.set('page', `${Number(currentPage) - 1}`);
            per_page && newSearchParams.set('per_page', per_page);
            replace(`${pathname}/?${newSearchParams.toString()}`);
          }}
        >
          <p className="sr-only text-center font-semibold">Prev</p>
          <ArrowLeft
            size={20}
            className="dark:text-gray-200 text-gray-800 cursor-pointer"
          />
        </Button>
      ) : (
        <div />
      )}

      <p className="font-bold">{currentPage}</p>

      {!onLastPage ? (
        <Button
          variant={'ghost'}
          className="px-3 py-2 rounded-lg flex justify-center items-center border"
          onClick={() => {
            newSearchParams.set('page', `${Number(currentPage) + 1}`);
            per_page && newSearchParams.set('per_page', per_page);
            replace(`${pathname}/?${newSearchParams.toString()}`);
          }}
        >
          <p className="sr-only text-center font-semibold">Next</p>
          <ArrowRight
            size={20}
            className="dark:text-gray-200 text-gray-800 cursor-pointer"
          />
        </Button>
      ) : (
        <div />
      )}
    </div>
  );
}

export default DataPagination;
