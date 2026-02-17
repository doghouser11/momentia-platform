import { NextRequest, NextResponse } from 'next/server'
// import { PrismaClient } from '@prisma/client'

// const prisma = new PrismaClient()

// Mock data for development
const mockOrders = [
  {
    id: '1',
    clientName: 'Петя и Иван Петрови',
    clientEmail: 'petya@example.com',
    planType: 'PREMIUM',
    amount: 350,
    status: 'PENDING',
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    id: '2', 
    clientName: 'Мария Иванова',
    clientEmail: 'maria@example.com',
    planType: 'BEGINNER',
    amount: 180,
    status: 'DELIVERED',
    deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    deliveredAt: new Date().toISOString(),
  }
]

export async function GET(request: NextRequest) {
  try {
    // TODO: Add authentication check
    // const session = await getServerSession(authOptions)
    // if (!session?.user?.email?.includes('nikol_bg_93@proton.me')) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    // }

    // TODO: Replace with real database query
    // const orders = await prisma.order.findMany({
    //   orderBy: { createdAt: 'desc' }
    // })

    return NextResponse.json({ 
      orders: mockOrders,
      count: mockOrders.length 
    })

  } catch (error) {
    console.error('Error fetching orders:', error)
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    )
  }
}