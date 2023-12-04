'use client';

import { trpc } from '@/app/_trpc/client';
import { useToast } from '@/components/ui/use-toast';
import { useSubscriptionsStore, useTransactionsStore } from '@/store/store';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

function SubscriptionProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  if (!session) return <>{children}</>;

  const { toast } = useToast();

  const { data: user } = trpc.getUser.useQuery({
    id: session.user.id,
  });

  const { setSubscription } = useSubscriptionsStore((state) => state);
  const { setTransactions } = useTransactionsStore((state) => state);

  useEffect(() => {
    if (!user || !user.subscription_id) return;

    fetch(
      `https://api-m.sandbox.paypal.com/v1/billing/subscriptions/${user.subscription_id}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_PAYPAL_TOKEN}`,
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
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_PAYPAL_TOKEN}`,
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
          }
        )
          .then((transactionsRes) => transactionsRes.json())
          .then((transactions) => {
            console.log(transactions);
            setTransactions(transactions.transactions);
          });
      });

    return () => {
      setSubscription(null);
      setTransactions(null);
    };
  }, [user, setSubscription]);

  return <>{children}</>;
}

export default SubscriptionProvider;
