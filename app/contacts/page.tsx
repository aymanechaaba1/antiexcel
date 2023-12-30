import ContactsList from '@/components/ContactsList';
import { Suspense } from 'react';
import LoadingContacts from '@/components/skeletons/LoadingContacts';
import ContactsPagination from '@/components/ContactsPagination';
import { caller } from '@/server';

async function ContactsPage({
  searchParams,
}: {
  searchParams?: {
    page?: string;
    per_page?: string;
  };
}) {
  const page = Number(searchParams?.page) || 1;
  const per_page = Number(searchParams?.per_page) || 5;
  const contacts = await caller.getContacts({
    page,
    per_page,
  });

  return (
    <>
      <Suspense key={page + per_page} fallback={<LoadingContacts />}>
        <ContactsList page={page} per_page={per_page} />
      </Suspense>
      <ContactsPagination
        results={contacts.length}
        page={page}
        per_page={per_page}
      />
    </>
  );
}

export default ContactsPage;
