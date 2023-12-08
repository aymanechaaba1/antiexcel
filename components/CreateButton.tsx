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

import { trpc } from '@/app/_trpc/client';
import { z } from 'zod';
import { useSession } from 'next-auth/react';
import {
  getFilename,
  getUploadTask,
  uploadContactAvatar,
  uploadFile,
} from '@/lib/utils';
import {
  StorageError,
  UploadTaskSnapshot,
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from 'firebase/storage';
import { formSchema } from '@/zod/schemas';
import { useSubscriptionsStore } from '@/store/store';
import { useToast } from './ui/use-toast';
import { ToastAction } from './ui/toast';
import Link from 'next/link';
import { storage } from '@/lib/firebase';
import { Session } from 'next-auth';
import { serverClient } from '@/app/_trpc/serverClient';

function CreateButton({
  user,
  teachers,
}: {
  user: Awaited<ReturnType<(typeof serverClient)['getUser']>>;
  teachers: Awaited<ReturnType<(typeof serverClient)['getTeachers']>>;
}) {
  const utils = trpc.useContext();
  const { toast } = useToast();

  const [open, setOpen] = useState(false);
  const [studentAvatar, setStudentAvatar] = useState('');
  const [progress, setProgress] = useState(0);

  const { subscription } = useSubscriptionsStore((state) => state);

  const addStudent = trpc.addStudent.useMutation({
    onSuccess: () => {
      utils.getStudents.invalidate();
      return toast({
        title: 'Student uploaded successfully.',
      });
    },
    onMutate: () => {
      return toast({
        title: `Adding student...`,
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

    if (values.contact_avatar) {
      // upload file
      const storageRef = ref(storage);
      const imagesRef = ref(storage, 'images');
      const imageRef = ref(storage, `images/${values.contact_avatar.name}`);

      const uploadTask = uploadBytesResumable(imageRef, values.contact_avatar);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
        },
        (error) => {
          return toast({
            title: 'Upload was unsuccessful.',
            description: `${error.message}`,
          });
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            toast({
              title: 'Image uploaded successfuly.',
              description: `Url: ${downloadURL}`,
            });
            addStudent.mutate({
              ...values,
              birthdate: values.birthdate.toISOString(),
              avatar: studentAvatar,
              contact: {
                email: values.contact_email,
                phone: values.contact_phone,
                name: values.contact_name,
                relationship: values.contact_relationship,
                avatar: downloadURL,
              },
            });
          });
          setOpen(false);
          setProgress(0);
        }
      );
    }
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
            progress={progress}
            setProgress={setProgress}
            setStudentAvatar={setStudentAvatar}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateButton;
