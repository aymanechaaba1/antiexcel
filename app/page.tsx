import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log(session);

  // add

  // edit

  // get

  // delete

  return <></>;
}
