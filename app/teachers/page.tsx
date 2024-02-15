import React, { Suspense } from 'react';
import TeachersTable, {
  TeachersSortOptions,
  columns,
} from '@/components/TeachersTable';
import Section from '@/components/Section';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallBack from '@/components/ErrorFallBack';
import { DEFAULT_PAGE, DEFAULT_PER_PAGE, DEFAULT_SORT_BY } from '@/lib/config';
import TeachersFilterBtns from '@/components/TeachersFilterBtns';
import SearchBar from '@/components/SearchBar';
import SortBtn from '@/components/SortBtn';
import AddTeacherBtn from '@/components/AddTeacherBtn';
import { countTeachers } from '@/prisma/db-calls';
import { DateRangePicker } from '@/components/DateRangePicker';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';

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

type Gender = 'male' | 'female';
type Subject = 'maths' | 'physics' | 'french';

const teachersSortOptions = ['latest', 'oldest', 'nb_students'] as const;

async function TeachersPage({
  searchParams: { page, per_page, sort_by, gender, subject, query, from, to },
}: {
  searchParams: {
    page: string;
    per_page: string;
    sort_by: TeachersSortOptions;
    gender?: Gender;
    subject?: Subject;
    query?: string;
    from?: string;
    to?: string;
  };
}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect(`/api/auth/signin`);

  const totalTeachers = await countTeachers(session.user.id);

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <AddTeacherBtn totalTeachers={totalTeachers} />
      </div>
      {totalTeachers > 0 && (
        <>
          <div className="flex justify-end gap-4 my-4">
            <SortBtn sortOptions={teachersSortOptions} />
          </div>
          <div className="flex justify-end gap-4 my-4">
            <TeachersFilterBtns />
          </div>
          <div className="flex justify-end gap-4 my-4">
            <DateRangePicker className="flex items-center" />
          </div>
          <SearchBar />
        </>
      )}
      <ErrorBoundary FallbackComponent={ErrorFallBack}>
        <Suspense fallback={<TeachersTableSkeleton />}>
          <TeachersTable
            page={+page || DEFAULT_PAGE}
            per_page={+per_page || DEFAULT_PER_PAGE}
            sort_by={sort_by || DEFAULT_SORT_BY}
            gender={gender}
            subject={subject}
            query={query}
            from={Number(from)}
            to={Number(to)}
          />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default TeachersPage;
