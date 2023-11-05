import Chart from '@/components/Chart';
import ChartDonut from '@/components/ChartDonut';
import LatestStudents from '@/components/dashboard/LatestStudents';
import Overview from '@/components/dashboard/Overview';

async function DashboardPage() {
  return (
    <div className="space-y-4">
      <Overview />
      <Chart />
      <ChartDonut />
      <LatestStudents />
    </div>
  );
}

export default DashboardPage;
