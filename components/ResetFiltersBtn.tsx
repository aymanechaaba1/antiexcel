'use client';

import { Button } from './ui/button';
import { RotateCw } from 'lucide-react';

function ResetFiltersBtn({ onClick }: { onClick: () => void }) {
  return (
    <Button
      variant={'outline'}
      className="flex items-center justify-center mr-3 float-left"
      onClick={() => {
        onClick();
      }}
    >
      <RotateCw size={18} />
      <p className="sr-only text-sm tracking-tight font-semibold text-center">
        Reset Filters
      </p>
    </Button>
  );
}

export default ResetFiltersBtn;
