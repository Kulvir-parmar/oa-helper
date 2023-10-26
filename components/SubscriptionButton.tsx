'use client';

import axios from 'axios';
import { Zap } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface SubscriptionButtonProps {
  isPro: boolean;
}

const SubscriptionButton = ({ isPro }: SubscriptionButtonProps) => {
  const [loading, setLoading] = useState(false);

  const onClick = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/stripe');

      window.location.href = response.data.url;
    } catch (error) {
      console.log('[BILLING_ERROR]', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button
        disabled={loading}
        variant={!isPro ? 'premium' : 'default'}
        onClick={onClick}
      >
        {isPro ? 'Manage Subscription' : 'Upgrade to Pro'}
        {!isPro && <Zap className='w-4 h-4 ml-2 fill-white' />}
      </Button>
    </div>
  );
};

export default SubscriptionButton;
