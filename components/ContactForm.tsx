'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { cached_contact, uncached_contact } from '@/prisma/db-calls';
import { addContact, updateContact } from '@/actions';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import { useToast } from './ui/use-toast';

const relationships = ['Mother', 'Father', 'Brother', 'Sister'] as const;

type ContactFormState = {
  ok: boolean;
  message: string;
  errors: {
    email: string[] | undefined;
    phone: string[] | undefined;
    name: string[] | undefined;
    relationship: string[] | undefined;
  };
};

const initState: ContactFormState = {
  ok: false,
  message: '',
  errors: {
    email: undefined,
    phone: undefined,
    name: undefined,
    relationship: undefined,
  },
};

function SubmitButton({ type }: { type: 'add' | 'update' }) {
  const { pending } = useFormStatus();
  return (
    <Button className="my-5" type="submit" aria-disabled={pending}>
      {type === 'add' && pending && 'Submitting...'}
      {type === 'add' && !pending && 'Submit'}
      {type === 'update' && pending && 'Saving Changes...'}
      {type === 'update' && !pending && 'Save Changes'}
    </Button>
  );
}

function ContactForm({
  type,
  action,
  contact,
  setOpenForm,
}: {
  type: 'add' | 'update';
  action: typeof addContact | typeof updateContact;
  contact?: Awaited<ReturnType<typeof uncached_contact>>;
  setOpenForm: Dispatch<SetStateAction<boolean>>;
}) {
  const [state, formAction] = useFormState(action, initState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (state.message) {
      !state?.ok &&
        toast({
          title: state?.message,
          variant: 'destructive',
        });
      if (state?.ok) {
        formRef.current?.reset();
        setOpenForm(false);
        router.replace('/contacts');
        toast({
          title: state.message,
        });
      }
    }
  }, [state]);

  return (
    <form
      ref={formRef}
      action={formAction}
      className="grid grid-cols-1 gap-y-4 gap-x-5"
    >
      {type === 'update' && contact && (
        <input id="id" name="id" value={contact.id} hidden />
      )}
      <Label htmlFor="email" className="text-gray-500">
        Email
      </Label>
      <div>
        <Input
          name="email"
          type="email"
          className={cn({
            'border-red-500': state?.errors?.email,
          })}
          defaultValue={contact?.email || ''}
        />
        {state?.errors?.email && (
          <p
            aria-live="polite"
            className="text-red-500 text-xs mt-2"
            role="status"
          >
            {state?.errors?.email}
          </p>
        )}
      </div>

      <Label htmlFor="phone" className="text-gray-500">
        Phone
      </Label>
      <div>
        <Input
          name="phone"
          type="tel"
          placeholder="eg: 06 28 29 59 30"
          className={cn({
            'border-red-500': state?.errors?.phone,
          })}
          defaultValue={contact?.phone || ''}
        />
        {state?.errors?.phone && (
          <p
            aria-live="polite"
            className="text-red-500 text-xs mt-2"
            role="status"
          >
            {state?.errors?.phone}
          </p>
        )}
      </div>

      <Label htmlFor="name" className="text-gray-500">
        Name
      </Label>
      <div>
        <Input
          name="name"
          className={cn({
            'border-red-500': state?.errors?.name,
          })}
          defaultValue={contact?.name || ''}
        />
        {state?.errors?.name && (
          <p
            aria-live="polite"
            className="text-red-500 text-xs mt-2"
            role="status"
          >
            {state?.errors?.name}
          </p>
        )}
      </div>

      <Label htmlFor="relationship" className="text-gray-500">
        Relationship
      </Label>
      <Select
        name="relationship"
        defaultValue={contact?.relationship || 'mother'}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select relationship" />
        </SelectTrigger>
        <SelectContent>
          {relationships.map((relationship, i) => (
            <SelectItem key={i} value={relationship.toLowerCase()}>
              {relationship}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div />
      <div className="flex justify-end">
        <SubmitButton type={type} />
      </div>
    </form>
  );
}

export default ContactForm;
