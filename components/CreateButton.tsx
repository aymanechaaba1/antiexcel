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
} from 'firebase/storage';
import { formSchema } from '@/zod/schemas';
import { useSubscriptionsStore } from '@/store/store';
import { useToast } from './ui/use-toast';
import { ToastAction } from './ui/toast';
import Link from 'next/link';

function CreateButton() {
  const utils = trpc.useContext();

  const [open, setOpen] = useState(false);
  const [studentAvatar, setStudentAvatar] = useState('');
  const [contactAvatar, setContactAvatar] = useState('');
  const [progress, setProgress] = useState(0);

  const { data: session } = useSession();

  const { subscription } = useSubscriptionsStore((state) => state);

  if (!session) return;
  const { data: user } = trpc.getUser.useQuery({
    id: session.user.id,
  });

  const { data: teachers } = trpc.getTeachers.useQuery();

  const addStudent = trpc.addStudent.useMutation({
    onSuccess: () => {
      utils.getStudents.invalidate();
    },
  });

  const { toast } = useToast();

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
      const fileName = getFilename(values.contact_avatar.name);

      const uploadTask = getUploadTask(
        `contacts/${fileName}`,
        values.contact_avatar
      );

      const onSnapshot = (snapshot: UploadTaskSnapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      };

      const onError = (error: StorageError) => {
        // Handle unsuccessful uploads
        console.error(`Upload was unsuccessful. ${error.message}`);
      };

      const onSuccess = async () => {
        // Handle successful uploads on complete
        // For instance, get the download URL:
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        setContactAvatar(downloadURL);

        // mutate or console log values
        console.log(studentAvatar, contactAvatar);
      };

      uploadFile(fileName, values.avatar, onSnapshot, onError, onSuccess);
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
