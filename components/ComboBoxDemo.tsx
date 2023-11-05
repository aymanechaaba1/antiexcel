'use client';

import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { schools } from './RegistrationForm';
import { z } from 'zod';
import { SchoolsEnum } from '@/hooks/useCustomForm';

export function ComboboxDemo({
  open,
  setOpen,
  value,
  setValue,
  defaultValue,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  defaultValue?: string;
}) {
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? schools.find((school) => school.value === value)?.label
            : 'Select school...'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search school..." />
          <CommandEmpty>No school found.</CommandEmpty>
          <CommandGroup>
            {schools.map((school) => (
              <CommandItem
                key={school.value}
                value={school.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? '' : currentValue);
                  setOpen(false);
                }}
                defaultValue={defaultValue}
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    value === school.value ? 'opacity-100' : 'opacity-0'
                  )}
                />
                {school.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
