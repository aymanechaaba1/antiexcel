import { serverClient } from '@/app/_trpc/serverClient';
import AssignStudents from '@/components/AssignStudents';
import EditTeacher from '@/components/EditTeacher';

import TeacherStudents from '@/components/TeacherStudents';

import { authOptions } from '@/lib/auth';
import { upperFirst } from '@/lib/utils';
import { getServerSession } from 'next-auth';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import React from 'react';
import { z } from 'zod';

type Params = {
  params: {
    teacher_id: string;
  };
};
async function TeacherDetailsPage({ params: { teacher_id } }: Params) {
  const session = await getServerSession(authOptions);
  if (!session) redirect(`/api/auth/signin`);
  const teacher = await serverClient.getTeacher({
    id: teacher_id,
  });
  if (!teacher) return;

  const teacherStudentsPromises = teacher.students.map((student) => {
    return serverClient.getStudent({
      id: student.student_id,
    });
  });
  const teacherStudents = await Promise.all(teacherStudentsPromises);

  const allStudents = await serverClient.getStudents({
    user_id: session.user.id,
  });

  return (
    <>
      <div>
        <div className="my-5 flex items-center gap-5 rounded-lg py-3 px-2 ">
          <EditTeacher defaultValues={teacher} />
        </div>
        <div className="flex flex-col md:flex-row items-start gap-5">
          <Image
            src={teacher.avatar!}
            alt={teacher.name}
            width={200}
            height={200}
            className="rounded-lg w-full md:w-auto"
          />
          <div className="space-y-4">
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 border p-5 rounded-lg ">
              <p className="text-gray-500">Name</p>
              <p>{upperFirst(teacher.name)}</p>
              <p className="text-gray-500">Email</p>
              <p>{teacher.email}</p>
              <p className="text-gray-500">Subject</p>
              <p>{upperFirst(teacher.subject)}</p>
              <p className="text-gray-500">Phone</p>
              <p>{teacher.phone}</p>
              <p className="text-gray-500">Created At</p>
              <p>
                {new Intl.DateTimeFormat('en-US', {
                  month: 'short',
                  day: '2-digit',
                  year: 'numeric',
                }).format(teacher.created_at!)}
              </p>
              <p className="text-gray-500">Last Update</p>
              <p>
                {new Intl.DateTimeFormat('en-US', {
                  month: 'short',
                  day: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                }).format(teacher.updated_at!)}
              </p>
            </div>
            <AssignStudents teacher_id={teacher_id} students={allStudents} />
          </div>
        </div>
      </div>
      <TeacherStudents students={teacherStudents} />
    </>
  );
}

export default TeacherDetailsPage;
