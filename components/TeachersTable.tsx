import { Separator } from './ui/separator';
import { getAvatarName } from '@/lib/utils';
import { cached_teachers } from '@/prisma/db-calls';
import Link from 'next/link';
import Section from './Section';
import { Avatar, AvatarFallback } from './ui/avatar';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import DataPagination from './DataPagination';
import prisma from '@/prisma/prismaClient';
import SortBtn from './SortBtn';

export const columns = ['Avatar', 'Name', 'Subject'] as const;

type Gender = 'male' | 'female';
type Subject = 'maths' | 'physics' | 'french';

export type TeachersSortOptions = 'latest' | 'oldest' | 'nb_students';
const teachersSortOptions = ['latest', 'oldest', 'nb_students'] as const;

async function TeachersTable({
  page,
  per_page,
  sort_by,
  gender,
  subject,
  query,
}: {
  page: number;
  per_page: number;
  sort_by: TeachersSortOptions;
  gender?: Gender;
  subject?: Subject;
  query?: string;
}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect(`/api/auth/signin`);

  const [totalTeachers, teachers] = await Promise.all([
    prisma.teacher.count(),
    cached_teachers(
      session.user.id,
      page,
      per_page,
      sort_by,
      gender,
      subject,
      query
    ),
  ]);
  if (!teachers || !teachers.length)
    return (
      <div className="flex justify-center items-center h-screen dark:text-muted text-gray-400">
        <p>No teachers</p>
      </div>
    );

  if (teachers && teachers.length)
    return (
      <div className="flex flex-col min-h-screen">
        <Section title="Teachers" className="flex-1">
          <div className="space-y-3 mt-5">
            <div className={`grid grid-cols-${columns.length} px-4 gap-x-4`}>
              {columns.map((field, i) => (
                <p
                  key={i}
                  className="font-bold text-md tracking-tight scroll-m-20 text-gray-500"
                >
                  {field}
                </p>
              ))}
            </div>
            {teachers?.map((teacher) => (
              <>
                <Separator />
                <Link
                  key={teacher.id}
                  href={`/teachers/${teacher.id}`}
                  className={`grid grid-cols-${columns.length} gap-x-4 dark:hover:bg-gray-900 items-center hover:bg-gray-100 px-4 py-2 rounded-lg`}
                >
                  <Avatar>
                    <AvatarFallback>
                      {getAvatarName(teacher.name)}
                    </AvatarFallback>
                  </Avatar>
                  <p>{teacher.name}</p>
                  <p>{teacher.subject}</p>
                </Link>
              </>
            ))}
          </div>
        </Section>
        <DataPagination totalResults={totalTeachers} />
      </div>
    );
}

export default TeachersTable;
