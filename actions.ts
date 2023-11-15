'use server';

import { revalidatePath } from 'next/cache';
import { serverClient } from './app/_trpc/serverClient';
import { Student } from './zod/schemas';

export const updateStudent = async (values: Student) => {
  const student = await serverClient.updateStudent({
    ...values,
    created_at: values.created_at!,
    updated_at: values.updated_at!,
    birthdate: values.birthdate,
  });

  revalidatePath(`/students/${values.id}`);
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
