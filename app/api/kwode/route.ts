import { getAuthSession } from '@/lib/auth';
import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources/index.mjs';

import { descreaseApiLimit, isApiLimitExceeded } from '@/lib/api-limit';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const instructionMessage: ChatCompletionMessageParam = {
  role: 'system',
  content:
    'You are leetcode Knight rated competitive coder. You must answer the questions in markdown code snippets. Also use comments to explain the code snippets.',
};

export async function POST(req: Request) {
  try {
    // TODO: check is use is logged in and has access to this route
    const session = getAuthSession();

    const body = await req.json();
    const { message } = body;

    if (!openai.apiKey) {
      return new NextResponse('OpenAI API key missing', { status: 500 });
    }

    if (!message) {
      return new NextResponse('Message missing', { status: 400 });
    }

    const freeTrail = await isApiLimitExceeded();

    if (!freeTrail) {
      return new NextResponse(
        'Broo can&apos;t even solve solve single question yourself can looking for a tech JOB. Go Solve your questions first or you can pay me to do that for you.',
        {
          status: 403,
        }
      );
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [instructionMessage, message],
    });

    await descreaseApiLimit();

    return NextResponse.json(response.choices[0].message);
  } catch (error) {
    console.log('[KWODE_ERROR]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
