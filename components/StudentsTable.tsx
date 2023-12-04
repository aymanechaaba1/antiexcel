'use client';

import { trpc } from '@/app/_trpc/client';
import { columns } from '@/app/students/columns';
import { DataTable } from '@/app/students/data-table';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

function StudentsTable() {
  const { data: session } = useSession();
  if (!session) redirect(`/api/auth/signin`);

  const { data, isLoading } = trpc.getStudents.useQuery({
    user_id: session.user.id,
  });

  if (isLoading) return <p className="text-center">Loading students...</p>;

  if (data) return <DataTable columns={columns} data={data} />;
}

export default StudentsTable;
