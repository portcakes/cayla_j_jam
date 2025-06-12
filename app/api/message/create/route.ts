import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    try {
        const { userId: clerkUserId } = await auth()
        if (!clerkUserId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const body = await request.json()
        console.log('Received request body:', body)

        const { content, Id } = body

        if (!content || !Id) {
            console.error('Missing required fields:', { content, Id })
            return NextResponse.json(
                { error: 'Content and Id are required' },
                { status: 400 }
            )
        }

        // First, get or create the user in our database
        const user = await db.user.upsert({
            where: {
                clerkId: clerkUserId,
            },
            update: {},
            create: {
                clerkId: clerkUserId,
                username: `user_${clerkUserId.slice(0, 8)}`, // Create a temporary username
                email: '', // You might want to get this from Clerk
            },
        })

        console.log('Creating message with data:', {
            content,
            Id,
            userId: user.id,
        })

        const message = await db.message.create({
            data: {
                content,
                chatId: Id,
                userId: user.id,
            },
            include: {
                user: true,
            },
        })

        console.log('Message created successfully:', message)
        return NextResponse.json(message)
    } catch (error) {
        console.error('Error creating message:', error)
        // Log the full error details
        if (error instanceof Error) {
            console.error('Error details:', {
                message: error.message,
                stack: error.stack,
                name: error.name,
            })
        }
        return NextResponse.json(
            { 
                error: 'Internal Server Error',
                details: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        )
    }
} 