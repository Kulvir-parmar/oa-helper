'use client';

import { useEffect, useState } from 'react';
import { Zap } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { MAX_FREE_COUNT } from '@/constants';
import { Button } from '@/components/ui/button';
import { useModal } from '@/hooks/use-modal';

interface FreeCounterProps {
  apiLimitCount: number;
}

const FreeCounter = ({ apiLimitCount }: FreeCounterProps) => {
  const [mounted, setMounted] = useState<boolean>(false);
  const proModal = useModal();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className='px-3'>
      <Card className='bg-white/10 border-0'>
        <CardContent className='py-6'>
          <div className='text-center text-sm text-white mb-4 space-y-2'>
            <p>{apiLimitCount} Free questions left.</p>
            <Progress
              className='h-3'
              value={(apiLimitCount / MAX_FREE_COUNT) * 100}
            />
          </div>
          <Button
            className='w-full'
            variant='premium'
            onClick={proModal.openModal}
          >
            Upgrade
            <Zap className='h-4 w-4 fill-white ml-2' />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default FreeCounter;
