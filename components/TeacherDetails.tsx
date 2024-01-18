'use client';

import { upperFirst } from '@/lib/utils';
import { trpc } from '@/server/trpc';

function TeacherDetails({ teacher_id }: { teacher_id: string }) {
  const { data: teacher } = trpc.getTeacher.useQuery({
    teacher_id,
  });

  if (teacher)
    return (
      <div className="flex flex-col md:flex-row items-start gap-5">
        <div className="space-y-4 w-full">
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 border p-5 rounded-lg">
            <p className="text-gray-500">Name</p>
            <p>{upperFirst(teacher.name)}</p>
            <p className="text-gray-500">Email</p>
            <p>{teacher.email}</p>
            <p className="text-gray-500">Subject</p>
            <p>{upperFirst(teacher.subject)}</p>
            <p className="text-gray-500">Phone</p>
            <p>{teacher.phone}</p>
            <p className="text-gray-500">Created At</p>
            <p>
              {new Intl.DateTimeFormat('en-US', {
                month: 'short',
                day: '2-digit',
                year: 'numeric',
              }).format(new Date(teacher.created_at!))}
            </p>
            <p className="text-gray-500">Last Update</p>
            <p>
              {new Intl.DateTimeFormat('en-US', {
                month: 'short',
                day: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              }).format(new Date(teacher.updated_at!))}
            </p>
          </div>
        </div>
      </div>
    );
}

export default TeacherDetails;
