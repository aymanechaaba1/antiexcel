'use client';

import { columns } from '@/app/teachers/columns';
import { DataTable } from '@/app/teachers/data-table';
import { caller } from '@/server';

function TeachersTable({
  teachers,
}: {
  teachers: Awaited<ReturnType<(typeof caller)['getTeacher']>>[];
}) {
  return <DataTable columns={columns} data={teachers} />;
}

export default TeachersTable;
