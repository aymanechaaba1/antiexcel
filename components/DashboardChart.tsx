'use client';

import { serverClient } from '@/app/_trpc/serverClient';
import { getNbStudentsByMonth } from '@/lib/utils';
import { Card, LineChart, Title } from '@tremor/react';

function DashboardChart({
  students,
  teachers,
}: {
  students: Awaited<ReturnType<(typeof serverClient)['getStudents']>>;
  teachers: Awaited<ReturnType<(typeof serverClient)['getTeachers']>>;
}) {
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

  // get number of students created in a specific month
  const chartData = months.map((month, i) => ({
    month,
    students: getNbStudentsByMonth(students, i),
    teachers: getNbStudentsByMonth(teachers, i),
  }));

  return (
    <Card>
      <Title>Registration Growth</Title>
      <LineChart
        className="mt-6"
        data={chartData}
        index="month"
        categories={['students', 'teachers']}
        colors={['emerald', 'gray']}
        yAxisWidth={40}
      />
    </Card>
  );
}

export default DashboardChart;
