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
import { Suspense } from 'react';

function StudentsPage() {
  return (
    <>
      <CreateButton />
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
      <Suspense
        fallback={
          <p className="text-center animate-pulse text-muted text-md tracking-tight">
            Loading students...
          </p>
        }
      >
        <StudentsTable />
      </Suspense>
    </>
  );
}

export default StudentsPage;
