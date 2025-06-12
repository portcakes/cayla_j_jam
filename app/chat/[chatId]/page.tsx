import { db } from '@/lib/db'
import NotFound from '@/components/NotFound'
import React from 'react'
import Messages from '@/components/Chat/Messages'
import ChatWindow from '@/components/Chat/ChatWindow'

interface ChatPageProps {
    params: {
        chatId: string
    }
}

const ChatPage = async ({ params }: ChatPageProps) => {
    const chat = await db.chat.findUnique({
        where: {
            id: params.chatId
        },
        include: {
            user: true,
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
        return <NotFound />
    }

    return <ChatWindow chatId={chat.id} />
}

export default ChatPage 