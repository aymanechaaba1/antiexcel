import { unstable_cache } from 'next/cache';
import prisma from './prismaClient';
import { getServerSession } from 'next-auth';

export const uncached_user = async () => {
  const session = await getServerSession();
  if (!session?.user.id) return;

  return await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    include: {
      students: true,
      teachers: true,
    },
  });
};

export const cached_students = unstable_cache(
  async (user_id: string, page: number, per_page: number) =>
    await prisma.student.findMany({
      orderBy: {
        created_at: 'desc',
      },
      include: {
        teacher: true,
      },
      where: {
        user_id,
      },
      take: per_page,
      skip: (page - 1) * per_page,
    }),
  ['students'],
  { tags: ['students'], revalidate: 60 }
);

export const cached_student = unstable_cache(
  async (id: string) =>
    await prisma.student.findUnique({
      where: {
        id,
      },
      include: {
        teacher: true,
        contact: true,
      },
    }),
  [`students`],
  {
    tags: ['students'],
    revalidate: 60,
  }
);

export const uncached_students = async (user_id: string) =>
  await prisma.student.findMany({
    orderBy: {
      created_at: 'desc',
    },
    include: {
      teacher: true,
      contact: true,
    },
    where: {
      user_id,
    },
  });

export const uncached_student = async (id: string) =>
  await prisma.student.findUnique({
    where: {
      id,
    },
    include: {
      teacher: true,
      contact: true,
    },
  });

export const cached_teachers = unstable_cache(
  async (user_id: string) =>
    await prisma.teacher.findMany({
      orderBy: {
        created_at: 'desc',
      },
      include: {
        students: true,
      },
      where: {
        user_id,
      },
    }),
  ['teachers'],
  {
    tags: ['teachers'],
    revalidate: 60,
  }
);
export const uncached_teachers = async (user_id: string) =>
  await prisma.teacher.findMany({
    orderBy: {
      created_at: 'desc',
    },
    include: {
      students: true,
    },
    where: {
      user_id,
    },
  });

export const cached_teacher = unstable_cache(
  async (id: string) =>
    await prisma.teacher.findUnique({
      where: {
        id,
      },
      include: {
        students: true,
      },
    }),
  ['teachers'],
  {
    tags: ['teachers'],
    revalidate: 60,
  }
);

export const uncached_teacher = async (id: string) =>
  await prisma.teacher.findUnique({
    where: {
      id,
    },
    include: {
      students: true,
    },
  });

export const cached_contacts = unstable_cache(
  async (user_id: string, page: number = 1, per_page: number = 5) =>
    await prisma.contact.findMany({
      orderBy: {
        created_at: 'desc',
      },
      where: {
        user_id,
      },
      include: {
        students: true,
      },
    }),
  ['contacts'],
  {
    tags: ['contacts'],
    revalidate: 60,
  }
);

export const uncached_contacts = async (
  user_id: string,
  {
    page = 1,
    per_page = 10,
  }: {
    page?: number;
    per_page?: number;
  }
) =>
  await prisma.contact.findMany({
    orderBy: {
      created_at: 'desc',
    },
    include: {
      students: true,
    },
    where: {
      user_id,
    },
    skip: page * per_page,
    take: per_page,
  });

export const cached_contact = unstable_cache(
  async (id: string) =>
    await prisma.contact.findUnique({
      where: {
        id,
      },
      include: {
        students: true,
      },
    }),
  ['contacts'],
  { tags: ['contacts'], revalidate: 60 }
);
