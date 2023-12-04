import LatestStudents from '@/components/dashboard/LatestStudents';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { serverClient } from '../_trpc/serverClient';
import TeachersOverview from '@/components/TeachersOverview';
import DashboardChart from '@/components/DashboardChart';
import StudentsOverview from '@/components/dashboard/StudentsOverview';
import SubjectsDonutChart from '@/components/SubjectsDonutChart';
import GradesDonutChart from '@/components/GradesDonutChart';

async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect(`/api/auth/signin`);

  const students = await serverClient.getStudents({
    user_id: session.user.id,
  });

  const teachers = await serverClient.getTeachers({
    user_id: session.user.id,
  });

  return (
    <div className="space-y-4">
      <StudentsOverview session={session} students={students} />
      <TeachersOverview session={session} teachers={teachers} />
      <DashboardChart students={students} teachers={teachers} />
      <div className="flex flex-col md:flex-row gap-4 md:items-center">
        <GradesDonutChart session={session} students={students} />
        <SubjectsDonutChart teachers={teachers} />
      </div>

      <LatestStudents students={students} />
    </div>
  );
}

export default DashboardPage;
