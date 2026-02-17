import { NextRequest, NextResponse } from 'next/server'
// import Stripe from 'stripe'
// import { PrismaClient } from '@prisma/client'

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//   apiVersion: '2024-06-20'
// })
// const prisma = new PrismaClient()

/**
 * Stripe webhook handler for successful payments
 * Automatically creates order and sends admin notification
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    
    // TODO: Verify Stripe webhook signature
    // const sig = request.headers.get('stripe-signature')!
    // const event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)

    // Mock event for development
    const event = {
      type: 'payment_intent.succeeded',
      data: {
        object: {
          id: 'pi_test_123',
          amount: 35000, // 350€ in cents
          currency: 'eur',
          metadata: {
            plan: 'PREMIUM',
            clientName: 'Петя и Иван Петрови',
            clientEmail: 'petya@example.com',
            clientPhone: '+359 88 123 4567'
          }
        }
      }
    }

    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object as any

      // Extract order data
      const orderData = {
        clientName: paymentIntent.metadata.clientName,
        clientEmail: paymentIntent.metadata.clientEmail,
        clientPhone: paymentIntent.metadata.clientPhone || '',
        planType: paymentIntent.metadata.plan,
        amount: paymentIntent.amount / 100, // Convert from cents
        currency: paymentIntent.currency.toUpperCase(),
        stripePaymentId: paymentIntent.id
      }

      // Create order in database
      const order = await createOrder(orderData)

      // Send structured notification to admin
      await sendAdminDataMatrix(order)

      // Send confirmation to client
      await sendClientConfirmation(orderData)

      console.log(`✅ Order ${order.id} created and notifications sent`)

      return NextResponse.json({ 
        success: true, 
        orderId: order.id 
      })
    }

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Stripe webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
}

async function createOrder(orderData: any) {
  // Calculate deadline (7 days from now)
  const deadline = new Date()
  deadline.setDate(deadline.getDate() + 7)

  // TODO: Create in real database
  // const order = await prisma.order.create({
  //   data: {
  //     clientName: orderData.clientName,
  //     clientEmail: orderData.clientEmail,
  //     planType: orderData.planType,
  //     amount: orderData.amount,
  //     deadline,
  //     status: 'PENDING'
  //   }
  // })

  // Mock order for development
  const order = {
    id: 'order_' + Date.now(),
    clientName: orderData.clientName,
    clientEmail: orderData.clientEmail,
    planType: orderData.planType,
    amount: orderData.amount,
    deadline: deadline.toISOString(),
    status: 'PENDING',
    createdAt: new Date().toISOString()
  }

  return order
}

async function sendAdminDataMatrix(order: any) {
  const structuredData = {
    '🔴 НОВА ПОРЪЧКА MOMENTIA': '---',
    '': '',
    '👤 Клиент': order.clientName,
    '📧 Имейл': order.clientEmail, 
    '💼 План': getPlanDetails(order.planType),
    '💰 Сума': `${order.amount}€`,
    '⏰ Крайна дата за доставка': formatDate(order.deadline),
    '📝 ID Поръчка': order.id,
    ' ': '',
    '🎯 ДЕЙСТВИЕ НУЖНО': 'Създай сайт и маркирай като доставен в админ панела',
    '🔗 Админ панел': 'https://momentia.online/admin',
    '  ': '',
    '📋 ПЛАН ДЕТАЙЛИ': '',
    '• Брой сайтове': getPlanSites(order.planType),
    '• Валидност': '12 месеца',
    '• Функции': getPlanFeatures(order.planType),
    '   ': '',
    '⚡ СТАТУС': 'PENDING - Чака потвърждение'
  }

  // Format as structured text email
  const emailBody = Object.entries(structuredData)
    .map(([key, value]) => {
      if (key === '' || key === ' ' || key === '  ' || key === '   ') return '\n'
      if (key.includes('MOMENTIA') || key.includes('ДЕЙСТВИЕ') || key.includes('ПЛАН ДЕТАЙЛИ')) {
        return `\n${key}\n${'='.repeat(key.length)}`
      }
      return `${key}: ${value}`
    })
    .join('\n')

  console.log(`📧 Sending admin data matrix to nikol_bg_93@proton.me:`)
  console.log(emailBody)

  // TODO: Send with Resend
  /*
  await resend.emails.send({
    from: 'system@momentia.online',
    to: 'nikol_bg_93@proton.me',
    subject: `🔴 MOMENTIA: Нова поръчка ${order.planType} - ${order.clientName}`,
    text: emailBody,
    html: `<pre style="font-family: monospace; font-size: 14px;">${emailBody}</pre>`
  })
  */
}

async function sendClientConfirmation(orderData: any) {
  console.log(`📧 Sending payment confirmation to ${orderData.clientEmail}`)

  // TODO: Send with Resend
  /*
  await resend.emails.send({
    from: 'nikol@momentia.online',
    to: orderData.clientEmail,
    subject: '🎉 Плащането е успешно! Вашият сайт се подготвя',
    html: `
      <h1>Благодарим за доверието! 🎉</h1>
      
      <p>Здравейте ${orderData.clientName},</p>
      
      <p>Плащането ви за план <strong>${orderData.planType}</strong> е успешно обработено.</p>
      
      <div style="background: #F0F8FF; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3>Какво следва?</h3>
        <ol>
          <li>В рамките на 7 дни ще получите имейл с линк към вашия персонален сайт</li>
          <li>Ще получите и QR код за лесно споделяне с гости</li>
          <li>Всички инструкции за използване ще бъдат включени</li>
        </ol>
      </div>
      
      <p>За въпроси: nikol@momentia.online</p>
      
      <p>С уважение,<br>Никол от Momentia</p>
    `
  })
  */
}

// Helper functions

function getPlanDetails(planType: string): string {
  const plans = {
    'BEGINNER': 'Начинаещ (180€/год)',
    'PREMIUM': 'Премиум (350€/год)',
    'PROFESSIONAL': 'Професионален (500€/год)'
  }
  return plans[planType as keyof typeof plans] || planType
}

function getPlanSites(planType: string): string {
  const sites = {
    'BEGINNER': '2 сайта',
    'PREMIUM': '3 сайта', 
    'PROFESSIONAL': '5 сайта'
  }
  return sites[planType as keyof typeof sites] || '?'
}

function getPlanFeatures(planType: string): string {
  const features = {
    'BEGINNER': 'RSVP, Templates, Email поддръжка',
    'PREMIUM': 'Всичко от Начинаещ + Персонални домейни + Live Gallery',
    'PROFESSIONAL': 'Всичко + White-label + API + Приоритетна поддръжка'
  }
  return features[planType as keyof typeof features] || 'Standard features'
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('bg-BG', {
    weekday: 'long',
    year: 'numeric',
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}