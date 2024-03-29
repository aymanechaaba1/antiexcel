import Section from './Section';
import { Avatar, AvatarFallback } from './ui/avatar';
import { cn, getAvatarName, upperFirst } from '@/lib/utils';
import { Separator } from './ui/separator';
import { cached_contacts } from '@/prisma/db-calls';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import UpdateContactButton from './UpdateContactButton';
import { redirect } from 'next/navigation';
import prisma from '@/prisma/prismaClient';
import DataPagination from './DataPagination';

export const columns = ['Avatar', 'Name', 'Phone', 'Relationship'] as const;

type Relationship = 'mother' | 'father' | 'brother' | 'sister';

export type ContactsSortOptions = 'latest' | 'oldest';
const contactsSortOptions = ['latest', 'oldest'] as const;

async function ContactsTable({
  page,
  per_page,
  sort_by,
  relationship,
  query,
  from,
  to,
}: {
  page: number;
  per_page: number;
  sort_by: ContactsSortOptions;
  relationship?: Relationship;
  query?: string;
  from?: number;
  to?: number;
}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect(`/api/auth/signin`);

  const [totalContacts, contacts] = await Promise.all([
    prisma.contact.count(),
    cached_contacts(
      session.user.id,
      page,
      per_page,
      sort_by,
      relationship,
      query,
      from,
      to
    ),
  ]);

  return (
    <div className="flex flex-col min-h-screen">
      <Section title="Contacts" className="flex-1">
        <div className="space-y-4">
          <div className={'grid grid-cols-5'}>
            {columns.map((column, i) => (
              <p
                key={i}
                className={cn('font-bold text-gray-500', {
                  'hidden md:block': column === 'Phone',
                })}
              >
                {column}
              </p>
            ))}

            <div />
          </div>
          {contacts.map((c) => (
            <>
              <div key={c.id} className="grid grid-cols-5">
                <Avatar>
                  <AvatarFallback>{getAvatarName(c.name)}</AvatarFallback>
                </Avatar>
                <p>{c.name}</p>
                <p className={'hidden md:block'}>{c.phone}</p>
                <p className="">{upperFirst(c.relationship)}</p>
                <UpdateContactButton contact_id={c.id} />
              </div>
              <Separator />
            </>
          ))}
        </div>
      </Section>
      <DataPagination totalResults={totalContacts} />
    </div>
  );
}

export default ContactsTable;
