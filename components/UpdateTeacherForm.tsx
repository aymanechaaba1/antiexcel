'use client';

import { updateTeacher } from '@/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TeacherFormState } from './AddTeacherForm';
import { useEffect, useRef } from 'react';
import { notFound, useRouter } from 'next/navigation';
import { useFormState, useFormStatus } from 'react-dom';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { useToast } from './ui/use-toast';
import { cached_teacher } from '@/prisma/db-calls';
import { Label } from './ui/label';

const genders = ['Male', 'Female'] as const;
const subjects = ['Physics', 'Maths', 'French'] as const;

const initState: TeacherFormState = {
  ok: false,
  message: '',
  errors: {
    email: undefined,
    gender: undefined,
    name: undefined,
    phone: undefined,
    subject: undefined,
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

function UpdateTeacherForm({
  teacher,
}: {
  teacher: Awaited<ReturnType<typeof cached_teacher>>;
}) {
  const [state, formAction] = useFormState(updateTeacher, initState);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    if (state.message) {
      !state?.ok;
      toast({
        title: state?.message,
        variant: 'destructive',
      });
      if (state?.ok) {
        formRef.current?.reset();
        toast({
          title: state.message,
        });
        teacher && router.replace(`/teachers/${teacher.id}`);
      }
    }
  }, [state]);

  if (!teacher) notFound();

  return (
    <form ref={formRef} action={formAction} className="">
      <h2 className="tracking-tight text-2xl font-semibold scroll-m-20 mb-5">
        Update Teacher
      </h2>
      <input name="id" value={teacher.id} hidden />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-5">
        <Label htmlFor="email">Email</Label>
        <div>
          <Input
            name="email"
            className={cn({
              'border-red-500': state?.errors?.email,
            })}
            defaultValue={teacher.email}
          />
          {state?.errors?.email && (
            <p
              aria-live="polite"
              className="text-red-500 text-xs mt-2 sr-only"
              role="status"
            >
              {state?.errors?.email}
            </p>
          )}
        </div>

        <Label htmlFor="phone">Phone</Label>
        <div>
          <Input
            name="phone"
            className={cn({
              'border-red-500': state?.errors?.phone,
            })}
            defaultValue={teacher.phone!}
          />
          {state?.errors?.phone && (
            <p
              aria-live="polite"
              className="text-red-500 text-xs mt-2 sr-only"
              role="status"
            >
              {state?.errors?.phone}
            </p>
          )}
        </div>

        <Label htmlFor="name">Name</Label>
        <div>
          <Input
            name="name"
            className={cn({
              'border-red-500': state?.errors?.name,
            })}
            defaultValue={teacher.name}
          />
          {state?.errors?.name && (
            <p
              aria-live="polite"
              className="text-red-500 text-xs mt-2 sr-only"
              role="status"
            >
              {state?.errors?.name}
            </p>
          )}
        </div>

        <Label htmlFor="gender">Gender</Label>
        <div>
          <Select name="gender" defaultValue={teacher.gender}>
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

        <Label htmlFor="subject">Subject</Label>
        <div>
          <Select name="subject" defaultValue={teacher.subject}>
            <SelectTrigger>
              <SelectValue placeholder="Select subject" />
            </SelectTrigger>
            <SelectContent>
              {subjects.map((subject, i) => (
                <SelectItem key={i} value={subject.toLowerCase()}>
                  {subject}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {state?.errors?.subject && (
            <p
              aria-live="polite"
              className="text-red-500 text-xs mt-2 sr-only"
              role="status"
            >
              {state?.errors?.subject}
            </p>
          )}
        </div>
      </div>
      <div />
      <div className="flex justify-end mt-5">
        <SubmitButton />
      </div>
    </form>
  );
}

export default UpdateTeacherForm;
