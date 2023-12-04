'use client';

import { useSubscriptionsStore } from '@/store/store';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

function UpgradeBanner() {
  const { data: session } = useSession();
  if (!session) return;

  const { subscription } = useSubscriptionsStore((state) => state);

  if (session && !subscription)
    return (
      <div className="text-center text-white font-medium py-2 bg-gradient-to-r from-[#5C258D] to-[#4389A2]">
        <Link href={`/#pricing`}>Upgrade to PRO</Link>
      </div>
    );
}

export default UpgradeBanner;
