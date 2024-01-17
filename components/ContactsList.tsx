import Section from './Section';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { getAvatarName, upperFirst } from '@/lib/utils';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Separator } from './ui/separator';
import { caller } from '@/server';

async function ContactsList({
  page,
  per_page,
}: {
  page: number | 1;
  per_page: number | 5;
}) {
  const contacts = await caller.getContacts({
    page,
    per_page,
  });

  return (
    <Section title="Contacts List" className="min-h-screen">
      <div className="space-y-4">
        <div className="grid grid-cols-4 md:grid-cols-6">
          <p className="font-bold text-gray-500">Avatar</p>
          <p className="font-bold text-gray-500">Name</p>
          <p className="font-bold text-gray-500 hidden md:grid">Email</p>
          <p className="font-bold text-gray-500 hidden md:grid text-right">
            Phone
          </p>
          <p className="font-bold text-gray-500 text-right">Relationship</p>
          <p className="justify-self-end font-bold text-gray-500">Students</p>
        </div>
        {contacts.map((contact) => (
          <>
            <div key={contact.id} className="grid grid-cols-4 md:grid-cols-6">
              <Avatar>
                <AvatarFallback>{getAvatarName(contact.name)}</AvatarFallback>
              </Avatar>
              <p>{contact.name}</p>
              <p className="hidden md:grid">{contact.email}</p>
              <p className="hidden md:grid text-right">{contact.phone}</p>
              <p className="text-right">{upperFirst(contact.relationship)}</p>
              {contact.students && contact.students.length !== 0 ? (
                <div className="space-y-2 justify-self-end">
                  {contact.students.map((student) => (
                    <Link
                      key={student.id}
                      href={`/students/${student.id}`}
                      className="text-blue-500 flex items-center gap-2"
                    >
                      <span>{student.firstname}</span>
                      <ArrowRight size={14} />
                    </Link>
                  ))}
                </div>
              ) : (
                <div />
              )}
            </div>
            <Separator />
          </>
        ))}
      </div>
    </Section>
  );
}

export default ContactsList;
