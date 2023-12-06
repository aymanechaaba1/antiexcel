'use client';

import { useAccessToken, useSubscriptionsStore } from '@/store/store';
import { fetchNewAccessToken, formatDate } from '@/lib/utils';
import { Badge } from './ui/badge';
import { useEffect } from 'react';

function SubscriptionDetails() {
  const { setAccessToken } = useAccessToken((state) => state);
  const subscription = useSubscriptionsStore((state) => state.subscription);

  if (subscription)
    // display subscription details
    return (
      <>
        <Badge
          className={`${
            subscription.status === 'ACTIVE'
              ? 'text-green-500'
              : subscription.status === 'APPROVAL_PENDING	'
              ? 'text-purple-500'
              : 'text-red-500'
          } font-bold`}
        >
          {subscription.status}
        </Badge>
        <div className="grid grid-cols-2 gap-y-2">
          <p className="text-gray-500">Subscription ID</p>
          <p>{subscription.id}</p>
          <p className="text-gray-500">Start Date</p>
          {subscription.start_time && (
            <p>
              {formatDate(new Date(subscription.start_time), 'en-US', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
              })}
            </p>
          )}
          {subscription.billing_info?.next_billing_time && (
            <>
              <p className="text-gray-500">Next Billing</p>
              <p>
                {formatDate(
                  new Date(subscription.billing_info.next_billing_time),
                  'en-US',
                  {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                  }
                )}
              </p>
            </>
          )}
          <p className="text-gray-500">Payment Source</p>
          <p>Paypal</p>
        </div>
      </>
    );
}

export default SubscriptionDetails;
