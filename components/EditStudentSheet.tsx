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
import { trpc } from '@/server/trpc';

function EditStudentSheet({ student_id }: { student_id: string }) {
  const { data: student } = trpc.getStudent.useQuery({
    student_id,
  });

  const [openSheet, setOpenSheet] = React.useState(false);

  if (student)
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
            <NativeForm student_id={student_id} />
          </SheetContent>
        </Sheet>
      </div>
    );
}

export default EditStudentSheet;
