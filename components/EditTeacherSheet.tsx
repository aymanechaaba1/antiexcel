'use client';

import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import { Button } from './ui/button';
import { teacherFormSchema } from '@/zod/schemas';
import { z } from 'zod';
import useCustomForm from '@/hooks/useCustomForm';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Input } from './ui/input';
import { Check, ChevronsUpDown } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { cn } from '@/lib/utils';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from './ui/command';
import { subjects } from './AddTeacher';
import { useToast } from './ui/use-toast';
import { trpc } from '@/server/trpc';

function EditTeacherSheet({ teacher_id }: { teacher_id: string }) {
  const { data: teacher } = trpc.getTeacher.useQuery({
    teacher_id,
  });

  const [form] = useCustomForm({
    formSchema: teacherFormSchema,
    defaultValues: {
      ...teacher,
    },
  });

  const { toast } = useToast();

  const [open, setOpen] = React.useState(false);

  const utils = trpc.useUtils();

  const { mutate: updateTeacher } = trpc.updateTeacher.useMutation({
    onSuccess() {
      utils.getTeachers.invalidate();
      toast({
        title: 'Teacher was edited successfully.',
      });
    },
  });

  async function onSubmit(values: z.infer<typeof teacherFormSchema>) {
    console.log(values);
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="default">Edit</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input defaultValue={teacher?.email} {...field} />
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
                      defaultValue={teacher?.phone!}
                      {...field}
                    />
                  </FormControl>
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
                    <Input defaultValue={teacher?.name} {...field} />
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
            <Button type="submit">Save Changes</Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}

export default EditTeacherSheet;
