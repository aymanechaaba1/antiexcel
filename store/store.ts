import { create } from 'zustand';

interface SubscriptionState {
  subscription: Subscription | null | undefined;
  setSubscription: (subscription_id: Subscription | null | undefined) => void;
}

export const useSubscriptionsStore = create<SubscriptionState>((set) => ({
  subscription: undefined,
  setSubscription: (subscription: Subscription | null | undefined) =>
    set({ subscription }),
}));

interface TransactionsState {
  transactions: Transaction[] | null | undefined;
  setTransactions: (transactions: Transaction[] | null | undefined) => void;
}

export const useTransactionsStore = create<TransactionsState>((set) => ({
  transactions: null,
  setTransactions: (transactions: Transaction[] | null | undefined) =>
    set({ transactions }),
}));

interface AccessTokenState {
  access_token: string | null | undefined;
  setAccessToken: (access_token: string | null | undefined) => void;
}

export const useAccessToken = create<AccessTokenState>((set) => ({
  access_token: undefined,
  setAccessToken: (access_token: string | null | undefined) =>
    set({ access_token }),
}));
