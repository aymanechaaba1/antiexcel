import { formatDate } from '@/lib/utils';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { cached_student } from '@/prisma/db-calls';
import { deleteStudent } from '@/actions';
import { notFound } from 'next/navigation';
import DeleteButton from './DeleteButton';
import Section from './Section';

export const columns = [
  'Firstname',
  'Lastname',
  'Birthdate',
  'Gender',
  'Grade',
  'School',
  'Teacher',
];

async function StudentDetails({ student_id }: { student_id: string }) {
  const student = await cached_student(student_id);
  if (!student) notFound();

  return (
    <Section title={`${student.firstname} ${student.lastname}`}>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 my-5 gap-x-10 gap-y-4 border p-5 rounded-lg">
        <p className="text-gray-500">Firstname</p>
        <p>{student.firstname}</p>
        <p className="text-gray-500">Lastname</p>
        <p>{student.lastname}</p>
        <p className="text-gray-500">Birthdate</p>
        <p>
          {formatDate(new Date(student.birthdate), 'en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })}
        </p>
        <p className="text-gray-500">Gender</p>
        <p>{student.gender}</p>
        <p className="text-gray-500">Grade</p>
        <p>{student.grade}</p>
        <p className="text-gray-500">School</p>
        <p>{student.school}</p>
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

        {student.contact && (
          <>
            <p className="text-gray-500">Contact</p>
            <Link
              prefetch={false}
              href={`/contacts/${student.contact.id}`}
              className="text-blue-500 flex items-center gap-2"
            >
              <span>{student.contact.name}</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </>
        )}
      </div>
      <DeleteButton
        id={student_id}
        action={deleteStudent.bind(null, student_id)}
        label="Delete Student"
        redirectTo="/students"
      />
    </Section>
  );
}

export default StudentDetails;
