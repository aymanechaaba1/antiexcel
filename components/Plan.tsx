'use client';

import { hideId } from '@/lib/utils';
import { Badge } from './ui/badge';
import Section from './Section';

function Plan({ plan }: { plan: Plan }) {
  return (
    <Section title={`You are on the ${plan.name}`}>
      <Badge
        className={`${
          plan.status === 'ACTIVE'
            ? 'text-green-500'
            : plan.status === 'APPROVAL_PENDING	'
            ? 'text-purple-500'
            : 'text-red-500'
        } font-bold`}
      >
        {plan.status}
      </Badge>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <p className="text-gray-400">Plan Name</p>
        <p>{plan.name}</p>
        <p className="text-gray-400">Plan Description</p>
        <p>{plan.description}</p>
        <p className="text-gray-400">Plan ID</p>
        <p>{hideId(plan.id)}</p>
      </div>
    </Section>
  );
}

export default Plan;
