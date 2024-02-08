import { unstable_cache } from 'next/cache';
import prisma from './prismaClient';
import { getServerSession } from 'next-auth';
import { StudentsSortOptions } from '@/components/StudentsTable';
import { TeachersSortOptions } from '@/components/TeachersTable';
import { ContactsSortOptions } from '@/components/ContactsTable';

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

type Grade = '1' | '2' | '3' | '4' | '5' | '6';
type Gender = 'male' | 'female';
type School =
  | 'chkail'
  | 'henri_matisse'
  | 'le_bougeoir'
  | 'diwan'
  | 'wlad_slama'
  | 'al_wahda';

export const cached_students = unstable_cache(
  async (
    user_id: string,
    page: number,
    per_page: number,
    sort_by: StudentsSortOptions,
    grade?: Grade,
    gender?: Gender,
    school?: School,
    teacher?: string,
    query?: string
  ) =>
    await prisma.student.findMany({
      orderBy: {
        ...(sort_by === 'grade' && { grade: 'asc' }),
        ...(sort_by !== 'grade' && {
          created_at: sort_by === 'latest' ? 'desc' : 'asc',
        }),
      },
      include: {
        teacher: true,
      },
      where: {
        user_id,
        ...(grade && {
          grade: {
            equals: +grade,
          },
        }),
        ...(gender && {
          gender: {
            equals: gender,
          },
        }),
        ...(school && {
          school: {
            equals: school,
          },
        }),
        ...(teacher && {
          teacher_id: teacher,
        }),
        ...(query && {
          OR: [
            {
              firstname: {
                startsWith: query,
              },
            },
            {
              lastname: {
                startsWith: query,
              },
            },
          ],
        }),
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

type Subject = 'maths' | 'physics' | 'french';
export const cached_teachers = unstable_cache(
  async (
    user_id: string,
    page: number,
    per_page: number,
    sort_by: TeachersSortOptions,
    gender?: Gender,
    subject?: Subject,
    query?: string
  ) =>
    await prisma.teacher.findMany({
      orderBy: {
        ...(sort_by === 'nb_students' && {
          students: {
            _count: 'desc',
          },
        }),
        ...(sort_by !== 'nb_students' && {
          created_at: sort_by === 'latest' ? 'desc' : 'asc',
        }),
      },
      include: {
        students: true,
      },
      where: {
        user_id,
        ...(gender && {
          gender: {
            equals: gender,
          },
        }),
        ...(subject && {
          subject: {
            equals: subject,
          },
        }),
        ...(query && {
          OR: [
            {
              name: {
                startsWith: query,
              },
            },
          ],
        }),
      },
      take: per_page,
      skip: (page - 1) * per_page,
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

type Relationship = 'mother' | 'father' | 'brother' | 'sister';
export const cached_contacts = unstable_cache(
  async (
    user_id: string,
    page: number,
    per_page: number,
    sort_by: ContactsSortOptions,
    relationship?: Relationship,
    query?: string
  ) =>
    await prisma.contact.findMany({
      orderBy: {
        created_at: sort_by === 'latest' ? 'desc' : 'asc',
      },
      where: {
        user_id,
        ...(relationship && {
          relationship: {
            equals: relationship,
          },
        }),
        ...(query && {
          name: {
            startsWith: query,
          },
        }),
      },
      include: {
        students: true,
      },
      take: per_page,
      skip: (page - 1) * per_page,
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

export const getTeacherIds = async () =>
  await prisma.teacher.findMany({
    select: {
      id: true,
      name: true,
    },
  });

export const searchStudents = async (query: string) => {
  const students = await prisma.student.findMany({
    where: {
      OR: [
        {
          firstname: {
            startsWith: query,
          },
        },
        {
          lastname: {
            startsWith: query,
          },
        },
      ],
    },
  });

  return students;
};
