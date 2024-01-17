'use client';

import React, { useState } from 'react';
import { PickerDate } from './PickerDate';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { SelectDemo } from './SelectDemo';
import { ComboboxDemo } from './ComboBoxDemo';
import { Button } from './ui/button';
import { caller } from '@/server';

function NativeForm({
  defaultValues,
}: {
  id: string;
  defaultValues: Awaited<ReturnType<(typeof caller)['getStudent']>>;
  setOpenSheet: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [birthdate, setBirthdate] = React.useState<Date | undefined>(
    new Date(defaultValues!.birthdate)
  ); // birthdate

  const [progress, setProgress] = useState(0);
  const [open, setOpen] = React.useState(false);
  const [school, setSchool] = React.useState(defaultValues!.school); // school

  return (
    <form
      action={async (formData: FormData) => {
        console.log(Object.fromEntries(formData.entries()));
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
      <Button type="submit">Save changes</Button>
    </form>
  );
}

export default NativeForm;
