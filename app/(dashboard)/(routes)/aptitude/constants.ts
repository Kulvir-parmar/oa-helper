import * as z from 'zod';

export const formSchema = z.object({
  aptique: z.string().min(1, {
    message:
      'Can&apos;t solve questions by yourself atleast ask valid questions bitch.',
  }),
});
