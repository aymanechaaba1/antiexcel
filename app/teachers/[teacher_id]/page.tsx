import EditTeacher from '@/components/EditTeacherSheet';
import StudentsList from '@/components/StudentsList';
import TeacherDetails from '@/components/TeacherDetails';
import StudentsListSkeleton from '@/components/skeletons/StudentsListSkeleton';
import { authOptions } from '@/lib/auth';
import { caller } from '@/server';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React, { Suspense } from 'react';

type Params = {
  params: {
    teacher_id: string;
  };
};
async function TeacherDetailsPage({ params: { teacher_id } }: Params) {
  const session = await getServerSession(authOptions);
  if (!session) redirect(`/api/auth/signin`);

  const teacher = await caller.getTeacher({
    teacher_id,
  });
  if (!teacher) return;

  return (
    <>
      <div>
        <div className="my-5 flex items-center justify-end gap-5 rounded-lg py-3 px-2 ">
          <EditTeacher teacher_id={teacher_id} defaultValues={teacher} />
        </div>
        <TeacherDetails teacher={teacher} />
      </div>
      {teacher.students && teacher.students.length !== 0 && (
        <Suspense fallback={<StudentsListSkeleton />}>
          <StudentsList teacher={teacher} />
        </Suspense>
      )}
    </>
  );
}

export default TeacherDetailsPage;
