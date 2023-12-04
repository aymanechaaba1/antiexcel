'use client';

import { Check } from 'lucide-react';
import { Card } from './ui/card';
import { Separator } from './ui/separator';
import { Button } from './ui/button';
import { useSubscriptionsStore } from '@/store/store';
import Link from 'next/link';
import { plans, product } from '@/plans';
import { signIn, useSession } from 'next-auth/react';
import Section from './Section';
import CheckoutButton from './CheckoutButton';

function Pricing() {
  const { data: session } = useSession();

  const { subscription } = useSubscriptionsStore((state) => state);

  return (
    <Section title="Pricing" className="my-5">
      <div className="flex flex-col md:flex-row gap-3 py-4">
        <Card className="border rounded-lg p-4 space-y-3">
          <div>
            <h1 className="text-xl font-bold">{plans[0].name}</h1>
            <p className="text-gray-500">{plans[0].description}</p>
          </div>
          <Separator />
          <div>
            <h1>
              <span className="font-bold text-3xl">$0</span>
            </h1>
          </div>
          <Separator />
          <div>
            {plans[0].features.map((feature, i) => (
              <div key={i} className="flex items-center gap-3">
                <Check className="text-purple-500" />
                <p className="font-medium text-sm">{feature}</p>
              </div>
            ))}
          </div>
          <Separator />
          {!session && (
            <Button
              onClick={() => {
                signIn();
              }}
            >
              Sign In
            </Button>
          )}
          {session && (
            <Button asChild>
              <Link href={`/dashboard`}>Dashboard</Link>
            </Button>
          )}
        </Card>
        <Card className="border rounded-lg p-4 space-y-3">
          <div>
            <h1 className="text-xl font-bold">{plans[1].name}</h1>
            <p className="text-gray-500">{plans[1].description}</p>
          </div>
          <Separator />
          <div>
            <h1>
              {plans[1].billing_cycles && (
                <span className="font-bold text-3xl">
                  ${plans[1].billing_cycles[0].pricing_scheme.fixed_price.value}
                </span>
              )}
              <span className="ml-2 text-xs text-gray-500">per month</span>
            </h1>
          </div>
          <Separator />
          <div>
            {plans[1].features.map((feature, i) => (
              <div key={i} className="flex items-center gap-3">
                <Check className="text-purple-500" />
                <p className="font-medium text-sm">{feature}</p>
              </div>
            ))}
          </div>
          <Separator />
          {!session ? (
            <Button
              onClick={() => {
                signIn();
              }}
            >
              Sign In
            </Button>
          ) : session && !subscription ? (
            <CheckoutButton />
          ) : (
            <Button asChild>
              <Link href={`/dashboard`}>Dashboard</Link>
            </Button>
          )}
        </Card>
      </div>
    </Section>
  );
}

export default Pricing;
