import Link from 'next/link';
import { Separator } from './ui/separator';
import { formatSchool, getAvatarName, upperFirst } from '@/lib/utils';
import { cached_students } from '@/prisma/db-calls';
import Section from './Section';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { Avatar, AvatarFallback } from './ui/avatar';

export const columns = [
  'Avatar',
  'Firstname',
  'Lastname',
  'Gender',
  'Grade',
  'School',
  'Teacher',
];

async function StudentsTable({
  page,
  per_page,
  sort_by = 'latest',
}: {
  page?: number;
  per_page?: number;
  sort_by?: 'latest' | 'grade';
}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect(`/api/auth/signin`);

  const students = await cached_students(
    session.user.id,
    sort_by,
    page,
    per_page
  );

  if (!students || !students.length)
    return (
      <div className="flex justify-center items-center h-screen dark:text-muted text-gray-400">
        <p>No students</p>
      </div>
    );

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
        </div>

        {students?.map((student) => (
          <>
            <Separator />
            <Link
              key={student.id}
              href={`/students/${student.id}`}
              className={`grid grid-cols-${columns.length} items-center gap-x-4 dark:hover:bg-gray-900 hover:bg-gray-100 px-4 py-2 rounded-lg`}
            >
              <Avatar>
                <AvatarFallback>
                  {getAvatarName(student.firstname, student.lastname)}
                </AvatarFallback>
              </Avatar>
              <p className="">{student.firstname}</p>
              <p className="">{student.lastname}</p>
              <p>{upperFirst(student.gender)}</p>
              <p className="">{student.grade}</p>
              <p className="">{formatSchool(student.school)}</p>
              <p className="">{student.teacher?.name}</p>
            </Link>
          </>
        ))}
      </div>
    </Section>
  );
}

export default StudentsTable;
