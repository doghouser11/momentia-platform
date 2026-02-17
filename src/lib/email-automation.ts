// Email automation utilities for Momentia
// import { PrismaClient } from '@prisma/client'
// import { Resend } from 'resend'

// const prisma = new PrismaClient()
// const resend = new Resend(process.env.RESEND_API_KEY)

export interface Guest {
  id: string
  name: string
  email: string
  status: 'COMING' | 'MAYBE' | 'NOT_COMING' | 'NO_RESPONSE'
  eventId: string
  event: {
    title: string
    eventDate: string
    subdomain: string
  }
}

export interface EventOwner {
  name: string
  email: string
}

/**
 * Send reminder emails to guests with MAYBE status
 * Called by OpenClaw cron job 7 days before event
 */
export async function sendMaybeReminders(): Promise<void> {
  try {
    const sevenDaysFromNow = new Date()
    sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7)

    // TODO: Replace with real database query
    // const maybeGuests = await prisma.guest.findMany({
    //   where: {
    //     status: 'MAYBE',
    //     reminderSent: null, // Haven't sent reminder yet
    //     event: {
    //       eventDate: {
    //         lte: sevenDaysFromNow // Event is within 7 days
    //       }
    //     }
    //   },
    //   include: {
    //     event: {
    //       include: {
    //         user: true
    //       }
    //     }
    //   }
    // })

    // Mock data for development
    const maybeGuests: Guest[] = [
      {
        id: '1',
        name: 'Георги Иванов',
        email: 'georgi@example.com',
        status: 'MAYBE',
        eventId: 'event-1',
        event: {
          title: 'Сватбата на Петя и Иван',
          eventDate: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString(),
          subdomain: 'petya-i-ivan'
        }
      }
    ]

    console.log(`📧 Processing ${maybeGuests.length} MAYBE guests for reminders...`)

    for (const guest of maybeGuests) {
      await sendMaybeReminderEmail(guest)
      
      // TODO: Mark reminder as sent
      // await prisma.guest.update({
      //   where: { id: guest.id },
      //   data: { reminderSent: new Date() }
      // })
      
      // Delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000))
    }

    console.log(`✅ Sent ${maybeGuests.length} reminder emails`)

  } catch (error) {
    console.error('Error sending MAYBE reminders:', error)
    throw error
  }
}

/**
 * Generate and send weekly reports to event organizers
 * Called by OpenClaw cron job every Sunday
 */
export async function sendWeeklyReports(): Promise<void> {
  try {
    // TODO: Get all active events
    // const activeEvents = await prisma.event.findMany({
    //   where: {
    //     status: 'DELIVERED',
    //     eventDate: {
    //       gte: new Date() // Future events only
    //     }
    //   },
    //   include: {
    //     user: true,
    //     guests: true
    //   }
    // })

    // Mock data for development  
    const activeEvents: any[] = [
      {
        id: 'event-1',
        title: 'Сватбата на Петя и Иван',
        eventDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        user: {
          name: 'Петя Петрова',
          email: 'petya@example.com'
        },
        guests: [
          { name: 'Мария', status: 'COMING', plusOnes: 1 },
          { name: 'Георги', status: 'MAYBE', plusOnes: 0 },
          { name: 'Ани', status: 'NOT_COMING', plusOnes: 0 }
        ]
      }
    ]

    console.log(`📊 Processing ${activeEvents.length} events for weekly reports...`)

    for (const event of activeEvents) {
      const reportData = generateReportData(event as any)
      const htmlReport = generateReportHTML(reportData)
      
      await sendWeeklyReportEmail({
        to: event.user.email,
        clientName: event.user.name,
        eventTitle: event.title,
        reportData,
        htmlReport
      })

      // Delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 2000))
    }

    console.log(`✅ Sent ${activeEvents.length} weekly reports`)

  } catch (error) {
    console.error('Error sending weekly reports:', error)
    throw error
  }
}

/**
 * Check for expiring subscriptions and send warnings
 * Called by OpenClaw cron job daily
 */
export async function checkExpiringSubscriptions(): Promise<void> {
  try {
    const thirtyDaysFromNow = new Date()
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30)

    // TODO: Get expiring subscriptions
    // const expiringSubscriptions = await prisma.subscription.findMany({
    //   where: {
    //     status: 'ACTIVE',
    //     expiresAt: {
    //       lte: thirtyDaysFromNow
    //     }
    //   },
    //   include: {
    //     user: true
    //   }
    // })

    // Mock data
    const expiringSubscriptions: any[] = []

    console.log(`⚠️  Found ${expiringSubscriptions.length} expiring subscriptions`)

    for (const subscription of expiringSubscriptions) {
      // TODO: Send expiration warning email
      console.log(`📧 Sending expiration warning to: ${subscription.user.email}`)
    }

  } catch (error) {
    console.error('Error checking expiring subscriptions:', error)
    throw error
  }
}

// Helper Functions

function generateReportData(event: any) {
  const stats = {
    total: event.guests.length,
    coming: event.guests.filter((g: any) => g.status === 'COMING').length,
    maybe: event.guests.filter((g: any) => g.status === 'MAYBE').length,
    notComing: event.guests.filter((g: any) => g.status === 'NOT_COMING').length,
    noResponse: event.guests.filter((g: any) => g.status === 'NO_RESPONSE').length,
    totalAttendees: event.guests
      .filter((g: any) => g.status === 'COMING')
      .reduce((sum: number, g: any) => sum + 1 + (g.plusOnes || 0), 0)
  }

  return {
    event,
    stats,
    responseRate: Math.round(((stats.total - stats.noResponse) / stats.total) * 100)
  }
}

function generateReportHTML(reportData: any): string {
  const { event, stats } = reportData

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #7C3AED;">${event.title} - Седмичен отчет</h1>
      
      <div style="background: #F3F4F6; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h2>📊 Статистики за гости</h2>
        <ul style="list-style: none; padding: 0;">
          <li>✅ Идват: <strong>${stats.coming}</strong></li>
          <li>🤔 Може би: <strong>${stats.maybe}</strong></li>
          <li>❌ Не идват: <strong>${stats.notComing}</strong></li>
          <li>⏳ Без отговор: <strong>${stats.noResponse}</strong></li>
        </ul>
        <p><strong>Общо участници: ${stats.totalAttendees}</strong></p>
        <p>Процент отговорили: ${reportData.responseRate}%</p>
      </div>

      <div style="background: #EFF6FF; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h2>📅 До събитието остават</h2>
        <p style="font-size: 18px;">
          <strong>${Math.ceil((new Date(event.eventDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))} дни</strong>
        </p>
      </div>

      <p style="color: #6B7280; font-size: 12px;">
        Този отчет се генерира автоматично всяка неделя.
        <br>За въпроси: nikol@momentia.online
      </p>
    </div>
  `
}

async function sendMaybeReminderEmail(guest: Guest) {
  console.log(`📧 Sending MAYBE reminder to ${guest.email}`)
  
  // TODO: Implement with Resend
  /*
  await resend.emails.send({
    from: 'nikol@momentia.online',
    to: guest.email,
    subject: `🤔 Напомняне: ${guest.event.title} е след 7 дни`,
    html: `
      <h1>Здравейте ${guest.name}!</h1>
      
      <p>Наближава датата на <strong>${guest.event.title}</strong> и все още не сме получили окончателния ви отговор.</p>
      
      <p>Събитието е на: <strong>${new Date(guest.event.eventDate).toLocaleDateString('bg-BG')}</strong></p>
      
      <p>Моля потвърдете присъствието си на:</p>
      <p><a href="https://${guest.event.subdomain}.momentia.online" target="_blank">
        https://${guest.event.subdomain}.momentia.online
      </a></p>
      
      <p>С уважение,<br>Екипът на Momentia</p>
    `
  })
  */
}

async function sendWeeklyReportEmail({ 
  to, 
  clientName, 
  eventTitle, 
  reportData, 
  htmlReport 
}: {
  to: string
  clientName: string
  eventTitle: string
  reportData: any
  htmlReport: string
}) {
  console.log(`📊 Sending weekly report to ${to}`)
  
  // TODO: Implement with Resend
  /*
  await resend.emails.send({
    from: 'nikol@momentia.online',
    to: to,
    subject: `📊 Седмичен отчет за ${eventTitle}`,
    html: htmlReport
  })
  */
}