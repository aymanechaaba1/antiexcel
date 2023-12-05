'use client';

import { serverClient } from '@/app/_trpc/serverClient';
import Section from './Section';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { getAvatarName } from '@/lib/utils';
import { Session } from 'next-auth';
import { useSubscriptionsStore } from '@/store/store';

function LatestTeachers({
  session,
  teachers,
}: {
  session: Session | null;
  teachers: Awaited<ReturnType<(typeof serverClient)['getTeachers']>>;
}) {
  const { subscription } = useSubscriptionsStore((state) => state);
  const isPro = session && subscription;

  const teachersSorted = teachers.sort(
    (a: any, b: any) => b.created_at - a?.created_at
  );

  if (teachers && isPro)
    return (
      <Section className="p-4 border rounded-lg" title="Latest Teachers">
        <div className="space-y-4 max-h-72 overflow-y-scroll">
          {teachersSorted.map((teacher) => (
            <div key={teacher.id} className="flex items-center gap-4">
              <Avatar>
                {teacher.avatar && (
                  <div className="rounded-full">
                    <AvatarImage
                      src={teacher.avatar}
                      alt={teacher.name}
                      width={15}
                      height={15}
                      className="w-full object-cover"
                    />
                  </div>
                )}
                <AvatarFallback>{getAvatarName(teacher.name)}</AvatarFallback>
              </Avatar>
              <p>{teacher.name}</p>
            </div>
          ))}
        </div>
      </Section>
    );
}

export default LatestTeachers;
