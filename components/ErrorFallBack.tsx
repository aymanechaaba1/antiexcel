'use client';

import { cn } from '@/lib/utils';
import { Button } from './ui/button';

function ErrorFallBack({
  error,
  resetErrorBoundary: reset,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) {
  return (
    <div
      className={cn(
        'grid place-items-center place-content-center gap-y-3 p-5 space-y-4 w-full h-48'
      )}
    >
      <h2 className="h2 text-center">Something went wrong!</h2>
      <Button onClick={() => reset()}>Try Again</Button>
    </div>
  );
}

export default ErrorFallBack;
