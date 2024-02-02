'use client';

import { useAccessTokenStore, useSubscriptionsStore } from '@/store/store';
import { Button } from './ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog';
import { useToast } from './ui/use-toast';
import Link from 'next/link';
import { trpc } from '@/server/trpc';

function SubscriptionActions() {
  const { access_token } = useAccessTokenStore((state) => state);
  const { subscription } = useSubscriptionsStore((state) => state);

  const { toast } = useToast();

  const utils = trpc.useUtils();

  const { mutate: updateUser } = trpc.updateUser.useMutation({
    onSuccess: () => {
      utils.getUser.refetch();
      toast({
        title: 'Subscription Canceled!',
      });
    },
  });

  const handleSuspendSubscription = async () => {
    if (!subscription) return;

    const res = await fetch(
      `https://api-m.sandbox.paypal.com/v1/billing/subscriptions/${subscription.id}/suspend`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${access_token}`,
        },
        body: JSON.stringify({ reason: 'No reason.' }),
      }
    );

    if (!res.ok) throw new Error(`Subscription Suspension Failed.`);

    updateUser({
      subscription_id: null,
    });
  };

  const handleCancelSubscription = async () => {
    const res = await fetch(
      `https://api-m.sandbox.paypal.com/v1/billing/subscriptions/${subscription?.id}/cancel`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${access_token}`,
        },
        body: JSON.stringify({ reason: 'Not satisfied with the service' }),
      }
    );

    if (!res.ok) throw new Error(`Subscription Cancelation Failed.`);

    updateUser({
      subscription_id: null,
    });
  };

  if (subscription) {
    return (
      <div className="flex items-center gap-4">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">Suspend</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action will suspend your subscription.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleSuspendSubscription}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">Cancel</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action will cancel your subscription.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleCancelSubscription}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    );
  } else
    return (
      <Button asChild>
        <Link href={`/#pricing`}>Become a PRO!</Link>
      </Button>
    );
}

export default SubscriptionActions;
