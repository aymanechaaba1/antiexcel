import CreateButton from '@/components/CreateButton';
import StudentsTable from '@/components/StudentsTable';
import { serverClient } from '../_trpc/serverClient';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

async function StudentsPage() {
  const teachers = await serverClient.getTeachers();

  return (
    <>
      {teachers.length !== 0 ? (
        <CreateButton />
      ) : (
        <Button asChild>
          <Link href={`/teachers`}>Add a Teacher</Link>
        </Button>
      )}
      <StudentsTable />
    </>
  );
}

export default StudentsPage;
