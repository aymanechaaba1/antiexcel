import { cached_students, getStudents } from '@/prisma/db-calls';
import { authOptions } from '@/lib/auth';
import { getNbStudentsByMonth } from '@/lib/utils';
import { Card, LineChart, Title } from '@tremor/react';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

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

async function DashboardChart({
  students,
}: {
  students: Awaited<ReturnType<typeof cached_students>>;
}) {
  // const isPro = session && subscription;

  // get number of students created in a specific month
  const chartData = months.map((month, i) => ({
    month,
    students: getNbStudentsByMonth(students, i),
    // ...(isPro && { teachers: getNbStudentsByMonth(teachers, i) }),
  }));

  const categories = ['students'];
  // if (isPro) categories.push('teachers');

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
