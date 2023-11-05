import Section from '../Section';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Medal,
  PersonStanding,
  TrendingDown,
  TrendingUp,
  User2,
  Users,
} from 'lucide-react';
import Chart from '../Chart';
import { serverClient } from '@/app/_trpc/serverClient';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';

async function Overview() {
  const session = await getServerSession(authOptions);
  if (!session) redirect(`/api/auth/signin`);

  const students = await serverClient.getStudents({
    user_id: session.user.id,
  });
  const boys = students.filter((student) => student.gender === 'male');
  const girls = students.filter((student) => student.gender === 'female');

  const gradesCount = students.reduce((acc: any, student) => {
    acc[student.grade] = (acc[student.grade] || 0) + 1;
    return acc;
  }, {});

  const counts = Object.entries(gradesCount).map(
    ([grade, count]) => count
  ) as number[];

  const maxCount = Math.max(...counts);
  console.log(maxCount);

  const popularGrade = Object.entries(gradesCount)
    .find(([grade, count]) => count === maxCount)
    ?.at(0) as number;

  return (
    <Section className="space-y-4" title="Overview">
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Students</CardTitle>
            <User2 />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{students.length}</div>
            <p className="text-xs text-muted-foreground"></p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Boys</CardTitle>
            <User2 />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{boys.length}</div>
            <p className="text-xs text-muted-foreground"></p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Girls</CardTitle>
            <User2 />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{girls.length}</div>
            <p className="text-xs text-muted-foreground"></p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Popular Grade</CardTitle>
            <Medal />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{popularGrade}</div>
            <p className="text-xs text-muted-foreground"></p>
          </CardContent>
        </Card>
      </div>
    </Section>
  );
}

export default Overview;
