import ContactsList from '@/components/ContactsList';
import { Suspense } from 'react';
import LoadingContacts from '@/components/skeletons/LoadingContacts';
import { caller } from '@/server';

async function ContactsPage() {
  const contacts = await caller.getContacts();

  return (
    <>
      <Suspense fallback={<LoadingContacts />}>
        <ContactsList contacts={contacts} />
      </Suspense>
    </>
  );
}

export default ContactsPage;
