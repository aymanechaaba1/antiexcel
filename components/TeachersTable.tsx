import { Separator } from './ui/separator';
import { getAvatarName } from '@/lib/utils';
import Link from 'next/link';
import Section from './Section';
import { Avatar, AvatarFallback } from './ui/avatar';
import { cached_teachers } from '@/actions';

export const columns = ['Avatar', 'Name', 'Subject'];

async function TeachersTable() {
  const teachers = await cached_teachers();

  if (!teachers || !teachers.length)
    return (
      <div className="flex justify-center items-center h-screen dark:text-muted text-gray-400">
        <p>No teachers</p>
      </div>
    );

  if (teachers && teachers.length)
    return (
      <Section title="Teachers">
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
                  <AvatarFallback>{getAvatarName(teacher.name)}</AvatarFallback>
                </Avatar>
                <p>{teacher.name}</p>
                <p>{teacher.subject}</p>
              </Link>
            </>
          ))}
        </div>
      </Section>
    );
}

export default TeachersTable;
