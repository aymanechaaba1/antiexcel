import React, { Suspense } from 'react';
import TeachersTable, { columns } from '@/components/TeachersTable';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Section from '@/components/Section';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallBack from '@/components/ErrorFallBack';
import { DEFAULT_PAGE, DEFAULT_PER_PAGE } from '@/lib/config';

function TeachersTableSkeleton() {
  const rows = 3;

  return (
    <Section title="Teachers">
      <div className="space-y-3 mt-5">
        <div className={`grid grid-cols-${columns.length} gap-x-4 gap-y-6`}>
          {columns.map((field, i) => (
            <p
              key={i}
              className="font-bold tracking-tight scroll-m-20 text-md text-gray-500"
            >
              {field}
            </p>
          ))}
          {Array.from({ length: rows }).map((_, i) => (
            <>
              <div key={i} className="w-10 h-10 rounded-full skeleton" />
              {Array.from({ length: columns.length - 1 }).map((_, i) => (
                <div key={i} className="w-full h-10 rounded-lg skeleton" />
              ))}
            </>
          ))}
        </div>
      </div>
    </Section>
  );
}

async function TeachersPage({
  searchParams: { page, per_page },
}: {
  searchParams: {
    page: string;
    per_page: string;
  };
}) {
  return (
    <>
      <div className="flex justify-end">
        <Button asChild>
          <Link href={`/teachers/add`}>Add Teacher</Link>
        </Button>
      </div>
      <ErrorBoundary FallbackComponent={ErrorFallBack}>
        <Suspense fallback={<TeachersTableSkeleton />}>
          <TeachersTable
            page={+page || DEFAULT_PAGE}
            per_page={+per_page || DEFAULT_PER_PAGE}
          />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}

export default TeachersPage;
