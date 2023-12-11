'use server';

import { revalidatePath } from 'next/cache';
import { serverClient } from './app/_trpc/serverClient';
import { z } from 'zod';
import { updateStudentSchema } from './zod/schemas';
import { Resend } from 'resend';
import { getServerSession } from 'next-auth';
import { authOptions } from './lib/auth';
import NewSubscriptionEmail from './components/emails/NewSubscriptionEmail';

export const updateStudent = async (
  values: z.infer<typeof updateStudentSchema>
) => {
  await serverClient.updateStudent({
    ...values,
  });

  revalidatePath(`/students/${values?.id}`);
};

export const sendEmail = async () => {
  const session = await getServerSession(authOptions);
  if (!session) return;

  // send new subscription email
  const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_KEY);
  const { data, error } = await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: ['aymanechaaba1@gmail.com'],
    subject: "You're a PRO Member",
    react: NewSubscriptionEmail({ user: session.user }),
  });
  if (data) console.log(data);
  if (error) console.error(error);
};
