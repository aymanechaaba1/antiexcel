import { authOptions } from '@/lib/auth';
import { getSubjectProportion } from '@/lib/utils';
import { uncached_teachers } from '@/prisma/db-calls';
import prisma from '@/prisma/prismaClient';
import { Card, DonutChart, Title } from '@tremor/react';
import { getServerSession } from 'next-auth';
import SubjectsProportionChart from './SubjectsProportionChart';

async function SubjectsDonutChart() {
  const session = await getServerSession(authOptions);
  const teachers = await uncached_teachers();

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
