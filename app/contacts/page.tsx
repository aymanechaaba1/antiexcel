import ContactsList, {
  ContactsSortOptions,
  columns,
} from '@/components/ContactsTable';
import { Suspense } from 'react';
import AddContactButton from '@/components/AddContactButton';
import Section from '@/components/Section';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallBack from '@/components/ErrorFallBack';
import { DEFAULT_PAGE, DEFAULT_PER_PAGE, DEFAULT_SORT_BY } from '@/lib/config';
import ContactsFilterBtns from '@/components/ContactsFilterBtns';
import SearchBar from '@/components/SearchBar';
import SortBtn from '@/components/SortBtn';

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

type Relationship = 'mother' | 'father' | 'brother' | 'sister';
const contactsSortOptions = ['latest', 'oldest'] as const;

async function ContactsPage({
  searchParams: { page, per_page, sort_by, relationship, query },
}: {
  searchParams: {
    page: string;
    per_page: string;
    sort_by: ContactsSortOptions;
    relationship?: Relationship;
    query?: string;
  };
}) {
  return (
    <div className="space-y-4">
      <AddContactButton />
      <div className="flex justify-end">
        <SortBtn sortOptions={contactsSortOptions} />
      </div>
      <div className="flex justify-end gap-4 my-4">
        <ContactsFilterBtns />
      </div>
      <SearchBar />
      <ErrorBoundary FallbackComponent={ErrorFallBack}>
        <Suspense fallback={<ContactsTableSkeleton />}>
          <ContactsList
            page={+page || DEFAULT_PAGE}
            per_page={+per_page || DEFAULT_PER_PAGE}
            sort_by={sort_by || DEFAULT_SORT_BY}
            relationship={relationship}
            query={query}
          />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default ContactsPage;
