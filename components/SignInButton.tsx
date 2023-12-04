'use client';

import { ClientSafeProvider, signIn } from 'next-auth/react';
import { Button } from './ui/button';
import { Github } from 'lucide-react';

function SignInButton({ provider }: { provider: ClientSafeProvider }) {
  return (
    <Button
      key={provider.id}
      onClick={() => {
        signIn(provider.id, {
          callbackUrl: location.origin,
        });
      }}
      variant="outline"
      className="space-x-2"
    >
      {provider.name === 'GitHub' ? (
        <Github className="mr-2 h-4 w-4" />
      ) : (
        <span>Sign In with</span>
      )}
      <span>{provider.name}</span>
    </Button>
  );
}

export default SignInButton;
