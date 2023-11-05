import { z } from 'zod';
import { publicProcedure, router } from './trpc';
import prisma from '@/prisma/prismaClient';
import { studentSchema } from '@/zod/schemas';

export const appRouter = router({
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
      });
    }),
  addStudent: publicProcedure
    .input(studentSchema)
    .mutation(async ({ input }) => {
      return await prisma.student.create({
        data: {
          firstname: input.firstname,
          lastname: input.lastname,
          birthdate: input.birthdate,
          gender: input.gender,
          grade: input.grade,
          school: input.school,
          avatar: input.avatar,
          admin: {
            connect: {
              id: input.user_id,
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
    .input(studentSchema)
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
});

export type AppRouter = typeof appRouter;
