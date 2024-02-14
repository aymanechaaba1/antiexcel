'use client';

import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { RotateCw } from 'lucide-react';

function ResetBtn({
  onClick,
  className,
}: {
  onClick: () => void;
  className?: string;
}) {
  return (
    <Button
      variant={'outline'}
      className={cn('flex items-center justify-center mr-3 float-left', {
        className,
      })}
      onClick={() => {
        onClick();
      }}
    >
      <RotateCw size={18} />
      <p className="sr-only text-sm tracking-tight font-semibold text-center">
        Reset
      </p>
    </Button>
  );
}

export default ResetBtn;
