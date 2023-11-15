'use client';

import AddTeacher from '@/components/AddTeacher';
import React from 'react';
import { DataTable } from './data-table';
import { columns } from './columns';
import { redirect } from 'next/navigation';
import { trpc } from '../_trpc/client';
import { useSession } from 'next-auth/react';

function TeachersPage() {
  const { data: session } = useSession();
  if (!session) redirect(`/api/auth/signin`);
  const { data: teachers } = trpc.getTeachers.useQuery({
    user_id: session.user.id,
  });

  if (!teachers) return;

  return (
    <>
      <AddTeacher />
      {/* @ts-expect-error */}
      {teachers && <DataTable columns={columns} data={teachers} />}
    </>
  );
}

export default TeachersPage;
