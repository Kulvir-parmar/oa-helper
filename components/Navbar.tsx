import UserButton from '@/components/UserButton';
import { getAuthSession } from '@/lib/auth';
import MobileSiderbar from '@/components/MobileSiderbar';

const Navbar = async () => {
  const session = await getAuthSession();

  return (
    <div className='flex items-center p-4'>
      <MobileSiderbar />
      <div className='flex w-full justify-end'>
        <UserButton user={session?.user!} />
      </div>
    </div>
  );
};

export default Navbar;
