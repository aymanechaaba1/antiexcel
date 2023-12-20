'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { updateStudentSchema } from './zod/schemas';
import { getServerSession } from 'next-auth';
import { authOptions } from './lib/auth';

import { caller } from './server';

export const updateStudent = async (
  values: z.infer<typeof updateStudentSchema>
) => {
  await caller.updateStudent({
    ...values,
  });

  revalidatePath(`/students/${values?.id}`);
};

// const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_KEY);
const sendEmail = async ({
  subject,
  to,
  react,
}: {
  subject: string;
  to: string[];
  react: any;
}) => {
  const session = await getServerSession(authOptions);
  // await resend.emails.send({
  //   from: 'AntiExcel <onboarding@resend.dev>',
  //   to,
  //   subject,
  //   react: react({ session }),
  // });
};

// export const sendNewSubEmail = async () => {
//   await sendEmail({
//     subject: "You're a PRO, Yepee 🎉",
//     to: ['aymanechaaba1@gmail.com'],
//     react: NewSubscriptionEmail,
//   });
// };

// export const sendCanceledSubEmail = async () => {
//   await sendEmail({
//     subject: "We're sorry to hear your cancelation 😢",
//     to: ['aymanechaaba1@gmail.com'],
//     react: CanceledSubscriptionEmail,
//   });
// };

// export const sendSuspendedSubEmail = async () => {
//   await sendEmail({
//     subject: 'Suspended Subscription',
//     to: ['aymanechaaba1@gmail.com'],
//     react: SuspendedSubscriptionEmail,
//   });
// };

// export const sendBecomeProEmail = async (
//   subscription: Subscription | null | undefined
// ) => {
//   // subscription
//   const students = await caller.getStudents();
//   const teachers = await caller.getTeachers();
//   const reachedLimit =
//     !subscription && students.length === 3 && teachers.length === 3;

//   if (reachedLimit)
//     await sendEmail({
//       subject: "It's maybe time to become a PRO",
//       to: ['aymanechaaba1@gmail.com'],
//       react: BecomeProEmail,
//     });
// };
