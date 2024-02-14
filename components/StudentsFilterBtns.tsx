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
import { Button } from './ui/button';
import { RotateCw } from 'lucide-react';
import ResetFiltersBtn from './ResetBtn';

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
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [grade, setGrade] = useState<string>(
    searchParams.get('grade')?.toString() || ''
  );
  const [gender, setGender] = useState<string>(
    searchParams.get('gender')?.toString() || ''
  );
  const [school, setSchool] = useState<string>(
    searchParams.get('school')?.toString() || ''
  );
  const [teacher, setTeacher] = useState<string>(
    searchParams.get('teacher')?.toString() || ''
  );

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    if (grade) params.set('grade', grade);
    else params.delete('grade');

    if (gender) params.set('gender', gender);
    else params.delete('gender');

    if (school) params.set('school', school);
    else params.delete('school');

    if (teacher) params.set('teacher', teacher);
    else params.delete('teacher');

    router.replace(`${pathname}?${params.toString()}`);
  }, [grade, gender, school, teacher]);

  return (
    <div>
      <p className="tracking-tight font-semibold text-gray-500 mb-3 text-right">
        Filter By
      </p>
      <ResetFiltersBtn
        onClick={() => {
          setGrade('');
          setGender('');
          setSchool('');
          setTeacher('');
        }}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-2">
        <ShadcnSelectComponent
          onValueChange={setGrade}
          value={grade}
          options={grades}
          placeholder="Grade"
          label="Grade"
        />
        <ShadcnSelectComponent
          onValueChange={setGender}
          value={gender}
          options={genders}
          placeholder="Gender"
          label="Gender"
        />
        <ShadcnSelectComponent
          onValueChange={setSchool}
          value={school}
          options={schools}
          placeholder="School"
          label="School"
        />
        <Select onValueChange={setTeacher} value={teacher}>
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
