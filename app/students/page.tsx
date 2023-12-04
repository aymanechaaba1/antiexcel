import CreateButton from '@/components/CreateButton';

import { serverClient } from '../_trpc/serverClient';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { DataTable } from './data-table';
import { columns } from './columns';
import StudentsTable from '@/components/StudentsTable';

function StudentsPage() {
  return (
    <>
      <CreateButton />
      <StudentsTable />
    </>
  );
}

export default StudentsPage;
