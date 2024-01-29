import Section from '@/components/Section';
import { cached_teachers } from '@/prisma/db-calls';
import AddStudentForm from '@/components/AddStudentForm';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { HelpCircle } from 'lucide-react';

async function AddStudentPage() {
  const teachers = await cached_teachers();

  return (
    <>
      {!teachers ||
        (!teachers.length ? (
          <Button
            variant={'secondary'}
            className="flex items-center gap-3 float-right"
          >
            <Link href={`/teachers/add`}>Add Teacher</Link>
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
        ) : (
          <Section title="Add Student">
            <AddStudentForm />
          </Section>
        ))}
    </>
  );
}

export default AddStudentPage;
