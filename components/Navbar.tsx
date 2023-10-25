import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

import UserButton from '@/components/UserButton';
import { getAuthSession } from '@/lib/auth';
import AuthButton from '@/components/AuthButton';

const Navbar = async () => {
  const session = await getAuthSession();
  console.log(session);

  return (
    <div className='flex items-center p-4'>
      <Button variant='ghost' size='icon' className='md:hidden'>
        <Menu />
      </Button>
      <div className='flex w-full justify-end'>
        {session?.user ? (
          <UserButton user={session.user} />
        ) : (
          <AuthButton isSignIn>Sign ip</AuthButton>
        )}
      </div>
    </div>
  );
};

export default Navbar;
