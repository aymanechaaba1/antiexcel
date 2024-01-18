'use client';

import { getSubjectProportion } from '@/lib/utils';
import { useSubscriptionsStore } from '@/store/store';
import { Teachers } from '@/types/types';
import { Card, DonutChart, Title } from '@tremor/react';
import { Session } from 'next-auth';

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
  session,
  teachers,
}: {
  session: Session | null;
  teachers: Teachers;
}) {
  const { subscription } = useSubscriptionsStore((state) => state);
  const isPro = session && subscription;

  const subjects = new Set(teachers?.map((teacher) => teacher.subject));

  const data = [...subjects].map((subject) => ({
    subject,
    proportion: getSubjectProportion(teachers, subject),
  }));

  // get percentage of a subject
  if (isPro)
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
