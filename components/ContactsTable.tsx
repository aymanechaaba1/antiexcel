import Section from './Section';
import { Avatar, AvatarFallback } from './ui/avatar';
import { getAvatarName, upperFirst } from '@/lib/utils';
import { Separator } from './ui/separator';
import UpdateContactButton from './UpdateContactButton';
import { cached_contacts } from '@/actions';

export const columns = ['Avatar', 'Name', 'Phone', 'Relationship'];

async function ContactsTable() {
  const contacts = await cached_contacts();

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
  );
}

export default ContactsTable;
