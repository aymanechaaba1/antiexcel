'use client';

import { PayPalScriptProvider } from '@paypal/react-paypal-js';

function PaypalProvider({ children }: { children: React.ReactNode }) {
  return (
    <PayPalScriptProvider
      options={{
        clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID as string,
        currency: 'USD',
        intent: 'subscription',
        vault: true,
      }}
    >
      {children}
    </PayPalScriptProvider>
  );
}

export default PaypalProvider;
