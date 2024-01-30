import { Card, Title } from '@tremor/react';
import GradesProportionChart from './GradesProportionChart';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { cached_students, getStudents } from '@/prisma/db-calls';

async function GradesDonutChart({
  students,
}: {
  students: Awaited<ReturnType<typeof cached_students>>;
}) {
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
