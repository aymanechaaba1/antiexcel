'use client';

import { useSubscriptionsStore } from '@/store/store';
import { Button } from './ui/button';
import { useToast } from './ui/use-toast';
import { useRouter } from 'next/navigation';
import { countTeachers } from '@/prisma/db-calls';

function AddTeacherBtn({
  totalTeachers,
}: {
  totalTeachers: Awaited<ReturnType<typeof countTeachers>>;
}) {
  const subscription = useSubscriptionsStore((state) => state.subscription);
  const { toast } = useToast();
  const router = useRouter();

  return (
    <Button
      onClick={() => {
        if (totalTeachers === 3 && !subscription) {
          toast({
            title: "You can't create more than 3 teachers",
            description: 'Upgrade to Become Unlimited',
            variant: 'destructive',
          });
        } else router.push(`/teachers/add`);
      }}
    >
      Add Teacher
    </Button>
  );
}

export default AddTeacherBtn;
