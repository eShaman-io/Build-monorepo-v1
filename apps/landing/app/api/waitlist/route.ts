import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const waitlistSchema = z.object({
  email: z.string().email(),
  source: z.string().default('landing')
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, source } = waitlistSchema.parse(body)
    
    // TODO: Replace with actual Firebase function URL from environment
    const functionUrl = process.env.FUNCTION_WAITLIST_URL || 'http://localhost:5001/your-project/us-central1/waitlist_add'
    
    const response = await fetch(functionUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, source })
    })
    
    if (!response.ok) {
      throw new Error('Failed to add to waitlist')
    }
    
    const result = await response.json()
    
    return NextResponse.json({ success: true, data: result })
  } catch (error) {
    console.error('Waitlist API error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Invalid email address' },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { success: false, error: 'Failed to join waitlist' },
      { status: 500 }
    )
  }
}
