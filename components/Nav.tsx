'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type NavLink = {
  path: string;
  label: string;
  searchParams?: URLSearchParams;
};

const searchParams = new URLSearchParams();
searchParams.set('page', '1');
searchParams.set('per_page', '5');
searchParams.set('sort_by', 'latest');

const navLinks: NavLink[] = [
  {
    path: '/',
    label: 'Home',
  },
  {
    path: '/dashboard',
    label: 'Dashboard',
  },
  {
    path: '/students',
    label: 'Students',
  },
  {
    path: '/teachers',
    label: 'Teachers',
    searchParams,
  },
  {
    path: '/contacts',
    label: 'Contacts',
    searchParams,
  },
];

function Nav() {
  const pathname = usePathname();

  return (
    <div className="hidden md:flex items-center gap-3">
      {navLinks.map((link, i) =>
        link.searchParams ? (
          <Link
            key={i}
            href={`${link.path}?${link.searchParams.toString()}`}
            className={cn('text-sm text-gray-500', {
              'text-blue-500 font-medium': pathname.startsWith(link.path),
            })}
          >
            {link.label}
          </Link>
        ) : (
          <Link
            key={i}
            href={link.path}
            className={cn('text-sm text-gray-500', {
              'text-blue-500 font-medium': pathname === link.path,
            })}
          >
            {link.label}
          </Link>
        )
      )}
    </div>
  );
}

export default Nav;
