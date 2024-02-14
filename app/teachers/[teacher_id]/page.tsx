import Section from '@/components/Section';
import TeacherDetails from '@/components/TeacherDetails';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Suspense } from 'react';
import prisma from '@/prisma/prismaClient';
import type { Metadata, ResolvingMetadata } from 'next';

type Props = {
  params: { teacher_id: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // fetch data
  const teacher = await prisma.teacher.findUnique({
    where: {
      id: params.teacher_id,
    },
  });

  return {
    title: `${teacher?.name}`,
  };
}

function TeacherDetailsSkeleton() {
  return (
    <>
      <Section>
        <div className="w-1/4 h-10 skeleton rounded-lg" />
        <div className="w-full grid grid-cols-1 md:grid-cols-2 my-5 gap-x-10 gap-y-4 border p-5 rounded-lg">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="h-10 w-full skeleton rounded-lg" />
          ))}
        </div>
      </Section>
      <Section>
        <div className="w-1/4 h-10 skeleton rounded-lg" />
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center justify-between gap-x-4 px-4 py-2 rounded-lg border"
          >
            <div className="w-12 h-12 rounded-full skeleton" />
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="w-1/4 h-10 rounded-lg skeleton" />
            ))}
          </div>
        ))}
      </Section>
    </>
  );
}

function TeacherDetailsPage({
  params: { teacher_id },
}: {
  params: {
    teacher_id: string;
  };
}) {
  return (
    <>
      <div className="flex justify-end">
        <Button asChild>
          <Link href={`/teachers/${teacher_id}/update`}>Update</Link>
        </Button>
      </div>

      <Suspense fallback={<TeacherDetailsSkeleton />}>
        <TeacherDetails teacher_id={teacher_id} />
      </Suspense>
    </>
  );
}

export default TeacherDetailsPage;
