'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { Github } from 'lucide-react';
import Image from 'next/image';

import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';

const SignIn = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loginWithGithub = async () => {
    setIsLoading(true);

    try {
      await signIn('github', { callbackUrl: '/dashboard' });
    } catch (error) {
      toast({
        description:
          'There was an error logging in with Github. You better get a valid account Dummy.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='mx-auto flex w-  flex-col justify-center space-y-6 sm:w-[400px] border shadow-lg p-6 rounded-xl'>
      <div className='flex flex-col items-center space-y-2 text-center'>
        <div className='relative w-12 h-12'>
          <Image fill src='/logo.png' alt='logo' />
        </div>
        <h1 className='text-2xl font-semibold tracking-tight'>Welcome Dummy</h1>
        <p className='text-sm max-w-xs mx-auto'>
          By continuing, you are setting up a account with oa-helper and agree
          to our User Agreement and Privacy Policy.
        </p>
      </div>
      <div className={cn('flex justify-center')}>
        <Button
          size='sm'
          className='w-[80%]'
          onClick={loginWithGithub}
          disabled={isLoading}
        >
          {isLoading ? null : <Github className='h-4 w-4 mr-2' />}
          Github
        </Button>
      </div>
    </div>
  );
};

export default SignIn;
