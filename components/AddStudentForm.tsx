'use client';

import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from './ui/button';
import { useFormState, useFormStatus } from 'react-dom';
import { cn } from '@/lib/utils';
import { addStudent } from '@/actions';
import { useEffect, useRef } from 'react';
import { useToast } from './ui/use-toast';
import { Label } from './ui/label';
import { useRouter } from 'next/navigation';
import { uncached_teachers } from '@/prisma/db-calls';

const genders = ['Male', 'Female'] as const;
const schools = [
  'chkail',
  'henri_matisse',
  'le_bougeoir',
  'diwan',
  'wlad_slama',
  'al_wahda',
] as const;

export type StudentFormState = {
  ok: boolean;
  message: string;
  errors?: {
    firstname?: string[] | undefined;
    lastname?: string[] | undefined;
    gender?: string[] | undefined;
    grade?: string[] | undefined;
    birthdate?: string[] | undefined;
    school?: string[] | undefined;
  };
};

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
    <Button className="my-5" type="submit">
      {pending ? 'Submitting...' : 'Submit'}
    </Button>
  );
}

function AddStudentForm({
  teachers,
}: {
  teachers: Awaited<ReturnType<typeof uncached_teachers>>;
}) {
  const [state, formAction] = useFormState(addStudent, initState);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  const router = useRouter();

  useEffect(() => {
    if (state.message) {
      !state?.ok &&
        toast({
          title: state.message,
          variant: 'destructive',
        });
      if (state?.ok) {
        formRef.current?.reset();
        router.replace('/students');
        toast({
          title: state.message,
        });
      }
    }
  }, [state]);

  return (
    <form ref={formRef} action={formAction} className="">
      <h2 className="tracking-tight text-2xl font-semibold scroll-m-20 mb-5">
        Student
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-5">
        <Label htmlFor="firstname" className="text-gray-500">
          First Name
        </Label>
        <div>
          <Input
            name="firstname"
            className={cn({
              'border-red-500': state?.errors?.firstname,
            })}
          />
          {state?.errors?.firstname && (
            <p
              aria-live="polite"
              className="text-red-500 text-xs mt-2 sr-only"
              role="status"
            >
              {state?.errors?.firstname}
            </p>
          )}
        </div>

        <Label htmlFor="lastname" className="text-gray-500">
          Last Name
        </Label>
        <div>
          <Input
            name="lastname"
            className={cn({
              'border-red-500': state?.errors?.lastname,
            })}
          />
          {state?.errors?.lastname && (
            <p
              aria-live="polite"
              className="text-red-500 text-xs mt-2 sr-only"
              role="status"
            >
              {state?.errors?.lastname}
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
        <Select name="gender" defaultValue="male">
          <SelectTrigger>
            <SelectValue placeholder="Select gender" />
          </SelectTrigger>
          <SelectContent>
            {genders.map((gender, i) => (
              <SelectItem key={i} value={gender.toLowerCase()}>
                {gender}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Label htmlFor="grade" className="text-gray-500">
          Grade
        </Label>
        <Input name="grade" type="number" min={1} max={6} defaultValue={'1'} />

        <Label htmlFor="school" className="text-gray-500">
          School
        </Label>
        <Select name="school" defaultValue="chkail">
          <SelectTrigger>
            <SelectValue placeholder="Select school" />
          </SelectTrigger>
          <SelectContent>
            {schools.map((school, i) => (
              <SelectItem key={i} value={school.toLowerCase()}>
                {school}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Label htmlFor="teacher" className="text-gray-500">
          Teacher
        </Label>
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
      <div />
      <div className="flex justify-end">
        <SubmitButton />
      </div>
    </form>
  );
}

export default AddStudentForm;
