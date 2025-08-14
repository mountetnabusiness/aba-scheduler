import { prisma, Role } from '@prisma/client'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { name, requiredRole, availability } = await req.json()

    // Validate that the provided role is a valid Prisma Role enum value
    if (!Object.values(Role).includes(requiredRole)) {
      return NextResponse.json(
        { error: `Invalid role. Must be one of: ${Object.values(Role).join(', ')}` },
        { status: 400 }
      )
    }

    const client = await prisma.client.create({
      data: {
        name,
        requiredRole, // This is now correctly typed as Role enum
        availability: {
          create: availability.map((slot: { day: string; startTime: string; endTime: string }) => ({
            day: slot.day,
            startTime: slot.startTime,
            endTime: slot.endTime
          }))
        }
      }
    })

    return NextResponse.json(client)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Error creating client' }, { status: 500 })
  }
}
