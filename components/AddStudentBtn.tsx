'use client';

import { useSubscriptionsStore } from '@/store/store';
import { Button } from './ui/button';
import Link from 'next/link';
import { countStudents } from '@/prisma/db-calls';
import { useToast } from './ui/use-toast';
import { useRouter } from 'next/navigation';

function AddStudentBtn({
  totalStudents,
}: {
  totalStudents: Awaited<ReturnType<typeof countStudents>>;
}) {
  const subscription = useSubscriptionsStore((state) => state.subscription);
  const { toast } = useToast();
  const router = useRouter();

  return (
    <Button
      onClick={() => {
        if (totalStudents === 3 && !subscription) {
          toast({
            title: "You can't create more than 3 students",
            description: 'Upgrade to Become Unlimited',
            variant: 'destructive',
          });
        } else router.push(`/students/add`);
      }}
    >
      Add Student
    </Button>
  );
}

export default AddStudentBtn;
