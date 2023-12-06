import Section from '../Section';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { serverClient } from '@/app/_trpc/serverClient';
import { Session } from 'next-auth';

async function StudentsOverview({
  session,
  students,
}: {
  session: Session | null;
  students: Awaited<ReturnType<(typeof serverClient)['getStudents']>>;
}) {
  if (!session) return;

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

  const popularGrade = Object.entries(gradesCount)
    .find(([grade, count]) => count === maxCount)
    ?.at(0) as string;

  return (
    <Section className="space-y-4" title="Students Overview">
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{students.length}</div>
            <p className="text-xs text-muted-foreground"></p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Boys</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{boys.length}</div>
            <p className="text-xs text-muted-foreground"></p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Girls</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{girls.length}</div>
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
