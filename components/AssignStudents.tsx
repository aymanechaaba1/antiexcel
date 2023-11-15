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
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import { Toast } from './ui/toast';
import useCustomForm from '@/hooks/useCustomForm';
import { Student, Teacher } from '@/zod/schemas';
import { Checkbox } from './ui/checkbox';
import { assignStudents } from '@/actions';
import { trpc } from '@/app/_trpc/client';
import { useEffect, useRef, useState } from 'react';

const FormSchema = z.object({
  studentIds: z
    .array(z.string())
    .refine((value) => value.some((item) => item), {
      message: 'You have to select at least one item.',
    }),
});

function AssignStudents({
  teacher_id,
  students,
}: {
  teacher_id: string;

  students: Student[];
}) {
  const teacher = trpc.getTeacher.useQuery({
    id: teacher_id,
  });

  const studentIds = students.map((student) => ({
    id: student.id,
    label: student.firstname,
  }));

  const [openSheet, setOpenSheet] = useState(false);
  const [form] = useCustomForm({
    formSchema: FormSchema,
    defaultValues: {
      studentIds: [],
    },
  });

  const { mutate } = trpc.assignStudentToTeacher.useMutation();

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    // get checked values
    console.log(data.studentIds);

    // get unchecked values
    console.log(
      students
        .filter((student, i) => {
          const sId = data.studentIds[i];
          return sId !== student.id;
        })
        .map((student) => student.id)
    );

    // add checked values

    // check if unchecked values exist in teacher.data.students
    // if exists, remove them
    // if not, return

    // setOpenSheet(false);
  }

  // checked if student's id exists in teacher.students

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
              name="studentIds"
              render={() => (
                <FormItem>
                  {studentIds.map((student) => (
                    <FormField
                      key={student.id}
                      control={form.control}
                      name="studentIds"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={student.id}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
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
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}

export default AssignStudents;
