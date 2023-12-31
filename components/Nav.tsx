'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function Nav() {
  const pathname = usePathname();

  return (
    <div className="hidden md:flex items-center gap-3">
      {['Dashboard', 'Students', 'Teachers', 'Contacts'].map((link, i) => {
        return (
          <Link
            key={i}
            href={`/${link.toLowerCase()}`}
            className={cn('text-sm text-gray-500', {
              'text-blue-500 font-medium': pathname.includes(
                `/${link.toLowerCase()}`
              ),
            })}
          >
            {link}
          </Link>
        );
      })}
    </div>
  );
}

export default Nav;
