import ContactsList from '@/components/ContactsList';
import { Suspense } from 'react';
import LoadingContacts from '@/components/skeletons/LoadingContacts';
import ContactsPagination from '@/components/ContactsPagination';

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

  return (
    <>
      <Suspense key={page + per_page} fallback={<LoadingContacts />}>
        <ContactsList page={page} per_page={per_page} />
      </Suspense>
      <ContactsPagination page={page} per_page={per_page} />
    </>
  );
}

export default ContactsPage;
