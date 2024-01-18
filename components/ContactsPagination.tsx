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
import { trpc } from '@/server/trpc';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

function ContactsPagination({
  page,
  per_page,
}: {
  page: number | 1;
  per_page: number | 5;
}) {
  const { data: contacts } = trpc.getContacts.useQuery({
    page,
    per_page,
  });

  const [isClient, setIsClient] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsClient(true);
  }, []);

  let lastPage;
  if (contacts) lastPage = Math.trunc(contacts.length / per_page);

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

export default ContactsPagination;
