'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function Nav() {
  const pathname = usePathname();

  const searchParams = new URLSearchParams();
  searchParams.set('page', '1');
  searchParams.set('per_page', '5');

  return (
    <div className="hidden md:flex items-center gap-3">
      {['Dashboard', 'Students', 'Teachers'].map((link, i) => {
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

      <Link
        href={`/contacts?${searchParams.toString()}`}
        className={cn('text-sm text-gray-500', {
          'text-blue-500 font-medium': pathname.includes(`/contacts`),
        })}
      >
        Contacts
      </Link>
    </div>
  );
}

export default Nav;
