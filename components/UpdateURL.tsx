'use client';

import { DEFAULT_PAGE, DEFAULT_PER_PAGE, DEFAULT_SORT_BY } from '@/lib/config';
import { useSubscriptionsStore } from '@/store/store';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ReactNode, useEffect } from 'react';

function UpdateURL({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const subscription = useSubscriptionsStore((state) => state.subscription);

  useEffect(() => {
    if (pathname === '/dashboard') {
      const params = new URLSearchParams(searchParams);
      if (subscription) params.set('subscribed', 'true');
      else if (!subscription) params.set('subscribed', 'false');
      router.replace(`${pathname}?${params.toString()}`);
    }
  }, [pathname]);

  return <>{children}</>;
}

export default UpdateURL;
