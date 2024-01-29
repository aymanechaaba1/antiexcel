import { upperFirst } from '@/lib/utils';
import { cached_contact } from '@/prisma/db-calls';
import Link from 'next/link';

async function StudentContactPage({
  params: { contact_id },
}: {
  params: { contact_id: string };
}) {
  const contact = await cached_contact(contact_id);
  if (!contact) return;

  return (
    <div className="flex flex-col md:flex-row gap-4">
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
            <div className="flex items-center gap-3">
              {contact.students.map((student) => (
                <Link
                  key={student.id}
                  href={`/students/${student.id}`}
                  className="underline"
                >
                  {student.firstname}
                </Link>
              ))}
            </div>
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
