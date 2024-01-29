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
import { updateContact } from '@/actions';
import { useState } from 'react';
import { Edit2 } from 'lucide-react';
import { trpc } from '@/server/trpc';

function UpdateContactButton({ contact_id }: { contact_id: string }) {
  const [openForm, setOpenForm] = useState(false);

  const { data: contact } = trpc.getContact.useQuery({
    id: contact_id,
  });

  return (
    <div className="flex justify-end">
      <Dialog open={openForm} onOpenChange={setOpenForm}>
        <DialogTrigger asChild>
          <Edit2 size={18} className="cursor-pointer" />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <AlertDialogHeader>
            <DialogTitle>Update Contact</DialogTitle>
          </AlertDialogHeader>
          <ContactForm
            contact={contact}
            action={updateContact}
            type="update"
            setOpenForm={setOpenForm}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default UpdateContactButton;
