'use client';

import { columns } from '@/app/students/columns';
import { DataTable } from '@/app/students/data-table';
import { caller } from '@/server';

function StudentsTable({
  students,
}: {
  students: Awaited<ReturnType<(typeof caller)['getStudent']>>[];
}) {
  return <DataTable columns={columns} data={students} />;
}

export default StudentsTable;
