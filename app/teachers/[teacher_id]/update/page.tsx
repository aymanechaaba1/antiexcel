import UpdateTeacherForm from '@/components/UpdateTeacherForm';
import { cached_teacher } from '@/prisma/db-calls';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

// dynamic metadata

function UpdateTeacherFormSkeleton() {
  const rows = 5;

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

async function UpdateTeacherPage({
  params: { teacher_id },
}: {
  params: {
    teacher_id: string;
  };
}) {
  const teacher = await cached_teacher(teacher_id);
  if (!teacher) notFound();

  return (
    <Suspense fallback={<UpdateTeacherFormSkeleton />}>
      <UpdateTeacherForm teacher={teacher} />
    </Suspense>
  );
}

export default UpdateTeacherPage;
