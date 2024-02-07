'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import ShadcnSelectComponent from './ShadcnSelectComponent';
import { getTeacherIds } from '@/prisma/db-calls';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from './ui/select';

const grades = ['1', '2', '3', '4', '5', '6'] as const;
type Grade = '1' | '2' | '3' | '4' | '5' | '6';

const genders = ['male', 'female'] as const;
type Gender = 'male' | 'female';

const schools = [
  'chkail',
  'henri_matisse',
  'le_bougeoir',
  'diwan',
  'wlad_slama',
  'al_wahda',
] as const;
type School =
  | 'chkail'
  | 'henri_matisse'
  | 'le_bougeoir'
  | 'diwan'
  | 'wlad_slama'
  | 'al_wahda';

function StudentsFilterBtns({
  teachers,
}: {
  teachers: Awaited<ReturnType<typeof getTeacherIds>>;
}) {
  const [grade, setGrade] = useState<string | ''>('');
  const [gender, setGender] = useState<string | ''>('');
  const [school, setSchool] = useState<string | ''>('');
  const [teacher, setTeacher] = useState<string | ''>('');

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const page = searchParams.get('page');
    const per_page = searchParams.get('per_page');

    const newSearchParams = new URLSearchParams(searchParams);

    if (grade) newSearchParams.set('grade', grade);
    if (gender) newSearchParams.set('gender', gender);
    if (school) newSearchParams.set('school', school);
    if (teacher) newSearchParams.set('teacher', teacher);

    router.replace(`${pathname}/?${newSearchParams.toString()}`);
  }, [grade, gender, school, teacher]);

  return (
    <div>
      <p className="tracking-tight font-semibold text-gray-500 mb-3 text-right">
        Filter By
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-2">
        <ShadcnSelectComponent
          onValueChange={setGrade}
          defaultValue=""
          options={grades}
          placeholder="Grade"
          label="Grade"
        />
        <ShadcnSelectComponent
          onValueChange={setGender}
          defaultValue=""
          options={genders}
          placeholder="Gender"
          label="Gender"
        />
        <ShadcnSelectComponent
          onValueChange={setSchool}
          defaultValue=""
          options={schools}
          placeholder="School"
          label="School"
        />
        <Select onValueChange={setTeacher} defaultValue={''}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={'Teacher'} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Teacher</SelectLabel>
              {teachers.map((teacher, i) => (
                <SelectItem key={i} value={teacher.id}>
                  {teacher.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

export default StudentsFilterBtns;
