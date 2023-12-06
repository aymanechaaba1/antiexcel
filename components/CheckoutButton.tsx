'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import PaypalButtonsWrapper from './PaypalButtonsWrapper';
import { Session } from 'next-auth';

function CheckoutButton({ session }: { session: Session | null }) {
  const [showPaypalButtons, setShowPaypalButtons] = useState(false);

  return (
    <>
      {!showPaypalButtons && (
        <Button
          onClick={() => {
            setShowPaypalButtons(!showPaypalButtons);
          }}
        >
          Become a PRO!
        </Button>
      )}
      {showPaypalButtons && (
        <PaypalButtonsWrapper
          session={session}
          plan_id="P-15386790JC4273459MVVQI6A"
          type="subscription"
        />
      )}
    </>
  );
}

export default CheckoutButton;
