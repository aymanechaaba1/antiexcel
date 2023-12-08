'use client';

import { serverClient } from '@/app/_trpc/serverClient';
import { columns } from '@/app/teachers/columns';
import { DataTable } from '@/app/teachers/data-table';

function TeachersTable({
  teachers,
}: {
  teachers: Awaited<ReturnType<(typeof serverClient)['getTeachers']>>;
}) {
  if (!teachers || teachers.length === 0) return;

  return <DataTable columns={columns} data={teachers} />;
}

export default TeachersTable;
