'use client';

import { serverClient } from '@/app/_trpc/serverClient';
import { Card, DonutChart, Title } from '@tremor/react';
import { Session } from 'next-auth';

const valueFormatter = (number: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'percent',
  })
    .format(number)
    .toString();

function GradesDonutChart({
  session,
  students,
}: {
  session: Session | null;
  students: Awaited<ReturnType<(typeof serverClient)['getStudents']>>;
}) {
  if (!session) return;

  const data = students.map((student) => ({
    grade: +student.grade,
  }));

  const count = data.reduce((acc: any, student: any) => {
    acc[student.grade] = (acc[student.grade] || 0) + 1;
    return acc;
  }, {});

  const donut_data = Object.entries(count).map(([key, value]: any) => ({
    name: `Grade ${key}`,
    percent: value / students.length,
  }));

  return (
    <Card className="max-w-lg rounded-lg">
      <Title>Grades Proportion</Title>
      <DonutChart
        className="mt-6"
        data={donut_data}
        category="percent"
        index="name"
        valueFormatter={valueFormatter}
        colors={['slate', 'violet', 'indigo', 'rose', 'cyan', 'amber']}
        variant="pie"
      />
    </Card>
  );
}

export default GradesDonutChart;
