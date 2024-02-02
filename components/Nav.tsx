'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type NavLink = {
  path: string;
  label: string;
};

const navLinks: NavLink[] = [
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
  },
  {
    path: '/contacts',
    label: 'Contacts',
  },
];

function Nav() {
  const pathname = usePathname();

  return (
    <div className="hidden md:flex items-center gap-3">
      {navLinks.map((link, i) => (
        <Link
          key={i}
          href={link.path}
          className={cn('text-sm text-gray-500', {
            'text-blue-500 font-medium': pathname
              .slice(1)
              .includes(link.label.toLowerCase()),
          })}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}

export default Nav;
