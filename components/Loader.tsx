import { Loader2 } from 'lucide-react';
import Image from 'next/image';

const Loader = () => {
  return (
    <div className='h-full flex flex-col gap-y-4 items-center justify-center'>
      <div className='w-10 h-10 animate-spin relative'>
        <Image alt='logo' fill src='/logo.png' />
      </div>
      <p className='text-sm text-muted-foreground'>
        oa-helper brainstorming hard so that you don&apos;t have to and still
        able to clear your oa.
      </p>
    </div>
  );
};

export default Loader;
