'use client';

import { DEFAULT_PAGE, DEFAULT_PER_PAGE, DEFAULT_SORT_BY } from '@/lib/config';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ReactNode, useEffect } from 'react';

function UpdateURLPattern({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = searchParams.get('page');
  const per_page = searchParams.get('per_page');
  const sort_by = searchParams.get('sort_by');

  useEffect(() => {
    // let newSearchParams: URLSearchParams;
    // if (page || per_page) newSearchParams = new URLSearchParams(searchParams);
    // if (!page || !per_page) {
    //   newSearchParams = new URLSearchParams();
    //   if (
    //     pathname === '/students' ||
    //     pathname === '/teachers' ||
    //     pathname === '/contacts'
    //   ) {
    //     newSearchParams.set('page', DEFAULT_PAGE.toString());
    //     newSearchParams.set('per_page', DEFAULT_PER_PAGE.toString());
    //     if (!sort_by) newSearchParams.set('sort_by', DEFAULT_SORT_BY);
    //     router.replace(`${pathname}/?${newSearchParams.toString()}`);
    //   }
    // }
  }, []);

  return <>{children}</>;
}

export default UpdateURLPattern;
