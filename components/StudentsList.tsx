import { formatSchool, getAvatarName } from '@/lib/utils';
import React from 'react';
import { Avatar, AvatarFallback } from './ui/avatar';
import { trpc } from '@/server/trpc';

function StudentsList({ teacher_id }: { teacher_id: string }) {
  const { data: teacher } = trpc.getTeacher.useQuery({
    teacher_id,
  });

  return (
    <div className="space-y-3 mt-5">
      <h1 className="text-3xl">Students</h1>
      {teacher?.students.map((student) => (
        <div
          key={student.id}
          className="flex items-center justify-between gap-4 px-4 py-2 rounded-lg border"
        >
          <Avatar>
            <div className="rounded-full"></div>
            <AvatarFallback>
              {getAvatarName(student.firstname, student.lastname)}
            </AvatarFallback>
          </Avatar>

          <p className="flex-1">
            {student.firstname} {student.lastname}
          </p>
          <p className="flex-1 text-gray-500">Grade {student.grade}</p>
          <p className="flex-1">{formatSchool(student.school)}</p>
        </div>
      ))}
    </div>
  );
}

export default StudentsList;
