'use client';

import { getNbStudentsByMonth } from '@/lib/utils';
import { caller } from '@/server';
import { useSubscriptionsStore } from '@/store/store';
import { Card, LineChart, Title } from '@tremor/react';
import { Session } from 'next-auth';

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

function DashboardChart({
  session,
  students,
  teachers,
}: {
  session: Session | null;
  students: Awaited<ReturnType<(typeof caller)['getStudents']>>;
  teachers: Awaited<ReturnType<(typeof caller)['getTeachers']>>;
}) {
  const { subscription } = useSubscriptionsStore((state) => state);
  const isPro = session && subscription;

  // get number of students created in a specific month
  const chartData = months.map((month, i) => ({
    month,
    students: getNbStudentsByMonth(students, i),
    ...(isPro && { teachers: getNbStudentsByMonth(teachers, i) }),
  }));

  const categories = ['students'];
  if (isPro) categories.push('teachers');

  return (
    <Card>
      <Title>Registration Growth</Title>
      <LineChart
        className="mt-6"
        data={chartData}
        index="month"
        categories={categories}
        colors={['emerald', 'gray']}
        yAxisWidth={40}
      />
    </Card>
  );
}

export default DashboardChart;
