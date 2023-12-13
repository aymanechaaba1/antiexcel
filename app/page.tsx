import Hero from '@/components/Hero';
import Pricing from '@/components/Pricing';
import BecomeProEmail from '@/components/emails/BecomeProEmail';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <>
      <Hero />
      <Pricing session={session} />
    </>
  );
}
