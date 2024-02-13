'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import ShadcnSelectComponent from './ShadcnSelectComponent';
import ResetFiltersBtn from './ResetBtn';

const genders = ['male', 'female'] as const;
const subjects = ['physics', 'maths', 'french'] as const;

function TeachersFilterBtns() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [gender, setGender] = useState<string>(
    searchParams.get('gender')?.toString() || ''
  );
  const [subject, setSubject] = useState<string>(
    searchParams.get('subject')?.toString() || ''
  );

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    if (gender) params.set('gender', gender);
    else params.delete('gender');

    if (subject) params.set('subject', subject);
    else params.delete('subject');

    router.replace(`${pathname}?${params.toString()}`);
  }, [gender, subject]);

  return (
    <div>
      <p className="tracking-tight font-semibold text-gray-500 mb-3 text-right">
        Filter By
      </p>
      <ResetFiltersBtn
        onClick={() => {
          setGender('');
          setSubject('');
        }}
      />
      <div className="grid grid-cols-1 gap-y-3 md:grid-cols-2 md:gap-x-3">
        <ShadcnSelectComponent
          onValueChange={setGender}
          value={gender}
          options={genders}
          placeholder="Gender"
          label="Gender"
        />
        <ShadcnSelectComponent
          onValueChange={setSubject}
          value={subject}
          options={subjects}
          placeholder="Subject"
          label="Subject"
        />
      </div>
    </div>
  );
}

export default TeachersFilterBtns;
