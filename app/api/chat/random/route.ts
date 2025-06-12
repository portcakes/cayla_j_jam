import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
    try {
        const chat = await db.chat.findFirst({
            where: {
                isPublic: true,
            }
        })
        
        if (!chat) {
            return NextResponse.json({ error: 'No public chat found' }, { status: 404 })
        }

        return NextResponse.json(chat)
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
} 