import AddTeacher from '@/components/AddTeacher';
import React from 'react';
import TeachersTable from '@/components/TeachersTable';
import { caller } from '@/server';

async function TeachersPage() {
  const user = await caller.getUser();
  const teachers = await caller.getTeachers();

  return (
    <>
      <AddTeacher user={user} />
      <TeachersTable teachers={teachers} />
    </>
  );
}

export default TeachersPage;
