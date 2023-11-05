import { fetchStudents, upperFirst } from '@/lib/utils';
import Section from '../Section';
import Image from 'next/image';
import { Button } from '../ui/button';
import { Mail } from 'lucide-react';

async function LatestStudents() {
  const students = await fetchStudents();
  if (!students) return;

  return (
    <Section className="p-4 border rounded-lg" title="Latest Students">
      <div className="space-y-4 max-h-72 overflow-y-scroll">
        {students.map((student) => (
          <div
            key={student.id}
            className="flex items-center justify-between gap-5"
          >
            <Image
              src={student.avatar}
              width={50}
              height={50}
              alt={student.firstname}
              className="rounded-full object-cover h-10 w-10"
            />
            <p className="flex-1">{`${upperFirst(
              student.firstname
            )} ${upperFirst(student.lastname)}`}</p>
            <div className="flex items-center gap-3">
              <Button variant={'secondary'} size={'icon'}>
                <Mail className="w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

export default LatestStudents;
