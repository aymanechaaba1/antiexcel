'use client';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from './ui/select';

function ShadcnSelectComponent({
  onValueChange,
  defaultValue,
  options,
  placeholder,
  label,
}: {
  onValueChange: (value: string) => void;
  defaultValue: string | undefined;
  options: readonly string[];
  placeholder: string;
  label: string;
}) {
  return (
    <Select
      onValueChange={(val) => {
        onValueChange(val);
      }}
      defaultValue={defaultValue}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          {options.map((option, i) => (
            <SelectItem key={i} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default ShadcnSelectComponent;
