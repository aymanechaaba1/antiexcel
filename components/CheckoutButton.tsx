'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import PaypalButtonsWrapper from './PaypalButtonsWrapper';

function CheckoutButton() {
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
        <PaypalButtonsWrapper plan_id="P-15386790JC4273459MVVQI6A" />
      )}
    </>
  );
}

export default CheckoutButton;
