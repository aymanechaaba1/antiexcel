'use client';

import LatestStudents from '@/components/dashboard/LatestStudents';
import TeachersOverview from '@/components/TeachersOverview';
import DashboardChart from '@/components/DashboardChart';
import StudentsOverview from '@/components/dashboard/StudentsOverview';
import SubjectsDonutChart from '@/components/SubjectsDonutChart';
import GradesDonutChart from '@/components/GradesDonutChart';
import LatestTeachers from '@/components/LatestTeachers';
import { useSession } from 'next-auth/react';
import { trpc } from '@/server/trpc';

function DashboardPage() {
  const { data: session } = useSession();
  const { data: students } = trpc.getStudents.useQuery();
  const { data: teachers } = trpc.getTeachers.useQuery();

  return (
    <div className="space-y-4">
      <StudentsOverview students={students} />
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
        {students?.length !== 0 && <LatestStudents students={students} />}
        {teachers?.length !== 0 && (
          <LatestTeachers session={session} teachers={teachers} />
        )}
      </div>
    </div>
  );
}

export default DashboardPage;
