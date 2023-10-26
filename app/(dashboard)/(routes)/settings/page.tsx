import { Settings } from 'lucide-react';

import Heading from '@/components/Heading';
import { checkSubscription } from '@/lib/subscription';
import SubscriptionButton from '@/components/SubscriptionButton';

const SettingsPage = async () => {
  const isPro = await checkSubscription();

  return (
    <div>
      <Heading
        title='Settings'
        description='agar itni baar leetcode khol liya hota toh yahan nai hotein beta'
        icon={Settings}
        iconColor='text-gray-700'
        bgColor='bg-gray-700/10'
      />
      <div className='px-4 lg:px-8 space-y-4 '>
        <div className='text-muted-foreground text-sm'>
          {isPro
            ? 'You are currently on a pro plan. I mean you still havent got enough skills to clear oa.'
            : 'You are on a free plan. Either you are good at DSA or your CG isnt good enough to appear for OA (jox on you).'}
        </div>
        <SubscriptionButton isPro={isPro} />
      </div>
    </div>
  );
};

export default SettingsPage;
