'use server';

import { revalidatePath } from 'next/cache';
import { serverClient } from './app/_trpc/serverClient';
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
