import EditSheet from '@/components/EditStudentSheet';
import StudentDetails from '@/components/StudentDetails';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

async function StudentPage({
  params: { student_id },
}: {
  params: { student_id: string };
}) {
  return (
    <>
      <EditSheet student_id={student_id} />
      <StudentDetails student_id={student_id} />
      <div className="flex items-center justify-between border border-red-500 rounded-lg p-4">
        <h3 className="text-red-500 font-bold tracking-tight scroll-m-20 text-md">
          DANGER ZONE
        </h3>
        <Button className="bg-red-500 text-white font-medium border-red-700 text-center">
          <p className="sr-only">Delete Student</p>
          <Trash2 color="red" size={18} />
        </Button>
      </div>
    </>
  );
}

export default StudentPage;
