import Section from '../Section';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import prisma from '@/prisma/prismaClient';
import { cached_students } from '@/prisma/db-calls';

const getBoys = async () =>
  await prisma.student.findMany({
    where: {
      gender: 'male',
    },
  });

const getGirls = async () =>
  await prisma.student.findMany({
    where: {
      gender: 'female',
    },
  });

const getPopularGrade = async () => {
  type QueryResult = {
    grade: number;
    max_grade_count: number;
  };

  const result: QueryResult[] =
    await prisma.$queryRaw`SELECT grade, MAX(count) AS max_grade_count
    FROM (
        SELECT grade, COUNT(grade) AS count
        FROM "Student"
        GROUP BY grade
    ) AS counts GROUP BY grade`;

  return result[0].grade;
};

async function StudentsOverview({
  students,
}: {
  students: Awaited<ReturnType<typeof cached_students>>;
}) {
  const boys = await getBoys();
  const girls = await getGirls();

  const popularGrade = getPopularGrade();

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
        {popularGrade && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Popular Grade
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{popularGrade}</div>
              <p className="text-xs text-muted-foreground"></p>
            </CardContent>
          </Card>
        )}
      </div>
    </Section>
  );
}

export default StudentsOverview;
