import EditTeacher from '@/components/EditTeacherSheet';
import StudentsList from '@/components/StudentsList';
import TeacherDetails from '@/components/TeacherDetails';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import React from 'react';

type Params = {
  params: {
    teacher_id: string;
  };
};
async function TeacherDetailsPage({ params: { teacher_id } }: Params) {
  const session = await getServerSession(authOptions);

  return (
    <>
      <div>
        <div className="my-5 flex items-center justify-end gap-5 rounded-lg py-3 px-2 ">
          <EditTeacher teacher_id={teacher_id} />
        </div>
        <TeacherDetails teacher_id={teacher_id} />
      </div>

      <StudentsList teacher_id={teacher_id} />
    </>
  );
}

export default TeacherDetailsPage;
