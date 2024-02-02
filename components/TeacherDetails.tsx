import { formatDate } from '@/lib/utils';
import { uncached_teacher } from '@/prisma/db-calls';
import StudentsList from './StudentsList';
import { notFound } from 'next/navigation';
import DeleteButton from './DeleteButton';
import { deleteTeacher } from '@/actions';
import Section from './Section';
import { dateOptions } from '@/lib/config';

async function TeacherDetails({ teacher_id }: { teacher_id: string }) {
  const teacher = await uncached_teacher(teacher_id);
  if (!teacher) notFound();

  return (
    <Section title={teacher.name}>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4 border p-5 rounded-lg">
        <p className="text-gray-500">Name</p>
        <p>{teacher.name}</p>
        <p className="text-gray-500">Email</p>
        <p>{teacher.email}</p>
        <p className="text-gray-500">Subject</p>
        <p>{teacher.subject}</p>
        <p className="text-gray-500">Phone</p>
        <p>{teacher.phone}</p>
        <p className="text-gray-500">Created At</p>
        <p>{formatDate(teacher.created_at!, 'en-US', dateOptions)}</p>
        <p className="text-gray-500">Last Update</p>
        <p>{formatDate(teacher.updated_at!, 'en-US', dateOptions)}</p>
      </div>
      <StudentsList students={teacher.students} />
      <DeleteButton
        id={teacher_id}
        action={deleteTeacher.bind(null, teacher_id)}
        label="Delete Teacher"
        redirectTo="/teachers"
      />
    </Section>
  );
}

export default TeacherDetails;
