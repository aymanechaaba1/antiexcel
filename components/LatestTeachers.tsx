import { getServerSession } from 'next-auth';
import { Avatar, AvatarFallback } from './ui/avatar';
import { getAvatarName } from '@/lib/utils';
import { authOptions } from '@/lib/auth';
import { uncached_teachers } from '@/prisma/db-calls';

async function LatestTeachers() {
  // const { subscription } = useSubscriptionsStore((state) => state);
  const session = await getServerSession(authOptions);

  const teachers = await uncached_teachers();

  // if (teachers && isPro)
  if (teachers && teachers.length)
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
