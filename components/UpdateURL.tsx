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
    const params = new URLSearchParams(searchParams);

    if (pathname === '/dashboard') {
      if (subscription) params.set('subscribed', 'true');
      else params.set('subscribed', 'false');
    }

    if (pathname === '/students') {
      const currentPage = params.get('page');
      const currentPerPage = params.get('per_page');

      if (!currentPage) params.set('page', '1');
      if (!currentPerPage) params.set('per_page', '3');
    }

    router.replace(`${pathname}?${params.toString()}`);
  }, [pathname]);

  return <>{children}</>;
}

export default UpdateURL;
