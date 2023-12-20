import CreateButton from '@/components/CreateButton';
import StudentsTable from '@/components/StudentsTable';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { HelpCircle } from 'lucide-react';
import { caller } from '@/server';

async function StudentsPage() {
  const user = await caller.getUser();
  const students = (await caller.getStudents()) as Awaited<
    ReturnType<(typeof caller)['getStudent']>
  >[];
  const teachers = await caller.getTeachers();

  return (
    <>
      {teachers.length !== 0 ? (
        <CreateButton user={user} teachers={teachers} />
      ) : (
        <div className="flex justify-end">
          <Button className="flex items-center gap-3">
            <Link href={`/teachers`}>Add a Teacher</Link>
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
      )}
      <StudentsTable students={students} />
    </>
  );
}

export default StudentsPage;
