'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Code, LayoutDashboard, MessageSquare, Settings } from 'lucide-react';
import { Montserrat } from 'next/font/google';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
import FreeCounter from '@/components/FreeCounter';

const monsterrat = Montserrat({
  weight: '600',
  subsets: ['latin'],
});

const routes = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    color: 'text-sky-500',
  },
  {
    label: 'Aptitude Part',
    href: '/aptitude',
    icon: MessageSquare,
    color: 'text-violet-500',
  },
  {
    label: 'Kwoder',
    href: '/kwode',
    icon: Code,
    color: 'text-green-500',
  },
  {
    label: 'Fine tune oa-helper',
    href: '/settings',
    icon: Settings,
  },
];

interface SidebarProps {
  apiLimitCount: number;
  isPro: boolean;
}

const Sidebar = ({ apiLimitCount, isPro = false }: SidebarProps) => {
  const pathname = usePathname();

  return (
    <div className='space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white'>
      <div className='px-3 py-2 flex-1'>
        <Link href='/dashboard' className='flex items-center pl-3 mb-14'>
          <div className='relative w-8 h-8 mr-4'>
            <Image fill src='/logo.png' alt='logo' />
          </div>
          <h1 className={cn('text-2xl font-bold', monsterrat.className)}>
            oa-helper
          </h1>
        </Link>
        <div className='space-y-1'>
          {routes.map((route) => (
            <Link
              href={route.href}
              key={route.href}
              className={cn(
                'text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition',
                pathname === route.href
                  ? 'text-white bg-white/10'
                  : 'text-zinc-400'
              )}
            >
              <div className='flex item-center flex-1'>
                <route.icon className={cn('h-5 w-5 mr-3', route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <FreeCounter isPro={isPro} apiLimitCount={apiLimitCount} />
    </div>
  );
};

export default Sidebar;
