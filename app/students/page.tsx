import CreateButton from '@/components/CreateButton';

import { serverClient } from '../_trpc/serverClient';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { DataTable } from './data-table';
import { columns } from './columns';

async function StudentsPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/api/auth/signin');

  const data = await serverClient.getStudents({
    user_id: session?.user.id,
  });

  return (
    <>
      <CreateButton />
      {data && <DataTable columns={columns} data={data} />}
    </>
  );
}

export default StudentsPage;
