'use client';

import useCustomForm from '@/hooks/useCustomForm';
import { PaypalSubscriptionRequestBodySchema } from '@/zod/schemas';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Section from './Section';

function CreateSubscription() {
  const [form] = useCustomForm({
    formSchema: PaypalSubscriptionRequestBodySchema,
    defaultValues: {
      product_id: '',
      name: '',
    },
  });

  function onSubmit(
    values: z.infer<typeof PaypalSubscriptionRequestBodySchema>
  ) {
    console.log(values);
  }

  return (
    <Section
      title="Create a Subscription Plan"
      className="my-5 max-w-xl mx-auto border p-4 rounded-lg"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="product_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Id</FormLabel>
                <FormControl>
                  <Input placeholder="PROD-xxxxxxxxx" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="a cool name for your new plan..."
                    {...field}
                  />
                </FormControl>
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

export default CreateSubscription;
