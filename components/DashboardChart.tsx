import { cached_students } from '@/prisma/db-calls';
import { getNbStudentsByMonth } from '@/lib/utils';
import { Card, LineChart, Title } from '@tremor/react';
import prisma from '@/prisma/prismaClient';

const months = new Map([
  [1, 'Jan'],
  [2, 'Feb'],
  [3, 'Mar'],
  [4, 'Apr'],
  [5, 'May'],
  [6, 'June'],
  [7, 'Jul'],
  [8, 'Aug'],
  [9, 'Sep'],
  [10, 'Oct'],
  [11, 'Nov'],
  [12, 'Dec'],
]);

async function DashboardChart({
  students,
}: {
  students: Awaited<ReturnType<typeof cached_students>>;
}) {
  // const isPro = session && subscription;

  // get number of students created in a specific month
  type QueryResult = {
    month: number;
    nb_students: number;
  };
  let result: QueryResult[] =
    await prisma.$queryRaw`SELECT CAST(EXTRACT(MONTH FROM created_at) AS INTEGER) AS month, 
                           CAST(COUNT(*) AS INTEGER) AS nb_students
                           FROM "Student" 
                           GROUP BY month
                           ORDER BY month`;

  type ChartData = {
    month: string;
    nb_students: number;
  };
  const chartData: ChartData[] = result.map((entry) => ({
    month: months.get(entry.month)!,
    nb_students: entry.nb_students,
  }));

  const categories = ['nb_students'];
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
