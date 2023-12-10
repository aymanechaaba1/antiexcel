import { ToggleDarkMode } from './ToggleDarkMode';
import { UserDropdown } from './UserDropdown';
import Nav from './Nav';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import Image from 'next/image';

async function Header() {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex items-center justify-between px-4 py-2">
      <Link href={'/'} prefetch={false} className="">
        <div>
          <Image
            src="https://firebasestorage.googleapis.com/v0/b/school-manager-e26b7.appspot.com/o/Screenshot%202023-12-09%20at%204.33.43%20PM.png?alt=media&token=ced15002-f3f9-47c1-a77a-cb0e203dccb6"
            alt="Logo"
            width={80}
            height={20}
            className="rounded-md object-cover dark:filter dark:invert"
          />
        </div>
      </Link>
      {session && session.user && <Nav />}
      <div className="flex items-center gap-2">
        <ToggleDarkMode />
        <UserDropdown />
      </div>
    </div>
  );
}

export default Header;
