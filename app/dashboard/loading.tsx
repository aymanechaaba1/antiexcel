import DashboardCardSkeleton from '@/components/skeletons/DashboardCardSkeleton';
import { Loader2 } from 'lucide-react';

function ChartSkeleton({ height = 40 }: { height?: number }) {
  return <div className={`w-full h-${height} rounded-lg skeleton`} />;
}

function LatestStudentsSkeleton() {
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

function DashboardLoadingSkeleton() {
  return (
    <div className="space-y-5">
      <DashboardCardSkeleton />
      <ChartSkeleton />
      <LatestStudentsSkeleton />
      <LatestTeachersSkeleton />
    </div>
  );
}

export default DashboardLoadingSkeleton;
