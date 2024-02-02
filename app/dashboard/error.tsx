'use client';

import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="grid place-items-center place-content-center p-5 w-full h-48 space-y-4">
      <h2 className="h2 text-center">{error.message}</h2>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  );
}
