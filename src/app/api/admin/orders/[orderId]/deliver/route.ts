import { NextRequest, NextResponse } from 'next/server'
// import { PrismaClient } from '@prisma/client'
// import { Resend } from 'resend'

// const prisma = new PrismaClient()
// const resend = new Resend(process.env.RESEND_API_KEY)

interface DeliverParams {
  params: Promise<{
    orderId: string
  }>
}

export async function POST(
  request: NextRequest,
  { params }: DeliverParams
) {
  try {
    const { orderId } = await params

    // TODO: Add authentication check
    // const session = await getServerSession(authOptions)
    // if (!session?.user?.email?.includes('nikol_bg_93@proton.me')) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    // }

    // TODO: Replace with real database operations
    // const order = await prisma.order.findUnique({
    //   where: { id: orderId },
    //   include: { user: true }
    // })

    // if (!order) {
    //   return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    // }

    // Mock order data for development
    const mockOrder = {
      id: orderId,
      clientName: 'Петя и Иван Петрови',
      clientEmail: 'petya@example.com',
      planType: 'PREMIUM'
    }

    // Generate event subdomain (in production, this would be more sophisticated)
    const subdomain = generateSubdomain(mockOrder.clientName)
    const eventUrl = `https://${subdomain}.momentia.online`
    const qrCodeData = await generateQRCode(eventUrl)

    // TODO: Update order status in database
    // await prisma.order.update({
    //   where: { id: orderId },
    //   data: {
    //     status: 'DELIVERED',
    //     deliveredAt: new Date()
    //   }
    // })

    // TODO: Send email to client with link and QR code
    await sendDeliveryEmail({
      to: mockOrder.clientEmail,
      clientName: mockOrder.clientName,
      eventUrl,
      qrCodeData,
      planType: mockOrder.planType
    })

    // TODO: Send notification to admin
    await sendAdminNotification({
      orderId,
      clientName: mockOrder.clientName,
      action: 'DELIVERED',
      eventUrl
    })

    return NextResponse.json({
      success: true,
      eventUrl,
      qrCode: qrCodeData
    })

  } catch (error) {
    console.error('Error delivering order:', error)
    return NextResponse.json(
      { error: 'Failed to deliver order' },
      { status: 500 }
    )
  }
}

function generateSubdomain(clientName: string): string {
  // Convert "Петя и Иван Петрови" -> "petya-i-ivan"
  return clientName
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special chars
    .replace(/\s+/g, '-')     // Spaces to hyphens
    .substring(0, 30)         // Max length
}

async function generateQRCode(url: string): Promise<string> {
  // TODO: Implement with qrcode library
  // const QRCode = require('qrcode')
  // return await QRCode.toDataURL(url)
  
  // Mock QR code for now
  return `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==`
}

async function sendDeliveryEmail({ to, clientName, eventUrl, qrCodeData, planType }: {
  to: string
  clientName: string
  eventUrl: string
  qrCodeData: string
  planType: string
}) {
  // TODO: Implement with Resend
  console.log(`📧 Sending delivery email to ${to}:`)
  console.log(`   Client: ${clientName}`)
  console.log(`   Plan: ${planType}`)
  console.log(`   URL: ${eventUrl}`)
  console.log(`   QR Code: ${qrCodeData.substring(0, 50)}...`)

  // Mock implementation - in production use Resend:
  /*
  await resend.emails.send({
    from: 'nikol@momentia.online',
    to: to,
    subject: `🎉 Вашият сайт за събитие е готов! - ${clientName}`,
    html: `
      <h1>Поздравления! Вашият сайт е готов 🎉</h1>
      
      <p>Здравейте ${clientName},</p>
      
      <p>Радваме се да ви съобщим, че вашият персонален сайт за събитие е готов и достъпен на:</p>
      
      <p><strong><a href="${eventUrl}" target="_blank">${eventUrl}</a></strong></p>
      
      <p>Можете също да използвате QR кода по-долу за лесно споделяне с гостите:</p>
      <img src="${qrCodeData}" alt="QR Code" style="max-width: 200px;">
      
      <p>План: ${planType}</p>
      
      <hr>
      <p>С уважение,<br>Никол от Momentia</p>
    `
  })
  */
}

async function sendAdminNotification({ orderId, clientName, action, eventUrl }: {
  orderId: string
  clientName: string  
  action: string
  eventUrl: string
}) {
  // TODO: Implement admin notification
  console.log(`📧 Admin notification: Order ${orderId} - ${action}`)
  console.log(`   Client: ${clientName}`)
  console.log(`   URL: ${eventUrl}`)

  // Mock - in production send to nikol_bg_93@proton.me
}