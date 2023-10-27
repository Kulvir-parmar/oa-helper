'use client';

import TypewriterComponent from 'typewriter-effect';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

import { Button } from '@/components/ui/button';

const LandingHero = () => {
  const { data: session } = useSession();
  const isSignedIn = !!session?.user;

  return (
    <div className='text-white font-bold py-36 text-center space-y-5'>
      <div className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold'>
        <h1>The Best AI Tool for</h1>
        <div className='text-transparent text-3xl md:text-5xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600'>
          <TypewriterComponent
            options={{
              strings: [
                'Aptitude OA question coz your IQ is negative.',
                'Leetcode easy sol for your shitty oa',
                'Coding aptitude coz Bunty didnt study os in lectures.',
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
      </div>
      <div>
        <Link href={isSignedIn ? '/dashboard' : '/sign-in'}>
          <Button
            variant='premium'
            className='md:text-lg p-4 md:p-6 rounded-full font-semibold'
          >
            Increase your chances of getting into OA, coz Bunty dont know shit.
          </Button>
        </Link>
      </div>
      <div className='text-zinc-400 text-xs md:text-sm font-medium'>
        No credit card required. (If you didn&apos;t attended a single lecture
        in 4 years then obviously you can&apos;t solve a single question youself
        so may need a premium subsription.)
      </div>
    </div>
  );
};

export default LandingHero;
