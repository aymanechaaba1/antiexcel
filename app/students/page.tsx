import ErrorFallBack from '@/components/ErrorFallBack';
import Section from '@/components/Section';
import StudentsTable, {
  StudentsSortOptions,
  columns,
} from '@/components/StudentsTable';
import { Button } from '@/components/ui/button';
import { DEFAULT_PAGE, DEFAULT_PER_PAGE, DEFAULT_SORT_BY } from '@/lib/config';
import Link from 'next/link';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { getTeacherIds } from '@/prisma/db-calls';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import StudentsFilterBtns from '@/components/StudentsFilterBtns';

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
const studentsFilterOptions = ['grade', 'gender', 'school', 'teacher'] as const;

type Grade = '1' | '2' | '3' | '4' | '5' | '6';
type Gender = 'male' | 'female';
type School =
  | 'chkail'
  | 'henri_matisse'
  | 'le_bougeoir'
  | 'diwan'
  | 'wlad_slama'
  | 'al_wahda';

async function StudentsPage({
  searchParams: { page, per_page, sort_by, grade, gender, school, teacher },
}: {
  searchParams: {
    page: string;
    per_page: string;
    sort_by: StudentsSortOptions;
    grade?: Grade;
    gender?: Gender;
    school?: School;
    teacher?: string;
  };
}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect(`/api/auth/signin`);

  const teachers = await getTeacherIds();

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button asChild>
          <Link href={`/students/add`}>Add Student</Link>
        </Button>
      </div>
      <div className="flex justify-end gap-4 my-4">
        <StudentsFilterBtns teachers={teachers} />
      </div>

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
          />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default StudentsPage;
