'use client';

import React from 'react';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import NativeForm from './NativeForm';
import { Student } from '@/zod/schemas';

function EditSheet({
  id,
  defaultValues,
}: {
  id: string;
  defaultValues: Student;
}) {
  const [openSheet, setOpenSheet] = React.useState(false);

  return (
    <div className="flex justify-end">
      <Sheet open={openSheet} onOpenChange={setOpenSheet}>
        <SheetTrigger asChild>
          <Button variant="default" className="mt-5">
            Edit
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle></SheetTitle>
            <SheetDescription></SheetDescription>
          </SheetHeader>
          <NativeForm
            setOpenSheet={setOpenSheet}
            id={id}
            defaultValues={defaultValues}
          />
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default EditSheet;
