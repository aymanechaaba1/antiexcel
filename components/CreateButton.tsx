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
import { getFilename, getUploadTask, uploadFile } from '@/lib/utils';
import {
  StorageError,
  UploadTaskSnapshot,
  getDownloadURL,
} from 'firebase/storage';
import { formSchema } from '@/zod/schemas';

function CreateButton() {
  const [open, setOpen] = useState(false);
  const [_, setDownloadUrl] = useState('');
  const [progress, setProgress] = useState(0);

  const { data: session } = useSession();
  if (!session) return;

  const addStudent = trpc.addStudent.useMutation();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const fileName = getFilename(values.avatar.name);

    const uploadTask = getUploadTask(`avatars/${fileName}`, values.avatar);

    const onSnapshot = (snapshot: UploadTaskSnapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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
      setDownloadUrl(downloadURL);

      addStudent.mutate({
        ...values,
        birthdate: values.birthdate,
        avatar: downloadURL,
        user_id: session.user.id,
      });

      setOpen(false);
    };

    uploadFile(fileName, values.avatar, onSnapshot, onError, onSuccess);
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
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateButton;
