'use client';

import * as z from 'zod';
import { MessageSquare } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Heading from '@/components/Heading';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { formSchema } from './constants';

const AptitudeSolver = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      aptique: '',
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log(values);
    } catch (error) {
      console.log('[FORM_SUBMIT]', error);
    }
  };

  return (
    <div>
      <Heading
        title='Aptitude Solver'
        description='Send your aptitude questions or logical reasoning questions and get the answer in a few seconds.'
        icon={MessageSquare}
        iconColor='text-violet-500'
        bgColor='text-violet-500/10'
      />
      <div className='px-4 lg:px-8'>
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='rounded-lg border p-4 w-full px-3  md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2'
            >
              <FormField
                name='aptique'
                render={({ field }) => (
                  <FormItem className='col-span-12 lg:col-span-10'>
                    <FormControl className='m-0 p-0'>
                      <Input
                        {...field}
                        className='border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent'
                        disabled={isLoading}
                        placeholder='Meri Job toh lag jayegi naa bhiaymaa??'
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button className='col-span-12 lg:col-span-2 w-full'>
                Answer ASAP!
              </Button>
            </form>
          </Form>
        </div>
        <div className='space-y-4 mt-4'>Messages Content</div>
      </div>
    </div>
  );
};

export default AptitudeSolver;
