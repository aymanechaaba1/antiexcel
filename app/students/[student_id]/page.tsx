import Section from '@/components/Section';
import StudentDetails from '@/components/StudentDetails';
import { Button } from '@/components/ui/button';
import { uncached_student } from '@/prisma/db-calls';
import prisma from '@/prisma/prismaClient';
import type { Metadata, ResolvingMetadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';

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
      <Suspense fallback={<StudentDetailsSkeleton />}>
        <StudentDetails student_id={student_id} />
      </Suspense>
    </>
  );
}

export default StudentPage;
