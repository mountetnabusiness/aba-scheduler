// app/api/employees/route.ts

import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, role, availability } = body;

    if (!name || !role) {
      return NextResponse.json({ error: 'Name and role are required' }, { status: 400 });
    }

    const employee = await prisma.employee.create({
      data: {
        name,
        role,
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

    return NextResponse.json(employee, { status: 201 });

  } catch (error) {
    console.error('Error creating employee:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
