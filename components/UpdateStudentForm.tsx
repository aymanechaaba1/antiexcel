'use client';

import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { updateStudent } from '@/actions';
import { notFound, useRouter } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { StudentFormState } from './AddStudentForm';
import { useFormState, useFormStatus } from 'react-dom';
import { useEffect, useRef } from 'react';
import { cn, isoToString } from '@/lib/utils';
import { useToast } from './ui/use-toast';
import { cached_student } from '@/prisma/db-calls';
import { trpc } from '@/server/trpc';
import { Loader2 } from 'lucide-react';

const genders = ['Male', 'Female'] as const;
const schools = [
  'chkail',
  'henri_matisse',
  'le_bougeoir',
  'diwan',
  'wlad_slama',
  'al_wahda',
] as const;

const initState: StudentFormState = {
  ok: false,
  message: '',
  errors: {
    firstname: undefined,
    lastname: undefined,
    birthdate: undefined,
    gender: undefined,
    grade: undefined,
    school: undefined,
  },
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" aria-disabled={pending}>
      {pending ? 'Saving Changes...' : 'Save Changes'}
    </Button>
  );
}

function UpdateStudentForm({
  student,
}: {
  student: Awaited<ReturnType<typeof cached_student>>;
}) {
  const [state, formAction] = useFormState(updateStudent, initState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const { data: teachers, isLoading: loadingTeachers } =
    trpc.getTeachers.useQuery();

  useEffect(() => {
    if (state.message) {
      !state?.ok &&
        toast({
          title: state.message,
          variant: 'destructive',
        });
      if (state?.ok) {
        formRef.current?.reset();
        router.replace(`/students`);
        toast({
          title: state.message,
        });
      }
    }
  }, [state]);

  if (!student) notFound();

  return (
    <form action={formAction} className="">
      <input name="id" id="id" value={student.id} hidden />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-5">
        <Label htmlFor="firstname" className="text-gray-500">
          Firstname
        </Label>
        <div>
          <Input
            name="firstname"
            defaultValue={student.firstname}
            type="text"
            className={cn({
              'border-red-500': state.errors?.firstname,
            })}
          />
          {state.errors?.firstname && (
            <p
              aria-live="polite"
              className="text-red-500 text-xs mt-2 sr-only"
              role="status"
            >
              {state.errors?.firstname}
            </p>
          )}
        </div>

        <Label htmlFor="lastname" className="text-gray-500">
          Lastname
        </Label>
        <div>
          <Input
            name="lastname"
            defaultValue={student.lastname}
            type="text"
            className={cn({
              'border-red-500': state.errors?.lastname,
            })}
          />
          {state.errors?.lastname && (
            <p
              aria-live="polite"
              className="text-red-500 text-xs mt-2 sr-only"
              role="status"
            >
              {state.errors?.lastname}
            </p>
          )}
        </div>

        <Label htmlFor="birthdate" className="text-gray-500">
          Date of Birth
        </Label>
        <div>
          <Input
            name="birthdate"
            type="date"
            id="birthdate"
            className={cn({
              'border-red-500': state?.errors?.birthdate,
            })}
            defaultValue={isoToString(student.birthdate)}
          />
          {state?.errors?.birthdate && (
            <p
              aria-live="polite"
              className="text-red-500 text-xs mt-2"
              role="status"
            >
              {state?.errors?.birthdate}
            </p>
          )}
        </div>

        <Label htmlFor="gender" className="text-gray-500">
          Gender
        </Label>
        <div>
          <Select name="gender" defaultValue={student.gender}>
            <SelectTrigger
              className={cn('w-full', {
                'border-red-500': state?.errors?.gender,
              })}
            >
              <SelectValue placeholder="Gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Gender</SelectLabel>
                {genders.map((gender, i) => (
                  <SelectItem key={i} value={gender.toLowerCase()}>
                    {gender}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {state?.errors?.gender && (
            <p
              aria-live="polite"
              className="text-red-500 text-xs mt-2 sr-only"
              role="status"
            >
              {state?.errors?.gender}
            </p>
          )}
        </div>

        <Label htmlFor="grade" className="text-gray-500">
          Grade
        </Label>
        <div>
          <Input
            type="number"
            name="grade"
            min={1}
            max={6}
            placeholder="Grade"
            defaultValue={student.grade}
            className={cn({
              'border-red-500': state?.errors?.gender,
            })}
          />
          {state?.errors?.grade && (
            <p
              aria-live="polite"
              className="text-red-500 text-xs mt-2 sr-only"
              role="status"
            >
              {state?.errors?.grade}
            </p>
          )}
        </div>

        <Label htmlFor="school" className="text-gray-500">
          School
        </Label>
        <div>
          <Select name="school" defaultValue={student.school}>
            <SelectTrigger
              className={cn({
                'border-red-500': state?.errors?.gender,
              })}
            >
              <SelectValue placeholder="School" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>School</SelectLabel>
                {schools.map((school, i) => (
                  <SelectItem key={i} value={school.toLowerCase()}>
                    {school}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {state?.errors?.school && (
            <p
              aria-live="polite"
              className="text-red-500 text-xs mt-2 sr-only"
              role="status"
            >
              {state?.errors?.school}
            </p>
          )}
        </div>
        <Label htmlFor="teacher" className="text-gray-500">
          Teacher
        </Label>
        {loadingTeachers && <Loader2 className="animate-spin" size={18} />}
        {teachers && teachers.length > 0 && (
          <>
            <Select name="teacher" defaultValue={teachers[0].id}>
              <SelectTrigger>
                <SelectValue placeholder="Select teacher" />
              </SelectTrigger>
              <SelectContent>
                {teachers.map((teacher) => (
                  <SelectItem key={teacher.id} value={teacher.id}>
                    {teacher.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </>
        )}
      </div>
      <div className="mt-5 md:flex md:justify-end">
        <SubmitButton />
      </div>
    </form>
  );
}

export default UpdateStudentForm;
