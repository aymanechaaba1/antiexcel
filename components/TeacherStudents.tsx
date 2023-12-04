'use client';

import { serverClient } from '@/app/_trpc/serverClient';
import { Student } from '@/zod/schemas';
import Section from './Section';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { getAvatarName } from '@/lib/utils';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { trpc } from '@/app/_trpc/client';

function TeacherStudents({
  teacher,
}: {
  teacher: Awaited<ReturnType<(typeof serverClient)['getTeacher']>>;
}) {
  const { data: session } = useSession();
  if (!session) redirect(`/api/auth/signin`);

  if (!teacher) return;

  const { data: students, isLoading } = trpc.getStudentsTeacher.useQuery({
    teacher_id: teacher.id,
  });

  if (isLoading)
    return (
      <p className="text-center animate-pulse">{`Loading ${teacher.name}\'s Students...`}</p>
    );

  if (students)
    return (
      <Section title="Students" className="p-4 rounded-lg border my-5">
        <div className="space-y-4">
          {students.map((student) => (
            <div key={student.id} className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src={student?.avatar} alt={student?.firstname} />
                <AvatarFallback>
                  {getAvatarName(student?.firstname!, student?.lastname!)}
                </AvatarFallback>
              </Avatar>
              <p>{`${student?.firstname} ${student?.lastname}`}</p>
            </div>
          ))}
        </div>
      </Section>
    );
}

export default TeacherStudents;
