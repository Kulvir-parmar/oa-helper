'use client';

import axios from 'axios';
import * as z from 'zod';
import { Code, Divide } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ChatCompletionMessageParam } from 'openai/resources/index.mjs';
import { useSession } from 'next-auth/react';
import ReactMarkdown from 'react-markdown';

import Heading from '@/components/Heading';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Loader from '@/components/Loader';
import { cn } from '@/lib/utils';
import Empty from '@/components/Empty';

import { formSchema } from './constants';
import UserAvatar from '@/components/UserAvatar';
import OaAvatar from '@/components/OaAvatar';
import { useModal } from '@/hooks/use-modal';

const AptitudeSolver = () => {
  const { data: session } = useSession();
  // console.log(session);

  const proModal = useModal();
  const router = useRouter();
  const [messages, setMessages] = useState<ChatCompletionMessageParam[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      kwodingque: '',
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userMessage: ChatCompletionMessageParam = {
        role: 'user',
        content: values.kwodingque,
      };

      const newMessages = [...messages, userMessage];

      const response = await axios.post('/api/kwode', {
        messages: newMessages,
      });

      setMessages((current) => [...current, userMessage, response.data]);

      form.reset();
    } catch (error: any) {
      if (error?.response?.status === 403) {
        proModal.openModal();
      }
      console.log('[FORM_SUBMIT]', error);
    } finally {
      router.refresh();
    }
  };

  return (
    <div>
      <Heading
        title='Kwoder'
        description='Send your Easy Leetcode problems which you are not able to solve you ugly ass bitch (Striver sheet hi krle).'
        icon={Code}
        iconColor='text-green-700'
        bgColor='bg -green-700/10'
      />
      <div className='px-4 lg:px-8'>
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='rounded-lg border p-4 w-full px-3  md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2'
            >
              <FormField
                name='kwodingque'
                render={({ field }) => (
                  <FormItem className='col-span-12 lg:col-span-10'>
                    <FormControl className='m-0 p-0'>
                      <Input
                        {...field}
                        className='border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent'
                        disabled={isLoading}
                        placeholder='Bhiayma DP kahan se kruu? (Striver bkl Striver...)'
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
        <div className='space-y-4 mt-4'>
          {isLoading && (
            <div className='p-8 rounded-lg w-full flex items-center justify-center bg-muted'>
              <Loader />
            </div>
          )}
          {messages.length === 0 && !isLoading && (
            <Empty label='No conversations started.' />
          )}
          <div className='flex flex-col-reverse gap-y-4'>
            {messages.map((message) => (
              <div
                key={message.content}
                className={cn(
                  'p-8 flex w-full items-start gap-x-8 rounded-lg',
                  message.role === 'user'
                    ? 'bg-white border border-black/10'
                    : 'bg-muted'
                )}
              >
                {message.role === 'user' ? (
                  <UserAvatar user={session?.user!} />
                ) : (
                  <OaAvatar />
                )}
                <ReactMarkdown
                  components={{
                    pre: ({ node, ...props }) => (
                      <div className='overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg'>
                        <pre {...props} />
                      </div>
                    ),
                    code: ({ node, ...props }) => (
                      <code className='bg-black/10 rounded-lg p-1' {...props} />
                    ),
                  }}
                  className='text-sm overflow-hidden leading-7'
                >
                  {message.content || ''}
                </ReactMarkdown>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AptitudeSolver;
