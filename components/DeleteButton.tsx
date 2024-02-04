'use client';

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

function DeleteButton({
  id,
  action,
  label = 'Delete',
}: {
  id: string;
  action: (id: string) => Promise<void>;
  label?: string;
}) {
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
                await action(id);
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
