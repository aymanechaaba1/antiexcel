'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import ShadcnSelectComponent from './ShadcnSelectComponent';

const relationships = ['mother', 'father', 'brother', 'sister'] as const;

function ContactsFilterBtns() {
  const [relationship, setRelationship] = useState<string>('');

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const newSearchParams = new URLSearchParams(searchParams);

    if (relationship) newSearchParams.set('relationship', relationship);

    router.replace(`${pathname}/?${newSearchParams.toString()}`);
  }, [relationship]);

  return (
    <div>
      <p className="tracking-tight font-semibold text-gray-500 mb-3 text-right">
        Filter By
      </p>
      <ShadcnSelectComponent
        onValueChange={setRelationship}
        defaultValue={relationship}
        options={relationships}
        placeholder="Relationship"
        label="Relationship"
      />
    </div>
  );
}

export default ContactsFilterBtns;
