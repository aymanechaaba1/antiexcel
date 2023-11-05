import * as React from 'react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function SelectDemo({
  values,
  placeholder,
  label,
  name,
  defaultValue,
}: {
  values: string[];
  placeholder: string;
  label: string;
  name: string;
  defaultValue: string | undefined;
}) {
  return (
    values.length && (
      <Select name={name} defaultValue={defaultValue}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{label}</SelectLabel>
            {values.map((val) => (
              <SelectItem value={val.toLowerCase()}>{val}</SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    )
  );
}
