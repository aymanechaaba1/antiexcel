import { authOptions } from '@/lib/auth';
import { getSubjectProportion } from '@/lib/utils';
import prisma from '@/prisma/prismaClient';
import { Card, Title } from '@tremor/react';
import { getServerSession } from 'next-auth';
import SubjectsProportionChart from './SubjectsProportionChart';
import { redirect } from 'next/navigation';
import { getTeachers } from '@/prisma/db-calls';

async function SubjectsDonutChart() {
  const session = await getServerSession(authOptions);
  if (!session) redirect(`/api/auth/signin`);

  const teachers = await getTeachers(session.user.id);

  // const { subscription } = useSubscriptionsStore((state) => state);
  // const isPro = session && subscription;

  const subjects: {
    subject: string;
  }[] = await prisma.$queryRaw`SELECT DISTINCT subject FROM "Teacher"`;

  const data = [...subjects].map(({ subject }) => ({
    subject,
    proportion: getSubjectProportion(teachers, subject),
  }));

  // get percentage of a subject
  // if (isPro)
  return (
    <Card className="max-w-lg rounded-lg">
      <Title>Subjects Proportion</Title>
      <SubjectsProportionChart data={data} />
    </Card>
  );
}

export default SubjectsDonutChart;
