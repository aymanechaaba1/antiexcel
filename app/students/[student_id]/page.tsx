import EditSheet from '@/components/EditStudentSheet';
import StudentDetails from '@/components/StudentDetails';
import { caller } from '@/server';

async function StudentPage({
  params: { student_id },
}: {
  params: { student_id: string };
}) {
  const student = await caller.getStudent({
    student_id,
  });
  if (!student) return;

  return (
    <>
      <EditSheet id={student_id} defaultValues={student} />
      <StudentDetails student={student} />
    </>
  );
}

export default StudentPage;
