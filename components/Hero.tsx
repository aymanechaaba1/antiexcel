import Link from 'next/link';
import { Button } from './ui/button';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import SignInBtn from './SignInBtn';

async function Hero() {
  const session = await getServerSession(authOptions);

  return (
    <div className="">
      <h1 className="text-center text-4xl font-bold">Excel, Seriously!?</h1>
      <p className="text-center text-gray-500 text-md">
        Store your school data on the web
      </p>
      <div className="flex items-center gap-3 max-2xl justify-center my-3">
        {!session && (
          <SignInBtn className="bg-purple-500 py-2 px-5 rounded-lg font-medium text-center text-white hover:bg-purple-600" />
        )}
        {session && (
          <Button className="" variant={'secondary'} asChild>
            <Link href={`/dashboard`}>Dashboard</Link>
          </Button>
        )}
      </div>
    </div>
  );
}

export default Hero;
