'use client';

import PaypalButtons from '@/providers/PaypalButtons';
import { trpc } from '@/app/_trpc/client';
import { useToast } from './ui/use-toast';
import { Session } from 'next-auth';
import { usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { useEffect } from 'react';

function PaypalButtonsWrapper({
  session,
  plan_id,
  type,
}: {
  session: Session | null;
  plan_id: string;
  type: string;
}) {
  const { toast } = useToast();
  const utils = trpc.useContext();

  const [{ options }, dispatch] = usePayPalScriptReducer();

  useEffect(() => {
    dispatch({
      type: 'resetOptions',
      value: {
        ...options,
        intent: 'subscription',
      },
    });
  }, [type]);

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

        if (session)
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
