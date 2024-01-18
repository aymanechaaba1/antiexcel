'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import RegistrationForm from './RegistrationForm';
import { useState } from 'react';

import { z } from 'zod';
import { formSchema } from '@/zod/schemas';
import { useSubscriptionsStore } from '@/store/store';
import { useToast } from './ui/use-toast';
import { ToastAction } from './ui/toast';
import Link from 'next/link';
import { trpc } from '@/server/trpc';

function CreateButton() {
  const { data: user } = trpc.getUser.useQuery();
  const { data: teachers } = trpc.getTeachers.useQuery();

  const utils = trpc.useUtils();
  const { toast } = useToast();

  const [open, setOpen] = useState(false);

  const { subscription } = useSubscriptionsStore((state) => state);

  const { mutate: addStudent } = trpc.student.add.useMutation({
    onSuccess: () => {
      utils.getStudents.invalidate();
      toast({
        title: 'Student uploaded successfully.',
      });
    },
    onMutate: () => {
      toast({
        title: `Adding student...`,
      });
    },
    onError: () => {
      toast({
        title: 'Failed to add student',
        variant: 'destructive',
      });
    },
  });

  const { mutate: addStudentToExistingContact } =
    trpc.student.addToExistingContact.useMutation({
      onSuccess: () => {
        utils.getStudents.invalidate();
        toast({
          title: 'Student uploaded successfully.',
        });
      },
      onMutate: () => {
        toast({
          title: `Adding student...`,
        });
      },
      onError: () => {
        toast({
          title: 'Student creation failed.',
          variant: 'destructive',
        });
      },
    });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // !subscription && user.students === 3 => return toast notification
    if (!subscription && user && user.students.length === 3) {
      return toast({
        title: 'Oops, You must be a PRO!',
        description: "You're limited to 3 students.",
        action: (
          <ToastAction
            className="bg-gray-900 hover:bg-gray-900 border"
            altText="Become a PRO!"
          >
            <Link href={`/#pricing`}>Become a PRO!</Link>
          </ToastAction>
        ),
        variant: 'destructive',
      });
    }

    if (!teachers || teachers.length === 0) {
      return toast({
        title: 'Please add at least one teacher.',
        action: (
          <ToastAction className="bg-gray-900" altText="Add a Teacher">
            <Link href={`/teachers`}></Link>
          </ToastAction>
        ),
        variant: 'destructive',
      });
    }

    if (values.contact_id !== 'none' && values.contact_id) {
      // connect to existing contact
      addStudentToExistingContact({
        ...values,
        birthdate: values.birthdate.toISOString(),
      });
      setOpen(false);
    }

    // invoke addStudent
  };

  return (
    <div className="flex justify-end">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="mt-5" variant="default">
            Create
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add student</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <RegistrationForm
            onSubmit={onSubmit}
            buttonLabel="Submit"
            open={open}
            setOpen={setOpen}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateButton;
