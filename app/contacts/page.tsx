import ContactsList, { columns } from '@/components/ContactsTable';
import { Suspense } from 'react';
import AddContactButton from '@/components/AddContactButton';
import Section from '@/components/Section';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallBack from '@/components/ErrorFallBack';

function ContactsTableSkeleton() {
  const rows = 3;

  return (
    <Section title="Contacts">
      <div className="space-y-3 mt-5">
        <div className={`grid grid-cols-${columns.length} gap-x-4 gap-y-6`}>
          {columns.map((field, i) => (
            <p
              key={i}
              className="font-bold tracking-tight scroll-m-20 text-md text-gray-500"
            >
              {field}
            </p>
          ))}
          {Array.from({ length: rows }).map((_, i) => (
            <>
              <div key={i} className="w-10 h-10 rounded-full skeleton" />
              {Array.from({ length: columns.length - 1 }).map((_, i) => (
                <div key={i} className="w-full h-10 rounded-lg skeleton" />
              ))}
            </>
          ))}
        </div>
      </div>
    </Section>
  );
}

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
      <AddContactButton />
      <ErrorBoundary FallbackComponent={ErrorFallBack}>
        <Suspense key={page + per_page} fallback={<ContactsTableSkeleton />}>
          <ContactsList page={page} per_page={per_page} />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}

export default ContactsPage;
