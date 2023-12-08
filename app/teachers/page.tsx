import AddTeacher from '@/components/AddTeacher';
import React from 'react';
import TeachersTable from '@/components/TeachersTable';
import { serverClient } from '../_trpc/serverClient';

async function TeachersPage() {
  const user = await serverClient.getUser();
  const teachers = await serverClient.getTeachers();

  return (
    <>
      <AddTeacher user={user} />
      <TeachersTable teachers={teachers} />
    </>
  );
}

export default TeachersPage;
