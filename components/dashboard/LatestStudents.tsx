import { getAvatarName, upperFirst } from '@/lib/utils';
import Section from '../Section';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { serverClient } from '@/app/_trpc/serverClient';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

async function LatestStudents({
  students,
}: {
  students: Awaited<ReturnType<(typeof serverClient)['getStudents']>>;
}) {
  const studentsSorted = students.sort(
    (a: any, b: any) => b.created_at - a.created_at
  );

  return (
    <Section
      className="p-4 border rounded-lg w-full md:w-2/3"
      title="Latest Students"
    >
      <div className="space-y-4 overflow-y-scroll">
        {studentsSorted.map((student) => (
          <div
            key={student.id}
            className="flex items-center justify-between gap-4"
          >
            <Avatar>
              <div className="rounded-full">
                <AvatarImage
                  src={student.avatar}
                  alt={student.firstname}
                  width={15}
                  height={15}
                  className="w-full object-cover"
                />
              </div>
              <AvatarFallback>
                {getAvatarName(student.firstname, student.lastname)}
              </AvatarFallback>
            </Avatar>
            <p className="flex-1">
              {student.firstname} {student.lastname}
            </p>
            <Link
              href={`/teachers/${student.teacher_id}`}
              className="text-blue-500 flex items-center gap-2 flex-1"
            >
              <span className="">
                {student.teacher?.gender === 'female' ? 'Ms ' : 'Mr '}
              </span>
              <span>{student.teacher?.name}</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <p className="text-gray-500 flex-1">{upperFirst(student.school)}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

export default LatestStudents;
