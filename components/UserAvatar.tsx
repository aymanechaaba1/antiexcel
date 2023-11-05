'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getAvatarName } from '@/lib/utils';
import { useSession } from 'next-auth/react';

export function UserAvatar() {
  const { data: session } = useSession();

  return (
    <Avatar>
      <AvatarImage src={session?.user.image!} alt={session?.user.name!} />
      <AvatarFallback>{getAvatarName(session?.user.name!)}</AvatarFallback>
    </Avatar>
  );
}
