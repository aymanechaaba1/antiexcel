import { getServerSession } from 'next-auth';
import { ToggleDarkMode } from './ToggleDarkMode';
import { UserDropdown } from './UserDropdown';
import { authOptions } from '@/lib/auth';
import Nav from './Nav';
import Link from 'next/link';

async function Header() {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex items-center justify-between">
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
