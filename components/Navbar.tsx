import UserButton from '@/components/UserButton';
import { getAuthSession } from '@/lib/auth';
import MobileSiderbar from '@/components/MobileSiderbar';
import { getApiLimit } from '@/lib/api-limit';

const Navbar = async () => {
  const session = await getAuthSession();
  const apiLimitCount = await getApiLimit();

  return (
    <div className='flex items-center p-4'>
      <MobileSiderbar apiLimitCount={apiLimitCount} />
      <div className='flex w-full justify-end'>
        <UserButton user={session?.user!} />
      </div>
    </div>
  );
};

export default Navbar;
