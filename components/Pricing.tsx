'use client';

import { Check } from 'lucide-react';
import { Card } from './ui/card';
import { Separator } from './ui/separator';
import { plans } from '@/plans';
import Section from './Section';
import { formatPrice } from '@/lib/utils';
import { Button } from './ui/button';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { createStipeSession } from '@/actions';
import { useToast } from './ui/use-toast';
import { useSubscriptionsStore } from '@/store/store';
import Link from 'next/link';

function Pricing() {
  const router = useRouter();
  const { toast } = useToast();
  const { subscription } = useSubscriptionsStore((state) => state);

  return (
    <Section className="flex flex-col gap-y-4 md:flex-row md:gap-x-10">
      {plans.map((plan, i) => (
        <Card key={i} className="p-4">
          <h3 className="h3">{plan.name}</h3>
          <p className="text-gray-500 mt-1">{plan.slug}</p>
          <Separator className="my-3" />
          <p className="text-2xl font-semibold">
            {formatPrice(plan.price.amount)}
          </p>
          {plan.features.map((feature, i) => (
            <div key={i} className="flex items-center gap-x-3 mt-2">
              <Check size={13} className="text-purple-500" />
              <p className="text-sm text-gray-900 dark:text-gray-200">
                {feature}
              </p>
            </div>
          ))}
          {plan.name === 'Free Plan' && !subscription && (
            <>
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
                className="bg-purple-500 hover:bg-purple-600 text-white mt-3"
              >
                Become a Pro!
              </Button>
              <p className="text-gray-500 mt-3 text-sm tracking-tight scroll-m-20 font-semibold">
                You are on the Free plan
              </p>
            </>
          )}

          {plan.name === 'Pro Plan' &&
            (!subscription ? (
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
                className="bg-purple-500 hover:bg-purple-600 text-white mt-3"
              >
                Become a Pro!
              </Button>
            ) : (
              <>
                <Button
                  className="bg-purple-500 hover:bg-purple-600 text-white mt-3"
                  asChild
                >
                  <Link href={`/dashboard`}>Dashboard</Link>
                </Button>
                <p className="text-gray-500 mt-3 text-sm tracking-tight scroll-m-20 font-semibold">
                  You are on the Pro plan
                </p>
              </>
            ))}
        </Card>
      ))}
    </Section>
  );
}

export default Pricing;
