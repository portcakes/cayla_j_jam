import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
    request: NextRequest,
    context: { params: { id: string } }
) {
    try {
        const params = await context.params
        const { id } = params
        
        const chat = await db.chat.findUnique({
            where: {
                id
            },
            include: {
                users: true,
                messages: {
                    orderBy: {
                        createdAt: 'desc'
                    },
                    include: {
                        user: true
                    }
                }
            }
        })

        if (!chat) {
            return NextResponse.json({ error: 'Chat not found' }, { status: 404 })
        }

        return NextResponse.json(chat)
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal Server Error', details: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        )
    }
} 