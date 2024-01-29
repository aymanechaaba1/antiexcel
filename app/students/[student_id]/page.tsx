import ErrorFallBack from '@/components/ErrorFallBack';
import Section from '@/components/Section';
import StudentDetails from '@/components/StudentDetails';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

function StudentDetailsSkeleton() {
  return (
    <Section>
      <div className="w-1/3 h-10 skeleton rounded-lg" />
      <div className="w-full grid grid-cols-1 md:grid-cols-2 my-5 gap-x-10 gap-y-4 border p-5 rounded-lg">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="h-10 w-full skeleton rounded-lg" />
        ))}
      </div>
    </Section>
  );
}

function StudentPage({
  params: { student_id },
}: {
  params: { student_id: string };
}) {
  return (
    <>
      <div className="flex justify-end">
        <Button asChild>
          <Link href={`/students/${student_id}/update`}>Update</Link>
        </Button>
      </div>
      <ErrorBoundary FallbackComponent={ErrorFallBack}>
        <Suspense fallback={<StudentDetailsSkeleton />}>
          <StudentDetails student_id={student_id} />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}

export default StudentPage;
