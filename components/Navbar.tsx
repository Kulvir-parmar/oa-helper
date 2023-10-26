import UserButton from '@/components/UserButton';
import { getAuthSession } from '@/lib/auth';
import MobileSiderbar from '@/components/MobileSiderbar';
import { getApiLimit } from '@/lib/api-limit';
import { checkSubscription } from '@/lib/subscription';

const Navbar = async () => {
  const session = await getAuthSession();
  const apiLimitCount = await getApiLimit();
  const isPro = await checkSubscription();

  return (
    <div className='flex items-center p-4'>
      <MobileSiderbar isPro={isPro} apiLimitCount={apiLimitCount} />
      <div className='flex w-full justify-end'>
        <UserButton user={session?.user!} />
      </div>
    </div>
  );
};

export default Navbar;
