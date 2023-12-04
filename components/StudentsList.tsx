import { serverClient } from '@/app/_trpc/serverClient';
import { formatSchool } from '@/lib/utils';
import Image from 'next/image';
import React from 'react';

function StudentsList({
  students,
}: {
  students: Awaited<ReturnType<(typeof serverClient)['getStudentsByTeacher']>>;
}) {
  return (
    <div className="space-y-3 mt-5">
      <h1 className="text-3xl">Students</h1>
      {students.map((student) => (
        <div
          key={student.id}
          className="flex items-center justify-between gap-4 px-4 py-2 rounded-lg border"
        >
          <Image
            src={student.avatar}
            alt={student.firstname}
            width={30}
            height={30}
            className="rounded-full object-cover"
          />
          <p className="flex-1">
            {student.firstname} {student.lastname}
          </p>
          <p className="flex-1 text-gray-500">{student.grade}</p>
          <p className="flex-1">{formatSchool(student.school)}</p>
        </div>
      ))}
    </div>
  );
}

export default StudentsList;
