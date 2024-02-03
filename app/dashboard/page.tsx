import LatestStudents from '@/components/dashboard/LatestStudents';
import TeachersOverview from '@/components/TeachersOverview';
import StudentsOverview from '@/components/dashboard/StudentsOverview';
import SubjectsDonutChart from '@/components/SubjectsDonutChart';
import GradesDonutChart from '@/components/GradesDonutChart';
import LatestTeachers from '@/components/LatestTeachers';
import DashboardChart from '@/components/DashboardChart';
import { uncached_students, uncached_teachers } from '@/actions';

async function DashboardPage() {
  const [students, teachers] = await Promise.all([
    uncached_students(),
    uncached_teachers(),
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
