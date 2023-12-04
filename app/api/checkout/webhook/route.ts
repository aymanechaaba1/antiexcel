import { pusherServer } from '@/lib/pusher';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest, response: NextResponse) {
  const body = await request.json();

  pusherServer.trigger(`school-manager`, `paypal_webhook`, body);
}
