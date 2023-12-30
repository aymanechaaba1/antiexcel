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
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

function ContactsPagination({
  results,
  page,
  per_page,
}: {
  results: number;
  page: number | 1;
  per_page: number | 5;
}) {
  const [isClient, setIsClient] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const lastPage = Math.trunc(results / per_page);

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
          {page < lastPage && (
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

export default ContactsPagination;
