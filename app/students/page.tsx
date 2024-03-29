import ErrorFallBack from '@/components/ErrorFallBack';
import Section from '@/components/Section';
import StudentsTable, {
  StudentsSortOptions,
  columns,
} from '@/components/StudentsTable';
import { DEFAULT_PAGE, DEFAULT_PER_PAGE, DEFAULT_SORT_BY } from '@/lib/config';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { countStudents, getTeacherIds } from '@/prisma/db-calls';
import StudentsFilterBtns from '@/components/StudentsFilterBtns';
import SearchBar from '@/components/SearchBar';
import SortBtn from '@/components/SortBtn';
import AddStudentBtn from '@/components/AddStudentBtn';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { DateRangePicker } from '@/components/DateRangePicker';

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

export type StudentsFilterOption = 'grade' | 'gender' | 'school' | 'teacher';

type Grade = '1' | '2' | '3' | '4' | '5' | '6';
type Gender = 'male' | 'female';
type School =
  | 'chkail'
  | 'henri_matisse'
  | 'le_bougeoir'
  | 'diwan'
  | 'wlad_slama'
  | 'al_wahda';

const studentsSortOptions = ['latest', 'oldest', 'grade'] as const;

async function StudentsPage({
  searchParams: {
    page,
    per_page,
    sort_by,
    grade,
    gender,
    school,
    teacher,
    query,
    from,
    to,
  },
}: {
  searchParams: {
    page: string;
    per_page: string;
    sort_by: StudentsSortOptions;
    grade?: Grade;
    gender?: Gender;
    school?: School;
    teacher?: string;
    query?: string;
    from?: string;
    to?: string;
  };
}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect(`/api/auth/signin`);

  const [teachers, totalStudents] = await Promise.all([
    getTeacherIds(),
    countStudents(session.user.id),
  ]);

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <AddStudentBtn totalStudents={totalStudents} />
      </div>
      {totalStudents > 0 && (
        <>
          <div className="flex justify-end gap-4 my-4">
            <SortBtn sortOptions={studentsSortOptions} />
          </div>
          <div className="flex justify-end gap-4 my-4">
            <StudentsFilterBtns teachers={teachers} />
          </div>
          <div className="flex justify-end gap-4 my-4">
            <DateRangePicker className="flex items-center" />
          </div>
          <SearchBar />
        </>
      )}
      <ErrorBoundary FallbackComponent={ErrorFallBack}>
        <Suspense fallback={<StudentsTableSkeleton />}>
          <StudentsTable
            page={+page || DEFAULT_PAGE}
            per_page={+per_page || DEFAULT_PER_PAGE}
            sort_by={sort_by || DEFAULT_SORT_BY}
            grade={grade}
            gender={gender}
            school={school}
            teacher={teacher}
            query={query}
            from={Number(from)}
            to={Number(to)}
          />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default StudentsPage;
