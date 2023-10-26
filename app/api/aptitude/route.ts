import { getAuthSession } from '@/lib/auth';
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [message],
    });

    return NextResponse.json(response.choices[0].message);
  } catch (error) {
    console.log('[APTITUDE_ERROR]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
