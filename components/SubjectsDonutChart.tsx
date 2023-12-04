'use client';

import { serverClient } from '@/app/_trpc/serverClient';
import { getSubjectProportion } from '@/lib/utils';
import { Card, DonutChart, Title } from '@tremor/react';

const cities = [
  {
    subject: 'Science',
    proportion: 0.75,
  },
];

const valueFormatter = (number: number) =>
  `${new Intl.NumberFormat('en-US', {
    style: 'percent',
  })
    .format(number)
    .toString()}`;

function SubjectsDonutChart({
  teachers,
}: {
  teachers: Awaited<ReturnType<(typeof serverClient)['getTeachers']>>;
}) {
  const subjects = new Set(teachers.map((teacher) => teacher.subject));

  const data = [...subjects].map((subject) => ({
    subject,
    proportion: getSubjectProportion(teachers, subject),
  }));

  // get percentage of a subject

  return (
    <Card className="max-w-lg rounded-lg">
      <Title>Subjects Proportion</Title>
      <DonutChart
        className="mt-6"
        data={data}
        category="proportion"
        index="subject"
        valueFormatter={valueFormatter}
        colors={['slate', 'violet', 'indigo', 'rose', 'cyan', 'amber']}
      />
    </Card>
  );
}

export default SubjectsDonutChart;
