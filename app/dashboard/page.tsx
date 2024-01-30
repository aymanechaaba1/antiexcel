import LatestStudents from '@/components/dashboard/LatestStudents';
import TeachersOverview from '@/components/TeachersOverview';
import StudentsOverview from '@/components/dashboard/StudentsOverview';
import SubjectsDonutChart from '@/components/SubjectsDonutChart';
import GradesDonutChart from '@/components/GradesDonutChart';
import LatestTeachers from '@/components/LatestTeachers';
import { cached_students, cached_teachers } from '@/prisma/db-calls';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import DashboardChart from '@/components/DashboardChart';

async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect(`/api/auth/signin`);

  const [students, teachers] = await Promise.all([
    cached_students(session.user.id),
    cached_teachers(session.user.id),
  ]);

  if (!students || !students.length || !teachers || !teachers.length)
    return <p className="text-center muted">No Data</p>;

  return (
    <div className="space-y-4">
      <StudentsOverview students={students} />
      <TeachersOverview teachers={teachers} />
      <DashboardChart students={students} />

      <div className="flex flex-col md:flex-row gap-4">
        <GradesDonutChart students={students} />
        <SubjectsDonutChart teachers={teachers} />
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <LatestStudents students={students} />
        <LatestTeachers teachers={teachers} />
      </div>
    </div>
  );
}

export default DashboardPage;
