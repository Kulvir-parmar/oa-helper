import { getAuthSession } from '@/lib/auth';
import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources/index.mjs';

import { descreaseApiLimit, isApiLimitExceeded } from '@/lib/api-limit';
import { checkSubscription } from '@/lib/subscription';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const instructionMessage: ChatCompletionMessageParam = {
  role: 'system',
  content:
    'You are leetcode Guardian rated competitive coder. You must answer the questions in markdown code snippets only. Use C++ as your default language to write code for the problems provided. Make sure to provide me the optimal code for most efficient run time and most efficient memory usage. Also use comments to explain the code snippets.',
};

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new NextResponse('User not found', { status: 401 });
    }

    const body = await req.json();
    const { messages } = body;

    if (!openai.apiKey) {
      return new NextResponse('OpenAI API key missing', { status: 500 });
    }

    if (!messages) {
      return new NextResponse('Message missing', { status: 400 });
    }

    const freeTrail = await isApiLimitExceeded();
    const isPro = await checkSubscription();

    if (!freeTrail && !isPro) {
      return new NextResponse(
        'Broo can&apos;t even solve solve single question yourself can looking for a tech JOB. Go Solve your questions first or you can pay me to do that for you.',
        {
          status: 403,
        }
      );
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [instructionMessage, ...messages],
    });

    if (!isPro) {
      await descreaseApiLimit();
    }

    return NextResponse.json(response.choices[0].message);
  } catch (error) {
    console.log('[KWODE_ERROR]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
