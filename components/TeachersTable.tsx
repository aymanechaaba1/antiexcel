'use client';

import { trpc } from '@/app/_trpc/client';
import { columns } from '@/app/teachers/columns';
import { DataTable } from '@/app/teachers/data-table';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

function TeachersTable() {
  const { data: session } = useSession();
  if (!session) redirect(`/api/auth/signin`);
  const { data: teachers } = trpc.getTeachers.useQuery({
    user_id: session.user.id,
  });

  if (!teachers) return;

  return <DataTable columns={columns} data={teachers} />;
}

export default TeachersTable;
