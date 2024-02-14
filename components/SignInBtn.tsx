'use client';

import { signIn } from 'next-auth/react';
import { Button } from './ui/button';

function SignInBtn({ className }: { className?: string }) {
  return (
    <Button
      onClick={async () => {
        await signIn();
      }}
      className={className}
    >
      Get Started
    </Button>
  );
}

export default SignInBtn;
