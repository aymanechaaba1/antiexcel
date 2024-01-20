'use client';

import { trpc } from '@/server/trpc';
import { Button } from './ui/button';
import Link from 'next/link';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';
import { HelpCircle } from 'lucide-react';

function StudentsTable() {
  const { data: students } = trpc.getStudents.useQuery();

  if (students?.length === 0) {
    return (
      <div className="flex justify-end">
        <Button className="flex items-center gap-3">
          l<Link href={`/teachers`}>Add a Teacher</Link>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="w-5 h-5" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">
                  You need at least one teacher to add students
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Button>
      </div>
    );
  }

  if (students)
    return (
      <div className="space-y-3 border rounded-lg">
        <div className="grid grid-cols-6 gap-x-4 overflow-x-scroll">
          {[
            'First Name',
            'Last Name',
            'Grade',
            'Birth Date',
            'School',
            'Teacher',
          ].map((field, i) => (
            <p
              key={i}
              className="font-bold tracking-tight scroll-m-20 text-md text-muted"
            >
              {field}
            </p>
          ))}
        </div>
        <div className="grid grid-cols-6 gap-x-4 gap-y-2 overflow-x-scroll">
          {students?.map((student) => (
            <div key={student.id} className="overflow-x-scroll">
              <p>{student.firstname}</p>
              <p>{student.lastname}</p>
              <p>{student.grade}</p>
              <p>{student.birthdate.toLocaleDateString()}</p>
              <p>{student.school}</p>
              <Link
                href={`/teachers/${student.teacher?.id}`}
                className="text-blue-500 hover:text-blue-600"
              >
                {student.teacher?.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
}

export default StudentsTable;
