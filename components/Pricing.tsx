'use client';

import { Check } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Separator } from './ui/separator';
import { plans } from '@/plans';
import Section from './Section';
import { formatPrice } from '@/lib/utils';
import { Button } from './ui/button';
import { createStipeSession } from '@/actions';
import { useToast } from './ui/use-toast';
import { useSubscriptionsStore } from '@/store/store';
import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';

function SignInBtn() {
  return (
    <Button
      className="my-3"
      onClick={async () => {
        await signIn();
      }}
    >
      Sign In
    </Button>
  );
}

function BecomeProBtn() {
  return (
    <Button
      onClick={async () => {
        await createStipeSession();
      }}
      className="my-3 bg-purple-500 hover:bg-purple-600 text-white text-center"
    >
      Become Pro
    </Button>
  );
}

function DashboardBtn() {
  return (
    <Button
      className="my-3 bg-purple-500 hover:bg-purple-600 text-white text-center"
      asChild
    >
      <Link href={`/dashboard`}>Dashboard</Link>
    </Button>
  );
}

function Pricing() {
  const subscription = useSubscriptionsStore((state) => state.subscription);
  const { data: session } = useSession();

  return (
    <Section className="flex flex-col gap-y-4 md:flex-row md:gap-x-10">
      {plans.map((plan, i) => (
        <Card key={i}>
          <CardHeader>
            <CardTitle>{plan.name}</CardTitle>
            <CardDescription>{plan.slug}</CardDescription>
          </CardHeader>
          <Separator className="my-3" />
          <CardContent>
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
            {!session && <SignInBtn />}
            {session && !subscription && <BecomeProBtn />}
            {session && subscription && <DashboardBtn />}
            {plan.name === 'Free Plan' && session && !subscription && (
              <p className="text-gray-500 text-sm tracking-tight scroll-m-20 font-semibold">
                You are on the Free plan
              </p>
            )}
            {plan.name === 'Pro Plan' && session && subscription && (
              <p className="text-gray-500 text-sm tracking-tight scroll-m-20 font-semibold">
                You are on the Pro plan
              </p>
            )}
          </CardContent>
        </Card>
      ))}
    </Section>
  );
}

export default Pricing;
