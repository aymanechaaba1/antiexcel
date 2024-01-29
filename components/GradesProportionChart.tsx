'use client';

import { DonutChart } from '@tremor/react';

function GradesProportionChart({
  donut_data,
}: {
  donut_data: {
    percent?: number | undefined;
    name: string;
  }[];
}) {
  const valueFormatter = (number: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'percent',
    })
      .format(number)
      .toString();
  return (
    <DonutChart
      className="mt-6"
      data={donut_data}
      category="percent"
      index="name"
      valueFormatter={valueFormatter}
      colors={['slate', 'violet', 'indigo', 'rose', 'cyan', 'amber']}
      variant="pie"
    />
  );
}

export default GradesProportionChart;
