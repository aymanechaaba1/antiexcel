'use client';

import { useSubscriptionsStore } from '@/store/store';
import { plans } from '@/plans';
import Plan from './Plan';

function PlanDetails() {
  const { subscription } = useSubscriptionsStore((state) => state);

  if (subscription) {
    // display pro plan
    return <Plan plan={plans[1]} />;
  } else {
    // display free plan
    return <Plan plan={plans[0]} />;
  }
}

export default PlanDetails;
