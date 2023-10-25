'use client';

import { signIn, signOut } from 'next-auth/react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

function LoginButton({
  isSignIn,
  children,
}: {
  isSignIn: boolean;
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const signin = async () => {
    try {
      setIsLoading(true);
      await signIn('github', { callbackUrl: '/dashboard' });
    } catch (error) {
      console.log('[SIGNIN]', error);
      toast({
        description:
          'Something went while trying to sign in with Github. Please try again',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const signout = async () => {
    try {
      setIsLoading(true);
      await signOut({ callbackUrl: '/' });
    } catch (error) {
      console.log('[SIGNOUT]', error);
      toast({
        description: 'Something went wrong. Please try again',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      disabled={isLoading}
      onClick={isSignIn ? signin : signout}
      variant='outline'
    >
      {children}
    </Button>
  );
}

export default LoginButton;
