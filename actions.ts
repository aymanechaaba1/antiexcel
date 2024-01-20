'use server';

import { z } from 'zod';
import { updateStudentSchema } from './zod/schemas';
import { caller } from './server';
import { revalidatePath } from 'next/cache';

export const updateStudent = async (
  values: z.infer<typeof updateStudentSchema>
) => {
  const { id } = await caller.student.update({
    ...values,
  });

  revalidatePath(`/students/${id}`);
};
