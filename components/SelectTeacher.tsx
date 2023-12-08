'use client';

import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { trpc } from '@/app/_trpc/client';
import { useSession } from 'next-auth/react';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { UseFormReturn } from 'react-hook-form';
import { Avatar } from './ui/avatar';
import { AvatarImage } from '@radix-ui/react-avatar';

export function SelectTeacher({
  openComboTeacher,
  setOpenComboTeacher,
  selectedTeacher,
  setSelectedTeacher,
  form,
}: {
  openComboTeacher: boolean;
  setOpenComboTeacher: React.Dispatch<React.SetStateAction<boolean>>;
  selectedTeacher: string;
  setSelectedTeacher: React.Dispatch<React.SetStateAction<string>>;
  form: UseFormReturn<any, any, undefined>;
}) {
  const { data: session } = useSession();
  if (!session) return;

  const { data: teachers } = trpc.getTeachers.useQuery();
  if (!teachers || teachers.length === 0) return;

  const teachersCombo = [
    ...teachers.map((teacher) => ({
      value: teacher.id,
      label: teacher.name,
      avatar: teacher.avatar,
    })),
  ] as const;

  return (
    <FormField
      control={form.control}
      name="teacher_id"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>Teacher</FormLabel>
          <FormControl>
            <Popover open={openComboTeacher} onOpenChange={setOpenComboTeacher}>
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
                      ? teachersCombo.find(
                          (teacher) => teacher.value === field.value
                        )?.label
                      : 'Select your teacher'}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandInput placeholder="Search teacher..." />
                  <CommandEmpty>No teacher found.</CommandEmpty>
                  <CommandGroup>
                    {teachersCombo.map((teacher) => (
                      <CommandItem
                        value={teacher.label}
                        key={teacher.value}
                        onSelect={() => {
                          form.setValue('teacher_id', teacher.value);
                          setOpenComboTeacher(false);
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <Check
                            className={cn(
                              'mr-2 h-4 w-4',
                              teacher.value === field.value
                                ? 'opacity-100'
                                : 'opacity-0'
                            )}
                          />
                          <Avatar>
                            {teacher.avatar && (
                              <div className="rounded-full w-10 h-10">
                                <AvatarImage
                                  src={teacher.avatar}
                                  className="w-full object-cover"
                                ></AvatarImage>
                              </div>
                            )}
                          </Avatar>
                          {teacher.label}
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
