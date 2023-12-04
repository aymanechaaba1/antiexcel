'use client';

import PaypalButtons from '@/providers/PaypalButtons';
import { useSession } from 'next-auth/react';
import { trpc } from '@/app/_trpc/client';
import { useToast } from './ui/use-toast';
import { useSubscriptionsStore } from '@/store/store';

function PaypalButtonsWrapper({ plan_id }: { plan_id: string }) {
  const { data: session } = useSession();
  if (!session) return;

  const { toast } = useToast();

  const utils = trpc.useContext();

  const {
    mutate: updateUser,
    isLoading,
    data: newUser,
  } = trpc.updateUser.useMutation({
    onSuccess: () => {
      utils.getUser.invalidate();
      toast({
        title: "You're a PRO Member!",
      });
    },
  });

  return (
    <PaypalButtons
      style={{
        layout: 'vertical',
        color: 'gold',
        shape: 'rect',
        label: 'subscribe',
        height: 30,
      }}
      className=""
      disabled={false}
      createSubscription={async (data, actions) => {
        return actions.subscription.create({
          plan_id,
        });
      }}
      onApprove={async (data) => {
        if (!data.subscriptionID) return;

        updateUser({
          id: session.user.id,
          subscription_id: data.subscriptionID,
        });

        if (isLoading)
          toast({
            title: 'Subscribing in the process...',
            className: 'animate pulse',
          });

        if (newUser) {
          toast({
            title: 'Subscribed to PRO Plan!',
            description: 'Discover all features!',
          });
        }
      }}
    />
  );
}

export default PaypalButtonsWrapper;
