import ErrorFallBack from '@/components/ErrorFallBack';
import Section from '@/components/Section';
import StudentsTable, { columns } from '@/components/StudentsTable';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

function StudentsTableSkeleton() {
  const rows = 3;

  return (
    <Section title="Students">
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

async function StudentsPage() {
  return (
    <>
      <div className="flex justify-end">
        <Button asChild>
          <Link href={`/students/add`}>Add Student</Link>
        </Button>
      </div>
      <ErrorBoundary FallbackComponent={ErrorFallBack}>
        <Suspense fallback={<StudentsTableSkeleton />}>
          <StudentsTable />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}

export default StudentsPage;
