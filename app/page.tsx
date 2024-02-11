import Hero from '@/components/Hero';
import Pricing from '@/components/Pricing';
import Video from '@/components/Video';

export default async function Home() {
  return (
    <>
      <Hero />
      <Video />
      <Pricing />
    </>
  );
}
