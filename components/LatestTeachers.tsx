import { getServerSession } from 'next-auth';
import { Avatar, AvatarFallback } from './ui/avatar';
import { getAvatarName } from '@/lib/utils';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { cached_teachers, getTeachers } from '@/prisma/db-calls';

async function LatestTeachers({
  teachers,
}: {
  teachers: Awaited<ReturnType<typeof cached_teachers>>;
}) {
  // const { subscription } = useSubscriptionsStore((state) => state);

  // if (teachers && isPro)
  return (
    <div className="p-4 border rounded-lg flex-grow space-y-3">
      <h3 className="text-2xl tracking-tight font-semibold scroll-m-20">
        Latest Teachers
      </h3>
      <div className="space-y-4 max-h-72 overflow-y-scroll">
        {teachers?.map((teacher) => (
          <div key={teacher.id} className="flex items-center gap-4">
            <Avatar>
              <AvatarFallback>{getAvatarName(teacher.name)}</AvatarFallback>
            </Avatar>
            <p>{teacher.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LatestTeachers;
