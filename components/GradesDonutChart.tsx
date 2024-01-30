import { Card, Title } from '@tremor/react';
import GradesProportionChart from './GradesProportionChart';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { getStudents } from '@/prisma/db-calls';

async function GradesDonutChart() {
  const session = await getServerSession(authOptions);
  if (!session) redirect(`/api/auth/signin`);

  const students = await getStudents(session.user.id);

  const count = students
    ?.map((student) => ({
      grade: +student.grade,
    }))
    .reduce((acc: any, student: any) => {
      acc[student.grade] = (acc[student.grade] || 0) + 1;
      return acc;
    }, {});

  const donut_data = Object.entries(count).map(([key, value]: any) => ({
    name: `Grade ${key}`,
    ...(students?.length && { percent: value / students?.length }),
  }));

  return (
    <Card className="max-w-lg rounded-lg">
      <Title>Grades Proportion</Title>
      <GradesProportionChart donut_data={donut_data} />
    </Card>
  );
}

export default GradesDonutChart;
