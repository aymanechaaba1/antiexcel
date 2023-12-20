'use client';

import React, { useRef, useState } from 'react';
import { PickerDate } from './PickerDate';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { SelectDemo } from './SelectDemo';
import { ComboboxDemo } from './ComboBoxDemo';
import { Button } from './ui/button';
import { getFilename, getUploadTask, uploadFile } from '@/lib/utils';
import ProgressBar from './ProgressBar';
import {
  StorageError,
  UploadTaskSnapshot,
  getDownloadURL,
} from 'firebase/storage';
import { updateStudent } from '@/actions';
import { useToast } from './ui/use-toast';
import { caller } from '@/server';

function NativeForm({
  id,
  defaultValues,
  setOpenSheet,
}: {
  id: string;
  defaultValues: Awaited<ReturnType<(typeof caller)['getStudent']>>;
  setOpenSheet: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const avatarInput = useRef<HTMLInputElement>(null);

  const { toast } = useToast();

  const [birthdate, setBirthdate] = React.useState<Date | undefined>(
    new Date(defaultValues!.birthdate)
  ); // birthdate

  const [progress, setProgress] = useState(0);
  const [open, setOpen] = React.useState(false);
  const [school, setSchool] = React.useState(defaultValues!.school); // school

  const updateStudentFn = async (
    formData: FormData,
    birthdate: Date,
    school: string,
    downloadUrl?: string
  ) => {
    await updateStudent({
      firstname: formData.get('firstname') as string,
      lastname: formData.get('lastname') as string,
      birthdate,
      gender: formData.get('gender') as string,
      grade: formData.get('grade') as string,
      school,
      avatar: downloadUrl!,
      id,
    });

    setOpen(false);

    // close sheet
    setOpenSheet(false);
    toast({
      title: 'Student was edited successfully.',
    });
  };

  return (
    <form
      action={async (formData: FormData) => {
        const avatar = formData.get('avatar') as File | Blob;

        if (!birthdate) return;

        // there is an avatar
        if (avatar.size) {
          // upload new avatar to firebase
          const fileName = getFilename(avatar.name);

          const uploadTask = getUploadTask(`avatars/${fileName}`, avatar);

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
            const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);

            // update student
            await updateStudent({
              firstname: formData.get('firstname') as string,
              lastname: formData.get('lastname') as string,
              birthdate,
              gender: formData.get('gender') as string,
              grade: formData.get('grade') as string,
              school,
              avatar: downloadUrl!,
              id,
            });

            setOpen(false);
            setOpenSheet(false);
            setProgress(0);
          };

          uploadFile(
            `avatars/${fileName}`,
            avatar,
            onSnapshot,
            onError,
            onSuccess
          );
        }

        // no avatar
        if (!avatar.size)
          // update student
          await updateStudentFn(formData, birthdate, school);
      }}
      className="space-y-5"
    >
      <div className="flex flex-col gap-3">
        <Label htmlFor="firstname">Firstname</Label>
        <Input
          defaultValue={defaultValues?.firstname}
          type="text"
          name="firstname"
        />
      </div>
      <div className="flex flex-col gap-3">
        <Label htmlFor="lastname">Lastname</Label>
        <Input
          defaultValue={defaultValues?.lastname}
          type="text"
          name="lastname"
        />
      </div>
      <div className="flex flex-col gap-3">
        <Label htmlFor="gender">Date of Birth</Label>
        <PickerDate date={birthdate} setDate={setBirthdate} />
      </div>
      <div className="flex flex-col gap-3">
        <Label htmlFor="gender">Gender</Label>
        <SelectDemo
          name="gender"
          placeholder="Select your gender"
          label="Gender"
          values={['Male', 'Female']}
          defaultValue={defaultValues?.gender}
        />
      </div>
      <div className="flex flex-col gap-3">
        <Label htmlFor="grade">Grade</Label>
        <Input
          type="number"
          name="grade"
          min={1}
          max={6}
          defaultValue={defaultValues?.grade}
        />
      </div>
      <div className="flex flex-col gap-3">
        <Label htmlFor="school">School</Label>
        <ComboboxDemo
          open={open}
          setOpen={setOpen}
          value={school}
          setValue={setSchool}
          defaultValue={defaultValues?.school}
        />
      </div>
      <div className="flex flex-col gap-3">
        <Label htmlFor="avatar">Avatar</Label>
        <Input
          ref={avatarInput}
          type="file"
          accept="image/png, image/jpeg"
          name="avatar"
        />
        <ProgressBar progress={progress} setProgress={setProgress} />
      </div>
      <Button type="submit">Save changes</Button>
    </form>
  );
}

export default NativeForm;
