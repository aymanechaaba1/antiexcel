'use client';

import { uncached_user } from '@/prisma/db-calls';
import { useSubscriptionsStore } from '@/store/store';
import React, { ReactNode, useEffect } from 'react';

function SubscriptionProvider({
  children,
  user,
}: {
  children: ReactNode;
  user: Awaited<ReturnType<typeof uncached_user>> | undefined;
}) {
  const setSubscription = useSubscriptionsStore(
    (state) => state.setSubscription
  );

  useEffect(() => {
    if (!user) return;

    if (
      user.stripe_subscription_id &&
      user.stripe_customer_id &&
      user.stripe_price_id &&
      user.stripe_current_period_end
    )
      setSubscription({
        id: user.stripe_subscription_id,
        customer_id: user.stripe_customer_id,
        price_id: user.stripe_price_id,
        current_period_end: user.stripe_current_period_end,
        cancel_at: user.cancel_at || null,
      });
    else setSubscription(undefined);

    const today = new Date();

    if (user.cancel_at) {
      if (today === user.cancel_at) setSubscription(undefined);
    }
  }, [user]);

  return <>{children}</>;
}

export default SubscriptionProvider;
