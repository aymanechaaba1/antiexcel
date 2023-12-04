'use client';

import { usePlanStore, useSubscriptionsStore } from '@/store/store';
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

function PlanActions() {
  const plan = '';
  return;

  const handleDeactivatePlan = async () => {
    const res = await fetch(
      `https://api-m.sandbox.paypal.com/v1/billing/plans/${plan.id}/deactivate`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_PAYPAL_TOKEN}`,
        },
      }
    );

    if (!res.ok) throw new Error(`Plan ${plan.id} Deactivation Failed`);
  };

  const handleActivatePlan = async () => {
    const res = await fetch(
      `https://api-m.sandbox.paypal.com/v1/billing/plans/${plan.id}/activate`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_PAYPAL_TOKEN}`,
        },
        body: JSON.stringify({ reason: 'Reactivating the subscription' }),
      }
    );

    if (!res.ok)
      throw new Error(`Activation of Plan with id of ${plan.id} Failed.`);
  };

  if (plan)
    if (plan.status === 'ACTIVE')
      return (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">Deactivate</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action will deactivate your plan.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeactivatePlan}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      );
    else return <Button onClick={handleActivatePlan}>Activate</Button>;
}

export default PlanActions;
