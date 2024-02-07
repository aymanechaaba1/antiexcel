'use client';

import {
  DEFAULT_FILTER_STUDENTS_BY,
  DEFAULT_FILTER_STUDENTS_GRADE,
  DEFAULT_PAGE,
  DEFAULT_PER_PAGE,
  DEFAULT_SORT_BY,
} from '@/lib/config';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ReactNode, useEffect } from 'react';

function UpdateURLPattern({ children }: { children: ReactNode }) {
  // const pathname = usePathname();
  // const router = useRouter();
  // const searchParams = useSearchParams();
  // const page = searchParams.get('page');
  // const per_page = searchParams.get('per_page');
  // const sort_by = searchParams.get('sort_by');
  // const filter_by = searchParams.get('filter_by');

  // useEffect(() => {
  //   if (
  //     pathname === '/students' ||
  //     pathname === '/teachers' ||
  //     pathname === '/contacts'
  //   ) {
  //     const searchParams = new URLSearchParams();
  //     searchParams.set('page', DEFAULT_PAGE.toString());
  //     searchParams.set('per_page', DEFAULT_PER_PAGE.toString());
  //     searchParams.set('sort_by', DEFAULT_SORT_BY);

  //     if (pathname === '/students') {
  //       searchParams.set('filter_by', DEFAULT_FILTER_STUDENTS_BY);
  //       searchParams.set('grade', DEFAULT_FILTER_STUDENTS_GRADE);
  //     }

  //     router.replace(`${pathname}?${searchParams.toString()}`);
  //   }
  // }, [pathname, page, per_page]);

  return <>{children}</>;
}

export default UpdateURLPattern;
