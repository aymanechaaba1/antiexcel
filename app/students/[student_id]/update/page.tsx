import ErrorFallBack from '@/components/ErrorFallBack';
import UpdateStudentForm from '@/components/UpdateStudentForm';
import { cached_student } from '@/prisma/db-calls';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

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
  const student = await cached_student(student_id);

  return (
    <>
      <ErrorBoundary FallbackComponent={ErrorFallBack}>
        <Suspense fallback={<UpdateStudentFormSkeleton />}>
          <UpdateStudentForm student={student} />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}

export default UpdateStudentPage;
