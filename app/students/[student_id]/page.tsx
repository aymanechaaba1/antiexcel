import EditSheet from '@/components/EditStudentSheet';
import { serverClient } from '@/app/_trpc/serverClient';
import StudentDetails from '@/components/StudentDetails';

async function StudentPage({
  params: { student_id },
}: {
  params: { student_id: string };
}) {
  const student = await serverClient.getStudent({
    id: student_id,
  });

  if (!student) return;

  const defaultValues = {
    ...student,
  };

  return (
    <>
      <EditSheet id={student_id} defaultValues={defaultValues} />
      <StudentDetails student_id={student_id} />
    </>
  );
}

export default StudentPage;
