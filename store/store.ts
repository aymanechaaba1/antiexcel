import { create } from 'zustand';

type Subscription = {
  id: string;
  customer_id: string;
  price_id: string;
  current_period_end: Date;
  cancel_at: Date | null;
};
interface SubscriptionState {
  subscription: Subscription | undefined;
  setSubscription: (subscription_id: Subscription | undefined) => void;
}

export const useSubscriptionsStore = create<SubscriptionState>((set) => ({
  subscription: undefined,
  setSubscription: (subscription: Subscription | undefined) =>
    set({ subscription }),
}));
