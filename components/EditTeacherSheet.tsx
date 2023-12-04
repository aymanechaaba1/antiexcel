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
import { cn, getFilename, getUploadTask, uploadFile } from '@/lib/utils';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from './ui/command';
import ProgressBar from './ProgressBar';
import { subjects } from './AddTeacher';
import { serverClient } from '@/app/_trpc/serverClient';
import { trpc } from '@/app/_trpc/client';
import {
  StorageError,
  UploadTaskSnapshot,
  getDownloadURL,
} from 'firebase/storage';

function EditTeacherSheet({
  defaultValues,
  teacher_id,
}: {
  defaultValues: Awaited<ReturnType<(typeof serverClient)['getTeacher']>>;
  teacher_id: string;
}) {
  if (!defaultValues) return;

  const formattedAvatar = new File(
    [getFilename(defaultValues.avatar!)],
    defaultValues.avatar!,
    {
      type: 'text/plain',
    }
  );

  const [form] = useCustomForm({
    formSchema: teacherFormSchema,
    defaultValues: {
      ...defaultValues,
      avatar: formattedAvatar,
    },
  });

  const [progress, setProgress] = React.useState(0);
  const [open, setOpen] = React.useState(false);

  const utils = trpc.useContext();

  const updateTeacher = trpc.updateTeacher.useMutation({
    onSuccess() {
      utils.getTeacher.invalidate();
      utils.getTeachers.invalidate();
    },
  });

  async function onSubmit(values: z.infer<typeof teacherFormSchema>) {
    if (!values.avatar) return;

    // if current avatar is equal to values.avatar
    if (formattedAvatar.name === values.avatar?.name) {
      // 1. update data
      updateTeacher.mutate({
        ...values,
        id: teacher_id,
        avatar: defaultValues?.avatar!,
      });

      setOpen(false);
    } // if current avatar is different than values.avatar
    else if (formattedAvatar.name !== values.avatar?.name) {
      // 1. upload avatar

      const fileName = getFilename(values.avatar.name);

      const uploadTask = getUploadTask(`teachers/${fileName}`, values.avatar);

      const onSnapshot = (snapshot: UploadTaskSnapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      };

      const onError = (error: StorageError) => {
        // Handle unsuccessful uploads
        console.error(`Upload was unsuccessful. ${error.message}`);
      };

      const onSuccess = async () => {
        // Handle successful uploads on complete
        // For instance, get the download URL:
        const url = await getDownloadURL(uploadTask.snapshot.ref);

        // 2. update data
        updateTeacher.mutate({
          ...values,
          id: teacher_id,
          avatar: url,
        });

        form.reset();
        setProgress(0);
        setOpen(false);
      };

      uploadFile(fileName, values.avatar, onSnapshot, onError, onSuccess);
    }
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
                    <Input defaultValue={defaultValues?.email} {...field} />
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
                      defaultValue={defaultValues?.phone!}
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
                    <Input defaultValue={defaultValues?.name} {...field} />
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
            <FormField
              control={form.control}
              name="avatar"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Avatar</FormLabel>
                  <FormControl>
                    <>
                      <Input
                        type="file"
                        accept="image/png, image/jpeg"
                        onChange={(e) => {
                          if (e.target.files) {
                            field.onChange(e.target.files[0]);
                          }
                        }}
                      />
                      <ProgressBar
                        progress={progress}
                        setProgress={setProgress}
                      />
                    </>
                  </FormControl>
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
