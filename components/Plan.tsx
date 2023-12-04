'use client';

import { Badge } from './ui/badge';

function Plan({ plan }: { plan: Plan }) {
  return (
    <>
      <div className="flex items-center gap-3">
        <h1 className="text-3xl">You're on the {plan.name}</h1>
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
      </div>
      <div className="grid grid-cols-2 gap-x-5 gap-y-2">
        <p className="text-gray-400">Plan Name</p>
        <p>{plan.name}</p>
        <p className="text-gray-400">Plan Description</p>
        <p>{plan.description}</p>
        <p className="text-gray-400">Plan ID</p>
        <p>{plan.id}</p>
      </div>
    </>
  );
}

export default Plan;
