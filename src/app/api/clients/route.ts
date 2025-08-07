// app/api/clients/route.ts

import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, availability } = body;

    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    const client = await prisma.client.create({
      data: {
        name,
        availability: {
          create: availability.map((slot: { day: string; startTime: string; endTime: string }) => ({
            day: slot.day,
            startTime: slot.startTime,
            endTime: slot.endTime,
          })),
        },
      },
      include: {
        availability: true,
      },
    });

    return NextResponse.json(client, { status: 201 });

  } catch (error) {
    console.error('Error creating client:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
