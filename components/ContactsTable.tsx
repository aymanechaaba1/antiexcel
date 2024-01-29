import Section from './Section';
import { Avatar, AvatarFallback } from './ui/avatar';
import { getAvatarName, upperFirst } from '@/lib/utils';
import { Separator } from './ui/separator';
import { cached_contacts } from '@/prisma/db-calls';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import UpdateContactButton from './UpdateContactButton';

export const columns = ['Avatar', 'Name', 'Phone', 'Relationship'];

async function ContactsTable({
  page,
  per_page,
}: {
  page: number | 1;
  per_page: number | 5;
}) {
  const session = await getServerSession(authOptions);
  if (!session) return;

  const contacts = await cached_contacts(session.user.id);

  return (
    <Section title="Contacts" className="min-h-screen">
      <div className="space-y-4">
        <div className={'grid grid-cols-5'}>
          {columns.map((column, i) => (
            <p key={i} className="font-bold text-gray-500">
              {column}
            </p>
          ))}

          <div />
        </div>
        {contacts.map((contact) => (
          <>
            <div key={contact.id} className="grid grid-cols-5">
              <Avatar>
                <AvatarFallback>{getAvatarName(contact.name)}</AvatarFallback>
              </Avatar>
              <p>{contact.name}</p>
              <p className="">{contact.phone}</p>
              <p className="">{upperFirst(contact.relationship)}</p>
              <UpdateContactButton contact_id={contact.id} />
            </div>
            <Separator />
          </>
        ))}
      </div>
    </Section>
  );
}

export default ContactsTable;
