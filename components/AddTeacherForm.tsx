'use client';

import { addTeacher } from '@/actions';
import { useEffect, useRef } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Label } from './ui/label';
import { useToast } from './ui/use-toast';
import { useRouter } from 'next/navigation';

const genders = ['Male', 'Female'] as const;
const subjects = ['Physics', 'Maths', 'French'] as const;

export type TeacherFormState = {
  ok: boolean;
  message: string;
  errors?: {
    gender?: string[] | undefined;
    email?: string[] | undefined;
    phone?: string[] | undefined;
    name?: string[] | undefined;
    subject?: string[] | undefined;
  };
};

const initState: TeacherFormState = {
  ok: false,
  message: '',
  errors: {
    email: undefined,
    phone: undefined,
    name: undefined,
    gender: undefined,
    subject: undefined,
  },
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" aria-disabled={pending}>
      {pending ? 'Submitting...' : 'Submit'}
    </Button>
  );
}

function AddTeacherForm() {
  const [state, formAction] = useFormState(addTeacher, initState);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (state?.message) {
      !state?.ok &&
        toast({
          title: state?.message,
          variant: 'destructive',
        });
      if (state?.ok) {
        toast({
          title: state.message,
        });
        formRef.current?.reset();
      }
    }
  }, [state]);

  return (
    <form
      ref={formRef}
      action={formAction}
      className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-5"
    >
      <Label htmlFor="email">Email</Label>
      <div>
        <Input
          name="email"
          className={cn({
            'border-red-500': state?.errors?.email,
          })}
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

      <Label htmlFor="subject">Subject</Label>
      <Select name="subject" defaultValue="physics">
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
      <div />
      <div className="flex justify-end">
        <SubmitButton />
      </div>
    </form>
  );
}

export default AddTeacherForm;
