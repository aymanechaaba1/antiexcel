'use client';

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { AlertDialogHeader } from '@/components/ui/alert-dialog';
import ContactForm from './ContactForm';
import { uncached_contact, updateContact } from '@/actions';
import { useState } from 'react';
import { Edit2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

function UpdateContactButton({ contact_id }: { contact_id: string }) {
  const [openForm, setOpenForm] = useState(false);

  const { data: contact, isLoading: loadingContact } = useQuery({
    queryFn: () => uncached_contact(contact_id),
    queryKey: [['contacts'], { contact_id }],
    cacheTime: 0,
    staleTime: Infinity,
  });

  console.log(contact);

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
          {
            <ContactForm
              contact={contact}
              loadingContact={loadingContact}
              action={updateContact}
              type="update"
              setOpenForm={setOpenForm}
            />
          }
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default UpdateContactButton;
