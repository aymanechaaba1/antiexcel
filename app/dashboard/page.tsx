import LatestStudents from '@/components/dashboard/LatestStudents';
import TeachersOverview from '@/components/TeachersOverview';
import StudentsOverview from '@/components/dashboard/StudentsOverview';
import SubjectsDonutChart from '@/components/SubjectsDonutChart';
import GradesDonutChart from '@/components/GradesDonutChart';
import LatestTeachers from '@/components/LatestTeachers';
import { uncached_students, uncached_teachers } from '@/prisma/db-calls';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import DashboardChart from '@/components/DashboardChart';
import { redirect } from 'next/navigation';

async function DashboardPage({
  searchParams,
}: {
  searchParams: {
    subscribed: 'true' | 'false';
  };
}) {
  const isPro = Boolean(searchParams.subscribed);

  const session = await getServerSession(authOptions);
  if (!session) redirect(`/api/auth/signin`);

  const [students, teachers] = await Promise.all([
    uncached_students(session.user.id),
    uncached_teachers(session.user.id),
  ]);

  if (!students || !students.length || !teachers || !teachers.length)
    return <p className="text-center muted">No Data</p>;

  return (
    <div className="space-y-4">
      <StudentsOverview students={students} />
      {isPro && <TeachersOverview teachers={teachers} />}
      <DashboardChart students={students} />

      <div className="flex flex-col md:flex-row gap-4">
        <GradesDonutChart students={students} />
        <SubjectsDonutChart teachers={teachers} />
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <LatestStudents students={students} />
        {isPro && <LatestTeachers teachers={teachers} />}
      </div>
    </div>
  );
}

export default DashboardPage;
