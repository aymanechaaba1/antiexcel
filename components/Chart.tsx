'use client';

import { trpc } from '@/app/_trpc/client';
import {
  generateChartData,
  getStudentsByMonth,
  getStudentsByYear,
} from '@/lib/utils';
import { Card, Title, LineChart } from '@tremor/react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import React from 'react';

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'June',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

function Chart() {
  const { data: session } = useSession();
  if (!session) redirect(`/api/auth/signin`);

  const { data: students } = trpc.getStudents.useQuery({
    user_id: session.user.id,
  });

  if (!students) return;

  const chartData = generateChartData(students, 2023);

  if (!students) return;

  return (
    <Card className="rounded-lg">
      <Title>Students Registration Progress</Title>
      <LineChart
        className=""
        data={chartData}
        index="month"
        categories={['students']}
        colors={['emerald', 'gray']}
        yAxisWidth={40}
      />
    </Card>
  );
}

export default Chart;
