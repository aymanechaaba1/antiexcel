import { serverClient } from '@/app/_trpc/serverClient';
import { Session } from 'next-auth';
import Section from './Section';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { upperFirst } from '@/lib/utils';

export const revalidate = 0;

function TeachersOverview({
  session,
  teachers,
}: {
  session: Session | null;
  teachers: Awaited<ReturnType<(typeof serverClient)['getTeachers']>>;
}) {
  if (!session) return;

  const subjectCount = teachers.reduce((acc: any, teacher) => {
    acc[teacher.subject] = (acc[teacher.subject] || 0) + 1;
    return acc;
  }, {});

  const counts = Object.entries(subjectCount).map(
    ([subject, count]) => count
  ) as number[];

  const maxCount = Math.max(...counts);

  const popularSubject = Object.entries(subjectCount)
    .find(([subject, count]) => count === maxCount)
    ?.at(0) as string;

  if (teachers)
    return (
      <Section className="space-y-4" title="Teachers Overview">
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Teachers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{teachers.length}</div>
              <p className="text-xs text-muted-foreground"></p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Popular Subject
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {upperFirst(popularSubject)}
              </div>
              <p className="text-xs text-muted-foreground"></p>
            </CardContent>
          </Card>
        </div>
      </Section>
    );
}

export default TeachersOverview;
