'use client';

import { trpc } from '@/app/_trpc/client';
import { Card, DonutChart, Title } from '@tremor/react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

const valueFormatter = (number: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'percent',
  })
    .format(number)
    .toString();

function ChartDonut() {
  const { data: session } = useSession();
  if (!session) redirect(`/api/auth/signin`);

  const { data: students } = trpc.getStudents.useQuery({
    user_id: session.user.id,
  });

  if (!students) return;

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

export default ChartDonut;
