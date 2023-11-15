'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

function useCustomForm({
  formSchema,
  defaultValues,
}: {
  formSchema: any;
  defaultValues?: any;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  return [form];
}

export default useCustomForm;
