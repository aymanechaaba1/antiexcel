import Hero from '@/components/Hero';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import Pricing from '@/components/Pricing';
import Video from '@/components/Video';

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <>
      <Hero />
      <Video />
      <Pricing session={session} />
    </>
  );
}
