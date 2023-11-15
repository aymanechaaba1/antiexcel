import { serverClient } from '@/app/_trpc/serverClient';
import { Student } from '@/zod/schemas';
import Section from './Section';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { getAvatarName } from '@/lib/utils';

function TeacherStudents({ students }: { students: Student[] }) {
  return (
    <Section title="Students" className="p-4 rounded-lg border my-5">
      <div className="space-y-4">
        {students.map((student) => (
          <div key={student.id} className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src={student.avatar} alt={student.firstname} />
              <AvatarFallback>
                {getAvatarName(student.firstname, student.lastname)}
              </AvatarFallback>
            </Avatar>
            <p>{`${student.firstname} ${student.lastname}`}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

export default TeacherStudents;
