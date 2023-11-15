import { contactSchema, teacherSchema } from './../zod/schemas';
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
    .input(
      z.object({
        id: z.string().cuid().optional(),
        created_at: z.string().optional(),
        updated_at: z.string().optional(),
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
        birthdate: z.string().optional(),
        gender: z.string().optional(),
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
      })
    )
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
  addContact: publicProcedure
    .input(contactSchema)
    .mutation(async ({ input }) => {
      await prisma.contact.create({
        data: {
          email: input.email,
          phone: input.phone,
          name: input.name,
          relationship: input.relationship,
          avatar: input.avatar,
          student: {
            connect: {
              id: input.student_id,
            },
          },
        },
      });
    }),
  addTeacher: publicProcedure
    .input(teacherSchema)
    .mutation(async ({ input }) => {
      await prisma.teacher.create({
        data: {
          email: input.email,
          phone: input.phone,
          name: input.name,
          subject: input.subject,
          avatar: input.avatar,
          user: {
            connect: {
              id: input.user_id,
            },
          },
        },
      });
    }),
  getTeachers: publicProcedure
    .input(
      z.object({
        user_id: z.string().cuid(),
      })
    )
    .query(async ({ input }) => {
      return await prisma.teacher.findMany({
        where: {
          user_id: input.user_id,
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
  assignStudentToTeacher: publicProcedure
    .input(
      z.object({
        teacher_id: z.string().cuid(),
        student_id: z.string().cuid(),
      })
    )
    .mutation(async ({ input }) => {
      await prisma.teachersOnStudents.create({
        data: {
          teacher: { connect: { id: input.teacher_id } },
          student: { connect: { id: input.student_id } },
          assigned_by: input.teacher_id,
        },
      });
    }),
});

export type AppRouter = typeof appRouter;
