import ContactsList from '@/components/ContactsList';
import { serverClient } from '../_trpc/serverClient';

async function ContactsPage() {
  const contacts = await serverClient.getContacts();

  return (
    <>
      <ContactsList contacts={contacts} />
    </>
  );
}

export default ContactsPage;
