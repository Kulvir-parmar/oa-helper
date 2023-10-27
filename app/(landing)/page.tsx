import { LandingContent } from '@/components/LandingContent';
import LandingHero from '@/components/LandingHero';
import LandingNavbar from '@/components/LandingNavbar';
import { getAuthSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function Landing() {
  const session = await getAuthSession();
  if (session?.user) {
    redirect('/dashboard');
  }

  return (
    <div className='h-full'>
      <LandingNavbar />
      <LandingHero />
      <LandingContent />
    </div>
  );
}
