import {
  formatDate,
  formatSchool,
  getAvatarName,
  upperFirst,
} from '@/lib/utils';
import Image from 'next/image';

import EditSheet from '@/components/EditSheet';
import { serverClient } from '@/app/_trpc/serverClient';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import AddContactForm from '@/components/AddContact';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { AvatarFallback } from '@radix-ui/react-avatar';

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
          className="rounded-lg w-96 h-96 object-cover"
          priority={true}
        />
        <div className="grid grid-cols-2 gap-x-10 gap-y-4 border p-5 rounded-lg">
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
          <p>
            {new Intl.DateTimeFormat('en-US', {
              month: 'short',
              day: '2-digit',
              year: 'numeric',
            }).format(student.created_at!)}
          </p>
          <p className="text-gray-500">Last Update</p>
          <p>
            {new Intl.DateTimeFormat('en-US', {
              month: 'short',
              day: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            }).format(student.updated_at!)}
          </p>
          <p className="text-gray-500">Contact</p>
          {student.contact ? (
            <Link prefetch={false} href={`/contact/${student.contact.id}`}>
              {student.contact.name}
            </Link>
          ) : (
            <AddContactForm student_id={student_id} />
          )}
        </div>
      </div>
    </>
  );
}

export default StudentPage;
