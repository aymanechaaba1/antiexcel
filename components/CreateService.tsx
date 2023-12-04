'use client';

import { PaypalRequestBody } from '@/zod/schemas';
import { v4 as uuidv4 } from 'uuid';
import { Button } from './ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Input } from './ui/input';
import { z } from 'zod';
import useCustomForm from '@/hooks/useCustomForm';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import Section from './Section';

function CreateService() {
  const [form] = useCustomForm({
    formSchema: PaypalRequestBody,
    defaultValues: {
      name: '',
      type: 'PHYSICAL',
    },
  });

  async function onSubmit(values: z.infer<typeof PaypalRequestBody>) {
    console.log(values);

    const res = await fetch(
      'https://api-m.sandbox.paypal.com/v1/catalogs/products',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.PAYPAL_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'PayPal-Request-Id': uuidv4(),
          Prefer: 'return=representation',
        },
        body: JSON.stringify(values),
      }
    );

    if (!res.ok) throw new Error(`Product Creation Failed! )(${res.status})`);

    const data = await res.json();

    console.log(data);

    form.reset();
  }

  return (
    <Section
      title="Create a Product"
      className="max-w-xl mx-auto border p-4 rounded-lg"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="a name for your product..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a verified email to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {['Physical', 'Digital', 'Service'].map((val) => (
                      <SelectItem value={val.toLowerCase()}>
                        {val.toUpperCase()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </Section>
  );
}

export default CreateService;
