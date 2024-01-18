'use client';

import { columns } from '@/app/teachers/columns';
import { DataTable } from '@/app/teachers/data-table';
import { trpc } from '@/server/trpc';

function TeachersTable() {
  const { data: teachers } = trpc.getTeachers.useQuery();

  return <DataTable columns={columns} data={teachers} />;
}

export default TeachersTable;
