import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const chat = await db.chat.findUnique({
            where: {
                id: params.id
            }
        })

        if (!chat) {
            return NextResponse.json({ error: 'Chat not found' }, { status: 404 })
        }

        return NextResponse.json(chat)
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
} 