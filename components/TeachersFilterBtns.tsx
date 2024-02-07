'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import ShadcnSelectComponent from './ShadcnSelectComponent';

const genders = ['male', 'female'] as const;
const subjects = ['physics', 'maths', 'french'] as const;

function TeachersFilterBtns() {
  const [gender, setGender] = useState<string>('');
  const [subject, setSubject] = useState<string>();

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const newSearchParams = new URLSearchParams();
    const page = searchParams.get('page');
    const per_page = searchParams.get('page');
    const sort_by = searchParams.get('sort_by');

    if (page) newSearchParams.set('page', page);
    if (per_page) newSearchParams.set('per_page', per_page);
    if (sort_by) newSearchParams.set('sort_by', sort_by);
    if (gender) newSearchParams.set('gender', gender);
    if (subject) newSearchParams.set('subject', subject);

    router.replace(`${pathname}/?${newSearchParams.toString()}`);
  }, [gender, subject]);

  return (
    <div>
      <p className="tracking-tight font-semibold text-gray-500 mb-3 text-right">
        Filter By
      </p>
      <div className="grid grid-cols-1 gap-y-3 md:grid-cols-2 md:gap-x-3">
        <ShadcnSelectComponent
          onValueChange={setGender}
          defaultValue={gender}
          options={genders}
          placeholder="Gender"
          label="Gender"
        />
        <ShadcnSelectComponent
          onValueChange={setSubject}
          defaultValue={subject}
          options={subjects}
          placeholder="Subject"
          label="Subject"
        />
      </div>
    </div>
  );
}

export default TeachersFilterBtns;
