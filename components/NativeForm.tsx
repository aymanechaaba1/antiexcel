'use client';

import React, { useRef, useState } from 'react';
import { PickerDate } from './PickerDate';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { SelectDemo } from './SelectDemo';
import { ComboboxDemo } from './ComboBoxDemo';
import { Button } from './ui/button';
import { getFilename, uploadFile } from '@/lib/utils';
import ProgressBar from './ProgressBar';
import { getDownloadURL } from 'firebase/storage';
import { useSession } from 'next-auth/react';
import { updateStudent } from '@/actions';
import { Student } from '@/zod/schemas';

function NativeForm({
  id,
  defaultValues,
  setOpenSheet,
}: {
  id: string;
  defaultValues?: Student;
  setOpenSheet: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const avatarInput = useRef<HTMLInputElement>(null);

  const [birthdate, setBirthdate] = React.useState<Date>(); // birthdate

  const [progress, setProgress] = useState(0);

  const [open, setOpen] = React.useState(false);

  if (!defaultValues) return;
  const [school, setSchool] = React.useState(defaultValues.school); // school

  const { data: session } = useSession();
  if (!session) return;

  return (
    <form
      action={(formData: FormData) => {
        const avatar = formData.get('avatar') as File | Blob;
        if (!avatar) return;

        // upload new avatar to firebase
        const uploadTask = uploadFile(
          `avatars/${getFilename(avatar.name)}`,
          avatar
        );

        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress(progress);
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;
            }
          },
          (error) => {
            // Handle unsuccessful uploads
            console.error(`Upload was unsuccessful. ${error.message}`);
          },
          async () => {
            // Handle successful uploads on complete
            // For instance, get the download URL:
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

            if (!birthdate || !school) return;

            // update student
            await updateStudent({
              firstname: formData.get('firstname') as string,
              lastname: formData.get('lastname') as string,
              birthdate: birthdate.toISOString(),
              gender: formData.get('gender') as string,
              grade: formData.get('grade') as string,
              school,
              avatar: downloadURL,
              user_id: session.user.id,
              id,
            });

            setOpen(false);

            // close sheet
            setOpenSheet(false);
          }
        );
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
          onChange={(e) => {}}
        />
        <ProgressBar progress={progress} setProgress={setProgress} />
      </div>
      <Button type="submit">Save changes</Button>
    </form>
  );
}

export default NativeForm;
