'use client';

import { trpc } from '@/server/trpc';

function TeachersTable() {
  const { data: teachers } = trpc.getTeachers.useQuery();

  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-2">
      {teachers?.map((teacher) => (
        <div key={teacher.id}>
          <p>{teacher.name}</p>
          <p>{teacher.subject}</p>
        </div>
      ))}
    </div>
  );
}

export default TeachersTable;
