'use client';

import { serverClient } from '@/app/_trpc/serverClient';
import { columns } from '@/app/students/columns';
import { DataTable } from '@/app/students/data-table';

function StudentsTable({
  students,
}: {
  students: Awaited<ReturnType<(typeof serverClient)['getStudent']>>[];
}) {
  return <DataTable columns={columns} data={students} />;
}

export default StudentsTable;
