import Section from './Section';
import { Avatar, AvatarFallback } from './ui/avatar';
import { getAvatarName, upperFirst } from '@/lib/utils';
import { Separator } from './ui/separator';
import { cached_contacts } from '@/prisma/db-calls';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import UpdateContactButton from './UpdateContactButton';
import { redirect } from 'next/navigation';
import prisma from '@/prisma/prismaClient';
import DataPagination from './DataPagination';

export const columns = ['Avatar', 'Name', 'Phone', 'Relationship'];

async function ContactsTable({
  page,
  per_page,
}: {
  page: number;
  per_page: number;
}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect(`/api/auth/signin`);

  const [totalContacts, contacts] = await Promise.all([
    prisma.contact.count(),
    cached_contacts(session.user.id, page, per_page),
  ]);

  return (
    <div className="flex flex-col min-h-screen">
      <Section title="Contacts" className="flex-1">
        <div className="space-y-4">
          <div className={'grid grid-cols-5'}>
            {columns.map((column, i) => (
              <p key={i} className="font-bold text-gray-500">
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
                <p className="">{c.phone}</p>
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
