'use client';

import { trpc } from '@/app/_trpc/client';
import { useToast } from '@/components/ui/use-toast';
import { fetchNewAccessToken } from '@/lib/utils';
import {
  useAccessToken,
  useSubscriptionsStore,
  useTransactionsStore,
} from '@/store/store';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

function SubscriptionProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  if (!session) return <>{children}</>;

  const { toast } = useToast();

  const { data: user } = trpc.getUser.useQuery({
    id: session.user.id,
  });

  const { access_token, setAccessToken } = useAccessToken((state) => state);
  const { setSubscription } = useSubscriptionsStore((state) => state);
  const { setTransactions } = useTransactionsStore((state) => state);

  useEffect(() => {
    if (!user || !user.subscription_id) return;

    const intervalId = setInterval(async () => {
      const { access_token } = await fetchNewAccessToken();
      if (access_token) setAccessToken(access_token);
    }, 32400);

    fetch(
      `https://api-m.sandbox.paypal.com/v1/billing/subscriptions/${user.subscription_id}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        cache: 'no-store',
      }
    )
      .then((res) => {
        if (!res.ok) {
          toast({
            title: 'Failed fetching subscription details',
          });
        }

        return res.json();
      })
      .then((subscription: Subscription) => {
        setSubscription(subscription);

        return fetch(
          `https://api-m.sandbox.paypal.com/v1/billing/subscriptions/${
            subscription.id
          }/transactions?start_time=${
            subscription.start_time
          }&end_time=${new Date().toISOString()}`,
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
          }
        );
      })
      .then((transactionsRes) => transactionsRes.json())
      .then((transactions) => {
        setTransactions(transactions.transactions);
      });

    return () => {
      clearInterval(intervalId);
    };
  }, [user, access_token, setAccessToken, setSubscription, setTransactions]);

  return <>{children}</>;
}

export default SubscriptionProvider;
