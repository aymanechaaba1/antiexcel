import prisma from '@/prisma/prismaClient';

export type PrismaUser = Awaited<ReturnType<typeof prisma.user.findUnique>>;

export type PrismaStudents = Awaited<
  ReturnType<typeof prisma.student.findMany>
>;

export type PrismaTeachers = Awaited<
  ReturnType<typeof prisma.teacher.findMany>
>;
