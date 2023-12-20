import LatestStudents from '@/components/dashboard/LatestStudents';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import TeachersOverview from '@/components/TeachersOverview';
import DashboardChart from '@/components/DashboardChart';
import StudentsOverview from '@/components/dashboard/StudentsOverview';
import SubjectsDonutChart from '@/components/SubjectsDonutChart';
import GradesDonutChart from '@/components/GradesDonutChart';
import LatestTeachers from '@/components/LatestTeachers';
import { caller } from '@/server';

async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect(`/api/auth/signin`);

  const students = await caller.getStudents();
  const teachers = await caller.getTeachers();

  return (
    <div className="space-y-4">
      <StudentsOverview session={session} students={students} />
      <TeachersOverview session={session} teachers={teachers} />
      <DashboardChart
        session={session}
        students={students}
        teachers={teachers}
      />
      <div className="flex flex-col md:flex-row gap-4">
        <GradesDonutChart session={session} students={students} />
        <SubjectsDonutChart session={session} teachers={teachers} />
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        {students.length !== 0 && <LatestStudents students={students} />}
        {teachers.length !== 0 && (
          <LatestTeachers session={session} teachers={teachers} />
        )}
      </div>
    </div>
  );
}

export default DashboardPage;
