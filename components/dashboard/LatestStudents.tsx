import { getAvatarName } from '@/lib/utils';
import Section from '../Section';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { serverClient } from '@/app/_trpc/serverClient';

async function LatestStudents({
  students,
}: {
  students: Awaited<ReturnType<(typeof serverClient)['getStudents']>>;
}) {
  const studentsSorted = students.sort(
    (a: any, b: any) => b.created_at - a.created_at
  );

  return (
    <Section className="p-4 border rounded-lg" title="Latest Students">
      <div className="space-y-4 max-h-72 overflow-y-scroll">
        {studentsSorted.map((student) => (
          <div key={student.id} className="flex items-center gap-4">
            <Avatar>
              <div className="rounded-full">
                <AvatarImage
                  src={student.avatar}
                  alt={student.firstname}
                  width={15}
                  height={15}
                  className="w-full object-cover"
                />
              </div>
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
