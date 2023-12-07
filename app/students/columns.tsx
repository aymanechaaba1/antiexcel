'use client';

import { schools } from '@/components/RegistrationForm';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog } from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  formatDate,
  formatUnderscore,
  getAvatarName,
  upperFirst,
} from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import Link from 'next/link';
import { trpc } from '../_trpc/client';
import { serverClient } from '../_trpc/serverClient';
import { useSession } from 'next-auth/react';

export const columns: ColumnDef<
  Awaited<ReturnType<(typeof serverClient)['getStudent']>>
>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'avatar',
    header: 'Avatar',
    cell: ({ row }) => {
      const student = row.original;
      return (
        <Avatar className="">
          <div className="rounded-full">
            <AvatarImage
              src={student?.avatar}
              width={15}
              height={15}
              className="w-full object-cover"
            />
          </div>
          <AvatarFallback className="">
            {getAvatarName(student?.firstname!, student?.lastname!)}
          </AvatarFallback>
        </Avatar>
      );
    },
  },
  {
    accessorKey: 'firstname',
    header: () => <div className="text-left">Firstname</div>,
    cell: ({ row }) => {
      return (
        <div className="text-left font-medium">
          {upperFirst(row.getValue('firstname'))}
        </div>
      );
    },
  },
  {
    accessorKey: 'lastname',
    header: () => <div className="text-left">Lastname</div>,
    cell: ({ row }) => {
      return (
        <div className="text-left font-medium">
          {upperFirst(row.getValue('lastname'))}
        </div>
      );
    },
  },
  {
    accessorKey: 'birthdate',
    header: ({ column }) => {
      return <div className="text-left font-medium">Birthdate</div>;
    },
    cell: ({ row }) => {
      const formattedDate = formatDate(
        new Date(row.getValue('birthdate')),
        'en-US'
      );
      return <div className="">{formattedDate}</div>;
    },
  },
  {
    accessorKey: 'school',
    header: () => <div className="text-left">School</div>,
    cell: ({ row }) => {
      const school = schools.find(
        (school) => school.value === row.getValue('school')
      )?.label;

      return <div className="text-left font-medium">{school}</div>;
    },
  },
  {
    accessorKey: 'teacher_id',
    header: () => <div className="text-left">Teacher</div>,
    cell: ({ row }) => {
      const { data: session } = useSession();
      if (!session) return;
      const { data: teachers } = trpc.getTeachers.useQuery();
      if (!teachers) return;

      const teachersCombo = [
        ...teachers.map((teacher) => ({
          value: teacher.id,
          label: teacher.name,
        })),
      ] as const;

      const teacher = teachersCombo.find(
        (teacher) => teacher.value === row.getValue('teacher_id')
      )?.label;
      return <div className="text-left font-medium">{teacher}</div>;
    },
  },
  {
    accessorKey: 'gender',
    header: () => <div className="text-left">Gender</div>,
    cell: ({ row }) => {
      return (
        <div className="text-left font-medium">
          {upperFirst(row.getValue('gender'))}
        </div>
      );
    },
  },
  {
    accessorKey: 'created_at',

    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Created At
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      return (
        <div className="text-left font-medium">
          {formatDate(new Date(row.getValue('created_at')), 'en-US', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          })}
        </div>
      );
    },
  },
  {
    accessorKey: 'grade',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Grade
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      return (
        <div className="text-left font-medium">
          {Number(row.getValue('grade'))}
        </div>
      );
    },
  },

  {
    id: 'actions',
    enableHiding: true,
    cell: ({ row }) => {
      const student = row.original;

      const deleteStudent = trpc.deleteStudent.useMutation();

      const deleteStudentHandler = async () => {
        if (!student?.id) return;
        // delete student logic

        deleteStudent.mutate({
          id: student.id,
        });
      };

      return (
        <Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(student?.id!)}
              >
                Copy student ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link prefetch={false} href={`/students/${student?.id}`}>
                  View student
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  prefetch={false}
                  href={`/contacts/${student?.contact_id}`}
                >
                  View contact
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => deleteStudentHandler()}
                className="text-red-500"
              >
                Delete student
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Dialog>
      );
    },
  },
];
