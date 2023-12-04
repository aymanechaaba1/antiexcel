import SignInButton from '@/components/SignInButton';
import { Button } from '@/components/ui/button';
import { Github } from 'lucide-react';
import { getProviders, signIn } from 'next-auth/react';
import { useState } from 'react';

async function SignInPage() {
  const providers = await getProviders();

  console.log(providers);

  return (
    <div className="max-w-3xl mx-auto w-full">
      <h1 className="text-3xl mb-3">Sign In</h1>
      <div className="flex items-center gap-3">
        {Object.values(providers!).map((provider) => (
          <SignInButton provider={provider} />
        ))}
      </div>
    </div>
  );
}

export default SignInPage;
