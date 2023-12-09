import Hero from '@/components/Hero';
import Pricing from '@/components/Pricing';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) return;

  console.log(process.env.NEXT_PUBLIC_VERCEL_ENV);

  return (
    <>
      <Hero />
      <Pricing session={session} />
    </>
  );
}
