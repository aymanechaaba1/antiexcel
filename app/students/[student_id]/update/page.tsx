import UpdateStudentForm from '@/components/UpdateStudentForm';
import { authOptions } from '@/lib/auth';
import { cached_student, cached_teachers } from '@/prisma/db-calls';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

function UpdateStudentFormSkeleton() {
  const rows = 6;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-5">
      {Array.from({ length: rows }).map((_, i) => (
        <>
          <div className="skeleton w-1/3 h-10 rounded-lg" />
          <div className="skeleton w-full h-10 rounded-lg" />
        </>
      ))}
    </div>
  );
}

async function UpdateStudentPage({
  params: { student_id },
}: {
  params: {
    student_id: string;
  };
}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect(`/api/auth/signin`);

  const student = await cached_student(student_id);
  const teachers = await cached_teachers(session.user.id);

  return (
    <>
      <Suspense fallback={<UpdateStudentFormSkeleton />}>
        <UpdateStudentForm student={student} teachers={teachers} />
      </Suspense>
    </>
  );
}

export default UpdateStudentPage;
