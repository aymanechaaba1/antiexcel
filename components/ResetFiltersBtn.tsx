'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { RotateCw } from 'lucide-react';

function ResetFiltersBtn() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Button
      className="flex items-center justify-center mr-3 float-left"
      onClick={() => {
        router.replace(`${pathname}`);
      }}
    >
      <RotateCw size={18} className="" />
    </Button>
  );
}

export default ResetFiltersBtn;
