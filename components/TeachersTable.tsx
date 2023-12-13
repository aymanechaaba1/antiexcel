'use client';

import { serverClient } from '@/app/_trpc/serverClient';
import { columns } from '@/app/teachers/columns';
import { DataTable } from '@/app/teachers/data-table';

function TeachersTable({
  teachers,
}: {
  teachers: Awaited<ReturnType<(typeof serverClient)['getTeachers']>>;
}) {
  return <DataTable columns={columns} data={teachers} />;
}

export default TeachersTable;
