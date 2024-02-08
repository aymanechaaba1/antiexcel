'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import ShadcnSelectComponent from './ShadcnSelectComponent';
import ResetFiltersBtn from './ResetFiltersBtn';

const relationships = ['mother', 'father', 'brother', 'sister'] as const;

function ContactsFilterBtns() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [relationship, setRelationship] = useState<string>(
    searchParams.get('relationship')?.toString() || ''
  );

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    if (relationship) params.set('relationship', relationship);
    else params.delete('relationship');

    router.replace(`${pathname}/?${params.toString()}`);
  }, [relationship]);

  return (
    <div>
      <p className="tracking-tight font-semibold text-gray-500 mb-3 text-right">
        Filter By
      </p>
      <ResetFiltersBtn
        onClick={() => {
          setRelationship('');
        }}
      />
      <ShadcnSelectComponent
        onValueChange={setRelationship}
        value={relationship}
        options={relationships}
        placeholder="Relationship"
        label="Relationship"
      />
    </div>
  );
}

export default ContactsFilterBtns;
