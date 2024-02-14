'use server';

import { plans } from '@/plans';
import prisma from './prisma/prismaClient';
import { revalidateTag } from 'next/cache';
import { getServerSession } from 'next-auth';
import { authOptions } from './lib/auth';
import { contactSchema, studentSchema, teacherSchema } from './zod/schemas';
import { redirect } from 'next/navigation';
import stripe from './lib/stripe';

export const addStudent = async (prevState: any, formData: FormData) => {
  const session = await getServerSession(authOptions);
  const data = Object.fromEntries(formData.entries());

  const result = studentSchema.safeParse(data);

  if (!result.success) {
    return {
      ok: false,
      message: 'Invalid fields ❌',
      errors: result.error.flatten().fieldErrors,
    };
  }

  try {
    await prisma.student.create({
      data: {
        ...result.data,
        teacher: {
          connect: {
            id: result.data.teacher,
          },
        },
        user: {
          connect: {
            id: session?.user.id,
          },
        },
      },
    });
  } catch (err) {
    return {
      ok: false,
      message: 'Um, Um, Something went Wrong ❌',
    };
  }

  revalidateTag('students');

  return {
    ok: true,
    message: 'New Student, Yeepe 🎉',
  };
};

export const updateStudent = async (prevState: any, formData: FormData) => {
  const data = Object.fromEntries(formData.entries());
  const result = studentSchema.safeParse(data);

  if (!result.success) {
    return {
      ok: false,
      message: 'Invalid fields',
      errors: result.error.flatten().fieldErrors,
    };
  }

  try {
    await prisma.student.update({
      data: {
        ...result.data,
        teacher: {
          connect: {
            id: result.data.teacher,
          },
        },
      },
      where: {
        id: data.id as string,
      },
    });
    revalidateTag('students');
  } catch (err) {
    return {
      ok: false,
      message: 'Failed to update student',
    };
  }

  return {
    ok: true,
    message: 'Student Updated 👍',
  };
};

export const deleteStudent = async (id: string) => {
  try {
    await prisma.student.delete({
      where: {
        id,
      },
    });
    revalidateTag('students');
  } catch (err) {
    return {
      ok: false,
      message: 'Failed to delete student',
    };
  }

  redirect(`/students`);
};

export const addTeacher = async (prevState: any, formData: FormData) => {
  const session = await getServerSession(authOptions);
  if (!session) return;

  const data = Object.fromEntries(formData.entries());
  const result = teacherSchema.safeParse(data);

  if (!result.success) {
    return {
      ok: false,
      message: 'Invalid fields',
      errors: result.error.flatten().fieldErrors,
    };
  }

  try {
    await prisma.teacher.create({
      data: {
        ...result.data,
        user: {
          connect: {
            id: session.user.id,
          },
        },
      },
    });
  } catch (err) {
    return {
      ok: false,
      message: 'Failed to add teacher',
    };
  }

  revalidateTag('teachers');

  return {
    ok: true,
    message: 'New Teacher, Yepee 🎉',
  };
};

export const deleteTeacher = async (id: string) => {
  try {
    await prisma.teacher.delete({
      where: {
        id,
      },
    });
  } catch (err) {
    return {
      ok: false,
      message: 'Failed to delete teacher',
    };
  }

  revalidateTag('teachers');
  redirect(`/students`);
};

export const updateTeacher = async (prevState: any, formData: FormData) => {
  const data = Object.fromEntries(formData.entries());
  const result = teacherSchema.safeParse(data);
  const id = formData.get('id') as string;

  if (!result.success)
    return {
      ok: false,
      message: 'Invalid fields',
      errors: result.error.flatten().fieldErrors,
    };

  try {
    await prisma.teacher.update({
      data: {
        ...result.data,
      },
      where: {
        id,
      },
    });
  } catch (err) {
    return {
      ok: false,
      message: 'Failed to update teacher',
    };
  }

  revalidateTag('teachers');

  return {
    ok: true,
    message: 'Teacher Updated 👍',
  };
};

export const addContact = async (prevState: any, formData: FormData) => {
  const session = await getServerSession(authOptions);
  const data = Object.fromEntries(formData.entries());
  const result = contactSchema.safeParse(data);

  if (!result.success)
    return {
      ok: false,
      message: 'Invalid fields',
      errors: result.error.flatten().fieldErrors,
    };

  try {
    await prisma.contact.create({
      data: {
        ...result.data,
        user: {
          connect: {
            id: session?.user.id,
          },
        },
      },
      include: {
        students: true,
      },
    });
  } catch (err) {
    return {
      ok: false,
      message: 'Failed to add contact',
    };
  }

  revalidateTag('contacts');

  return {
    ok: true,
    message: 'New Contact, Yepee 🎉',
  };
};

export const updateContact = async (prevState: any, formData: FormData) => {
  const data = Object.fromEntries(formData.entries());
  const result = contactSchema.safeParse(data);

  if (!result.success)
    return {
      ok: false,
      message: 'Invalid fields',
      errors: result.error.flatten().fieldErrors,
    };

  try {
    await prisma.contact.update({
      data: {
        ...result.data,
      },
      where: {
        id: data.id as string,
      },
    });
  } catch (err) {
    return {
      ok: false,
      message: 'Failed to update contact ❌',
    };
  }

  revalidateTag('contacts');

  return {
    ok: true,
    message: 'Contact Updated 👍',
  };
};

export const uncached_contact = async (id: string) =>
  await prisma.contact.findUnique({
    where: {
      id,
    },
    include: {
      students: true,
    },
  });

export const createStipeSession = async () => {
  const session = await getServerSession(authOptions);
  if (!session) return;

  const user = await prisma.user.findFirst({
    where: {
      id: session.user.id,
    },
  });

  const url =
    process.env.VERCEL_ENV === 'production' || 'preview'
      ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:3000';

  const stripeSession = await stripe.checkout.sessions.create({
    customer_email: session.user.email!,
    success_url: `${url}/billing`,
    cancel_url: `${url}`,
    payment_method_types: ['card', 'paypal'],
    mode: 'subscription',
    billing_address_collection: 'auto',
    line_items: [
      {
        price: plans[1].price.id,
        quantity: 1,
      },
    ],
    metadata: {
      user_id: session.user.id,
    },
  });

  if (stripeSession.url) redirect(stripeSession.url);
};

export const createPortalSession = async () => {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/');

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  if (!user || !user.stripe_customer_id) return;

  const url =
    process.env.VERCEL_ENV === 'production' || 'preview'
      ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:3000';

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: user.stripe_customer_id,
    return_url: `${url}/billing`,
  });

  redirect(portalSession.url);
};
