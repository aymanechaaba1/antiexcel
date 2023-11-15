import { fetchStudents, getAvatarName, upperFirst } from '@/lib/utils';
import Section from '../Section';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

async function LatestStudents() {
  const students = await fetchStudents();
  if (!students) return;

  const studentsSorted = students.sort(
    (a: any, b: any) => b.created_at - a.created_at
  );

  console.log(studentsSorted);

  return (
    <Section className="p-4 border rounded-lg" title="Latest Students">
      <div className="space-y-4 max-h-72 overflow-y-scroll">
        {studentsSorted.map((student) => (
          <div key={student.id} className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src={student.avatar} alt={student.firstname} />
              <AvatarFallback>
                {getAvatarName(student.firstname, student.lastname)}
              </AvatarFallback>
            </Avatar>
            <p>
              {student.firstname} {student.lastname}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}

export default LatestStudents;
