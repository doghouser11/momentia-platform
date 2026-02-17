import { NextRequest, NextResponse } from 'next/server'

interface PlaceholderParams {
  params: Promise<{
    dimensions: string
  }>
}

export async function GET(
  request: NextRequest,
  { params }: PlaceholderParams
) {
  try {
    const { dimensions } = await params
    const [widthStr, heightStr] = dimensions.split('x')
    const width = parseInt(widthStr) || 600
    const height = parseInt(heightStr) || 400

    // Create a simple SVG placeholder
    const svg = `
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#E5E7EB;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#D1D5DB;stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#grad)"/>
        <text x="50%" y="45%" text-anchor="middle" font-family="Inter, sans-serif" font-size="18" fill="#6B7280">
          ${width} × ${height}
        </text>
        <text x="50%" y="60%" text-anchor="middle" font-family="Inter, sans-serif" font-size="14" fill="#9CA3AF">
          Placeholder Image
        </text>
      </svg>
    `

    return new NextResponse(svg, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=31536000',
      },
    })

  } catch (error) {
    console.error('Error generating placeholder:', error)
    return new NextResponse('Error generating placeholder', { status: 500 })
  }
}