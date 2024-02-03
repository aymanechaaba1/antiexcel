import { authOptions } from '@/lib/auth';
import { hideId } from '@/lib/utils';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

async function AccountDetailsPage() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) redirect(`/api/auth/signin`);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2">
      <p className="text-gray-500">Email</p>
      <p>{session.user.email}</p>
      <p className="text-gray-500">Name</p>
      <p>{session.user.name}</p>
      <p className="text-gray-500">Id</p>
      <p>{hideId(session.user.id)}</p>
    </div>
  );
}

export default AccountDetailsPage;
