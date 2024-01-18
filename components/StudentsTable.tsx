'use client';

import { columns } from '@/app/students/columns';
import { DataTable } from '@/app/students/data-table';
import { trpc } from '@/server/trpc';

function StudentsTable() {
  const { data: students } = trpc.getStudents.useQuery();

  return <DataTable columns={columns} data={students} />;
}

export default StudentsTable;
