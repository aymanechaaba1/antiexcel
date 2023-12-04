import AddTeacher from '@/components/AddTeacher';
import React from 'react';
import TeachersTable from '@/components/TeachersTable';

function TeachersPage() {
  return (
    <>
      <AddTeacher />
      <TeachersTable />
    </>
  );
}

export default TeachersPage;
