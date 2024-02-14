import { formatSchool, getAvatarName } from '@/lib/utils';
import { Avatar, AvatarFallback } from '../ui/avatar';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { cached_students } from '@/prisma/db-calls';

async function LatestStudents({
  students,
}: {
  students: Awaited<ReturnType<typeof cached_students>>;
}) {
  return (
    <div className="p-4 border rounded-lg flex-grow space-y-3">
      <h3 className="h3">Latest Students</h3>
      <div className="space-y-4 overflow-y-scroll">
        {students?.map((student) => (
          <div key={student.id} className="flex items-center gap-x-3">
            <Avatar>
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
            <p className="text-gray-500 flex-1">
              {formatSchool(student.school)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LatestStudents;
