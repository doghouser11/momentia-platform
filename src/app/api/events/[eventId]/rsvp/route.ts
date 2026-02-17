import { NextRequest, NextResponse } from 'next/server'
// import { PrismaClient } from '@prisma/client'

// const prisma = new PrismaClient()

interface RSVPParams {
  params: Promise<{
    eventId: string
  }>
}

export async function POST(
  request: NextRequest,
  { params }: RSVPParams
) {
  try {
    const { eventId } = await params
    const body = await request.json()
    
    const { 
      guestName, 
      guestEmail, 
      guestPhone,
      status,          // 'COMING' | 'MAYBE' | 'NOT_COMING'
      plusOnes = 0,
      dietaryNotes,
      message          // Digital guest book message
    } = body

    // Validation
    if (!guestName || !status) {
      return NextResponse.json(
        { error: 'Guest name and RSVP status are required' },
        { status: 400 }
      )
    }

    if (!['COMING', 'MAYBE', 'NOT_COMING'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid RSVP status' },
        { status: 400 }
      )
    }

    // TODO: Check if event exists
    // const event = await prisma.event.findUnique({
    //   where: { id: eventId }
    // })

    // if (!event) {
    //   return NextResponse.json({ error: 'Event not found' }, { status: 404 })
    // }

    // TODO: Create or update guest RSVP
    // const guest = await prisma.guest.upsert({
    //   where: {
    //     eventId_email: {
    //       eventId,
    //       email: guestEmail
    //     }
    //   },
    //   update: {
    //     name: guestName,
    //     phone: guestPhone,
    //     status,
    //     plusOnes: parseInt(plusOnes),
    //     dietaryNotes,
    //     message,
    //     respondedAt: new Date()
    //   },
    //   create: {
    //     eventId,
    //     name: guestName,
    //     email: guestEmail,
    //     phone: guestPhone,
    //     status,
    //     plusOnes: parseInt(plusOnes),
    //     dietaryNotes,
    //     message,
    //     respondedAt: new Date()
    //   }
    // })

    // Mock response for development
    const mockGuest = {
      id: 'guest-' + Date.now(),
      name: guestName,
      email: guestEmail,
      status,
      plusOnes: parseInt(plusOnes),
      message,
      respondedAt: new Date().toISOString()
    }

    // TODO: Send confirmation email to guest
    await sendRSVPConfirmation({
      guestEmail,
      guestName,
      status,
      eventId
    })

    // TODO: Notify event organizer if status is COMING
    if (status === 'COMING') {
      await notifyEventOrganizer({
        eventId,
        guestName,
        status
      })
    }

    return NextResponse.json({
      success: true,
      guest: mockGuest,
      message: 'RSVP recorded successfully!'
    })

  } catch (error) {
    console.error('Error processing RSVP:', error)
    return NextResponse.json(
      { error: 'Failed to process RSVP' },
      { status: 500 }
    )
  }
}

export async function GET(
  request: NextRequest,
  { params }: RSVPParams
) {
  try {
    const { eventId } = await params

    // TODO: Get all guests for this event
    // const guests = await prisma.guest.findMany({
    //   where: { eventId },
    //   orderBy: { createdAt: 'desc' }
    // })

    // Mock data for development
    const mockGuests = [
      {
        id: '1',
        name: 'Мария Петрова',
        email: 'maria@example.com',
        status: 'COMING',
        plusOnes: 1,
        message: 'Нямаме търпение да дойдем! 💕',
        respondedAt: new Date().toISOString()
      },
      {
        id: '2',
        name: 'Георги Иванов', 
        email: 'georgi@example.com',
        status: 'MAYBE',
        plusOnes: 0,
        message: 'Ще се опитаем да дойдем',
        respondedAt: null
      }
    ]

    const stats = {
      total: mockGuests.length,
      coming: mockGuests.filter(g => g.status === 'COMING').length,
      maybe: mockGuests.filter(g => g.status === 'MAYBE').length,
      notComing: mockGuests.filter(g => g.status === 'NOT_COMING').length,
      noResponse: mockGuests.filter(g => g.status === 'NO_RESPONSE').length,
      totalAttendees: mockGuests
        .filter(g => g.status === 'COMING')
        .reduce((sum, g) => sum + 1 + g.plusOnes, 0)
    }

    return NextResponse.json({
      guests: mockGuests,
      stats
    })

  } catch (error) {
    console.error('Error fetching RSVPs:', error)
    return NextResponse.json(
      { error: 'Failed to fetch RSVPs' },
      { status: 500 }
    )
  }
}

async function sendRSVPConfirmation({ 
  guestEmail, 
  guestName, 
  status, 
  eventId 
}: {
  guestEmail: string
  guestName: string
  status: string
  eventId: string
}) {
  console.log(`📧 RSVP Confirmation to ${guestEmail}:`)
  console.log(`   Guest: ${guestName}`)
  console.log(`   Status: ${status}`)
  console.log(`   Event: ${eventId}`)

  // TODO: Implement with Resend
  // Different messages based on status
  const statusMessages = {
    COMING: '🎉 Благодарим ви, че потвърдихте присъствието си!',
    MAYBE: '🤔 Разбираме, че все още не сте сигурни. Ще ви напомним по-близо до датата.',
    NOT_COMING: '😔 Съжаляваме, че няма да можете да присъствате.'
  }
}

async function notifyEventOrganizer({ 
  eventId, 
  guestName, 
  status 
}: {
  eventId: string
  guestName: string
  status: string
}) {
  console.log(`📧 Notify organizer: ${guestName} - ${status} for event ${eventId}`)
  
  // TODO: Get event organizer email and send notification
}