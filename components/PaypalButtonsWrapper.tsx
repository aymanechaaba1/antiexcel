'use client';

import PaypalButtons from '@/providers/PaypalButtons';
import { trpc } from '@/app/_trpc/client';
import { useToast } from './ui/use-toast';
import { Session } from 'next-auth';
import { usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { useEffect } from 'react';
import { Resend } from 'resend';
import NewSubscriptionEmail from './emails/NewSubscriptionEmail';
import { serverClient } from '@/app/_trpc/serverClient';
import { sendNewSubEmail } from '@/actions';

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
  }, [type, dispatch, options]);

  const { mutate: updateUser } = trpc.updateUser.useMutation({
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
          subscription_id: data.subscriptionID,
        });

        await sendNewSubEmail();
      }}
    />
  );
}

export default PaypalButtonsWrapper;
