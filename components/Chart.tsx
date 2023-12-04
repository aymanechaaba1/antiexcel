'use client';

import { serverClient } from '@/app/_trpc/serverClient';
import { generateChartData } from '@/lib/utils';
import { Card, Title, LineChart } from '@tremor/react';
import React from 'react';

function Chart({
  students,
}: {
  students: Awaited<ReturnType<(typeof serverClient)['getStudents']>>;
}) {
  const chartData = generateChartData(students, 2023);

  if (!students) return;

  return (
    <Card className="rounded-lg">
      <Title>Students Registration Progress</Title>
      <LineChart
        className=""
        data={chartData}
        index="month"
        categories={['students']}
        colors={['emerald', 'gray']}
        yAxisWidth={40}
      />
    </Card>
  );
}

export default Chart;
