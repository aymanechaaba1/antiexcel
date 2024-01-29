import LatestStudents from '@/components/dashboard/LatestStudents';
import TeachersOverview from '@/components/TeachersOverview';
import DashboardChart from '@/components/DashboardChart';
import StudentsOverview from '@/components/dashboard/StudentsOverview';
import SubjectsDonutChart from '@/components/SubjectsDonutChart';
import GradesDonutChart from '@/components/GradesDonutChart';
import LatestTeachers from '@/components/LatestTeachers';
import { Suspense } from 'react';
import DashboardCardSkeleton from '@/components/skeletons/DashboardCardSkeleton';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallBack from '@/components/ErrorFallBack';

function ChartSkeleton({ height = 40 }: { height?: number }) {
  return <div className={`w-full h-${height} rounded-lg skeleton`} />;
}

function LatestStudentsSkeleton() {
  const rows = 2;
  return (
    <div className="p-4 border rounded-lg flex-grow space-y-3">
      <h3 className="text-2xl tracking-tight font-semibold scroll-m-20">
        Latest Students
      </h3>
      <div className="grid grid-cols-4 gap-x-4 gap-y-3 items-center">
        {Array.from({ length: 2 }).map((_, i) => (
          <>
            <div className="w-10 h-10 rounded-full clip-circle skeleton" />
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="w-full h-10 rounded-lg skeleton" />
            ))}
          </>
        ))}
      </div>
    </div>
  );
}

function LatestTeachersSkeleton() {
  const rows = 2;
  return (
    <div className="p-4 border rounded-lg flex-grow space-y-3">
      <h3 className="text-2xl tracking-tight font-semibold scroll-m-20">
        Latest Teachers
      </h3>
      <div className="grid grid-cols-2 gap-x-4 gap-y-3 items-center">
        {Array.from({ length: 2 }).map((_, i) => (
          <>
            <div className="w-10 h-10 rounded-full clip-circle skeleton" />
            <div key={i} className="w-full h-10 rounded-lg skeleton" />
          </>
        ))}
      </div>
    </div>
  );
}

function DashboardPage() {
  return (
    <div className="space-y-4">
      <ErrorBoundary FallbackComponent={ErrorFallBack}>
        <Suspense fallback={<DashboardCardSkeleton cards={4} />}>
          <StudentsOverview />
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary FallbackComponent={ErrorFallBack}>
        <Suspense fallback={<DashboardCardSkeleton />}>
          <TeachersOverview />
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary FallbackComponent={ErrorFallBack}>
        <Suspense fallback={<ChartSkeleton height={60} />}>
          <DashboardChart />
        </Suspense>
      </ErrorBoundary>

      <div className="flex flex-col md:flex-row gap-4">
        <ErrorBoundary FallbackComponent={ErrorFallBack}>
          <Suspense fallback={<ChartSkeleton height={60} />}>
            <GradesDonutChart />
          </Suspense>
        </ErrorBoundary>

        <ErrorBoundary FallbackComponent={ErrorFallBack}>
          <Suspense fallback={<ChartSkeleton height={60} />}>
            <SubjectsDonutChart />
          </Suspense>
        </ErrorBoundary>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <ErrorBoundary FallbackComponent={ErrorFallBack}>
          <Suspense fallback={<LatestStudentsSkeleton />}>
            <LatestStudents />
          </Suspense>
        </ErrorBoundary>

        <ErrorBoundary FallbackComponent={ErrorFallBack}>
          <Suspense fallback={<LatestTeachersSkeleton />}>
            <LatestTeachers />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
}

export default DashboardPage;
