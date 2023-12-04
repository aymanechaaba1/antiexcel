import { ToggleDarkMode } from './ToggleDarkMode';
import { UserDropdown } from './UserDropdown';
import Nav from './Nav';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

async function Header() {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex items-center justify-between px-4 py-2">
      <Link href={'/'}>Logo</Link>
      {session && <Nav />}
      <div className="flex items-center gap-2">
        <ToggleDarkMode />
        <UserDropdown />
      </div>
    </div>
  );
}

export default Header;
