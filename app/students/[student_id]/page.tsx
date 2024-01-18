import EditSheet from '@/components/EditStudentSheet';
import StudentDetails from '@/components/StudentDetails';

async function StudentPage({
  params: { student_id },
}: {
  params: { student_id: string };
}) {
  return (
    <>
      <EditSheet student_id={student_id} />
      <StudentDetails student_id={student_id} />
    </>
  );
}

export default StudentPage;
