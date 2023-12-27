'use client';

import * as z from 'zod';
import { format } from 'date-fns';
import {
  CalendarIcon,
  Check,
  ChevronsUpDown,
  Loader,
  Loader2,
} from 'lucide-react';

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
import { cn, getFilename, getUploadTask, uploadFile } from '@/lib/utils';
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
import {
  StorageError,
  UploadTaskSnapshot,
  getDownloadURL,
} from 'firebase/storage';
import { trpc } from '@/server/trpc';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

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
  buttonLabel,
  onSubmit,
  progress,
  setProgress,
  setStudentAvatar,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  buttonLabel: string;
  onSubmit: (values: z.infer<typeof formSchema>) => void;
  progress: number;
  setProgress: Dispatch<SetStateAction<number>>;
  setStudentAvatar: Dispatch<SetStateAction<string>>;
}) {
  const [formStep, setFormStep] = useState(1);

  const [openCombobox, setOpenCombobox] = useState(false);

  const { data: teachers, isLoading: loadingTeachers } =
    trpc.getTeachers.useQuery();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: 'rayan',
      lastname: 'hamdi',
      birthdate: new Date(),
      gender: 'male',
      grade: '1',
      school: 'chkail',
      // ...(teachers && teachers.length && { teacher_id: teachers[0].id }),
      teacher_id: 'clqmb3vho0003ie10gs2zvnfy',
      contact_id: '',
      contact_email: 'soumia@gmail.com',
      contact_phone: '06 50 60 60 50',
      contact_name: 'soumia',
      contact_relationship: 'mother',
    },
  });

  const [openComboTeacher, setOpenComboTeacher] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState('');

  const { data: contacts, isLoading: loadingContacts } =
    trpc.getContacts.useQuery();

  const contact_id = form.watch('contact_id');

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
                    <Input {...field} />
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
                    <Input {...field} value={field.value} />
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
                      defaultValue={field.value}
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
                    <Input type="number" min={1} max={6} {...field} />
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
                          <CommandInput placeholder="Search school..." />
                          <CommandEmpty>No school found.</CommandEmpty>
                          <CommandGroup>
                            {schools.map((school) => (
                              <CommandItem
                                value={school.label}
                                key={school.value}
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
            <Button
              type="button"
              onClick={() => {
                const inputs = [
                  'firstname',
                  'lastname',
                  'birthdate',
                  'gender',
                  'grade',
                  'school',
                  'avatar',
                ] as Array<
                  | 'firstname'
                  | 'lastname'
                  | 'birthdate'
                  | 'gender'
                  | 'grade'
                  | 'school'
                  | 'avatar'
                >;

                // setFormStep((prev) => prev + 1); // pass directly to next step

                form.trigger(inputs);
                const inputStates = inputs.map((input) =>
                  form.getFieldState(input)
                );

                const [school, teacher_id] = form.getValues([
                  'school',
                  'teacher_id',
                ]);

                inputStates.forEach((state) => {
                  if (!state.isDirty || state.invalid) return;
                });

                if (!school || !teacher_id) return;

                // upload student image
                const avatar: File | Blob = form.getValues('avatar');
                if (!avatar) {
                  form.trigger('avatar');
                  return;
                }

                const fileName = getFilename(avatar.name);
                const uploadTask = getUploadTask(`images/${fileName}`, avatar);

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
                  const downloadURL = await getDownloadURL(
                    uploadTask.snapshot.ref
                  );
                  setStudentAvatar(downloadURL);
                  setFormStep((prev) => prev + 1);
                  setProgress(0);
                };

                // upload student
                uploadFile(fileName, avatar, onSnapshot, onError, onSuccess);
              }}
            >
              Next
            </Button>
          </>
        )}
        {formStep === 2 && (
          <>
            {loadingContacts && <Loader2 size={10} />}
            {true && (
              <FormField
                control={form.control}
                name="contact_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Existing Contact</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select contact" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {contacts?.map((contact) => (
                          <SelectItem key={contact.id} value={contact.id}>
                            {contact.name}
                          </SelectItem>
                        ))}
                        <SelectItem value="none">Doesn't Exist</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {(contacts?.length === 0 || contact_id === 'none') && (
              <>
                <h1 className="text-2xl font-medium">New Contact</h1>
                <FormField
                  control={form.control}
                  name="contact_email"
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
                  name="contact_phone"
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
                  name="contact_name"
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
                  name="contact_relationship"
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
                  name="contact_avatar"
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
          </>
        )}
      </form>
    </Form>
  );
}

export default RegistrationForm;
