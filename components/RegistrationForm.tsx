'use client';

import * as z from 'zod';
import { format } from 'date-fns';
import { CalendarIcon, Check, ChevronsUpDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Dispatch, SetStateAction, useState } from 'react';
import useCustomForm from '@/hooks/useCustomForm';
import ProgressBar from './ProgressBar';
import { FormSchema, formSchema } from '@/zod/schemas';
import { SelectTeacher } from './SelectTeacher';

export const schools = [
  { label: 'Chkail', value: 'chkail' },
  { label: 'Henri Matisse', value: 'henri_matisse' },
  { label: 'Le Bougeoir', value: 'le_bougeoir' },
  { label: 'Diwan Al Maarifa', value: 'diwan' },
  { label: 'Wlad Slama', value: 'wlad_slama' },
  { label: 'Al Wahda', value: 'al_wahda' },
] as const;

function RegistrationForm({
  open,
  setOpen,
  defaultValues,
  buttonLabel,
  onSubmit,
  progress,
  setProgress,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  defaultValues?: FormSchema;
  buttonLabel: string;
  onSubmit: (values: z.infer<typeof formSchema>) => void;
  progress: number;
  setProgress: Dispatch<SetStateAction<number>>;
}) {
  const [formStep, setFormStep] = useState(1);

  const [openCombobox, setOpenCombobox] = useState(false);

  const [form] = useCustomForm({
    formSchema: formSchema,
  });

  const [openComboTeacher, setOpenComboTeacher] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState('');

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {formStep === 1 && (
          <>
            <FormField
              control={form.control}
              name="firstname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Firstname</FormLabel>
                  <FormControl>
                    <Input {...field} defaultValue={defaultValues?.firstname} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lastname</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      defaultValue={defaultValues?.lastname}
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="birthdate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date of Birth</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-[240px] pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value ? (
                            format(field.value, 'PPP')
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date: Date) =>
                          date > new Date() || date < new Date('1900-01-01')
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
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
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value || defaultValues?.gender}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select your gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="grade"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Grade</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      defaultValue={1}
                      min={1}
                      max={6}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="school"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>School</FormLabel>
                  <FormControl>
                    <Popover open={openCombobox} onOpenChange={setOpenCombobox}>
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
                              ? schools.find(
                                  (school) => school.value === field.value
                                )?.label
                              : 'Select your school'}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput
                            placeholder="Search school..."
                            defaultValue={defaultValues?.school}
                          />
                          <CommandEmpty>No school found.</CommandEmpty>
                          <CommandGroup>
                            {schools.map((school) => (
                              <CommandItem
                                value={school.label}
                                key={school.value}
                                defaultValue={defaultValues?.school}
                                onSelect={() => {
                                  form.setValue('school', school.value);
                                  setOpenCombobox(false);
                                }}
                              >
                                <Check
                                  className={cn(
                                    'mr-2 h-4 w-4',
                                    school.value === field.value
                                      ? 'opacity-100'
                                      : 'opacity-0'
                                  )}
                                />
                                {school.label}
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
            <SelectTeacher
              openComboTeacher={openComboTeacher}
              setOpenComboTeacher={setOpenComboTeacher}
              selectedTeacher={selectedTeacher}
              setSelectedTeacher={setSelectedTeacher}
              form={form}
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
                        name="avatar"
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
          </>
        )}
        {formStep === 2 && (
          <>
            <h1 className="text-2xl font-medium">Contact</h1>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                      {...field}
                      type="tel"
                      placeholder="eg: 06 28 29 59 30"
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
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="relationship"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Relationship</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select relationship" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {['Mother', 'Father', 'Brother', 'Sister'].map(
                        (cibling, i) => (
                          <SelectItem key={i} value={cibling.toLowerCase()}>
                            {cibling}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
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
                        name="avatar"
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
          </>
        )}
        {formStep === 1 ? (
          <Button
            onClick={() => {
              setFormStep(2);
            }}
          >
            Next
          </Button>
        ) : (
          <div className="flex items-center gap-3">
            <Button
              variant={'secondary'}
              onClick={() => {
                setFormStep(1);
              }}
            >
              Go Back
            </Button>
            <Button type="submit">{buttonLabel}</Button>
          </div>
        )}
      </form>
    </Form>
  );
}

export default RegistrationForm;
