'use client'

import React from 'react'
import { useUser } from '@clerk/nextjs'
import { Message } from '@/lib/generated/prisma'

interface MessagesProps {
    message: Message & {
        user: {
            username: string | null
            clerkId: string | null
        } | null
    }
}

const Messages = ({ message }: MessagesProps) => {
    const { user } = useUser()
    const isCurrentUser = user?.id === message.user?.clerkId

    return (
        <div className={`flex flex-col gap-2 p-2 rounded-lg ${isCurrentUser ? 'bg-blue-100 border-blue-300 border-2 ml-auto' : 'bg-gray-100 border-gray-300 border-2 mr-auto'}`}>
            <div className="flex items-center gap-2">
                <span className="font-semibold text-sm">
                    {message.user?.username || 'Unknown User'}
                </span>
                <span className="text-xs text-gray-500">
                    {new Date(message.createdAt).toLocaleTimeString()}
                </span>
            </div>
            <div 
                className="text-sm"
                dangerouslySetInnerHTML={{ __html: message.content }}
            />
        </div>
    )
}

export default Messages