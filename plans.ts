import { FREE_PLAN_LIMIT } from './lib/config';

interface Price {
  amount: number;
  id: string;
}

interface Plan {
  name: 'Free Plan' | 'Pro Plan';
  slug: string;
  price: Price;
  limit: number;
  features: string[];
}

export const plans: Plan[] = [
  {
    name: 'Free Plan',
    slug: 'Get Started',
    features: [
      `Manage Up to ${FREE_PLAN_LIMIT} students, ${FREE_PLAN_LIMIT} teachers and ${FREE_PLAN_LIMIT} contacts`,
      'Real-time students data',
    ],
    price: {
      amount: 0,
      id: '',
    },
    limit: FREE_PLAN_LIMIT,
  },
  {
    name: 'Pro Plan',
    slug: 'Expand your Membership',
    features: [
      'Manage Unlimited students, teachers and contacts',
      'Real-time students and teachers data',
    ],
    price: {
      amount: 10,
      id: 'price_1OdeJyBs0A6Vu2bHD9SBqnxd',
    },
    limit: 0,
  },
];
