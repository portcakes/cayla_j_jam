'use client'

import React, { ReactNode } from 'react'
import Messages from '@/components/Chat/Messages'
import RichTextEditor from '@/components/Chat/rich-text-editor/RichTextEditor'
import type { Chat, Message, User } from '@/lib/generated/prisma'

interface ChatWithRelations extends Omit<Chat, 'name' | 'description'> {
    id: string
    description: ReactNode
    name: ReactNode
    users: User[]
    messages: (Message & {
        user: User | null
    })[]
}

interface ChatClientProps {
    chat: ChatWithRelations
}

const ChatClient = ({ chat }: ChatClientProps) => {
    return (
        <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold">{chat.name}</h1>
            <p className="text-sm text-gray-500">{chat.description}</p>
            <div className="flex flex-col gap-2">
                <div className="flex flex-row gap-2">
                    <div className="flex flex-col gap-2 w-full">
                        <h2 className="text-lg font-bold">Chats</h2>
                        <div className="flex flex-col gap-2">
                            {chat.messages.map((message) => (
                                <Messages key={message.id} message={message} />
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-row gap-2">
                        <RichTextEditor Id={chat.id} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <h2 className="text-lg font-bold">Members</h2>
                        <div className="flex flex-col gap-2">
                            {chat.users.map((user) => (
                                <div key={user.id} className="flex flex-col gap-2">
                                    <p className="text-sm text-gray-500">{user.username}</p>
                                    <p className="text-sm text-gray-500">{user.email}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatClient 