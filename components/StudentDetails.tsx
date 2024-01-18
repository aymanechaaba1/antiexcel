import { formatDate, formatSchool, upperFirst } from '@/lib/utils';
import Link from 'next/link';
import AddContactForm from './AddContact';
import { ArrowUpRight } from 'lucide-react';
import { trpc } from '@/server/trpc';

async function StudentDetails({ student_id }: { student_id: string }) {
  const { data: student } = trpc.getStudent.useQuery({
    student_id,
  });

  if (student)
    return (
      <div className="py-4 flex flex-col md:flex-row items-start gap-10">
        <div className="grid grid-cols-2 gap-x-10 gap-y-4 border p-5 rounded-lg">
          <p className="text-gray-500">Firstname</p>
          <p>{upperFirst(student.firstname)}</p>
          <p className="text-gray-500">Lastname</p>
          <p>{upperFirst(student.lastname)}</p>
          <p className="text-gray-500">Birthdate</p>
          <p>
            {formatDate(new Date(student.birthdate), 'en-US', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })}
          </p>
          <p className="text-gray-500">Gender</p>
          <p>{upperFirst(student.gender)}</p>
          <p className="text-gray-500">Grade</p>
          <p>{student.grade}</p>
          <p className="text-gray-500">School</p>
          <p>{formatSchool(student.school)}</p>
          <p className="text-gray-500">Teacher</p>
          <Link
            href={`/teachers/${student.teacher_id}`}
            className="text-blue-500 flex items-center gap-2"
          >
            <span>
              {student.teacher?.gender === 'female' ? 'Ms ' : 'Mr '}
              {student.teacher?.name}
            </span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
          <p className="text-gray-500">Created At</p>
          <p>
            {new Intl.DateTimeFormat('en-US', {
              month: 'short',
              day: '2-digit',
              year: 'numeric',
            }).format(new Date(student.created_at!))}
          </p>
          <p className="text-gray-500">Last Update</p>
          <p>
            {new Intl.DateTimeFormat('en-US', {
              month: 'short',
              day: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            }).format(new Date(student.updated_at!))}
          </p>
          <p className="text-gray-500">Contact</p>
          {student.contact ? (
            <Link
              prefetch={false}
              href={`/contacts/${student.contact.id}`}
              className="text-blue-500 flex items-center gap-2"
            >
              <span>{student.contact.name}</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          ) : (
            <AddContactForm student_id={student.id} />
          )}
        </div>
      </div>
    );
}

export default StudentDetails;
