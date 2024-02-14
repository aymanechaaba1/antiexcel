'use client';

import { Contact2, GraduationCap, Home, Users } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import { UserDropdown } from './UserDropdown';
import { cn } from '@/lib/utils';
import { ToggleDarkMode } from './ToggleDarkMode';

type NavLink = {
  path: string;
  label: string;
  icon: ReactNode;
};

const navLinks: NavLink[] = [
  {
    path: '/dashboard',
    label: 'Dashboard',
    icon: <Home />,
  },
  {
    path: '/students',
    label: 'Students',
    icon: <Users />,
  },
  {
    path: '/teachers',
    label: 'Teachers',
    icon: <GraduationCap />,
  },
  {
    path: '/contacts',
    label: 'Contacts',
    icon: <Contact2 />,
  },
];

function SideBar() {
  const { data: session } = useSession();
  const pathname = usePathname();

  return (
    <div className="sidebar flex flex-col justify-center items-center min-h-screen border-r p-4">
      <Link href={'/'} prefetch={false} className="">
        <div className="flex items-center justify-center py-5">
          <Image
            src="https://firebasestorage.googleapis.com/v0/b/school-manager-e26b7.appspot.com/o/Screenshot%202023-12-09%20at%204.33.43%20PM.png?alt=media&token=ced15002-f3f9-47c1-a77a-cb0e203dccb6"
            alt="Logo"
            width={80}
            height={20}
            className="rounded-md object-cover dark:filter dark:invert"
          />
        </div>
      </Link>
      <div className="space-y-4 flex-1 mt-5">
        {navLinks.map(({ path, label, icon }, i) => (
          <Link
            key={i}
            href={path}
            className={cn(
              'flex items-center justify-center gap-x-3 py-3 hover:bg-gray-200 dark:hover:bg-gray-900 px-5 rounded-lg',
              {
                'border-l border-purple-500 text-purple-500':
                  pathname.startsWith(path),
              }
            )}
          >
            {icon}
            <span className="hidden lg:block">{label}</span>
          </Link>
        ))}
      </div>
      <div className="flex flex-col md:flex-row items-center gap-5">
        <ToggleDarkMode />
        <UserDropdown />
      </div>
    </div>
  );
}

export default SideBar;
