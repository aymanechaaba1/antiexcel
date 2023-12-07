import { contactSchema, teacherSchema } from './../zod/schemas';
import { z } from 'zod';
import { privateProcedure, publicProcedure, router } from './trpc';
import prisma from '@/prisma/prismaClient';
import { studentSchema } from '@/zod/schemas';
import { TRPCClientError } from '@trpc/client';

export const updateStudentSchema = z.object({
  id: z.string().cuid().optional(),
  created_at: z.date().optional(),
  updated_at: z.date().optional(),
  firstname: z
    .string({
      invalid_type_error: 'firstname must be a string.',
    })
    .min(2, {
      message: 'firstname must be at least 2 characters.',
    })
    .max(50, {
      message: 'firstname must be 50 characters max.',
    })
    .optional(),
  lastname: z
    .string({
      invalid_type_error: 'lastname must be a string.',
    })
    .min(2, {
      message: 'lastname must be at least 2 characters.',
    })
    .max(50, {
      message: 'lastname must be 50 characters max.',
    })
    .optional(),
  birthdate: z.date().optional(),
  gender: z.string().min(4).max(6).optional(),
  grade: z
    .string()
    .max(1, {
      message: 'grade must be a number between 1 and 6.',
    })
    .optional(),
  school: z.string().optional(),
  avatar: z
    .string({
      invalid_type_error: 'avatar/picture must be a string.',
    })
    .optional(),
  user_id: z.string().cuid(),
  subscription_id: z.string().optional(),
});

export const appRouter = router({
  getUser: publicProcedure
    .input(
      z.object({
        id: z.string().cuid(),
      })
    )
    .query(async ({ input }) => {
      return await prisma.user.findUnique({
        where: {
          id: input.id,
        },
        include: {
          accounts: true,
          sessions: true,
          students: true,
          teachers: true,
        },
      });
    }),
  updateUser: publicProcedure
    .input(
      z.object({
        id: z.string().cuid(),
        subscription_id: z.string().startsWith('I-').nullable(),
      })
    )
    .mutation(async ({ input }) => {
      await prisma.user.update({
        where: {
          id: input.id,
        },
        data: {
          subscription_id: input.subscription_id,
        },
      });
    }),
  getStudent: publicProcedure
    .input(
      z.object({
        id: z.string().cuid(),
      })
    )
    .query(async ({ input }) => {
      return await prisma.student.findUnique({
        where: {
          id: input.id,
        },
        include: {
          contact: true,
          teacher: true,
        },
      });
    }),
  getStudents: publicProcedure
    .input(
      z.object({
        user_id: z.string().cuid(),
      })
    )
    .query(async ({ input }) => {
      return await prisma.student.findMany({
        where: {
          user_id: input.user_id,
        },
        include: {
          teacher: true,
        },
      });
    }),
  addStudent: privateProcedure
    .input(studentSchema)
    .mutation(async ({ ctx, input }) => {
      return await prisma.student.create({
        data: {
          firstname: input.firstname,
          lastname: input.lastname,
          birthdate: input.birthdate,
          gender: input.gender,
          grade: input.grade,
          school: input.school,
          avatar: input.avatar,
          contact: {
            create: {
              ...input.contact,
              user: {
                connect: {
                  id: ctx.user_id,
                },
              },
            },
          },
          teacher: {
            connect: {
              id: input.teacher_id,
            },
          },
          admin: {
            connect: {
              id: ctx.user_id,
            },
          },
        },
      });
    }),
  deleteStudent: publicProcedure
    .input(
      z.object({
        id: z.string().cuid(),
      })
    )
    .mutation(async ({ input }) => {
      await prisma.student.delete({
        where: {
          id: input.id,
        },
      });
    }),
  updateStudent: publicProcedure
    .input(updateStudentSchema)
    .mutation(async ({ input }) => {
      return await prisma.student.update({
        data: {
          ...input,
        },
        where: {
          id: input.id,
        },
      });
    }),
  addContact: privateProcedure
    .input(contactSchema)
    .mutation(async ({ ctx, input }) => {
      await prisma.contact.create({
        data: {
          email: input.email,
          phone: input.phone,
          name: input.name,
          relationship: input.relationship,
          avatar: input.avatar,
          user: {
            connect: {
              id: ctx.user_id,
            },
          },
        },
        include: {
          students: true,
        },
      });
    }),
  addTeacher: privateProcedure
    .input(teacherSchema)
    .mutation(async ({ ctx, input }) => {
      await prisma.teacher.create({
        data: {
          email: input.email,
          phone: input.phone,
          name: input.name,
          subject: input.subject,
          avatar: input.avatar,
          gender: input.gender,
          user: {
            connect: {
              id: ctx.user_id,
            },
          },
        },
      });
    }),
  getTeachers: privateProcedure.query(async ({ ctx }) => {
    return await prisma.teacher.findMany({
      where: {
        user_id: ctx.user_id,
      },
      include: {
        students: true,
      },
    });
  }),
  getTeacher: publicProcedure
    .input(
      z.object({
        id: z.string().cuid(),
      })
    )
    .query(async ({ input }) => {
      return await prisma.teacher.findUnique({
        where: {
          id: input.id,
        },
        include: {
          students: true,
        },
      });
    }),
  deleteTeacher: publicProcedure
    .input(
      z.object({
        id: z.string().cuid(),
      })
    )
    .mutation(async ({ input }) => {
      await prisma.teacher.delete({
        where: {
          id: input.id,
        },
      });
    }),
  updateTeacher: publicProcedure
    .input(
      z.object({
        id: z.string().cuid(),
        email: z.string().email().optional(),
        phone: z.string().optional(),
        name: z.string().optional(),
        avatar: z.string().optional(),
        subject: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      await prisma.teacher.update({
        where: {
          id: input.id,
        },
        data: {
          email: input.email,
          phone: input.phone,
          name: input.name,
          avatar: input.avatar,
          subject: input.subject,
        },
      });
    }),
  getSubscriptionDetails: publicProcedure
    .input(
      z.object({
        id: z.string().startsWith('I-'),
      })
    )
    .query(async ({ input }) => {
      const res = await fetch(
        `https://api-m.sandbox.paypal.com/v1/billing/subscriptions/${input.id}`
      );
      if (!res.ok)
        throw new TRPCClientError(
          `Failed to fetch subscription ${input.id} details.`
        );
      const subscription: Subscription = await res.json();
      return subscription;
    }),
  getContacts: privateProcedure.query(async ({ ctx }) => {
    return await prisma.contact.findMany({
      where: {
        user_id: ctx.user_id,
      },
    });
  }),
  getContact: privateProcedure
    .input(
      z.object({
        id: z.string().cuid(),
      })
    )
    .query(async ({ ctx, input }) => {
      return await prisma.contact.findFirst({
        where: {
          id: input.id,
        },
        include: {
          students: true,
        },
      });
    }),
});

export type AppRouter = typeof appRouter;
