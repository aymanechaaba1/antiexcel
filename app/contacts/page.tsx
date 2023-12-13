import ContactsList from '@/components/ContactsList';
import { serverClient } from '../_trpc/serverClient';
import { Suspense } from 'react';
import LoadingContacts from '@/components/skeletons/LoadingContacts';

async function ContactsPage() {
  const contacts = await serverClient.getContacts();

  return (
    <>
      <Suspense fallback={<LoadingContacts />}>
        <ContactsList contacts={contacts} />
      </Suspense>
    </>
  );
}

export default ContactsPage;
