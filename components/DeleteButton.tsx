'use client';

import { useRouter } from 'next/navigation';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog';
import { Button } from './ui/button';
import { useToast } from './ui/use-toast';

function DeleteButton({
  id,
  action,
  label = 'Delete',
  redirectTo,
}: {
  id: string;
  action: (id: string) => Promise<{
    ok: boolean;
    message: string;
  }>;
  label?: string;
  redirectTo: string;
}) {
  const { toast } = useToast();
  const router = useRouter();

  return (
    <div className="flex items-center justify-between border border-red-500 rounded-lg p-4">
      <h3 className="text-red-500 font-bold tracking-tight scroll-m-20 text-md">
        DANGER ZONE
      </h3>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className="bg-red-500 text-white font-medium border-red-700 text-center hover:bg-red-600">
            {label}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                const { ok, message } = await action(id);

                if (message) {
                  toast({
                    title: message,
                    ...(!ok && { variant: 'destructive' }),
                  });

                  if (ok) {
                    router.replace(redirectTo);
                  }
                }
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default DeleteButton;
