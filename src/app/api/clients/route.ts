// src/app/api/clients/route.ts
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

type AvailabilitySlot = {
  day: string
  startTime: string
  endTime: string
}

export async function POST(req: Request) {
  try {
    const body = await req.json()

    // Expect: { name: string, requiredRole?: string, availability?: AvailabilitySlot[] }
    const name: string = body?.name
    const requiredRole: string = body?.requiredRole ?? 'RBT' // <-- ensure it's present
    const availability: AvailabilitySlot[] = Array.isArray(body?.availability) ? body.availability : []

    if (!name) {
      return NextResponse.json({ error: 'name is required' }, { status: 400 })
    }

    const client = await prisma.client.create({
      data: {
        name,
        requiredRole, // <-- REQUIRED by your Prisma schema
        availability: {
          create: availability.map((slot) => ({
            day: slot.day,
            startTime: slot.startTime,
            endTime: slot.endTime,
          })),
        },
      },
      include: { availability: true },
    })

    return NextResponse.json(client, { status: 201 })
  } catch (err: any) {
    console.error('Create client error:', err)
    return NextResponse.json({ error: 'Failed to create client' }, { status: 500 })
  }
}
