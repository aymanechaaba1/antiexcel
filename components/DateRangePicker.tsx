'use client';

import { addDays, format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { DateRange } from 'react-day-picker';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import ResetBtn from './ResetBtn';

export function DateRangePicker({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const searchParams = useSearchParams();

  const currentFrom = searchParams.get('from');
  const currentTo = searchParams.get('to');
  const defaultValue = {
    from: currentFrom ? new Date(Number(currentFrom)) : undefined,
    to: currentTo ? new Date(Number(currentTo)) : undefined,
  };

  const [date, setDate] = useState<DateRange | undefined>(defaultValue);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    if (date?.from) params.set('from', date?.from?.getTime().toString());
    else params.delete('from');

    if (date?.to) params.set('to', date.to.getTime().toString());
    else params.delete('to');

    router.replace(`${pathname}?${params.toString()}`);
  }, [date]);

  return (
    <div className={cn(className)}>
      <ResetBtn
        onClick={() => {
          setDate(undefined);
        }}
      />
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className={cn(
              'w-[300px] justify-start text-left font-normal',
              !date && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'LLL dd, y')} -{' '}
                  {format(date.to, 'LLL dd, y')}
                </>
              ) : (
                format(date.from, 'LLL dd, y')
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
