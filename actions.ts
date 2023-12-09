'use server';

import { revalidatePath } from 'next/cache';
import { serverClient } from './app/_trpc/serverClient';
import { z } from 'zod';
import { updateStudentSchema } from './zod/schemas';

export const updateStudent = async (
  values: z.infer<typeof updateStudentSchema>
) => {
  await serverClient.updateStudent({
    ...values,
  });

  revalidatePath(`/students/${values?.id}`);
};
