'use client';

import axios from 'axios';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useModal } from '@/hooks/use-modal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Zap } from 'lucide-react';

const ProModal = () => {
  const proModal = useModal();
  const [loading, setLoading] = useState(false);

  const onSubscribe = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/stripe');

      window.location.href = response.data.url;
    } catch (error) {
      console.log('[STIPE_CLIENT_ERROR]', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='flex justify-center items-center flex-col gap-y-4 pb-2'>
            <div className='flex items-center gap-x-2 font-bold py-1'>
              Still unemployed?
              <Badge variant='premium' className='uppercase text-sm py-1'>
                pro
              </Badge>
            </div>
          </DialogTitle>
          <DialogDescription className='text-center pt-2 space-y-2 text-zinc-900 font-medium'>
            Even if with the free help provided by oa-helper you are still not
            able to clear any oa and are still here(means you still shit like
            before go do DSA or..) pay to oa-helper and get as much help you
            need.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            size='lg'
            variant='premium'
            className='w-full'
            onClick={onSubscribe}
          >
            Upgrade
            <Zap className='w-4 h-4 ml-2 fill-white' />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProModal;
