'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const testimonials = [
  {
    name: 'Raghav Gupta',
    avatar: 'R',
    title: 'Texas Intern',
    description:
      'Itni fast to mai digital ke questions nai krr paata jitni jaldi oa-helper answers de deta hai!',
  },
  {
    name: 'Aryan Gupta',
    avatar: 'A',
    title: 'ARM (3nm team)',
    description:
      'Bhai mere interview ke answers sbhi itni jaldi sirf oa-helper hi krwaa skta thaa. Thanks OA-HELPER!',
  },
  {
    name: 'Horny Harry',
    avatar: 'HH',
    title: 'Playsimple mai Plaboy',
    description:
      'Bhai Leetcode Knight bnne tkk journey and DP ke diffcult questions ki explanatin and answers yeh sbb mai oa-helper hi mere saath thaa!',
  },
  {
    name: 'Sam NPC',
    avatar: 'S',
    title: 'Naukri coming bery soon.',
    description:
      'Ji dekho... oa-helper ne mere saare oa to solve krwaa diye hain.. But BKL companies wale CG cut lgga dete hai!',
  },
];

export const LandingContent = () => {
  return (
    <div className='px-10 pb-20'>
      <h2 className='text-center text-4xl text-white font-extrabold mb-10'>
        Testimonials
      </h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {testimonials.map((item) => (
          <Card
            key={item.description}
            className='bg-[#192339] border-none text-white'
          >
            <CardHeader>
              <CardTitle className='flex items-center gap-x-2'>
                <div>
                  <p className='text-lg'>{item.name}</p>
                  <p className='text-zinc-400 text-sm'>{item.title}</p>
                </div>
              </CardTitle>
              <CardContent className='pt-4 px-0 text-muted-foreground text-sm font-medium'>
                {item.description}
              </CardContent>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};
