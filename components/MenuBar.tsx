'use client';

import { Menu } from 'lucide-react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from './ui/sheet';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

function MenuBar() {
  const pathname = usePathname();

  const [openSheet, setOpenSheet] = useState(false);

  return (
    <Sheet open={openSheet} onOpenChange={setOpenSheet}>
      <SheetTrigger className="md:hidden" asChild>
        <Button variant="outline">
          <Menu className="w-5 h-5" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader></SheetHeader>
        <div className="flex flex-col gap-4 mt-10">
          {['Dashboard', 'Students', 'Teachers'].map((link, i) => {
            return (
              <Button
                key={i}
                variant={'ghost'}
                className="border"
                onClick={() => {
                  setOpenSheet(false);
                }}
                asChild
              >
                <Link
                  href={`/${link.toLowerCase()}`}
                  className={cn('text-sm text-gray-500', {
                    'text-blue-500 font-medium py-3 px-5 hover:bg-gray-500':
                      pathname.includes(`/${link.toLowerCase()}`),
                  })}
                >
                  {link}
                </Link>
              </Button>
            );
          })}
          <Button
            variant={'ghost'}
            className="border"
            onClick={() => {
              setOpenSheet(false);
            }}
            asChild
          >
            <Link
              href={`/contacts`}
              className={cn('text-sm text-gray-500', {
                'text-blue-500 font-medium py-3 px-5 hover:bg-gray-500':
                  pathname.includes(`/contacts`),
              })}
            >
              Contacts
            </Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default MenuBar;
