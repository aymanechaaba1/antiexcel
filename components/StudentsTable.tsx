import Link from 'next/link';
import { Separator } from './ui/separator';
import { cn, formatSchool, getAvatarName } from '@/lib/utils';
import { cached_students } from '@/prisma/db-calls';
import Section from './Section';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { Avatar, AvatarFallback } from './ui/avatar';
import prisma from '@/prisma/prismaClient';
import DataPagination from './DataPagination';
import SortBtn from './SortBtn';

export const columns = [
  'Avatar',
  'Firstname',
  'Lastname',
  'Grade',
  'School',
] as const;

export type StudentsSortOptions = 'latest' | 'oldest' | 'grade';

type Grade = '1' | '2' | '3' | '4' | '5' | '6';
type Gender = 'male' | 'female';
type School =
  | 'chkail'
  | 'henri_matisse'
  | 'le_bougeoir'
  | 'diwan'
  | 'wlad_slama'
  | 'al_wahda';

async function StudentsTable({
  page,
  per_page,
  sort_by,
  grade,
  gender,
  school,
  teacher,
  query,
}: {
  page: number;
  per_page: number;
  sort_by: StudentsSortOptions;
  grade?: Grade;
  gender?: Gender;
  school?: School;
  teacher?: string;
  query?: string;
}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect(`/api/auth/signin`);

  const [totalStudents, students] = await Promise.all([
    prisma.student.count(),
    cached_students(
      session.user.id,
      page,
      per_page,
      sort_by,
      grade,
      gender,
      school,
      teacher,
      query
    ),
  ]);

  if (!students || !students.length)
    return (
      <div className="flex justify-center items-center h-screen dark:text-muted text-gray-400">
        <p>No students</p>
      </div>
    );

  return (
    <div className="flex flex-col min-h-screen">
      <Section title="Students" className="flex-1">
        <div className="space-y-3 mt-5">
          <div className={`grid grid-cols-${columns.length} gap-x-4 gap-y-6`}>
            {columns.map((field, i) => (
              <p
                key={i}
                className={cn(
                  'font-bold tracking-tight scroll-m-20 text-md text-gray-500 text-right',
                  {
                    'text-left': field === 'Avatar',
                  }
                )}
              >
                {field}
              </p>
            ))}
          </div>

          {students?.map((student) => (
            <>
              <Separator />
              <Link
                prefetch={false}
                key={student.id}
                href={`/students/${student.id}`}
                className={`grid grid-cols-${columns.length} items-center gap-x-4 dark:hover:bg-gray-900 hover:bg-gray-100 px-4 py-2 rounded-lg`}
              >
                <Avatar>
                  <AvatarFallback>
                    {getAvatarName(student.firstname, student.lastname)}
                  </AvatarFallback>
                </Avatar>
                <p className="text-right">{student.firstname}</p>
                <p className="text-right">{student.lastname}</p>
                <p className="text-right">{student.grade}</p>
                <p className="text-right">{formatSchool(student.school)}</p>
              </Link>
            </>
          ))}
        </div>
      </Section>
      <DataPagination totalResults={totalStudents} />
    </div>
  );
}

export default StudentsTable;
