'use client';

import useCustomForm from '@/hooks/useCustomForm';
import { teacherFormSchema } from '@/zod/schemas';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';

import { useState } from 'react';
import { cn } from '@/lib/utils';

import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Check, ChevronsUpDown } from 'lucide-react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from './ui/command';
import Section from './Section';
import { useSubscriptionsStore } from '@/store/store';
import { useToast } from './ui/use-toast';
import { ToastAction } from './ui/toast';
import Link from 'next/link';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { trpc } from '@/server/trpc';

export const subjects = [
  { label: 'English', value: 'english' },
  { label: 'French', value: 'french' },
  { label: 'Physics', value: 'physics' },
  { label: 'Maths', value: 'maths' },
  { label: 'Science', value: 'science' },
  { label: 'Sport', value: 'sport' },
  { label: 'Arabic', value: 'arabic' },
  { label: 'Islamic', value: 'islamic' },
  { label: 'Geography', value: 'geography' },
] as const;

function AddTeacher() {
  const { data: user } = trpc.getUser.useQuery();

  const utils = trpc.useUtils();

  const [form] = useCustomForm({
    formSchema: teacherFormSchema,
    defaultValues: {
      email: 'aziza@gmail.com',
      phone: '06 59 69 59 60',
      gender: 'female',
      name: 'Aziza',
      subject: 'science',
    },
  });

  const [open, setOpen] = useState(false);

  const { toast } = useToast();

  const { mutate: addTeacher } = trpc.addTeacher.useMutation({
    onSuccess() {
      utils.getTeachers.invalidate();
      toast({
        title: 'Teacher added successfully.',
      });
      setOpen(false);
    },
    onError(error) {
      toast({
        title: `Failed to add teacher`,
        variant: 'destructive',
      });
    },
  });

  const { subscription } = useSubscriptionsStore((state) => state);

  function onSubmit(values: z.infer<typeof teacherFormSchema>) {
    // !subscription && user.students === 3 => return toast notification
    if (!subscription && user && user.teachers.length === 3) {
      return toast({
        title: 'Oops, You must be a PRO!',
        description: "You're limited to 3 teachers.",
        action: (
          <ToastAction
            className="bg-gray-900 hover:bg-gray-900 border"
            altText="Become a PRO!"
          >
            <Link href={`/#pricing`}>Become a PRO!</Link>
          </ToastAction>
        ),
        variant: 'destructive',
      });
    }

    addTeacher({
      ...values,
    });
  }

  return (
    <Section className="flex justify-end py-5">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>Create</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add a teacher</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="06 58 68 93 89"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {['Male', 'Female'].map((gender, i) => (
                          <SelectItem key={i} value={gender.toLowerCase()}>
                            {gender}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Subject</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              'w-[200px] justify-between',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value
                              ? subjects.find(
                                  (subject) => subject.value === field.value
                                )?.label
                              : 'Select subject'}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput placeholder="Search subject..." />
                          <CommandEmpty>No subject found.</CommandEmpty>
                          <CommandGroup>
                            {subjects.map((subject) => (
                              <CommandItem
                                value={subject.label}
                                key={subject.value}
                                onSelect={() => {
                                  form.setValue('subject', subject.value);
                                }}
                              >
                                <Check
                                  className={cn(
                                    'mr-2 h-4 w-4',
                                    subject.value === field.value
                                      ? 'opacity-100'
                                      : 'opacity-0'
                                  )}
                                />
                                {subject.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </Section>
  );
}

export default AddTeacher;
