import { serverClient } from '@/app/_trpc/serverClient';
import { upperFirst } from '@/lib/utils';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

async function StudentContactPage({
  params: { contact_id },
}: {
  params: { contact_id: string };
}) {
  const contact = await serverClient.getContact({
    id: contact_id,
  });
  if (!contact) notFound();

  return (
    <div className="flex flex-col md:flex-row gap-4">
      {contact.avatar && (
        <div className="w-full md:w-1/2">
          <Image
            src={contact.avatar}
            width={200}
            height={200}
            alt={contact.name}
            className="w-full object-cover rounded-lg"
          />
        </div>
      )}
      <div className="space-y-4 w-full">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 border p-5 rounded-lg">
          <p className="text-gray-500">Name</p>
          <p>{upperFirst(contact.name)}</p>
          <p className="text-gray-500">Email</p>
          <p>{contact.email}</p>
          <p className="text-gray-500">Relationship</p>
          <p>{upperFirst(contact.relationship)}</p>
          <p className="text-gray-500">Phone</p>
          <p>{contact.phone}</p>
          <p className="text-gray-500">Email</p>
          <p>{contact.email}</p>
          <p className="text-gray-500">Students</p>
          <p className="text-blue-500 flex items-center gap-2">
            <span>
              {contact.students.map((student) => (
                <Link key={student.id} href={`/students/${student.id}`}>
                  {student.firstname}
                </Link>
              ))}
            </span>
            <ArrowUpRight className="w-4 h-4" />
          </p>
          <p className="text-gray-500">Created At</p>
          <p>
            {new Intl.DateTimeFormat('en-US', {
              month: 'short',
              day: '2-digit',
              year: 'numeric',
            }).format(new Date(contact.created_at!))}
          </p>
          <p className="text-gray-500">Last Update</p>
          <p>
            {new Intl.DateTimeFormat('en-US', {
              month: 'short',
              day: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            }).format(new Date(contact.updated_at!))}
          </p>
        </div>
      </div>
    </div>
  );
}

export default StudentContactPage;
