'use client';

import { z } from 'zod';
import { Button } from './ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import useCustomForm from '@/hooks/useCustomForm';
import { Checkbox } from './ui/checkbox';
import { trpc } from '@/app/_trpc/client';
import { useEffect, useState } from 'react';
import { serverClient } from '@/app/_trpc/serverClient';

function AssignStudents({
  teacher_id,
  students,
}: {
  teacher_id: string;

  students: Awaited<ReturnType<(typeof serverClient)['getStudents']>>;
}) {
  const utils = trpc.useContext();

  const teacher = trpc.getTeacher.useQuery({
    id: teacher_id,
  });

  const items = [
    ...students.map((student) => ({
      id: student?.id,
      label: student?.firstname,
    })),
  ] as const;

  const FormSchema = z.object({
    items: z.array(z.string().cuid()),
  });

  const [defaultStudents, setDefaultStudents] = useState<string[] | undefined>(
    []
  );

  useEffect(() => {
    const ids = teacher.data?.students.map((student) => student.student_id);
    setDefaultStudents(ids);
  }, [teacher.data?.students]);

  const [openSheet, setOpenSheet] = useState(false);

  const [form] = useCustomForm({
    formSchema: FormSchema,
    defaultValues: {
      items: defaultStudents,
    },
  });

  const assignStudentToTeacher = trpc.assignStudentToTeacher.useMutation({
    onSuccess() {
      utils.getStudentsTeacher.invalidate();
    },
  });
  const deleteStudentFromTeacher = trpc.deleteStudentFromTeacher.useMutation({
    onSuccess() {
      utils.getStudentsTeacher.invalidate();
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    // get checked values
    const checkedStudents = data.items;

    // get unchecked values
    const uncheckedStudents = students
      .filter((student, i) => {
        const sId = data.items[i];
        return sId !== student?.id;
      })
      .map((student) => student?.id);

    // loop over each checked student
    checkedStudents.forEach((sId, i) => {
      const student_id = teacher.data?.students[i].student_id;

      // 1. check for students who don't exist in the list
      if (student_id !== sId) {
        // 2. true, add them
        assignStudentToTeacher.mutate({
          student_id: sId,
          teacher_id,
        });
      } else return;
    });

    // loop over each unchecked student
    uncheckedStudents.forEach((sId, i) => {
      const student_id = teacher.data?.students[i].student_id;

      // 1. check for those who exist in the list
      if (student_id === sId) {
        // 2. true, remove them
        deleteStudentFromTeacher.mutate({
          student_id: sId,
          teacher_id,
        });
      } else return;
    });

    setOpenSheet(false);
  }

  return (
    <Sheet open={openSheet} onOpenChange={setOpenSheet}>
      <SheetTrigger asChild>
        <Button variant="default">Assign Students</Button>
      </SheetTrigger>
      <SheetContent className="">
        <SheetHeader>
          <SheetTitle>Assign Students</SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-5"
          >
            <FormField
              control={form.control}
              name="items"
              render={() => (
                <FormItem>
                  {items.map((student) => (
                    <FormField
                      key={student.id}
                      control={form.control}
                      name="items"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={student.id}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                defaultChecked={field.value?.includes(
                                  student.id
                                )}
                                checked={field.value?.includes(student.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([
                                        ...field.value,
                                        student.id,
                                      ])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value: string) =>
                                            value !== student.id
                                        )
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {student.label}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">
              {form.formState.isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}

export default AssignStudents;
