import { authOptions } from '@/lib/auth';
import { getSubjectProportion } from '@/lib/utils';
import prisma from '@/prisma/prismaClient';
import { Card, Title } from '@tremor/react';
import SubjectsProportionChart from './SubjectsProportionChart';
import { cached_teachers } from '@/prisma/db-calls';

async function SubjectsDonutChart({
  teachers,
}: {
  teachers: Awaited<ReturnType<typeof cached_teachers>>;
}) {
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
