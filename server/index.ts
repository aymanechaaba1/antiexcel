import {
  contactSchema,
  teacherSchema,
  updateStudentSchema,
} from './../zod/schemas';
import { z } from 'zod';
import prisma from '@/prisma/prismaClient';
import { studentSchema } from '@/zod/schemas';
import { TRPCClientError } from '@trpc/client';
import { privateProcedure, router } from '@/app/api/trpc/trpc-config';

export const appRouter = router({
  getUser: privateProcedure.query(async ({ ctx }) => {
    return await prisma.user.findUnique({
      where: {
        id: ctx.user_id,
      },
      include: {
        accounts: true,
        sessions: true,
        students: true,
        teachers: true,
      },
    });
  }),
  updateUser: privateProcedure
    .input(
      z.object({
        subscription_id: z.string().startsWith('I-').optional().nullable(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await prisma.user.update({
        where: {
          id: ctx.user_id,
        },
        data: {
          subscription_id: input.subscription_id,
        },
      });
    }),
  getStudent: privateProcedure
    .input(
      z.object({
        student_id: z.string().cuid(),
      })
    )
    .query(async ({ input }) => {
      return await prisma.student.findUnique({
        where: {
          id: input.student_id,
        },
        include: {
          contact: true,
          teacher: true,
        },
      });
    }),
  getStudents: privateProcedure.query(async ({ ctx }) => {
    return await prisma.student.findMany({
      where: {
        user_id: ctx.user_id,
      },
      include: {
        teacher: true,
      },
    });
  }),
  student: router({
    add: privateProcedure
      .input(studentSchema)
      .mutation(async ({ ctx, input }) => {
        await prisma.student.create({
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
    addToExistingContact: privateProcedure
      .input(
        studentSchema.omit({
          contact: true,
        })
      )
      .mutation(async ({ ctx, input }) => {
        await prisma.student.create({
          data: {
            firstname: input.firstname,
            lastname: input.lastname,
            birthdate: input.birthdate,
            gender: input.gender,
            grade: input.grade,
            school: input.school,
            avatar: input.avatar,
            contact: {
              connect: {
                id: input.contact_id,
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
  }),
  deleteStudent: privateProcedure
    .input(
      z.object({
        student_id: z.string().cuid(),
      })
    )
    .mutation(async ({ input }) => {
      const student = await prisma.student.findUnique({
        where: {
          id: input.student_id,
        },
        include: {
          contact: {
            include: {
              students: true,
            },
          },
        },
      });
      if (!student) throw new TRPCClientError(`No student found.`);

      if (student.contact && student.contact.students.length === 1) {
        // delete both student and its contact
        await prisma.student.delete({
          where: {
            id: input.student_id,
          },
        });
        await prisma.contact.delete({
          where: {
            id: student.contact.id,
          },
        });
      } else {
        // delete only the student
        await prisma.student.delete({
          where: {
            id: input.student_id,
          },
        });
      }
    }),
  updateStudent: privateProcedure
    .input(updateStudentSchema)
    .mutation(async ({ ctx, input }) => {
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
  getTeacher: privateProcedure
    .input(
      z.object({
        teacher_id: z.string().cuid(),
      })
    )
    .query(async ({ input }) => {
      return await prisma.teacher.findUnique({
        where: {
          id: input.teacher_id,
        },
        include: {
          students: true,
        },
      });
    }),
  deleteTeacher: privateProcedure
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
  updateTeacher: privateProcedure
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
  getSubscriptionDetails: privateProcedure
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
      include: {
        students: true,
      },
    });
  }),
  getContact: privateProcedure
    .input(
      z.object({
        id: z.string().cuid(),
      })
    )
    .query(async ({ input }) => {
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
export const caller = appRouter.createCaller({});
