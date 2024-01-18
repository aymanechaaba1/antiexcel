import { compare } from '@/lib/utils';
import Section from '../Section';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import prisma from '@/prisma/prismaClient';
import { TrendingDown, TrendingUp } from 'lucide-react';
import TrendingIcon from '../TrendingIcon';
import { Students } from '@/types/clientTypes';

async function StudentsOverview({ students }: { students: Students }) {
  const boys = students?.filter((student) => student.gender === 'male');
  const girls = students?.filter((student) => student.gender === 'female');

  const gradesCount = students?.reduce((acc: any, student) => {
    acc[student.grade] = (acc[student.grade] || 0) + 1;
    return acc;
  }, {});

  const counts = Object.entries(gradesCount).map(
    ([grade, count]) => count
  ) as number[];

  const maxCount = Math.max(...counts);

  const popularGrade = Object.entries(gradesCount)
    .find(([_, count]) => count === maxCount)
    ?.at(0) as string;

  const currentDate = new Date();
  const start_ofthe_month = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  const end_of_month = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );

  const startOfPreviousMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() - 1,
    1
  );
  const endOfPreviousMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    0
  );

  const nbs_currMonth = await prisma.student.findMany({
    where: {
      created_at: {
        gte: start_ofthe_month,
        lte: end_of_month,
      },
    },
  });

  const nbs_prevMonth = await prisma.student.findMany({
    where: {
      created_at: {
        gte: startOfPreviousMonth,
        lte: endOfPreviousMonth,
      },
    },
  });

  const status = compare(nbs_currMonth.length, nbs_prevMonth.length);

  return (
    <Section className="space-y-4" title="Students Overview">
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-start justify-between">
              <div>
                <div className="text-2xl font-bold">{students?.length}</div>
                <p className="text-xs text-muted-foreground"></p>
              </div>
              {status === 'trending' && <TrendingUp color="green" />}{' '}
              {status === 'deviating' && <TrendingDown color="red" />}
              <TrendingIcon />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Boys</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{boys?.length}</div>
            <p className="text-xs text-muted-foreground"></p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Girls</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{girls?.length}</div>
            <p className="text-xs text-muted-foreground"></p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Popular Grade</CardTitle>
          </CardHeader>
          {popularGrade && (
            <CardContent>
              <div className="text-2xl font-bold">{popularGrade}</div>
              <p className="text-xs text-muted-foreground"></p>
            </CardContent>
          )}
        </Card>
      </div>
    </Section>
  );
}

export default StudentsOverview;
