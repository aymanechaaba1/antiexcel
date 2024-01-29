'use client';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
  cached_contacts,
  cached_students,
  cached_teachers,
} from '@/prisma/db-calls';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

function DataPagination({
  data,
  page = 1,
  per_page = 5,
}: {
  data:
    | Awaited<ReturnType<typeof cached_students>>
    | Awaited<ReturnType<typeof cached_teachers>>
    | Awaited<ReturnType<typeof cached_contacts>>;
  page?: number | 1;
  per_page?: number | 5;
}) {
  const [isClient, setIsClient] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsClient(true);
  }, []);

  let lastPage;
  if (data) lastPage = Math.trunc(data.length / per_page);

  return (
    isClient && (
      <Pagination>
        <PaginationContent>
          {page > 1 && (
            <PaginationItem>
              <PaginationPrevious
                href={`${pathname}/?page=${page - 1}&per_page=${per_page}`}
              />
            </PaginationItem>
          )}
          <PaginationItem>
            <PaginationLink
              href={`${pathname}/?page=${page}&per_page=${per_page}`}
              isActive
            >
              {page}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          {page !== lastPage && <PaginationItem>{lastPage}</PaginationItem>}
          {lastPage && page < lastPage && (
            <PaginationItem>
              <PaginationNext
                href={`${pathname}/?page=${page + 1}&per_page=${per_page}`}
              />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    )
  );
}

export default DataPagination;
