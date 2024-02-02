'use client';

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { AlertDialogHeader } from '@/components/ui/alert-dialog';
import { Button } from './ui/button';
import ContactForm from './ContactForm';
import { addContact } from '@/actions';
import { useState } from 'react';

function AddContactButton() {
  const [openForm, setOpenForm] = useState(false);

  return (
    <div className="flex justify-end">
      <Dialog open={openForm} onOpenChange={setOpenForm}>
        <DialogTrigger asChild>
          <Button>Add Contact</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <AlertDialogHeader>
            <DialogTitle>Add Contact</DialogTitle>
          </AlertDialogHeader>
          <ContactForm
            action={addContact}
            type="add"
            setOpenForm={setOpenForm}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddContactButton;
