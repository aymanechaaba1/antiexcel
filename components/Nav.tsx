import Link from 'next/link';

function Nav() {
  return (
    <div className="flex items-center gap-3">
      <Link href={'/dashboard'} className="text-sm dark:text-gray-300">
        Dashboard
      </Link>
      <Link href={'/students'} className="text-sm dark:text-gray-300">
        Students
      </Link>
      <Link href={'/teachers'} className="text-sm dark:text-gray-300">
        Teachers
      </Link>
    </div>
  );
}

export default Nav;
