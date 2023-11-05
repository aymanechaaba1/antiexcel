import { formatDate, formatSchool, upperFirst } from '@/lib/utils';
import Image from 'next/image';

import EditSheet from '@/components/EditSheet';
import { serverClient } from '@/app/_trpc/serverClient';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import AddContactForm from '@/components/AddContact';

async function StudentPage({
  params: { student_id },
}: {
  params: { student_id: string };
}) {
  const student = await serverClient.getStudent({
    id: student_id,
  });

  if (!student) return;

  const defaultValues = {
    ...student,
    birthdate: student.birthdate.toDateString(),
    created_at: student.created_at?.toDateString(),
    updated_at: student.updated_at?.toDateString(),
  };

  return (
    <>
      <EditSheet id={student_id} defaultValues={defaultValues} />
      <div className="py-4 flex flex-col md:flex-row items-start gap-10">
        <Image
          src={student.avatar}
          alt={student.firstname}
          width={200}
          height={200}
          className="rounded-lg"
        />
        <div className="grid grid-cols-2 gap-x-10 gap-y-4">
          <p className="text-gray-500">Firstname</p>
          <p>{upperFirst(student.firstname)}</p>
          <p className="text-gray-500">Lastname</p>
          <p>{upperFirst(student.lastname)}</p>
          <p className="text-gray-500">Birthdate</p>
          <p>{student.birthdate.toDateString()}</p>
          <p className="text-gray-500">Gender</p>
          <p>{upperFirst(student.gender)}</p>
          <p className="text-gray-500">Grade</p>
          <p>{student.grade}</p>
          <p className="text-gray-500">School</p>
          <p>{formatSchool(student.school)}</p>
          <p className="text-gray-500">Created At</p>
          <p>{student.created_at?.toDateString()}</p>
          <p className="text-gray-500">Last Update</p>
          <p>
            {formatDate(student.updated_at!, 'en-US', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
              minute: '2-digit',
              hour: '2-digit',
            })}
          </p>
          <p className="text-gray-500">Contact</p>
          {student.contact ? (
            <Link prefetch={false} href={`/contact/${student.contact.id}`}>
              {student.contact.name}
            </Link>
          ) : (
            <AddContactForm />
          )}
        </div>
      </div>
    </>
  );
}

export default StudentPage;
