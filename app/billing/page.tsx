'use client';

import { createPortalSession, createStipeSession } from '@/actions';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useSubscriptionsStore } from '@/store/store';
import { useRouter } from 'next/navigation';
import React from 'react';

function BillingPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { subscription } = useSubscriptionsStore((state) => state);

  return (
    <div className="flex justify-end flex-col">
      <p className="text-gray-500 font-semibold">
        You are on {!subscription ? 'Free' : 'Pro'} the plan
      </p>
      {subscription && subscription.cancel_at && (
        <p className="text-gray-500 mb-2 text-sm">
          Your plan will be canceled on{' '}
          {new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: '2-digit',
            year: 'numeric',
          }).format(subscription.cancel_at)}
        </p>
      )}
      {!subscription ? (
        <Button
          onClick={async (e) => {
            try {
              await createStipeSession();
            } catch (err) {
              toast({
                title: 'Something Went Wrong!',
                variant: 'destructive',
              });
            }
          }}
          className="w-1/3 mt-3 bg-purple-500 text-white hover:bg-purple-600"
        >
          Become Pro!
        </Button>
      ) : (
        <Button
          onClick={async () => {
            await createPortalSession();
          }}
          className="w-1/3 mt-3 bg-purple-500 text-white hover:bg-purple-600"
        >
          Manage Billing
        </Button>
      )}
    </div>
  );
}

export default BillingPage;
