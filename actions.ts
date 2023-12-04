'use server';

import { revalidatePath } from 'next/cache';
import { serverClient } from './app/_trpc/serverClient';
import { Student } from './zod/schemas';
import { getServerSession } from 'next-auth';
import { authOptions } from './lib/auth';
import { z } from 'zod';
import { updateStudentSchema } from './server';

export const updateStudent = async (
  values: z.infer<typeof updateStudentSchema>
) => {
  const session = await getServerSession(authOptions);
  if (!session) return;

  await serverClient.updateStudent({
    ...values,
    user_id: session.user.id,
  });

  revalidatePath(`/students/${values?.id}`);
};

export const assignStudents = async (
  teacher_id: string,
  formData: FormData
) => {
  const entries = Object.fromEntries(formData.entries());
  const values = Object.values(entries) as string[];

  await Promise.all(
    values.map((val) => {
      serverClient.assignStudentToTeacher({
        student_id: val,
        teacher_id,
      });
    })
  );

  revalidatePath(`/teachers/${teacher_id}`);
};
