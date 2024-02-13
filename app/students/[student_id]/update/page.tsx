import UpdateStudentForm from '@/components/UpdateStudentForm';
import { authOptions } from '@/lib/auth';
import { uncached_student, uncached_teachers } from '@/prisma/db-calls';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import type { Metadata, ResolvingMetadata } from 'next';
import prisma from '@/prisma/prismaClient';

type Props = {
  params: { student_id: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // fetch data
  const student = await prisma.student.findUnique({
    where: {
      id: params.student_id,
    },
  });

  return {
    title: `${student?.firstname} ${student?.lastname}`,
  };
}

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

  const [student, teachers] = await Promise.all([
    uncached_student(student_id),
    uncached_teachers(session.user.id),
  ]);

  return (
    <>
      <Suspense fallback={<UpdateStudentFormSkeleton />}>
        <UpdateStudentForm student={student} teachers={teachers} />
      </Suspense>
    </>
  );
}

export default UpdateStudentPage;
