'use client';

import { DonutChart } from '@tremor/react';

function SubjectsProportionChart({
  data,
}: {
  data: {
    subject: string;
    proportion: number;
  }[];
}) {
  const valueFormatter = (number: number) =>
    `${new Intl.NumberFormat('en-US', {
      style: 'percent',
    })
      .format(number)
      .toString()}`;

  return (
    <DonutChart
      className="mt-6"
      data={data}
      category="proportion"
      index="subject"
      colors={['slate', 'violet', 'indigo', 'rose', 'cyan', 'amber']}
      valueFormatter={valueFormatter}
    />
  );
}

export default SubjectsProportionChart;
